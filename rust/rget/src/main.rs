extern crate clap;
extern crate reqwest; // Add reqwest for HTTP requests
extern crate indicatif; // Ensure indicatif is included for progress bars
extern crate human_bytes; // For human-readable byte sizes

use clap::{Arg, App};
use indicatif::{ProgressBar, ProgressStyle};
use reqwest::blocking::Client;
use reqwest::header::{CONTENT_LENGTH as ContentLength, CONTENT_TYPE as ContentType};
use human_bytes::human_bytes; // Correct import for human_bytes function
use std::fs::File;
use std::io::{self, Write, Read};

fn main() {
    let matches = App::new("Rget")
        .version("0.1.0")
        .author("Bruno Haetinger")
        .about("wget clone written in Rust")
        .arg(Arg::with_name("URL")
                .required(true)
                .takes_value(true)
                .index(1)
                .help("url to download")
            )
        .get_matches();
    let url = matches.value_of("URL").unwrap();
    println!("{}", url);
}

fn create_progress_bar(quiet_mode: bool, msg: &str, length: Option<u64>) -> ProgressBar {
    let bar = match quiet_mode {
        true => ProgressBar::hidden(),
        false => {
            match length {
                Some(len) => ProgressBar::new(len),
                None => ProgressBar::new_spinner(),
            }
        }
    };

    bar.set_message(msg);
    match length.is_some(){
        true => bar
            .set_style(ProgressStyle::default_bar()
                .template("{msg} {spinner:.green}[{elapsed_precise}][{wide_bar:.cyan/blue}]")
                .progress_chars("=>")),
        false => bar.set_style(ProgressStyle::default_spinner()),
    };

    bar
}

fn parse_url(target: &str) -> Result<String, Box<dyn std::error::Error>> {
    // Simple URL validation can be added here
    Ok(target.to_string())
}

fn print(message: String, quiet_mode: bool) {
    if !quiet_mode {
        println!("{}", message);
    }
}

fn save_to_file(buf: &mut Vec<u8>, fname: &str) -> Result<(), io::Error> {
    let mut file = File::create(fname)?;
    file.write_all(buf)?;
    Ok(())
}

fn download(target: &str, quiet_mode: bool) -> Result<(), Box<dyn std::error::Error>> {
    // parse url
    let url = parse_url(target)?;
    let client = Client::new();
    let request_builder = client.get(&url);
    let resp = request_builder.send()?; // Correct usage of send()
    print(format!("HTTP request sent... {}", resp.status()), quiet_mode);
    
    if resp.status().is_success() {
        let headers = resp.headers().clone();
        let ct_len = headers.get::<ContentLength>().map(|ct_len| **ct_len);
        let ct_type = headers.get::<ContentType>().unwrap();

        match ct_len {
            Some(len) => {
                print(format!("Length: {} ({})", len, human_bytes(len)), quiet_mode);
            },
            None => {
                print(format!("Length: {}", "unknown"), quiet_mode); 
            },
        }

        print(format!("Type: {}", ct_type.to_string()), quiet_mode);
        let fname = target.split("/").last().unwrap();
        print(format!("Saving to: {}", fname), quiet_mode);

        let chunk_size = match ct_len {
            Some(x) => x as usize / 99,
            None => 1024usize, // default chunk size
        };

        let mut buf = Vec::new();
        let bar = create_progress_bar(quiet_mode, fname, ct_len);

        loop {
            let mut buffer = vec![0; chunk_size];
            let bcount = resp.read(&mut buffer[..])?;
            buffer.truncate(bcount);
            if !buffer.is_empty() {
                buf.extend(buffer);
                bar.inc(bcount as u64);
            } else {
                break;
            }
        }

        bar.finish();
        save_to_file(&mut buf, fname)?;
    }

    Ok(())
}

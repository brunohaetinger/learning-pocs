const puppeteer = require('puppeteer')

console.log("Hello via Bun!");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.goto('https://www.reddit.com/AskProgramming/');
  await page.goto('https://www.reddit.com/r/AskProgramming/', {waitUntil: 'networkidle2'});
  await page.screenshot({path: 'reddit.png'});
  const data = await page.evaluate(()=>{
    const postsArray = Array.from(document.querySelectorAll('shreddit-post')).map(post=>{
      const title = post.getAttribute('post-title');
      const link = 'https://reddit.com' + post.getAttribute('permalink');
      const commentsCount = post.getAttribute('comment-count');
      return {
        title,
        link,
        comments: commentsCount,        
      };
    });

    return {
      posts: postsArray,
    }
  })
  console.log(data);
  
  await browser.close();
})
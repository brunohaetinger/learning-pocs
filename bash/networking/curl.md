## curl

`curl example.com` => return text as browser would do
`curl -o example.html example.com` => save return to file
`curl -X GET https://example.com/json` => return json response
`curl --get https://example.com/json` => return json response
`curl -O https://curl.se/logo/curl-logo.svg` => download file
`curl -X POST -H "Content-Type: application/json" -d '{"name": "Foo Bar"}' https://httpbun.com/post` => Send POST request with headers and data

Obs.: curl can be used for checking network dns lookup time and use it as a server metric

`curl -C - -O http://example.com/1GB.zip` => resume download of file
`curl --parallel -O "https://example.com/assets/icon-[01-10].svg"` => download multiple files in parallel
`curl -sIL https://bit.ly/anythinghere | grep location:` => output where shortned url go to

### jq
`curl -X POST -H "Content-Type: application/json" -d '{"name": "Foo Bar"}' https://httpbun.com/post | jq` => Send POST request with headers and data + parse with jq

`curl -X POST -H "Content-Type: application/json" -d '{"name": "Foo Bar"}' https://httpbun.com/post | jq '.headers."User-Agent"'` => get User-Agent from headers


#### Options

`-i` => shows http status and headers infos
`-I` => shows http status and headers infos, without the response
`--head` => shows http status and headers infos, without the response
`-v` => verbose shows everything
`--location` => follow redirects and show responses info
`-O` => download binaries

// Rename this sample file to main.js to use on your project.
// The main.js file will be overwritten in updates/reinstalls.

var http = require('http');
var rn_bridge = require('rn-bridge');
const fs = require('fs');
const ytdl = require('ytdl-core');
const progress = require('progress-stream');

rn_bridge.channel.on('message', (msg) => {
  const command = JSON.parse(msg);
  const youtubeVideo = command.video;
  const folder = command.folder;
  
  try {
    var str = progress({
      time: 500 /* ms */
    });

    str.on('progress', function (progress) {
      console.log(progress);
      rn_bridge.channel.send(JSON.stringify(progress));
      /*
      {
          percentage: 9.05,
          transferred: 949624,
          length: 10485760,
          remaining: 9536136,
          eta: 42,
          runtime: 3,
          delta: 295396,
          speed: 949624
      }
      */
    });

    const fullpath = `${folder}/${youtubeVideo}.flac`;
    const stream = fs.createWriteStream(fullpath);
    const videoUrl = `https://www.youtube.com/watch?v=${youtubeVideo}`;

    ytdl(videoUrl, { filter: 'audioonly' }).pipe(str).pipe(stream);

    console.log(`Download started. Video = ${fullpath}`);

    rn_bridge.channel.send(JSON.stringify({message: `Download started. Full video url is ${videoUrl}`}));
  } catch (e) {
    rn_bridge.channel.send(JSON.stringify({message: `Error: ${e.message}`}));
  }
});


//create a server object:
http.createServer(function (req, res) {
  ytdl('https://www.youtube.com/watch?v=fJ9rUzIMcZQ', { filter: 'audioonly' }).pipe(res);
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

console.log('Node was initialized.')
rn_bridge.channel.send(JSON.stringify({message: 'Node was initialized.'}));
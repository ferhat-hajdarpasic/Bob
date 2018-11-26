var http = require('http');
var rn_bridge = require('rn-bridge');
const fs = require('fs');
const ytdl = require('ytdl-core');
const progress = require('progress-stream');
var url = require('url');
var portastic = require('portastic');


//rn_bridge.channel.send(JSON.stringify({port: 9000}));

rn_bridge.channel.on('message', (msg) => {
  const command = JSON.parse(msg);
  const youtubeVideo = command.video;
  const folder = command.folder;
  
  try {
    var str = progress({
      time: 500 /* ms */
    });

    str.on('progress', function (progress) {
      rn_bridge.channel.send(JSON.stringify(progress));
    });

    const fullpath = `${folder}/${youtubeVideo}.flac`;
    const stream = fs.createWriteStream(fullpath);
    const videoUrl = `https://www.youtube.com/watch?v=${youtubeVideo}`;

    ytdl(videoUrl, { filter: 'audioonly' }).pipe(str).pipe(stream);

    rn_bridge.channel.send(JSON.stringify({message: `Download started. Full video url is ${videoUrl}`}));
  } catch (e) {
    rn_bridge.channel.send(JSON.stringify({message: `Error: ${e.message}`}));
  }
});

portastic.find({ min: 8081, max: 8100 }).then(function (ports) {
  console.log(ports);
  port = ports[0];
  console.log(`port=${port}`);
  http.createServer(function (req, res) {
    var parts = url.parse(req.url, true);
    var videoId = parts.path.substring(1);
    var str = progress({ time: 500 /* ms */ });
    rn_bridge.channel.send(JSON.stringify({message: `Downloading videoId ${videoId}.`}));

    str.on('progress', function (progress) {
      if (progress.percentage >= 100) {
        res.end();
        rn_bridge.channel.send(JSON.stringify({message: `Downloading of videoId ${videoId} finished.`}));
      }
    });

    // str.on('response', (res) => {
    //   var size = parseInt(res.headers['content-length'], 10);
    //   console.log(`size: ${size} bytes`);
    // });

    ytdl.getInfo(`https://www.youtube.com/watch?v=${videoId}`, { downloadURL: true },
      function (err, info) {
        if (err) {
          rn_bridge.channel.send(JSON.stringify({message: `Error ${err} .`}));
          throw err;
        }
        rn_bridge.channel.send(JSON.stringify({message: `author=${info.author.name}, title=${info.title}, length_seconds=${info.length_seconds}`}));
      }
    );

    ytdl(`https://www.youtube.com/watch?v=${videoId}`, { filter: 'audioonly' }).pipe(str).pipe(res);

  }).listen(port);

  rn_bridge.channel.send(JSON.stringify({port: port}));
});
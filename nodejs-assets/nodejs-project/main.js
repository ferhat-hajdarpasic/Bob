// Rename this sample file to main.js to use on your project.
// The main.js file will be overwritten in updates/reinstalls.

var rn_bridge = require('rn-bridge');
const fs = require('fs');
const ytdl = require('ytdl-core');
const os = require('os');
const progress = require('progress-stream');

// Echo every message received from react-native.
rn_bridge.channel.on('message', (msg) => {
  try {
    let success = fs.existsSync('/storage/emulated/0/Android/data/com.bob/cache');

    var str = progress({
      //length: stat.size,
      time: 500 /* ms */
    });

    str.on('progress', function (progress) {
      console.log(progress);
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

    const stream = fs.createWriteStream('/storage/emulated/0/Android/data/com.bob/cache/halloween.flac');
    ytdl('https://www.youtube.com/watch?v=ek1ePFp-nBI', { filter: 'audioonly' }).pipe(str).pipe(stream);


    // setTimeout(function () {
    //   console.log('***********FREDDY FINISHED*********')
    //   rn_bridge.channel.send('Finished');
    // }, 5000);

    rn_bridge.channel.send(msg + ':' + success + ':' + JSON.stringify(os.homedir()));//+ stream.bytesWritten);
  } catch (e) {
    rn_bridge.channel.send(e.message);
  }
});

// Inform react-native node is initialized.
console.log('***********FREDDY*********')
rn_bridge.channel.send("Node was initialized.");
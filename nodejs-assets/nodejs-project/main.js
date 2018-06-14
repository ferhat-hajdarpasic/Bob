// Rename this sample file to main.js to use on your project.
// The main.js file will be overwritten in updates/reinstalls.

var rn_bridge = require('rn-bridge');
const fs = require('fs');
const ytdl = require('ytdl-core');
const os = require('os');

// Echo every message received from react-native.
rn_bridge.channel.on('message', (msg) => {
  try {
    let success = fs.existsSync('/storage/emulated/0/Android/data/com.bob/cache');
    
    const stream = fs.createWriteStream('/storage/emulated/0/Android/data/com.bob/cache/halloween.flac');
    ytdl('https://www.youtube.com/watch?v=ek1ePFp-nBI', { filter: 'audioonly' }).pipe(stream);
    console.log('Freddy');
    rn_bridge.channel.send(msg + ':' +success + ':' + JSON.stringify(os.homedir())) ;//+ stream.bytesWritten);
  } catch (e) {
    rn_bridge.channel.send(e.message);
  }
});

// Inform react-native node is initialized.
rn_bridge.channel.send("Node was initialized.");
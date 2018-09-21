export default class SpotifyHelper {
    static albumImageSource = (album) => {
      if(album.images.length > 0) {
        return SpotifyHelper.uriImageSource(album.images[2].url);
      } else {
        return SpotifyHelper.emptyPlaylistImage();
      }
    }
    static playlistsImageSource = (playlists) => {
      let temp = SpotifyHelper.findFirstPlaylistWithImage(playlists);
      if(temp) {
        return SpotifyHelper.uriImageSource(temp.images[0].url);
      } else {
        return SpotifyHelper.emptyPlaylistImage();
      }
    }
  
    static findFirstPlaylistWithImage = (playlists) => {
      const result = playlists.items.find( item => item.images.length > 0 );
      return result;
    }
  
    static uriImageSource = (imageUri) => {
      return {uri: imageUri};
    }
  
    static emptyPlaylistImage = () => {
      return require('./Resources/ICONS/PAUSE.png');
    }    
}
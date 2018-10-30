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

    static tidalImage(imageId) {
      return {uri: `https://resources.tidal.com/images/${imageId.replace(/-/gi, '/')}/160x107.jpg`};
    }

    static tidalAlbumImageLarge(imageId) {    
      return {uri: `https://resources.tidal.com/images/${imageId.replace(/-/gi, '/')}/1280x1280.jpg`};
    }

    static tidalAlbumImageSmall(imageId) {    
      return {uri: `https://resources.tidal.com/images/${imageId.replace(/-/gi, '/')}/80x80.jpg`};
    }
}
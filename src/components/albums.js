
const imageRequireContext = require.context(`../images/`, true, /\.jpg$/);

const extractAlbum = (path) => {
  const match = path.match(/^\.\/(\w+)\//);
  if (!match) {
    throw new Error(`Unparseable album image: ${key}`);
  }

  return match[1];
};

const albumImages = {};
imageRequireContext.keys().forEach(key => {
  const album = extractAlbum(key);
  if (!albumImages[album]) {
    albumImages[album] = [key];
  } else {
    albumImages[album].push(key);
  }
});

module.exports = {
  getAlbums: () => {
    return Object.keys(albumImages);
  },
  size: (album) => {
    return albumImages[album].length;
  },
  getImages: (album) => {
    return albumImages[album].map(imageRequireContext);
  },
  getImage: (album, image) => {
    return imageRequireContext(albumImages[album][image]);
  },
  getImageByName: (album, filename) => {
    return imageRequireContext(`./${album}/${filename}`);
  }
}

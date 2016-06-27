
const imageRequireContext = require.context(`../images/`, true, /\.jpg$/);

const extractAlbum = (path) => {
  const match = path.match(/^\.\/(\w+)\//);
  if (!match) {
    throw new Error(`Unparseable album image: ${path}`);
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
  getAlbums: () => Object.keys(albumImages),
  size: (album) => albumImages[album].length,
  getImages: (album) => albumImages[album].map(imageRequireContext),
  getImage: (album, image) => imageRequireContext(albumImages[album][image]),
  getImageByName: (album, filename) => imageRequireContext(`./${album}/${filename}`),
};

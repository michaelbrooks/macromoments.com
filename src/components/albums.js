
const imageRequireContext = require.context(`../images/`, true, /\.jpg$/);

const albumImages = {};
imageRequireContext.keys().forEach(key => {
  const match = key.match(/^\.\/(\w+)\//);
  if (!match) {
    throw new Error(`Unparseable album image: ${key}`);
  }

  const album = match[1];
  if (!albumImages[album]) {
    albumImages[album] = [key];
  } else {
    albumImages[album].push(key);
  }
});

module.exports = {
  size: (album) => {
    return albumImages[album].length;
  },
  getImages: (album) => {
    return albumImages[album].map(imageRequireContext);
  },
  getImage: (album, image) => {
    return imageRequireContext(albumImages[album][image]);
  }
}


const imageRequireContext = require.context(`../images/`, true, /\.jpg$/);

const extractAlbum = (path) => {
  const match = path.match(/^\.\/(\w+)\/(.*)/);
  if (!match) {
    throw new Error(`Unparseable album image: ${path}`);
  }

  return {
    album: match[1],
    filename: match[2],
    path,
  };
};

const loader = (imgDesc) => imageRequireContext(imgDesc.path);

const albumImages = {};
imageRequireContext.keys().forEach(key => {
  const result = extractAlbum(key);

  if (!albumImages[result.album]) {
    albumImages[result.album] = [];
  }

  result.imageIndex = albumImages[result.album].length;
  albumImages[result.album].push(result);
});

module.exports = {
  getAlbums: () => Object.keys(albumImages),
  size: (album) => albumImages[album].length,
  loadImages: (album) => albumImages[album].map(loader),
  loadImage: (album, image) => loader(albumImages[album][image]),
  getMetaByName: (album, fname) => albumImages[album].find(
    ({ filename }) => filename === fname
  ),
};

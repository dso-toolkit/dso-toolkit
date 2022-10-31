module.exports = {
  version: 2,
  snapshot: {
    widths: [380, 780, 1024, 1280],
    "enable-javascript": true,
  },
  static: {
    include: /components\/preview\/((?!--).)+\.html$/,
  },
};

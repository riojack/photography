var ext = {};

function whenThumbClicked(item) {
  ext.window.open(item.image, 'iowa-light-view-photo');
}

export default {
  withExternals: (nextExt) => ext = nextExt,
  unregisterExternals: () => ext = {},

  whenThumbClicked: whenThumbClicked
}

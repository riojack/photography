function injectOnClick(list, onClick) {
  list.forEach((item) => {
    // eslint-disable-next-line no-param-reassign
    item.onClick = onClick;
  });
}

const TransformUtilities = {
  injectOnClick,
};

export default TransformUtilities;

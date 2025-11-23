function injectOnClick(list, onClick) {
  list.forEach((item) => {
    item.onClick = onClick;
  });
}

const TransformUtilities = {
  injectOnClick,
};

export default TransformUtilities;

function injectOnClick(list, onClick) {
  list.forEach(item => item.onClick = onClick);
}

export default {
  injectOnClick
};

export {injectOnClick};

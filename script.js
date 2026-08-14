document.querySelectorAll('.accordion details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;

    document.querySelectorAll('.accordion details[open]').forEach((openItem) => {
      if (openItem !== item) openItem.open = false;
    });
  });
});

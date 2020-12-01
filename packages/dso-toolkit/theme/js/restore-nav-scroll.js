window.onload = () => {
  const navContainer = document.querySelector("#navigation-container");
  if (navContainer == null) {
    return;
  }

  const navScrollTop = "nav-scroll-top";
  const restoreScrollTop = sessionStorage.getItem(navScrollTop);
  if (restoreScrollTop) {
    navContainer.scrollTop = restoreScrollTop;
  }

  navContainer.addEventListener("scroll", (e) =>
    sessionStorage.setItem(navScrollTop, e.target.scrollTop)
  );
};

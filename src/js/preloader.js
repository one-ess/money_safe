let preloader = null;

const initPreloader = () => {
  const preloaderEl = document.createElement("span");
  preloaderEl.classList.add("preloader");
  return preloaderEl;
};

export const startPreloader = (element) => {
  preloader = initPreloader();
  element.append(preloader);

  if (element === document.body) {
    preloader.classList.remove("preloader");
    preloader.classList.add("preloader_body");
    preloader.append(document.createElement("span"));
    preloader.firstElementChild.classList.add("preloader");
    preloader.firstElementChild.style.width = "50px";
    preloader.firstElementChild.style.height = "50px";
  }
};

export const removePreloader = () => {
  if (preloader) {
    preloader.remove();
    preloader = null;
  }
};

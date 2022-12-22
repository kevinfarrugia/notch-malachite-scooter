(function () {
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function updateUI(image) {
    console.log("j");
    const { clientWidth, clientHeight, currentSrc } = image;

    // we download the image but do not place it in the DOM to get the natural width/height
    // read more: https://html.spec.whatwg.org/multipage/images.html#normalizing-the-source-densities
    const offscreenImage = new Image();
    offscreenImage.onload = () => {
      const { naturalWidth, naturalHeight } = offscreenImage;

      document.getElementById("currentSrc").innerHTML = `${currentSrc
        .split("/")
        .pop()}`;
      document.getElementById("naturalWidth").innerHTML = `${naturalWidth}px`;
      document.getElementById("naturalHeight").innerHTML = `${naturalHeight}px`;
      document.getElementById("clientWidth").innerHTML = `${clientWidth}px`;
      document.getElementById("clientHeight").innerHTML = `${clientHeight}px`;

      const usedPercentage = Math.round(
        ((clientWidth * clientHeight * Math.pow(dpr, 2)) /
          (naturalWidth * naturalHeight)) *
          100
      );
      document.getElementById(
        "usedPercentage"
      ).innerHTML = `${usedPercentage}%`;
    };
    offscreenImage.src = currentSrc;
  }

  function getImageDetail(image) {
    document.getElementById("naturalWidth").innerHTML = "-";
    document.getElementById("naturalHeight").innerHTML = "-";
    document.getElementById("clientWidth").innerHTML = "-";
    document.getElementById("clientHeight").innerHTML = "-";
    document.getElementById("usedPercentage").innerHTML = "-";

    debounce(() => updateUI(image), 300);
  }

  const dpr = window.devicePixelRatio;
  document.getElementById("dpr").innerHTML = `${dpr}`;

  const imageEl = document.getElementById("image");
  getImageDetail(imageEl);

  // update on load
  imageEl.onload = () => getImageDetail(imageEl);

  // update on resize
  window.addEventListener("resize", () => getImageDetail(imageEl));
})();

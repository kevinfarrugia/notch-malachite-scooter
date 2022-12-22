(function () {
  function getImageDetail(image) {
    document.getElementById("naturalWidth").innerHTML = "-";
    document.getElementById("naturalHeight").innerHTML = "-";
    document.getElementById("clientWidth").innerHTML = "-";
    document.getElementById("clientHeight").innerHTML = "-";
    document.getElementById("usedPercentage").innerHTML = "-";

    if (image) {
      const { clientWidth, clientHeight, currentSrc } = image;

      // we download the image again but do not place it in the DOM to get the natural width/height
      // read more: https://html.spec.whatwg.org/multipage/images.html#normalizing-the-source-densities
      const offscreenImage = new Image();
      offscreenImage.src = currentSrc;
      offscreenImage.onload = () => {
        const { naturalWidth, naturalHeight } = offscreenImage;

        document.getElementById("currentSrc").innerHTML = `${currentSrc
          .split("/")
          .pop()}`;
        document.getElementById("naturalWidth").innerHTML = `${naturalWidth}px`;
        document.getElementById(
          "naturalHeight"
        ).innerHTML = `${naturalHeight}px`;
        document.getElementById("clientWidth").innerHTML = `${clientWidth}px`;
        document.getElementById("clientHeight").innerHTML = `${clientHeight}px`;

        const usedPercentage = Math.round(
          ((clientWidth * clientHeight) * Math.pow(dpr, 2) / (naturalWidth * naturalHeight)) * 100
        );
        document.getElementById(
          "usedPercentage"
        ).innerHTML = `${usedPercentage}%`;
      };
    }
  }

  document.getElementById("naturalWidth").innerHTML = "-";
  document.getElementById("naturalHeight").innerHTML = "-";
  document.getElementById("clientWidth").innerHTML = "-";
  document.getElementById("clientHeight").innerHTML = "-";
  document.getElementById("usedPercentage").innerHTML = "-";

  const dpr = window.devicePixelRatio;
  document.getElementById("dpr").innerHTML = `${dpr}`;

  const imageEl = document.getElementById("image");

  // update on load
  imageEl.onload = () => getImageDetail(imageEl);

  // update on resize
  window.addEventListener("resize", () => getImageDetail(imageEl));
})();

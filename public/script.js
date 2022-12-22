(function () {
  function getImageDetail(image) {
    if (image) {
      const {
        naturalWidth,
        naturalHeight,
        clientWidth,
        clientHeight,
        currentSrc,
      } = image;

      document.getElementById("currentSrc").innerHTML = `${currentSrc.split("/").pop()}`;
      document.getElementById("naturalWidth").innerHTML = `${naturalWidth}px`;
      document.getElementById("naturalHeight").innerHTML = `${naturalHeight}px`;
      document.getElementById("clientWidth").innerHTML = `${clientWidth}px`;
      document.getElementById("clientHeight").innerHTML = `${clientHeight}px`;

      const usedPercentage = Math.round(
        ((clientWidth * clientHeight) / (naturalWidth * naturalHeight)) *
          100
      );
      document.getElementById(
        "usedPercentage"
      ).innerHTML = `${usedPercentage}%`;
    }
  }

  const dpr = window.devicePixelRatio;
  document.getElementById("dpr").innerHTML = `${dpr}`;

  const imageEl = document.getElementById("image");

  // update on load
  imageEl.onload = () => getImageDetail(imageEl);

  // update on resize
  window.addEventListener("resize", () => getImageDetail(imageEl));
})();

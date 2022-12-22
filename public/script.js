(function () {
  function getImageDetail(image) {
    const { naturalWidth, naturalHeight, clientWidth, clientHeight } = image;

    document.getElementById("naturalWidth").innerHTML = `${naturalWidth}px`;
    document.getElementById("naturalHeight").innerHTML = `${naturalHeight}px`;
    document.getElementById("clientWidth").innerHTML = `${clientWidth}px`;
    document.getElementById("clientHeight").innerHTML = `${clientHeight}px`;

    const unusedPercentage = Math.round(
      ((clientWidth * clientHeight) / (naturalWidth * naturalHeight)) * 100
    );
    document.getElementById(
      "unusedPercentage"
    ).innerHTML = `${unusedPercentage}%`;
  }

  const imageEl = document.getElementById("image");
  
  // update on load
  imageEl.onload = () => getImageDetail(imageEl);
  
  // update on resize
  window.addEventListener("resize", () => getImageDetail(imageEl));
})();

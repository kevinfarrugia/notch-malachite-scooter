(function() {
  const imageEl = document.getElementById("image");
  const { naturalWidth, naturalHeight, clientWidth, clientHeight} = imageEl;
  
  document.getElementById("naturalWidth").innerHTML = `${naturalWidth}px`;
  document.getElementById("naturalHeight").innerHTML = `${naturalHeight}px`;
  document.getElementById("clientWidth").innerHTML = `${clientWidth}px`;
  document.getElementById("clientHeight").innerHTML = `${clientHeight}px`;
  
  const unusedPercentage = Math.round((naturalWidth * naturalHeight) / (clientWidth * clientHeight) * 100);
  document.getElementById("unusedPercentage").innerHTML = `${unusedPercentage}%`;
})();
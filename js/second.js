
function removeSampleText() {
  document.getElementById('sampleText').value = ''
}

function progressbar(precent) {
  document.getElementById("progressbar").style.width = precent * 20 + "%";
}

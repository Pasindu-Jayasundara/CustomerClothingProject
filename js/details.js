function changeRangeAge() {
  var ageRange = document.getElementById("ageRange").value;
  document.getElementById("ageOutput").innerText = ageRange;
}

function changeRangeWeight() {
  var ageRange = document.getElementById("WeightRange").value;
  document.getElementById("WeightOutput").innerText = ageRange + " lbs";
}

function changeRangeheight() {
  var ageRange = document.getElementById("heightRange").value;
  document.getElementById("HeightOutput").innerText = ageRange + " cm";
}

function Next2Page() {
  window.location = "ShapeBody.html";
}

function next3Page() {
  window.location = "shoulderType.html";
}
function next4Page() {
  window.location = "collarTypes.html";
}

function chooseBodyShape(shape) {
  document.getElementById("Triangle").classList.remove("active");
  document.getElementById("rectangle").classList.remove("active");
  document.getElementById("inverted").classList.remove("active");
  document.getElementById("dontknow").classList.remove("active");

  document.getElementById(shape).classList.toggle("active");
}

function chooseShoulderType(shape) {
  document.getElementById("straight").classList.remove("active");
  document.getElementById("normal").classList.remove("active");
  document.getElementById("sloping").classList.remove("active");
  document.getElementById("dontknow").classList.remove("active");

  document.getElementById(shape).classList.toggle("active");
}

function chooseCollarSize(shape) {
  document.getElementById("13s").classList.remove("active");
  document.getElementById("13/2s").classList.remove("active");
  document.getElementById("14s").classList.remove("active");
  document.getElementById("14/2s").classList.remove("active");
  document.getElementById("15s").classList.remove("active");
  document.getElementById("15/2s").classList.remove("active");
  document.getElementById("16s").classList.remove("active");
  document.getElementById("16/2s").classList.remove("active");
  document.getElementById("17s").classList.remove("active");
  document.getElementById("17/2s").classList.remove("active");
  document.getElementById("18s").classList.remove("active");
  document.getElementById("18/2s").classList.remove("active");


  document.getElementById(shape).classList.toggle("active");
}

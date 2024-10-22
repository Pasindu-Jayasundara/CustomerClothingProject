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

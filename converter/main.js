var curve_canvas = document.getElementById("curve-canvas");
curve_canvas.paddingScale = 1/6;


var mFling = new FlingAnimationCalculator(-4000, 0.8);
var mSpring = new SpringAnimationCalculator(1500, 0.5,0);
var mIn = new InterpolatorCalculator(0.5);
var mBe = new CubicBezierCalculator(1,0,0,1);
var mFactor1 = 1500,mFactor2 = 0.5,mFactor3 = 0.;

console.log(mBe.array)

DrawCurve(curve_canvas,mFling,false);


//Slider part,need reconstruct
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
var slider2 = document.getElementById("myRange-2");
var output2 = document.getElementById("demo-2");
var slider3 = document.getElementById("myRange-3");
var output3 = document.getElementById("demo-3");
output.innerHTML = slider.value;
output2.innerHTML = slider2.value;
output3.innerHTML = slider3.value;
slider.oninput = function() {
  mFactor1 = this.value;
  mSpring = new SpringAnimationCalculator(mFactor1, mFactor2,0);
  DrawCurve(curve_canvas,mSpring,true)
  output.innerHTML = this.value;
}
slider2.oninput = function() {
  mFactor2 = this.value;
  mSpring = new SpringAnimationCalculator(mFactor1, mFactor2,0);
  DrawCurve(curve_canvas,mSpring,true)
  output2.innerHTML = this.value;
}
slider3.oninput = function() {
//   mFactor3 = this.value;
//   var mBe = new CubicBezierCalculator(1,0,mFactor3,1);
//   drawCurve(mBe,false,mBe.bezier)
//   output3.innerHTML = this.value;
}

var bezier_controller_1 = document.getElementById("bezier-control-point-1");
var bezier_controller_2 = document.getElementById("bezier-control-point-2");
var bezier_input = document.getElementById("bezier-input");
var bezierController = new BezierController(curve_canvas,mBe,bezier_input,bezier_controller_1,bezier_controller_2);


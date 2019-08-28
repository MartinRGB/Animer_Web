var curve_canvas = document.getElementById("curve-canvas");
curve_canvas.paddingScale = 1/10;

//var grid = document.getElementById("grid")
var card_container = document.getElementById("card-container")


var bezier_container = document.getElementById("bezier-control-container")
var bezier_controller_1 = document.getElementById("bezier-control-point-1");
var bezier_controller_2 = document.getElementById("bezier-control-point-2");
var bezier_input = document.getElementById("bezier-input");
var bezierController = new BezierController(curve_canvas,mBe,bezier_input,bezier_controller_1,bezier_controller_2);


function resizeCanvas(canvas,width,height){
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  bezier_container.style.width = width +'px'
  bezier_container.style.height = height +'px'

  canvas.width = width*2;
  canvas.height = height*2;
  card_container.style.width = width + 'px';
  bezier_container.style.transform = 'translate3d(-8px,-'+(height+13)+'px,0px)'; 

  // grid.style.width = (width + 40) + 'px';
  // grid.style.height = (height + 40) + 'px';
  // grid.style.transform = 'translate3d(-20px,-20px,0)';
}

resizeCanvas(curve_canvas,200,200)

var mFling = new FlingAnimationCalculator(-4000, 0.8);
var mSpring = new SpringAnimationCalculator(1500, 0.5,0);
var mIn = new InterpolatorCalculator(0.5);
var mBe = new CubicBezierCalculator(1,0,0,1);
var mFactor1 = 1500,mFactor2 = 0.5,mFactor3 = 0.;


DrawCurve(curve_canvas,mBe,false);


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



window.addEventListener('resize', function(e){
  var width = document.body.clientWidth;
  var height = document.body.clientHeight;
  if(width < 240){
    resizeCanvas(curve_canvas,width-40,width-40)
    DrawCurve(curve_canvas,mBe,false);
    bezierController = new BezierController(curve_canvas,mBe,bezier_input,bezier_controller_1,bezier_controller_2);;
  }
  this.console.log(width + 'width')
  this.console.log(height + 'height')
});


var mSpringSystem = new rebound.SpringSystem();
var mSpring = mSpringSystem.createSpring(new rebound.SpringConfig.fromBouncinessAndSpeed(3,10));
mSpring.addListener({
  onSpringUpdate: function(mSpring) {
    var val = mSpring.getCurrentValue();
    val = rebound.MathUtil.mapValueInRange(val, 0, 1, 200, 400);
    resizeCanvas(curve_canvas,val,200)
    DrawCurve(curve_canvas,mBe,false);
    bezierController = new BezierController(curve_canvas,mBe,bezier_input,bezier_controller_1,bezier_controller_2);;
  }
});


function expand(){
  mSpring.setEndValue(1);
}

function collapse(){
  mSpring.setEndValue(0);
}







let bounciness = 3;
let speed = 10.;

let stiffness =  1500
let dampingRatio =  0.5

let framerStiffness =  50
let framerDamping =  2

let framerTension =  200
let framerFriction =  25

let uiviewspring_dampingratio = 0.5;
let uiviewspring_duration = 0.5;

let flingVelocity = -4000;
let flingDampingRatio = 0.8;


let spring = new OrigamiSpringConverter(bounciness, speed);
let factor = new AndroidSpringInterpolatorEvaluator(spring.stiffness, spring.damping);

let dyanmic = new AndroidSpringAnimationConverter(stiffness,dampingRatio);
let factor2 = new AndroidSpringInterpolatorEvaluator(dyanmic.stiffness, dyanmic.damping);
let dho = new FramerDHOConverter(framerStiffness,framerDamping);
let rk4 = new FramerRK4Converter(framerTension,framerFriction);
let uiviewSpring = new UIViewSpringConverter(uiviewspring_dampingratio,uiviewspring_duration);
let fling = new FlingAnimationDurationEvaluator(flingVelocity, flingDampingRatio);

let UIViewSpring = {
    dampingRatio: spring.dampingRatio,
    duration: spring.duration
}

let CASpring = {
    mass: 1,
    stiffness: spring.stiffness,
    damping: spring.damping,
    initialVelocity: 0
}

let DynamicSpring = {
    dampingRatio: spring.dampingRatio,
    stiffness: spring.stiffness
}

let SpringInterpolator = {
    factor: factor.value,
    duration: spring.duration
}

function OutputPara(isLog){
    
    if(isLog){
        console.log('\n[iOS]UIView.animate:usingSpringWithDamping: \n\tdampingRatio: ' + UIViewSpring.dampingRatio + '\n\tduration: ' + UIViewSpring.duration);
        console.log('\n[iOS]CASpringAnimation: \n\tmass = ' + CASpring.mass + '\n\tstiffness = ' + CASpring.stiffness + '\n\tdamping = ' + CASpring.damping + '\n\tinitialVelocity = ' + CASpring.initialVelocity);
        console.log('\n[Android]SpringAnimation: \n\tdampingRatio = ' + DynamicSpring.dampingRatio + '\n\tstiffness = ' + DynamicSpring.stiffness);
        console.log('\n[Android]SpringInterpolator: \n\tfactor = ' + SpringInterpolator.factor + '\n\tduration = ' + SpringInterpolator.duration);
        console.log('\n[Android]Rebound: \n\tSpringConfig.fromBouncinessAndSpeed('+ bounciness + ',' + speed +');');

        console.log('Spring Duration: ' + spring.duration)

        console.log('DyanamicAnimation -----> Bounciness: ' + Math.round(dyanmic.bounciness))
        console.log('DyanamicAnimation ----------> Speed: ' + Math.round(dyanmic.speed))
        console.log('DyanamicAnimation --> BouncyTension: ' + Math.round(dyanmic.bouncyTension))
        console.log('DyanamicAnimation -> BouncyFriction: ' + Math.round(dyanmic.bouncyFriction))
        console.log('DyanamicAnimation ------> Stiffness: ' + Math.round(dyanmic.stiffness))
        console.log('DyanamicAnimation --------> Damping: ' + Math.round(dyanmic.damping))
        console.log('DyanamicAnimation --------> Duration: ' + (dyanmic.duration))

        console.log('DHO Stiffness: ' + dho.stiffness)
        console.log('DHO DampingRatio: ' + dho.dampingRatio)
        console.log('DHO Duration: ' + dho.duration)

        console.log('RK4 Stiffness: ' + rk4.stiffness)
        console.log('RK4 DampingRatio: ' + rk4.dampingRatio)
        console.log('RK4 Duration: ' + rk4.duration)

        console.log('UIViewSpring Stiffness: ' + uiviewSpring.stiffness);
        console.log('UIViewSpring DampingRatio: ' + uiviewSpring.dampingRatio);

        console.log('UIViewSpring Bounciness: ' + uiviewSpring.bounciness);
        console.log('UIViewSpring Speed: ' + uiviewSpring.speed);

        console.log('transitionVal is: ' + fling.transition  + 'totalTime is: ' + fling.duration);
    }

}

OutputPara(true);
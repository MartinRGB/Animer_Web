const mAnimatorDataSet = {
  "platform": [
    {
      "id": 0,
      "type": "Android",
      "subclass":[
        {
          "id": 0,
          "tag":0,
          "type": "Spring",
          "calculator":"SpringAnimationCalculator",
          "animation_data":["Stiffness:",1500,0,3000,"Damping:",0.5,0.01,1,"Velocity",0,0,500]
        },
        {
          "id": 1,
          "tag":1,
          "type": "Fling",
          "calculator":"FlingAnimationCalculator",
          "animation_data":["Velocity:",0,-5000,5000,"Damping:",0.5,0.01,10]
        },
        {
          "id": 2,
          "type": "Divide"
        },
        {
          "id": 3,
          "tag":2,
          "type": "AccelerateDecelerate",
          "calculator":"InterpolatorCalculator",
          "animation_data":[null]
        },
        {
          "id": 4,
          "tag":3,
          "type": "Accelerate",
          "calculator":"InterpolatorCalculator",
          "animation_data":["Factor:",2]
        },
        {
          "id": 5,
          "tag":4,
          "type": "Decelerate",
          "calculator":"InterpolatorCalculator",
          "animation_data":["Factor:",2]
        },
        {
          "id": 6,
          "tag":5,
          "type": "Anticipate",
          "calculator":"InterpolatorCalculator",
          "animation_data":["Factor:",2]
        },
        {
          "id": 7,
          "tag":6,
          "type": "Overshoot",
          "calculator":"InterpolatorCalculator",
          "animation_data":["Factor:",2]
        },
        {
          "id": 8,
          "tag":7,
          "type": "AnticipateOvershoot",
          "calculator":"InterpolatorCalculator",
          "animation_data":["Factor:",2]
        },
        {
          "id": 9,
          "tag":8,
          "type": "Bounce",
          "calculator":"InterpolatorCalculator",
          "animation_data":[null]
        },
        {
          "id": 10,
          "tag":9,
          "type": "Cycle",
          "calculator":"InterpolatorCalculator",
          "animation_data":["Factor:",2]
        },
        {
          "id": 11,
          "tag":10,
          "type": "Linear",
          "calculator":"InterpolatorCalculator",
          "animation_data":[null]
        },
        {
          "id": 12,
          "type": "Divide"
        },
        {
          "id": 13,
          "tag":11,
          "type": "FastOutSlowIn",
          "calculator":"CubicBezierCalculator",
          "animation_data":[0.40, 0.00, 0.20, 1.00]
        },
        {
          "id": 14,
          "tag":12,
          "type": "LinearOutSlowIn",
          "calculator":"CubicBezierCalculator",
          "animation_data":[0.00, 0.00, 0.20, 1.00]
        },
        {
          "id": 15,
          "tag":13,
          "type": "FastOutLinear",
          "calculator":"CubicBezierCalculator",
          "animation_data":[0.40, 0.00, 1.00, 1.00]
        }
        ,{
          "id": 16,
          "type": "Divide"
        },
        {
          "id": 17,
          "tag":14,
          "type": "CustomMocosSpring",
          "calculator":"CustomMocosSpringCalculator",
          "animation_data":["Tension:", 100, 0, 200,"Friction:",15,0,100,"Velocity:",0,0,1000]
        },
        {
          "id": 18,
          "tag":15,
          "type": "CustomSpring",
          "calculator":"CustomSpringCalculator",
          "animation_data":["Factor:", 0, 0, 5]
        },
        {
          "id": 19,
          "tag":16,
          "type": "CustomBounce",
          "calculator":"CustomBounceCalculator",
          "animation_data":["Tension:", 0, 0, 100,"Friction:",0,0,10]
        },
        {
          "id": 20,
          "tag":17,
          "type": "CustomDamping",
          "calculator":"CustomDampingCalculator",
          "animation_data":["Tension:", 0, 0, 100,"Friction:",0,0,10]
        }
      ]
    },
    {
      "id": 1,
      "type": "iOS",
      "subclass":[
        {
          "id": 0,
          "tag":18,
          "type": "UIViewSpring",
          "calculator":"SpringAnimationCalculator",
          "converter":"UIViewSpringConverter",
          "animation_data":["Damping:", 0.5, 0, 1,"Duration:",0.5,0,1]
        },
        {
          "id": 1,
          "tag":18,
          "type": "CASpring",
          "calculator":"SpringAnimationCalculator",
          "converter":"FramerDHOConverter",
          "animation_data":["Stiffness:", 100, 0, 1000,"Damping:",10,0,100,"Mass:",1,0,10,"Velocity:",0,0,1000]
        },
        {
          "id": 2,
          "type": "Divide"
        },
        {
          "id": 3,
          "tag":20,
          "type": "Linear",
          "calculator":"CubicBezierCalculator",
          "animation_data":[0.25, 0.25, 0.75, 0.75]
        },
        {
          "id": 4,
          "tag":21,
          "type": "Default",
          "calculator":"CubicBezierCalculator",
          "animation_data":[0.25, 0.10, 0.25, 1.00]
        },
        {
          "id": 5,
          "tag":22,
          "type": "EaseIn",
          "calculator":"CubicBezierCalculator",
          "animation_data":[0.42, 0.00, 1.00, 1.00]
        },
        {
          "id": 6,
          "tag":23,
          "type": "EaseOut",
          "calculator":"CubicBezierCalculator",
          "animation_data":[0.00, 0.00, 0.58, 1.00]
        },
        {
          "id": 7,
          "tag":24,
          "type": "EaseInOut",
          "calculator":"CubicBezierCalculator",
          "animation_data":[0.42, 0.00, 0.58, 1.00]
        }
      ]
    },
    {
      "id": 2,
      "type": "Web",
      "subclass":[
        {
          "id": 0,
          "tag":25,
          "type": "Linear",
          "calculator":"CubicBezierCalculator",
          "animation_data":[0.25, 0.25, 0.75, 0.75]
        },
        {
          "id": 1,
          "tag":26,
          "type": "Ease",
          "calculator":"CubicBezierCalculator",
          "animation_data":[0.25, 0.10, 0.25, 1.00]
        },
        {
          "id": 2,
          "tag":27,
          "type": "EaseIn",
          "calculator":"CubicBezierCalculator",
          "animation_data":[0.42, 0.00, 1.00, 1.00]
        },
        {
          "id": 3,
          "tag":28,
          "type": "EaseOut",
          "calculator":"CubicBezierCalculator",
          "animation_data":[0.00, 0.00, 0.58, 1.00]
        },
        {
          "id": 3,
          "tag":29,
          "type": "EaseInOut",
          "calculator":"CubicBezierCalculator",
          "animation_data":[0.42, 0.00, 0.58, 1.00]
        },
      ]
    },
    {
      "id": 3,
      "type": "Cubic Beizer",
      "subclass":[
        {
          "id": 0,
          "tag":30,
          "type": "Cubic Bezier",
          "calculator":"CubicBezierCalculator",
          "animation_data":[0.00, 0.00, 1.00, 1.00]
        }
      ]
    },
    {
      "id": 4,
      "type": "Design Tools",
      "subclass":[
        {
          "id": 0,
          "tag":31,
          "type": "Origami POP Spring",
          "calculator": "SpringAnimationCalculator",
          "converter": "OrigamiSpringConverter",
          "animation_data":["Bounciness:", 5, 0, 100,"Speed:",10,0,100]
        },
        {
          "id": 1,
          "tag":32,
          "type": "Framer RK4 Spring",
          "calculator": "SpringAnimationCalculator",
          "converter": "FramerRK4Converter",
          "animation_data":["Tension:", 200, 0, 1000,"Friction:",25,0,100]
        },
        {
          "id": 2,
          "tag":33,
          "type": "Framer DHO Spring",
          "calculator": "SpringAnimationCalculator",
          "converter": "FramerDHOConverter",
          "animation_data":["Stiffness:", 50, 0, 1000,"Damping:",2,0,100,"Mass:",1,0,10,"Velocity:",0,0,1000]
        },
        {
          "id": 3,
          "tag":34,
          "type": "Protopie Spring",
          "calculator": "SpringAnimationCalculator",
          "converter": "FramerRK4Converter",
          "animation_data":["Tension:", 300, 0, 1000,"Friction:",15,0,100]
        }
      ]
    }
  ]
}

var mFactor1 = 1000,mFactor2 = 0.5,mFactor3 = 100.;

var mFling = new FlingAnimationCalculator(-4000, 0.8);
var mSpring = new SpringAnimationCalculator(mFactor1, mFactor2,mFactor3);
var mInerpolator = new InterpolatorCalculator(0.5);
var mBezier = new CubicBezierCalculator(1,0,0,1);
var mCustomSpring = new CustomSpringCalculator(4);
var mCustomMocos = new CustomMocosSpringCalculator(200,15,0);
var mCustomBounce = new CustomBounceCalculator(0,0);
var mCustomDamping = new CustomDampingCalculator(10,0);

currentCalculator = mSpring;

var mAnimatorListView = document.getElementById("animator-list-view")

var currentCalculator;

function createAnimatorListView(listView,dataSet){

  var animatorTitleArray = [];
  var calculatorArray = [];
  var animationDataArray = [];
  var animationIndex = 0;

  for (var i = 0; i < dataSet.platform.length; i++) {
    var platform = document.createElement('li');
    platform.className = 'animator-platform';

    var platformArrow = document.createElement('div');
    platformArrow.className = 'animator-platform-arrow';
    

    var platformTitle = document.createElement('a');
    platformTitle.className = 'animator-platform-title';
    platformTitle.href = "#"        
    platformTitle.innerHTML = dataSet.platform[i].type;


    platformTitle.addEventListener('click',function(e){
      //e.target.parentElement;
      if(e.target.nextSibling.style.display == 'none'){
        e.target.nextSibling.style.display = 'block';
        e.target.previousSibling.style.transform = 'translate3d(0px, 2px, 0px) rotate(90deg)'
      }
      else{
        e.target.nextSibling.style.display = 'none';
        e.target.previousSibling.style.transform = 'translate3d(0px, 2px, 0px) rotate(0deg)'
      }
    })


    var subUlElement = document.createElement('ul');
    subUlElement.className = "animator-type"
    subUlElement.style.display = 'none';


    for (var a = 0; a < dataSet.platform[i].subclass.length; a++) {
      if(dataSet.platform[i].subclass[a].type == 'Divide'){
        var divide = document.createElement('div');
        divide.className = 'animator-divide';
        subUlElement.appendChild(divide)

      }
      else{
        var animator = document.createElement('li');
        animator.className = 'animator';
    
        var animatorTitle = document.createElement('a');
        animatorTitle.className = 'animator-title';
        animatorTitle.href = "#"
        animatorTitle.innerHTML = dataSet.platform[i].subclass[a].type;
        animatorTitle.animIndex = animationIndex;
        animationIndex++;

        var currCalculator = dataSet.platform[i].subclass[a].calculator;
        var currAnimationData = dataSet.platform[i].subclass[a].animation_data;

        animatorTitleArray.push(animatorTitle);
        calculatorArray.push(currCalculator);
        animationDataArray.push(currAnimationData);

        animatorTitle.addEventListener('click',function(e){
  
          for (var b = 0; b < animatorTitleArray.length; b++) {
          
            if(b == e.target.animIndex){
              animatorTitleArray[b].style.color ='#029CFF'


              //TODO Switch By caculatorType
              if(animationDataArray[b][0] != null){
                if(typeof(animationDataArray[b][0]) == 'string'){
                  var dataNumber = animationDataArray[b].length/4;


                }
                else{
                  
                  // ### Case Bezier
                  var p1 = animationDataArray[b][0]
                  var p2 = animationDataArray[b][1]
                  var p3 = animationDataArray[b][2]
                  var p4 = animationDataArray[b][3]
                  var bezierString = p1+","+p2+","+p3+","+p4;
                  eval("currentCalculator = new " + calculatorArray[b] + "(" + bezierString + ")");
                  bezierController.setBezier(p1,p2,p3,p4)
                }

            }
              // console.log(animationDataArray[b])
              // console.log(animationDataArray[b].length)
              // console.log(animationDataArray[b][0])
              // console.log(typeof(animationDataArray[b][0]))


              // eval("currentCalculator = new " + calculatorArray[b] + "(0.5)");
              // DrawCurve(curve_canvas,currentCalculator,false);
              // currentCalculator = new this["InterpolatorCalculator"](0.5);
            }
            else{
              animatorTitleArray[b].style.color ='white'
            }
          }
          document.getElementById("graph-title").innerHTML = (this).innerHTML

        })
    
        animator.appendChild(animatorTitle)
        subUlElement.appendChild(animator)
      }
    }



    platform.appendChild(platformArrow)
    platform.appendChild(platformTitle)
    if(dataSet.platform[i].subclass.length != 0){
      platform.appendChild(subUlElement);
    }

    listView.appendChild(platform)

  }
}

createAnimatorListView(mAnimatorListView,mAnimatorDataSet)

function setCurve(){
  console.log('2333')
}




var curve_canvas = document.getElementById("curve-canvas");
curve_canvas.paddingScale = 1/10;

//var grid = document.getElementById("grid")
var graph_container = document.getElementById("graph-container")

// Beizer 
var bezier_container = document.getElementById("bezier-control-container")
var bezier_controller_1 = document.getElementById("bezier-control-point-1");
var bezier_controller_2 = document.getElementById("bezier-control-point-2");
var bezier_input = document.getElementById("bezier-input");
var bezierController = new BezierController(curve_canvas,currentCalculator,bezier_input,bezier_controller_1,bezier_controller_2);


var isExpanded =false;

function resizeCanvas(canvas,width,height){
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  bezier_container.style.width = width +'px'
  bezier_container.style.height = height +'px'

  canvas.width = width*2;
  canvas.height = height*2;
  graph_container.style.width = width + 'px';
  bezier_container.style.transform = 'translate3d(-8px,-'+(height+12)+'px,0px)'; 

  // grid.style.width = (width + 40) + 'px';
  // grid.style.height = (height + 40) + 'px';
  // grid.style.transform = 'translate3d(-20px,-20px,0)';
}

resizeCanvas(curve_canvas,200,200)




DrawCurve(curve_canvas,currentCalculator,true);

// ################## Slider ##################

// document.getElementById("myRange-3").oninput = function() {
//   var mGradient = this.value/(this.max - this.min)*100;
//   //console.log( this.value)
//   this.style.background = 'linear-gradient(to right, #029CFF 0%, #029CFF '+ mGradient +'%, #363636 ' + mGradient + '%, #363636 100%)'
// };

//Slider part,need reconstruct
var slider1 = document.getElementById("myRange-1");
var slider2 = document.getElementById("myRange-2");
var slider3 = document.getElementById("myRange-3");
var slider4 = document.getElementById("myRange-4");


slider1.oninput = function() {
  mFactor1 = this.value;
  currentCalculator = new SpringAnimationCalculator(mFactor1,mFactor2,mFactor3);
  DrawCurve(curve_canvas,currentCalculator,true)
}
slider2.oninput = function() {
  mFactor2 = this.value;
  currentCalculator = new SpringAnimationCalculator(mFactor1,mFactor2,mFactor3);
  DrawCurve(curve_canvas,currentCalculator,true)
}
slider3.oninput = function() {
  mFactor3 = this.value;
  currentCalculator = new SpringAnimationCalculator(mFactor1,mFactor2,Number(mFactor3));
  DrawCurve(curve_canvas,currentCalculator,true)
}



// ################## Graph Scale Test ##################


// var mSpringSystem = new rebound.SpringSystem();
// var mSpringGraphWidth = mSpringSystem.createSpringWithBouncinessAndSpeed(2,20);
// var mSpringGraphTranslateX = mSpringSystem.createSpringWithBouncinessAndSpeed(2,20);

// mSpringGraphWidth.addListener({
//   onSpringUpdate: function(mSpring) {
//     var val = mSpring.getCurrentValue();
//     //val = rebound.MathUtil.mapValueInRange(val, 0, 1, 200, 340);
//     resizeCanvas(curve_canvas,val,200)
//     DrawCurve(curve_canvas,mBe,false);
//     bezierController = new BezierController(curve_canvas,mBe,bezier_input,bezier_controller_1,bezier_controller_2);;
//   }
// });

// mSpringGraphTranslateX.addListener({
//   onSpringUpdate: function(mSpring) {
//     var val = mSpring.getCurrentValue();
//     //val = rebound.MathUtil.mapValueInRange(val, 0, 1, 200, 340);
//     graph_container.style.transform = 'translate3d('  + val +'px,0px,0px)';
//   }
// });

// mSpringGraphTranslateX.setCurrentValue(0);
// mSpringGraphWidth.setCurrentValue(200);

// function expand(){
//   mSpringGraphWidth.setEndValue(340);
//   isExpanded =true;
//   checkGraphTranslate()
// }

// function collapse(){
//   mSpringGraphWidth.setEndValue(200);
//   isExpanded = false;
//   checkGraphTranslate()
// }

// function checkGraphTranslate(){
//   var width = document.body.clientWidth;
//   var height = document.body.clientHeight;

//   if(isExpanded && width<563){
//     //graph_container.style.transform = 'translate3d('  + -(563-width)/2 +'px,0px,0px)';
//     mSpringGraphTranslateX.setEndValue(-(563-width)/2);
//   }
//   if(!isExpanded && width<563){
//     //graph_container.style.transform = 'translate3d('  + 0 +'px,0px,0px)';
//     mSpringGraphTranslateX.setEndValue(0);
//   }
// }


// window.addEventListener('resize', function(e){
//   var width = document.body.clientWidth;
//   var height = document.body.clientHeight;
//   if(width < 240){
//     resizeCanvas(curve_canvas,width-40,width-40)
//     DrawCurve(curve_canvas,mBe,false);
//     bezierController = new BezierController(curve_canvas,mBe,bezier_input,bezier_controller_1,bezier_controller_2);;
//   }

//   if(isExpanded && width<563){
//     //mSpringGraphTranslateX.setEndValue(-(563-width)/2);
//     graph_container.style.transform = 'translate3d('  + -(563-width)/2 +'px,0px,0px)';
//   }
//   else{
//     graph_container.style.transform = 'translate3d(' + 0 +'px,0px,0px)';
//   }


//   this.console.log(Number(curve_canvas.style.width.split('px')[0]));
//   this.console.log(width + 'width')
//   this.console.log(height + 'height')
// });


// ################## Converter ##################

// let bounciness = 3;
// let speed = 10.;

// let stiffness =  1500
// let dampingRatio =  0.5

// let framerStiffness =  50
// let framerDamping =  10
// let framerMass =  1
// let framerVelocity =  0

// let framerTension =  200
// let framerFriction =  25

// let uiviewspring_dampingratio = 0.5;
// let uiviewspring_duration = 0.5;

// let flingVelocity = -4000;
// let flingDampingRatio = 0.8;


// let spring = new OrigamiSpringConverter(bounciness, speed);
// let factor = new AndroidSpringInterpolatorEvaluator(spring.stiffness, spring.damping);

// let dyanmic = new AndroidSpringAnimationConverter(stiffness,dampingRatio);
// let factor2 = new AndroidSpringInterpolatorEvaluator(dyanmic.stiffness, dyanmic.damping);
// let dho = new FramerDHOConverter(framerStiffness,framerDamping,framerMass,framerVelocity);
// let rk4 = new FramerRK4Converter(framerTension,framerFriction);
// let uiviewSpring = new UIViewSpringConverter(uiviewspring_dampingratio,uiviewspring_duration);
// let fling = new FlingAnimationDurationEvaluator(flingVelocity, flingDampingRatio);

// let UIViewSpring = {
//     dampingRatio: spring.dampingRatio,
//     duration: spring.duration
// }

// let CASpring = {
//     mass: 1,
//     stiffness: spring.stiffness,
//     damping: spring.damping,
//     initialVelocity: 0
// }

// let DynamicSpring = {
//     dampingRatio: spring.dampingRatio,
//     stiffness: spring.stiffness
// }

// let SpringInterpolator = {
//     factor: factor.value,
//     duration: spring.duration
// }

// function OutputPara(isLog){
    
//     if(isLog){
//         // console.log('\n[iOS]UIView.animate:usingSpringWithDamping: \n\tdampingRatio: ' + UIViewSpring.dampingRatio + '\n\tduration: ' + UIViewSpring.duration);
//         // console.log('\n[iOS]CASpringAnimation: \n\tmass = ' + CASpring.mass + '\n\tstiffness = ' + CASpring.stiffness + '\n\tdamping = ' + CASpring.damping + '\n\tinitialVelocity = ' + CASpring.initialVelocity);
//         // console.log('\n[Android]SpringAnimation: \n\tdampingRatio = ' + DynamicSpring.dampingRatio + '\n\tstiffness = ' + DynamicSpring.stiffness);
//         // console.log('\n[Android]SpringInterpolator: \n\tfactor = ' + SpringInterpolator.factor + '\n\tduration = ' + SpringInterpolator.duration);
//         // console.log('\n[Android]Rebound: \n\tSpringConfig.fromBouncinessAndSpeed('+ bounciness + ',' + speed +');');

//         // console.log('Spring Duration: ' + spring.duration)

//         // console.log('DyanamicAnimation -----> Bounciness: ' + Math.round(dyanmic.bounciness))
//         // console.log('DyanamicAnimation ----------> Speed: ' + Math.round(dyanmic.speed))
//         // console.log('DyanamicAnimation --> BouncyTension: ' + Math.round(dyanmic.bouncyTension))
//         // console.log('DyanamicAnimation -> BouncyFriction: ' + Math.round(dyanmic.bouncyFriction))
//         // console.log('DyanamicAnimation ------> Stiffness: ' + Math.round(dyanmic.stiffness))
//         // console.log('DyanamicAnimation --------> Damping: ' + Math.round(dyanmic.damping))
//         console.log('DyanamicAnimation --------> Duration: ' + (dyanmic.duration))

//         console.log('DHO Stiffness: ' + dho.stiffness)
//         console.log('DHO DampingRatio: ' + dho.dampingRatio)
//         console.log('DHO Duration: ' + dho.duration)
//         // console.log('DHO Bounciness: ' + dho.bounciness)
//         // console.log('DHO Speed: ' + dho.speed)

//         // console.log('RK4 Stiffness: ' + rk4.stiffness)
//         // console.log('RK4 DampingRatio: ' + rk4.dampingRatio)
//         // console.log('RK4 Duration: ' + rk4.duration)

//         // console.log('UIViewSpring Stiffness: ' + uiviewSpring.stiffness);
//         // console.log('UIViewSpring DampingRatio: ' + uiviewSpring.dampingRatio);

//         // console.log('UIViewSpring Bounciness: ' + uiviewSpring.bounciness);
//         // console.log('UIViewSpring Speed: ' + uiviewSpring.speed);

//         // console.log('transitionVal is: ' + fling.transition  + 'totalTime is: ' + fling.duration);
//     }

// }

// OutputPara(true);
var mAnimatorDataSet = {
  "platform": [
    {
      "id": 0,
      "type": "Android",
      "subclass":[
        {
          "id": 0,
          "type": "Spring",
          "calculator":"SpringAnimationCalculator"
        },
        {
          "id": 1,
          "type": "Fling",
          "calculator":"FlingAnimationCalculator"
        },
        {
          "id": 2,
          "type": "Divide"
        },
        {
          "id": 3,
          "type": "AccelerateDecelerate",
          "calculator":"InterpolatorCalculator"
        },
        {
          "id": 4,
          "type": "Accelerate",
          "calculator":"InterpolatorCalculator"
        },
        {
          "id": 5,
          "type": "Decelerate",
          "calculator":"InterpolatorCalculator"
        },
        {
          "id": 6,
          "type": "Anticipate",
          "calculator":"InterpolatorCalculator"
        },
        {
          "id": 7,
          "type": "Overshoot",
          "calculator":"InterpolatorCalculator"
        },
        {
          "id": 8,
          "type": "AnticipateOvershoot",
          "calculator":"InterpolatorCalculator"
        },
        {
          "id": 9,
          "type": "Bounce",
          "calculator":"InterpolatorCalculator"
        },
        {
          "id": 10,
          "type": "Cycle",
          "calculator":"InterpolatorCalculator"
        },
        {
          "id": 11,
          "type": "Linear",
          "calculator":"InterpolatorCalculator"
        },
        {
          "id": 12,
          "type": "Divide"
        },
        {
          "id": 13,
          "type": "FastOutSlowIn",
          "calculator":"CubicBezierCalculator"
        },
        {
          "id": 14,
          "type": "LinearOutSlowIn",
          "calculator":"CubicBezierCalculator"
        },
        {
          "id": 15,
          "type": "FastOutLinear",
          "calculator":"CubicBezierCalculator"
        }
        // ,{
        //   "id": 16,
        //   "type": "Divide"
        // },
        // {
        //   "id": 17,
        //   "type": "CustomSpring",
        //   "calculator":"CustomSpringCalculator"
        // },
        // {
        //   "id": 18,
        //   "type": "CustomBounce",
        //   "calculator":"CustomBounceCalculator"
        // },
        // {
        //   "id": 19,
        //   "type": "CustomDamping",
        //   "calculator":"CustomDampingCalculator"
        // },
        // {
        //   "id": 20,
        //   "type": "CustomMocosSpring",
        //   "calculator":"CustomMocosSpringCalculator"
        // }
      ]
    },
    {
      "id": 1,
      "type": "iOS",
      "subclass":[
        {
          "id": 0,
          "type": "UIViewSpring",
          "calculator":"SpringAnimationCalculator",
          "converter":"UIViewSpringConverter"
        },
        {
          "id": 1,
          "type": "CASpring",
          "calculator":"SpringAnimationCalculator",
          "converter":"FramerDHOConverter"
        },
        {
          "id": 2,
          "type": "Divide"
        },
        {
          "id": 3,
          "type": "Linear",
          "calculator":"CubicBezierCalculator",
        },
        {
          "id": 4,
          "type": "Default",
          "calculator":"CubicBezierCalculator",
        },
        {
          "id": 5,
          "type": "EaseIn",
          "calculator":"CubicBezierCalculator",
        },
        {
          "id": 6,
          "type": "EaseOut",
          "calculator":"CubicBezierCalculator",
        },
        {
          "id": 7,
          "type": "EaseInOut",
          "calculator":"CubicBezierCalculator",
        }
      ]
    },
    {
      "id": 2,
      "type": "Web",
      "subclass":[
        {
          "id": 0,
          "type": "Ease",
          "calculator":"CubicBezierCalculator"
        },
        {
          "id": 1,
          "type": "Linear",
          "calculator":"CubicBezierCalculator"
        },
        {
          "id": 2,
          "type": "EaseIn",
          "calculator":"CubicBezierCalculator"
        },
        {
          "id": 3,
          "type": "EaseOut",
          "calculator":"CubicBezierCalculator",
        },
        {
          "id": 3,
          "type": "EaseInOut",
          "calculator":"CubicBezierCalculator",
        },
      ]
    },
    {
      "id": 3,
      "type": "Cubic Beizer",
      "subclass":[
        {
          "id": 0,
          "type": "Cubic Bezier",
          "calculator":"CubicBezierCalculator"
        }
      ]
    },
    {
      "id": 4,
      "type": "Design Tools",
      "subclass":[
        {
          "id": 0,
          "type": "Origami POP Spring",
          "calculator": "SpringAnimationCalculator",
          "converter": "OrigamiSpringConverter"
        },
        {
          "id": 1,
          "type": "Framer RK4 Spring",
          "calculator": "SpringAnimationCalculator",
          "converter": "FramerRK4Converter"
        },
        {
          "id": 2,
          "type": "Framer DHO Spring",
          "calculator": "SpringAnimationCalculator",
          "converter": "FramerDHOConverter"
        },
        {
          "id": 3,
          "type": "Protopie Spring",
          "calculator": "SpringAnimationCalculator",
          "converter": "FramerRK4Converter"
        }
      ]
    }
  ]
}

var mAnimatorListView = document.getElementById("animator-list-view")

function createAnimatorListView(listView,dataSet){

  var animatorTitleArray = [];

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
        e.target.previousSibling.style.transform = 'rotate(90deg)'
      }
      else{
        e.target.nextSibling.style.display = 'none';
        e.target.previousSibling.style.transform = 'rotate(0deg)'
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
  
        animatorTitleArray.push(animatorTitle);
        animatorTitle.addEventListener('click',function(e){
  
          console.log(e.target.innerHTML)
          for (var b = 0; b < animatorTitleArray.length; b++) {
            console.log(animatorTitleArray[b].innerHTML)
            if(animatorTitleArray[b].innerHTML == e.target.innerHTML){
              animatorTitleArray[b].style.color ='#029CFF'
            }
            else{
              animatorTitleArray[b].style.color ='white'
            }
          }
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
  console.log(animatorTitleArray.length);
}

createAnimatorListView(mAnimatorListView,mAnimatorDataSet)






var curve_canvas = document.getElementById("curve-canvas");
curve_canvas.paddingScale = 1/10;

//var grid = document.getElementById("grid")
var graph_container = document.getElementById("graph-container")


// Beizer 
var bezier_container = document.getElementById("bezier-control-container")
var bezier_controller_1 = document.getElementById("bezier-control-point-1");
var bezier_controller_2 = document.getElementById("bezier-control-point-2");
var bezier_input = document.getElementById("bezier-input");
var bezierController = new BezierController(curve_canvas,mBe,bezier_input,bezier_controller_1,bezier_controller_2);


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



var mFling = new FlingAnimationCalculator(-4000, 0.8);
var mSpring = new SpringAnimationCalculator(1500, 0.5,0);
var mIn = new InterpolatorCalculator(0.5);
var mBe = new CubicBezierCalculator(1,0,0,1);
var mFactor1 = 1500,mFactor2 = 0.5,mFactor3 = 0.;


DrawCurve(curve_canvas,mBe,false);



// document.getElementById("myinput").oninput = function() {
//   this.style.background = 'linear-gradient(to right, #029CFF 0%, #029CFF '+this.value +'%, #363636 ' + this.value + '%, #363636 100%)'
// };

//Slider part,need reconstruct
// var slider1 = document.getElementById("myRange-1");
// var output1 = document.getElementById("demo-1");
// var slider2 = document.getElementById("myRange-2");
// var output2 = document.getElementById("demo-2");
// var slider3 = document.getElementById("myRange-3");
// var output3 = document.getElementById("demo-3");
// output.innerHTML = slider.value;
// output2.innerHTML = slider2.value;
// output3.innerHTML = slider3.value;
// slider1.oninput = function() {
//   mFactor1 = this.value;
//   mSpring = new SpringAnimationCalculator(mFactor1, mFactor2,0);
//   DrawCurve(curve_canvas,mSpring,true)
//   output1.innerHTML = this.value;
// }
// slider2.oninput = function() {
//   mFactor2 = this.value;
//   mSpring = new SpringAnimationCalculator(mFactor1, mFactor2,0);
//   DrawCurve(curve_canvas,mSpring,true)
//   output2.innerHTML = this.value;
// }
// slider3.oninput = function() {
// //   mFactor3 = this.value;
// //   var mBe = new CubicBezierCalculator(1,0,mFactor3,1);
// //   drawCurve(mBe,false,mBe.bezier)
// //   output3.innerHTML = this.value;
// }



// ################## Graph Scale Test ##################


var mSpringSystem = new rebound.SpringSystem();
var mSpringGraphWidth = mSpringSystem.createSpringWithBouncinessAndSpeed(2,20);
var mSpringGraphTranslateX = mSpringSystem.createSpringWithBouncinessAndSpeed(2,20);

mSpringGraphWidth.addListener({
  onSpringUpdate: function(mSpring) {
    var val = mSpring.getCurrentValue();
    //val = rebound.MathUtil.mapValueInRange(val, 0, 1, 200, 340);
    resizeCanvas(curve_canvas,val,200)
    DrawCurve(curve_canvas,mBe,false);
    bezierController = new BezierController(curve_canvas,mBe,bezier_input,bezier_controller_1,bezier_controller_2);;
  }
});

mSpringGraphTranslateX.addListener({
  onSpringUpdate: function(mSpring) {
    var val = mSpring.getCurrentValue();
    //val = rebound.MathUtil.mapValueInRange(val, 0, 1, 200, 340);
    graph_container.style.transform = 'translate3d('  + val +'px,0px,0px)';
  }
});

mSpringGraphTranslateX.setCurrentValue(0);
mSpringGraphWidth.setCurrentValue(200);

function expand(){
  mSpringGraphWidth.setEndValue(340);
  isExpanded =true;
  checkGraphTranslate()
}

function collapse(){
  mSpringGraphWidth.setEndValue(200);
  isExpanded = false;
  checkGraphTranslate()
}

function checkGraphTranslate(){
  var width = document.body.clientWidth;
  var height = document.body.clientHeight;

  if(isExpanded && width<563){
    //graph_container.style.transform = 'translate3d('  + -(563-width)/2 +'px,0px,0px)';
    mSpringGraphTranslateX.setEndValue(-(563-width)/2);
  }
  if(!isExpanded && width<563){
    //graph_container.style.transform = 'translate3d('  + 0 +'px,0px,0px)';
    mSpringGraphTranslateX.setEndValue(0);
  }
}


window.addEventListener('resize', function(e){
  var width = document.body.clientWidth;
  var height = document.body.clientHeight;
  if(width < 240){
    resizeCanvas(curve_canvas,width-40,width-40)
    DrawCurve(curve_canvas,mBe,false);
    bezierController = new BezierController(curve_canvas,mBe,bezier_input,bezier_controller_1,bezier_controller_2);;
  }

  if(isExpanded && width<563){
    //mSpringGraphTranslateX.setEndValue(-(563-width)/2);
    graph_container.style.transform = 'translate3d('  + -(563-width)/2 +'px,0px,0px)';
  }
  else{
    graph_container.style.transform = 'translate3d(' + 0 +'px,0px,0px)';
  }


  this.console.log(Number(curve_canvas.style.width.split('px')[0]));
  this.console.log(width + 'width')
  this.console.log(height + 'height')
});



// let bounciness = 3;
// let speed = 10.;

// let stiffness =  1500
// let dampingRatio =  0.5

// let framerStiffness =  50
// let framerDamping =  2

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
// let dho = new FramerDHOConverter(framerStiffness,framerDamping);
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
//         console.log('\n[iOS]UIView.animate:usingSpringWithDamping: \n\tdampingRatio: ' + UIViewSpring.dampingRatio + '\n\tduration: ' + UIViewSpring.duration);
//         console.log('\n[iOS]CASpringAnimation: \n\tmass = ' + CASpring.mass + '\n\tstiffness = ' + CASpring.stiffness + '\n\tdamping = ' + CASpring.damping + '\n\tinitialVelocity = ' + CASpring.initialVelocity);
//         console.log('\n[Android]SpringAnimation: \n\tdampingRatio = ' + DynamicSpring.dampingRatio + '\n\tstiffness = ' + DynamicSpring.stiffness);
//         console.log('\n[Android]SpringInterpolator: \n\tfactor = ' + SpringInterpolator.factor + '\n\tduration = ' + SpringInterpolator.duration);
//         console.log('\n[Android]Rebound: \n\tSpringConfig.fromBouncinessAndSpeed('+ bounciness + ',' + speed +');');

//         console.log('Spring Duration: ' + spring.duration)

//         console.log('DyanamicAnimation -----> Bounciness: ' + Math.round(dyanmic.bounciness))
//         console.log('DyanamicAnimation ----------> Speed: ' + Math.round(dyanmic.speed))
//         console.log('DyanamicAnimation --> BouncyTension: ' + Math.round(dyanmic.bouncyTension))
//         console.log('DyanamicAnimation -> BouncyFriction: ' + Math.round(dyanmic.bouncyFriction))
//         console.log('DyanamicAnimation ------> Stiffness: ' + Math.round(dyanmic.stiffness))
//         console.log('DyanamicAnimation --------> Damping: ' + Math.round(dyanmic.damping))
//         console.log('DyanamicAnimation --------> Duration: ' + (dyanmic.duration))

//         console.log('DHO Stiffness: ' + dho.stiffness)
//         console.log('DHO DampingRatio: ' + dho.dampingRatio)
//         console.log('DHO Duration: ' + dho.duration)

//         console.log('RK4 Stiffness: ' + rk4.stiffness)
//         console.log('RK4 DampingRatio: ' + rk4.dampingRatio)
//         console.log('RK4 Duration: ' + rk4.duration)

//         console.log('UIViewSpring Stiffness: ' + uiviewSpring.stiffness);
//         console.log('UIViewSpring DampingRatio: ' + uiviewSpring.dampingRatio);

//         console.log('UIViewSpring Bounciness: ' + uiviewSpring.bounciness);
//         console.log('UIViewSpring Speed: ' + uiviewSpring.speed);

//         console.log('transitionVal is: ' + fling.transition  + 'totalTime is: ' + fling.duration);
//     }

// }

// OutputPara(true);
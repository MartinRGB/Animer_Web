


var c = document.getElementById("curve-canvas");
var ctx = c.getContext("2d");
// var cWidth = c.width;
// var cHeight = c.height;
// var canvasDensity = cWidth/c.offsetWidth;
c.paddingScale = 1/6;



var mFling = new FlingAnimationCalculator(-4000, 0.8);
var mSpring = new SpringAnimationCalculator(1500, 0.5,0);
var mIn = new InterpolatorCalculator(0.5);
var mBe = new CubicBezierCalculator(1,0,0,1);
var mFactor1 = 1500,mFactor2 = 0.5,mFactor3 = 0.;

console.log(mBe.array)

DrawCurve(c,mBe,false);


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
  DrawCurve(c,mSpring,true)
  output.innerHTML = this.value;
}
slider2.oninput = function() {
  mFactor2 = this.value;
  mSpring = new SpringAnimationCalculator(mFactor1, mFactor2,0);
  DrawCurve(c,mSpring,true)
  output2.innerHTML = this.value;
}
slider3.oninput = function() {
//   mFactor3 = this.value;
//   var mBe = new CubicBezierCalculator(1,0,mFactor3,1);
//   drawCurve(mBe,false,mBe.bezier)
//   output3.innerHTML = this.value;
}


// TODO - ADD Bezier Constraint of Dragging and Inputting

var bezier_controller_1 = document.getElementById("bezier-control-point-1");
var bezier_controller_2 = document.getElementById("bezier-control-point-2");
var bezier_input = document.getElementById("bezier-input");


//var isDragBezier = false;

// bezier_controller_2.style.left = c.offsetWidth * c.paddingScale + 'px'
// bezier_controller_2.style.top = c.offsetHeight * c.paddingScale + 'px'

// bezier_controller_1.style.left = c.offsetWidth * (1 - c.paddingScale)  + 'px'
// bezier_controller_1.style.top = c.offsetHeight * (1 - c.paddingScale) + 'px'

// bezier_input.value = bezierPoint1.toFixed(2) + ',' + bezierPoint2.toFixed(2) + ',' + bezierPoint3.toFixed(2) + ',' + bezierPoint4.toFixed(2)


var bezierController = new BezierController(c,mBe,bezier_input,bezier_controller_1,bezier_controller_2);

//setupBezierDragInteraction(bezier_controller_1);
//setupBezierDragInteraction(bezier_controller_2);
//setupBezierInputInteration(bezier_input);

// function drawBezierCurve(x1,y1,x2,y2){
//     mBe = new CubicBezierCalculator(x1,y1,x2,y2);
//     bezier_input.value = x1.toFixed(2) + ',' + y1.toFixed(2) + ',' + x2.toFixed(2) + ',' + y2.toFixed(2)
//     // 0,1
//     if(isDragBezier){
//         console.log('123')
//     }
//     // else{
//     //     bezier_controller_2.style.left = c.offsetWidth * c.paddingScale + (c.offsetWidth*(1 - 2*c.paddingScale))*bezierPoint3  + 'px'
//     //     bezier_controller_2.style.top = c.offsetHeight * c.paddingScale + (c.offsetHeight*(1 - 2*c.paddingScale))*(1-bezierPoint4) + 'px'
//     //     //1,0
//     //     //bezier_controller_1.style.left = c.offsetWidth * (1 - c.paddingScale)  + 'px'
//     //     bezier_controller_1.style.left = c.offsetWidth * c.paddingScale + (c.offsetWidth*(1 - 2*c.paddingScale))*bezierPoint1  + 'px'
//     //     bezier_controller_1.style.top = c.offsetHeight * c.paddingScale + (c.offsetHeight*(1 - 2*c.paddingScale))*(1-bezierPoint2) + 'px'
//     // }

//     DrawCurve(c,mBe,false)
// }

// function setupBezierInputInteration(element){
//     element.onchange = function(e){
//         var mString = e.target.value;

//         var str1 = mString.split(',')[0];
//         var str2 = mString.split(',')[1].split(',')[0];
//         var str3 = mString.split(',')[2].split(',')[0];
//         var str4 = mString.split(',')[3];

//         bezierPoint1 = Math.max(0,Math.min(1,Number(str1)));
//         bezierPoint2 = Number(str2);
//         bezierPoint3 = Math.max(0,Math.min(1,Number(str3)));
//         bezierPoint4 = Number(str4);

//         drawBezierCurve(bezierPoint1,bezierPoint2,bezierPoint3,bezierPoint4);
//     }
// }

// function setupBezierDragInteraction(elmnt) {
//   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

//   elmnt.onmousedown = dragMouseDown;

//   function dragMouseDown(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//     isDragBezier = false;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     e.preventDefault();
//     isDragBezier = true;
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     var mDistanceX = elmnt.offsetLeft - pos1;
//     if(mDistanceX >= c.offsetWidth * c.paddingScale && mDistanceX<= c.offsetWidth*(1 - c.paddingScale)){
//         elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//         elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//         getControllerBezier(elmnt,(elmnt.offsetLeft),(elmnt.offsetTop))
//         drawBezierCurve(bezierPoint1,bezierPoint2,bezierPoint3,bezierPoint4);
//     }



//   }

//   function closeDragElement() {
//     // stop moving when mouse button is released:
//     isDragBezier = false;
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }

//   function getControllerBezier(element,mX,mY) {
//     var x = ((mX- cWidth*c.paddingScale/canvasDensity) /((cWidth - cWidth*c.paddingScale*2)/canvasDensity));
//     var y = (1. - (mY- cHeight*c.paddingScale/canvasDensity)/((cHeight - cHeight*c.paddingScale*2)/canvasDensity));
//     if(element.id == 'bezier-control-point-1'){
//         bezierPoint1 = x;
//         bezierPoint2 = y;
//         //console.log('x1: ' + x + 'y1: ' + y )
//     }
//     else if (element.id == 'bezier-control-point-2'){
//         bezierPoint3 = x;
//         bezierPoint4 = y;
//         //console.log('x2: ' + x + 'y2: ' + y )
//     }

//   }
// }








var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var paddingScale = 1/5;
var cWidth = c.width;
var cHeight = c.height;
var controlPointRadius = 10;
var canvasScaleFactor = cWidth/c.offsetWidth;

class FlingAnimationCalculator {
    constructor(velocity, dampingRatio) {
        this.friction = dampingRatio*-4.2;
        this.velocity = velocity;
        this.array = this.flingCalculator(this.velocity,this.friction)[0];
        this.duration = this.flingCalculator(this.velocity,this.friction)[1];
        this.transition = this.flingCalculator(this.velocity,this.friction)[2];
    }

    flingCalculator(velocity,friction){
        var transitionArray = [[0,0]];
        var sampleScale = 1.5;
        var maxItertation = 0;
        var maxValue = 0;

        for (var i = 1/(60*sampleScale);i < 20.;i += 1/(60*sampleScale)){
           
            var currentVelocity = velocity * Math.exp(i * friction) ;
            var currentTransition = (velocity/ friction) * (Math.exp(friction * i ) - 1);
            var speedThereshold = 2.3;
            if(Math.abs(currentVelocity) <= speedThereshold){

                maxItertation = i;
                maxValue = Math.abs(currentTransition);
                transitionArray = transitionArray.map(normalizeArray);
                return [transitionArray,maxItertation,currentTransition];

            }
            else{
                transitionArray.push([i,Math.abs(currentTransition)]);
            }
        }

        function normalizeArray(item) {
            item[0] = item[0]/maxItertation;
            item[1] = item[1]/maxValue;
            return item;
        }

    }

}



class SpringAnimationCalculator{
    constructor(stiffness,dampingratio,velocity) {

        this.stiffness = stiffness;
        this.dampingratio = dampingratio;
        this.velocity = velocity;

        // Output
        this.damping = this.computeDamping(stiffness,dampingratio);
        this.tension = this.stiffness;
        this.friction = this.damping;
        this.duration = this.computeDuration(this.tension, this.friction);
        this.array = this.springCalculator(this.stiffness,this.dampingratio,this.velocity,this.duration);
    }

    computeDamping(stiffness,dampingRatio){
        let mass = 1.0;
        return dampingRatio * (2 * Math.sqrt(mass * stiffness));
    }

    computeDampingRatio(tension, friction) {
        let mass = 1.0;
        return friction / (2 * Math.sqrt(mass * tension));
    }

    computeDuration(tension, friction) {
        let epsilon = 0.001
        let velocity = 0.0
        let mass = 1.0
        let dampingRatio = this.computeDampingRatio(tension, friction)
        let undampedFrequency = Math.sqrt(tension / mass)
        if (dampingRatio < 1) {
            let a = Math.sqrt(1 - Math.pow(dampingRatio, 2))
            let b = velocity / (a * undampedFrequency)
            let c = dampingRatio / a
            let d = -((b - c) / epsilon)
            if (d <= 0) {
                return 0.0
            }
            return Math.log(d) / (dampingRatio * undampedFrequency)
        } else {
            return 0.0
        }
    }

    springCalculator(stiffness,dampingratio,velocity,duration){
        var transitionArray = [[0,0]];
        var starVal = 0;
        var endVal = 1;
        var mNaturalFreq = Math.sqrt(stiffness);
        var mDampedFreq = mNaturalFreq*Math.sqrt(1.0 - dampingratio* dampingratio);
        var lastVelocity =  velocity;
        var currentVelocity = 0;
        var sampleScale = 1.5;

        for (var i = 1/(60*sampleScale) ;i < duration+10/(60*sampleScale);i += 1/(60*sampleScale)){
            var deltaT = i;
            var lastDisplacement  = i/(5*60) -  endVal;
            var cosCoeff = lastDisplacement;
            var sinCoeff = 1.0 / mDampedFreq * (dampingratio * mNaturalFreq * lastDisplacement + lastVelocity);
            var displacement = Math.pow(Math.E,-dampingratio * mNaturalFreq * deltaT) * (lastDisplacement * Math.cos(mDampedFreq * deltaT) + sinCoeff * Math.sin(mDampedFreq * deltaT));

            var mValue = displacement + endVal;

            //currentVelocity = displacement * (-mNaturalFreq) * dampingratio + Math.pow(Math.E, -dampingratio * mNaturalFreq * deltaT) * (-mDampedFreq * cosCoeff * Math.sin(mDampedFreq * deltaT)+ mDampedFreq * sinCoeff * Math.cos(mDampedFreq * deltaT));

            transitionArray.push([i/(duration+10/(60*sampleScale)),Math.abs(mValue)]);
        }
        return transitionArray;
    }
}


class InterpolatorCalculator {
    constructor(factor) {
        this.factor = factor;
        this.array = this.interpolatorCalculator(this.factor);
    }

    interpolatorCalculator(factor) {  
        var transitionArray = [[0,0]];
        var sampleScale = 1.5;

        for (var i = 1/(60*sampleScale);i < 1;i += 1/(60*sampleScale)){

            if(i >= (59*sampleScale)/(60*sampleScale)){
                transitionArray.push([i,this.AccelerateDecelerateInterpolator(i)]);
                return transitionArray;
            }
            else{
                transitionArray.push([i,this.AccelerateDecelerateInterpolator(i)]);
            }
        }
    }

    AccelerateDecelerateInterpolator(t){ 
        return Math.cos((t + 1)*Math.PI)/2 + 0.5; 
    } 

}

class CubicBezierCalculator {
    constructor(p1x,p1y,p2x,p2y) {
    
        this.epsilon = 1e-6;
        this.UnitBezier(p1x,p1y,p2x,p2y);
        this.array = this.bezierCalculator(p1x,p1y,p2x,p2y);
        this.bezier = [p1x,p1y,p2x,p2y];
        
    }

    UnitBezier(p1x, p1y, p2x, p2y) {
        // pre-calculate the polynomial coefficients
        // First and last control points are implied to be (0,0) and (1.0, 1.0)
        this.cx = 3.0 * p1x;
        this.bx = 3.0 * (p2x - p1x) - this.cx;
        this.ax = 1.0 - this.cx -this.bx;
    
        this.cy = 3.0 * p1y;
        this.by = 3.0 * (p2y - p1y) - this.cy;
        this.ay = 1.0 - this.cy - this.by;
    }

    sampleCurveX(t) {
        return ((this.ax * t + this.bx) * t + this.cx) * t;
    }
    sampleCurveY(t) {
        return ((this.ay * t + this.by) * t + this.cy) * t;
    }

    sampleCurveDerivativeX(t) {
        return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
    }

    solveCurveX(x, epsilon) {
        var t0; 
        var t1;
        var t2;
        var x2;
        var d2;
        var i;
    
        // First try a few iterations of Newton's method -- normally very fast.
        for (t2 = x, i = 0; i < 8; i++) {
            x2 = this.sampleCurveX(t2) - x;
            if (Math.abs (x2) < epsilon)
                return t2;
            d2 = this.sampleCurveDerivativeX(t2);
            if (Math.abs(d2) < epsilon)
                break;
            t2 = t2 - x2 / d2;
        }
    
        // No solution found - use bi-section
        t0 = 0.0;
        t1 = 1.0;
        t2 = x;
        if (t2 < t0) return t0;
        if (t2 > t1) return t1;
    
        while (t0 < t1) {
            x2 = this.sampleCurveX(t2);
            if (Math.abs(x2 - x) < epsilon)
                return t2;
            if (x > x2) t0 = t2;
            else t1 = t2;
    
            t2 = (t1 - t0) * .5 + t0;
        }
    
        // Give up
        return t2;
    }

    solve(iterationTime, epsilon) {
        return this.sampleCurveY( this.solveCurveX(iterationTime, epsilon) );
    }

    bezierCalculator() {  
        var transitionArray = [[0,0]];
        var sampleScale = 1.;

        for (var i = 1/(60*sampleScale);i < 1;i += 1/(60*sampleScale)){

            if(i >= (59*sampleScale)/(60*sampleScale)){
                transitionArray.push([i,this.solve(i,this.epsilon)]);
                return transitionArray;
            }
            else{
                transitionArray.push([i,this.solve(i,this.epsilon)]);
            }
        }

    }

}


var point1x = 0.,point1y = 0.,point2x = 0.,point2y = 0.;
function drawCurve(curve,halfSize,bezier){
    ctx.clearRect(0, 0, cWidth, cHeight);

    var paddingLeft = cWidth*paddingScale;
    var paddingRight = cWidth*paddingScale;
    var paddingTop = halfSize?(cHeight/2):cHeight*paddingScale;
    var paddingBottom = cHeight*paddingScale;
    var realWidth = cWidth - paddingLeft - paddingRight;
    var realHeight = cHeight - paddingBottom - paddingTop;

    var frameCount = curve.array.length;
    var transitionArray = curve.array;

    //Draw the Coordinate
    ctx.beginPath();
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 0.5;
    ctx.moveTo(0, cHeight-paddingBottom);
    ctx.lineTo(cWidth, cHeight-paddingBottom);

    ctx.moveTo(0, cHeight/2);
    ctx.lineTo(cWidth, cHeight/2);

    ctx.moveTo(0, cHeight*paddingScale);
    ctx.lineTo(cWidth, cHeight*paddingScale);

    ctx.moveTo(paddingLeft, 0);
    ctx.lineTo(paddingLeft, cHeight);

    ctx.moveTo(cWidth - paddingRight, 0);
    ctx.lineTo(cWidth - paddingRight, cHeight);

    ctx.stroke();

    //Draw the BezierLine
    if(bezier !=null){
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 1;
        ctx.moveTo(paddingLeft, cHeight - paddingBottom);
        ctx.lineTo(paddingLeft + realWidth*bezier[0], (cHeight - paddingBottom) - realHeight*bezier[1]);

        ctx.moveTo(cWidth - paddingRight, paddingTop);
        ctx.lineTo(paddingLeft + realWidth*bezier[2], (cHeight - paddingBottom)- realHeight*bezier[3]);
        ctx.stroke();

        // ctx.beginPath();
        // ctx.arc(paddingLeft + realWidth*bezier[0], (cHeight - paddingBottom) - realHeight*bezier[1], controlPointRadius, 0, 2 * Math.PI);
        // ctx.arc(paddingLeft + realWidth*bezier[2], (cHeight - paddingBottom)- realHeight*bezier[3], controlPointRadius, 0, 2 * Math.PI);
        // ctx.fillStyle = 'blue';
        // ctx.fill();

        point1x = paddingLeft + realWidth*bezier[0];
        point1y = (cHeight - paddingBottom) - realHeight*bezier[1];
        point2x = paddingLeft + realWidth*bezier[2];
        point2y = (cHeight - paddingBottom) - realHeight*bezier[3];

        
        console.log("1x: " + point1x/canvasScaleFactor + " 1y: " + point1y/canvasScaleFactor)
        console.log("2x: " + point2x/canvasScaleFactor + " 2y: " + point2y/canvasScaleFactor)

    }


    //Draw the Curve
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.moveTo(paddingLeft, cHeight-paddingBottom);

    for (i = 1; i < frameCount - 1; i++)
    {
       var cX = i * (cWidth - paddingLeft - paddingRight) / frameCount + paddingLeft;
       var nX = (i+1) * (cWidth - paddingLeft - paddingRight) / frameCount + paddingLeft;
       var cY = (cHeight - paddingBottom - paddingTop) - transitionArray[i][1]*(cHeight - paddingBottom - paddingTop)/transitionArray[frameCount-1][1] + paddingTop;
       var nY = (cHeight - paddingBottom - paddingTop) - transitionArray[i+1][1]*(cHeight - paddingBottom - paddingTop)/transitionArray[frameCount-1][1] + paddingTop;
       var cXCenter = (cX + nX)/2;
       var cYCenter = (cY + nY)/2;
       ctx.quadraticCurveTo(cX, cY, cXCenter, cYCenter);
    }

    var currentX = (frameCount-2) * (cWidth - paddingLeft - paddingRight) / frameCount + paddingLeft;
    var endX = (frameCount-1) * (cWidth - paddingLeft - paddingRight) / frameCount + paddingLeft
    var currentY = (cHeight - paddingBottom - paddingTop) - transitionArray[frameCount-2][1]*(cHeight - paddingBottom - paddingTop)/transitionArray[frameCount-2][1] + paddingTop;
    var endY = (cHeight - paddingBottom - paddingTop) - transitionArray[frameCount-1][1]*(cHeight - paddingBottom - paddingTop)/transitionArray[frameCount-1][1] + paddingTop;

    //ctx.quadraticCurveTo(currentX,currentY,endX,endY);
    ctx.quadraticCurveTo(endX,endY,(cWidth - paddingRight),(paddingTop));
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.stroke();
}

var mFling = new FlingAnimationCalculator(-4000, 0.8);
var mSpring = new SpringAnimationCalculator(1500, 0.5,0);
var mIn = new InterpolatorCalculator(0.5);
var mBe = new CubicBezierCalculator(1,0,0,1);
var mFactor1 = 1500,mFactor2 = 0.5,mFactor3 = 0.5;
var point1Down = false,point2Down = false;
var point1StartX,point1StartY,point2StartX,point2StartY;

drawCurve(mBe,false,mBe.bezier);

function getCursorMoveState(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
    var x1 = ((x- cWidth*paddingScale/canvasScaleFactor) /((cWidth - cWidth*paddingScale*2)/canvasScaleFactor));
    var y1 = (1. - (y- cHeight*paddingScale/canvasScaleFactor)/((cHeight - cHeight*paddingScale*2)/canvasScaleFactor));
    mBe = new CubicBezierCalculator(x1,y1,mFactor3,1);
    drawCurve(mBe,false,mBe.bezier)
}

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
  drawCurve(mSpring,true)
  output.innerHTML = this.value;
}
slider2.oninput = function() {
  mFactor2 = this.value;
  mSpring = new SpringAnimationCalculator(mFactor1, mFactor2,0);
  drawCurve(mSpring,true)
  output2.innerHTML = this.value;
}
slider3.oninput = function() {
  mFactor3 = this.value;
  var mBe = new CubicBezierCalculator(1,0,mFactor3,1);
  drawCurve(mBe,false,mBe.bezier)
  output3.innerHTML = this.value;
}


dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV: 
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    getCursorMoveState(c,e)
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}








var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var frameCount = 0;
var totalTransition = 20;
//var transitionArray = [];
var cWidth = c.width;
var cHeight = c.height;
var polyline = document.getElementById("graph_bezierline");
var points = smothlines = [[0, 100]];

class FlingAnimationCalculator {
    constructor(velocity, dampingRatio) {

        this.friction = dampingRatio*-4.2;
        this.velocity = velocity;
        this.array = this.flingCalculator(this.velocity,this.friction);
    }

    flingCalculator(velocity,friction){
        var transitionArray = [[0,0]];
        var sampleScale = 1.5;

        for (var i = 1/(60*sampleScale);i < 5.;i += 1/(60*sampleScale)){
           
            var currentVelocity = velocity * Math.exp(i * friction) ;
            var currentTransition = (velocity/ friction) * (Math.exp(friction * i ) - 1);
            var speedThereshold = 2.3;
            if(Math.abs(currentVelocity) <= speedThereshold){
                transitionArray.push([i*(60*sampleScale),Math.abs(currentTransition)]);
                return transitionArray;
                //return [currentTransition,i]; //Math.round(i*60)
            }
            else{
                transitionArray.push([i*(60*sampleScale),Math.abs(currentTransition)]);
                //console.log('transitionVal is: ' + currentTransition + 'currentVelocity is: ' + currentVelocity + 'currentFrame is: ' + Math.round(i*60));
            }
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
        var prevValue = 0;
        var currentVelocity = 0;
        var sampleScale = 1.5;

        for (var i = 1/(60*sampleScale) ;i <= duration+10/(60*sampleScale);i += 1/(60*sampleScale)){
            var deltaT = i;
            var lastDisplacement  = i/(5*60) -  endVal;
            var cosCoeff = lastDisplacement;
            var sinCoeff = 1.0 / mDampedFreq * (dampingratio * mNaturalFreq * lastDisplacement + lastVelocity);
            var displacement = Math.pow(Math.E,-dampingratio * mNaturalFreq * deltaT) * (lastDisplacement * Math.cos(mDampedFreq * deltaT) + sinCoeff * Math.sin(mDampedFreq * deltaT));

            var mValue = displacement + endVal;

            currentVelocity = displacement * (-mNaturalFreq) * dampingratio
            + Math.pow(Math.E, -dampingratio * mNaturalFreq * deltaT)
            * (-mDampedFreq * cosCoeff * Math.sin(mDampedFreq * deltaT)
            + mDampedFreq * sinCoeff * Math.cos(mDampedFreq * deltaT));

            transitionArray.push([i*(60*sampleScale),Math.abs(mValue)]);
        }
        return transitionArray;
    }
}


class InterpolatorCalculator {
    constructor(velocity, dampingRatio) {

        this.friction = dampingRatio*-4.2;
        this.velocity = velocity;
        this.array = this.flingCalculator(this.velocity,this.friction);
    }

    flingCalculator(velocity,friction){
        var transitionArray = [[0,0]];
        var sampleScale = 1.5;

        for (var i = 1/(60*sampleScale);i < 5.;i += 1/(60*sampleScale)){
           
            var currentVelocity = velocity * Math.exp(i * friction) ;
            var currentTransition = (velocity/ friction) * (Math.exp(friction * i ) - 1);
            var speedThereshold = 2.3;
            if(Math.abs(currentVelocity) <= speedThereshold){
                transitionArray.push([i*(60*sampleScale),Math.abs(currentTransition)]);
                return transitionArray;
                //return [currentTransition,i]; //Math.round(i*60)
            }
            else{
                transitionArray.push([i*(60*sampleScale),Math.abs(currentTransition)]);
                //console.log('transitionVal is: ' + currentTransition + 'currentVelocity is: ' + currentVelocity + 'currentFrame is: ' + Math.round(i*60));
            }
        }
    }
}

function AccelerateDecelerateInterpolator(t,c){
	return Math.cos((t + 1)*Math.PI)/2 + 0.5;
}




function drawCurve(curve){
    ctx.clearRect(0, 0, cWidth, cHeight);
    var paddingLeft = cWidth/20;
    var paddingRight = cWidth/20;
    var paddingTop = cHeight/2 - cHeight/20;
    var paddingBottom = cHeight/20;
    var frameCount = curve.array.length;
    var transitionArray = curve.array;

    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.moveTo(paddingLeft, cHeight-paddingBottom);

    for (i = 1; i < frameCount - 2; i ++)
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
    var currentY = (cHeight - paddingBottom - paddingTop) - transitionArray[frameCount-2][1]*(cHeight - paddingBottom - paddingTop)/transitionArray[frameCount-1][1] + paddingTop;
    var endY = (cHeight - paddingBottom - paddingTop) - transitionArray[frameCount-1][1]*(cHeight - paddingBottom - paddingTop)/transitionArray[frameCount-1][1] + paddingTop;


    ctx.quadraticCurveTo(currentX,currentY,endX,endY);
    ctx.lineWidth = 8;
    ctx.stroke();
}

function drawPoly(curve){
    ctx.clearRect(0, 0, cWidth, cHeight);
    var width = 400;
    var height = 400;
    var paddingLeft = 20/width * 100;
    var paddingRight = 20 /width * 100;
    var paddingTop = 180/height * 100;
    var paddingBottom = 20/height * 100;
    var frameCount = curve.array.length;
    var array = curve.array;

    for (i = 0; i < frameCount; i ++)
    {
        points.push([i/frameCount*100,100 - (array[i][1]/array[frameCount-1][1])*50])
        smothlines = smooth(smooth(smooth(smooth(points))));
        polyline.setAttribute('points',smothlines);

    }

}

var fling = new FlingAnimationCalculator(-4000, 0.8);
var mSpring = new SpringAnimationCalculator(1500, 0.5,0);

drawCurve(mSpring)
//drawPoly(mSpring)

polyline.setAttribute('points',smooth(smooth(smooth(smooth(points)))));

var mFactor1 = 1500,mFactor2 = 0.5;
// drawCurve(mSpring)

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
slider.oninput = function() {
  mFactor1 = this.value;

  points = smothlines =[[0, 100]];
  polyline.setAttribute('points',points);

//   mSpring = new SpringAnimationCalculator(mFactor1, mFactor2,0);
//   drawCurve(mSpring)
  //drawPoly(mSpring)

  fling = new FlingAnimationVisualizer(mFactor1, mFactor2);
  drawCurve(fling)
//   drawPoly(fling)

  output.innerHTML = this.value;

}

var slider2 = document.getElementById("myRange-2");
var output2 = document.getElementById("demo-2");
output2.innerHTML = slider2.value;
slider2.oninput = function() {
  mFactor2 = this.value;

  points = smothlines = [[0, 100]];
  polyline.setAttribute('points',points);

//   mSpring = new SpringAnimationCalculator(mFactor1, mFactor2,0);
//   drawCurve(mSpring)
  //drawPoly(mSpring)

  fling = new FlingAnimationVisualizer(mFactor1, mFactor2);
  drawCurve(fling)
//   drawPoly(fling)

  output2.innerHTML = this.value;

}







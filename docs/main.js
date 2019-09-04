

var currentCalculator;
var currentCalcType;
var currentConverter;
var currentConverterType;
var currentInterpolatorType;

// ###### Graph Part ######
var graph_container = document.getElementById("graph-container")

// ## Canvas ##
var curve_canvas = document.getElementById("curve-canvas");
curve_canvas.paddingScale = 1/10;
var currentDrawHalf = false;

// ###### Console Pannel ######
var consolePannel = document.getElementById("console");

// ## Beizer ##
var bezier_container = document.getElementById("bezier-control-container")
var bezier_controller_1 = document.getElementById("bezier-control-point-1");
var bezier_controller_2 = document.getElementById("bezier-control-point-2");
var bezier_input = document.getElementById("bezier-input");
var bezierController = new BezierController(curve_canvas,currentCalculator,bezier_input,bezier_controller_1,bezier_controller_2,consolePannel);

// ## Time Estimated Parameter ##

var time_para = document.getElementById("time-para");

// ###### Slider Part ######
var slider_container = document.getElementById("slider-control-container")
var slider1 = document.getElementById("myRange-1");
var slider2 = document.getElementById("myRange-2");
var slider3 = document.getElementById("myRange-3");
var slider4 = document.getElementById("myRange-4");
var input1 = document.getElementById("slider-input-1");
var input2 = document.getElementById("slider-input-2");
var input3 = document.getElementById("slider-input-3");
var input4 = document.getElementById("slider-input-4");
var sliderArray = [slider1,slider2,slider3,slider4];
var inputArray = [input1,input2,input3,input4];

setupSliderAndInputController(curve_canvas,sliderArray,inputArray,currentCalculator,currentCalcType,currentInterpolatorType,currentConverter,currentConverterType,consolePannel)

// ###### Apply Button ######
var apply_button = document.getElementById("apply")



// ###### ###### ######

resizeCanvas(curve_canvas,200,200,graph_container,bezier_container,time_para);
DrawCurve(curve_canvas,null,currentDrawHalf);


window.addEventListener('resize', function(e){
  windowResizeCanvas(curve_canvas,graph_container)
});


// ###### Left Listview ######
var mAnimatorListView = document.getElementById("animator-list-view")
createAnimatorListView(curve_canvas,mAnimatorListView,currentCalculator,bezierController,bezier_container,bezier_input,slider_container,apply_button,time_para,graph_container,consolePannel)

// ################## Apply Button ##################

function setCurve(){


  var width = document.body.clientWidth;
  var flexContainerSize = (width -148)/3;
  var left = -(flexContainerSize/2 -30);
  var right =  -left - 20;

  var beforeAnimator = new DataDrivenPropertyAnimator(new CubicBezierCalculator(0.40,0.00,0.20,1.00));
  beforeAnimator.setMultipleAttribute([document.getElementById("motion-rotation"),document.getElementById("motion-transition"),document.getElementById("motion-scale")],['rotate','translationX','scale'],[`rotate(`,`translate3d(`,`scale(`],[`deg)`,`px,0px,0px)`,`)`],[0,0,1],[0,left,2.5],400)
  beforeAnimator.setProgress(0);
  beforeAnimator.start();

  beforeAnimator.setCallback(
    function(){

      console.log(mCalculator)
      var animator = new DataDrivenPropertyAnimator(mCalculator);
      animator.setMultipleAttribute([document.getElementById("motion-rotation"),document.getElementById("motion-transition"),document.getElementById("motion-scale")],['rotate','translationX','scale'],[`rotate(`,`translate3d(`,`scale(`],[`deg)`,`px,0px,0px)`,`)`],[0,left,2.5],[360,right,0.8],(mCalculator.duration == null)?1000:mCalculator.duration*1000)
      animator.setProgress(0);
      animator.delayStart(300);  

      animator.setCallback(function(){

        var afterAnimator = new DataDrivenPropertyAnimator(new CubicBezierCalculator(0.40,0.00,0.20,1.00));
        afterAnimator.setMultipleAttribute([document.getElementById("motion-rotation"),document.getElementById("motion-transition"),document.getElementById("motion-scale")],['rotate','translationX','scale'],[`rotate(`,`translate3d(`,`scale(`],[`deg)`,`px,0px,0px)`,`)`],[360,right,0.8],[0,0,1],400)
        afterAnimator.setProgress(0);
        afterAnimator.delayStart(300);

      })
    }
  )




}
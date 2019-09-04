
class BezierController{
    constructor(canvas,calculator,input,c1,c2,consoleContgainer) {
        this.x1 = 0.50;
        this.y1 = 0.00;
        this.x2 = 0.50;
        this.y2 = 1.00;
        this.c1 = c1;
        this.c2 = c2;
        this.input = input
        this.canvas = canvas;
        this.calculator = calculator;
        this.initBezier()
        this.isDragBezier = false;
        this.setupBezierInputInteration(input)
        this.setupBezierDragInteraction(c1,canvas,c1.id,c2.id)
        this.setupBezierDragInteraction(c2,canvas,c1.id,c2.id)
        this.editable = true;
    }

    initBezier(){
        this.c2.style.left = this.canvas.offsetWidth * this.canvas.paddingScale + 'px'
        this.c2.style.top = this.canvas.offsetHeight * this.canvas.paddingScale + 'px'
        this.c1.style.left = this.canvas.offsetWidth * (1 - this.canvas.paddingScale)  + 'px'
        this.c1.style.top = this.canvas.offsetHeight * (1 - this.canvas.paddingScale) + 'px'
        this.input.value = this.x1.toFixed(2) + ',' + this.y1.toFixed(2) + ',' + this.x2.toFixed(2) + ',' + this.y2.toFixed(2)
    }

    setBezier(x1,y1,x2,y2,duration){
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.drawBezierCurve(this.x1,this.y1,this.x2,this.y2,duration);

    }

    setBezierOnly(x1,y1,x2,y2){
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;

    }

    setBezierWithCalculator(calculator){
        this.drawBezierCurveWithCalculator(calculator.bezier[0],calculator.bezier[1],calculator.bezier[2],calculator.bezier[3],calculator);
    }

    setupBezierInputInteration(element){
        var _this = this;
        element.onchange = function(e){
            var mString = e.target.value;
    
            var str1 = mString.split(',')[0];
            var str2 = mString.split(',')[1].split(',')[0];
            var str3 = mString.split(',')[2].split(',')[0];
            var str4 = mString.split(',')[3];
    
            _this.x1 = Math.max(0,Math.min(1,Number(str1)));
            _this.y1 = Number(str2);
            _this.x2 = Math.max(0,Math.min(1,Number(str3)));
            _this.y2 = Number(str4);
    
            _this.drawBezierCurve(_this.x1,_this.y1,_this.x2,_this.y2);
        }
    }

    setupBezierDragInteraction(elmnt,canvas,c1_id,c2_id) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      
        var _this = this;
        var canvasDensity = canvas.width/canvas.offsetWidth;

        elmnt.onmousedown = dragMouseDown;
      
        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
          _this.isDragBezier = false;
        }
      
        function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          _this.isDragBezier = true;
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          var mDistanceX = elmnt.offsetLeft - pos1;
          var mDistanceY = elmnt.offsetTop - pos2;
          if(mDistanceX >= canvas.offsetWidth * canvas.paddingScale && mDistanceX<= canvas.offsetWidth*(1 - canvas.paddingScale) && mDistanceY >= canvas.offsetHeight * canvas.paddingScale && mDistanceY<= canvas.offsetHeight*(1 - canvas.paddingScale)){
              elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
              elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
              getControllerBezier(elmnt,(elmnt.offsetLeft),(elmnt.offsetTop))
              _this.drawBezierCurve(_this.x1,_this.y1,_this.x2,_this.y2);
          }
      
      
        }
      
        function closeDragElement() {
          // stop moving when mouse button is released:
          _this.isDragBezier = false;
          document.onmouseup = null;
          document.onmousemove = null;
        }
      
        function getControllerBezier(element,mX,mY) {
          var x = ((mX- canvas.width*canvas.paddingScale/canvasDensity) /((canvas.width - canvas.width*canvas.paddingScale*2)/canvasDensity));
          var y = (1. - (mY- canvas.height*canvas.paddingScale/canvasDensity)/((canvas.height - canvas.height*canvas.paddingScale*2)/canvasDensity));
          if(element.id == c1_id){
              _this.x1 = x;
              _this.y1 = y;
              //console.log('x1: ' + x + 'y1: ' + y )
          }
          else if (element.id == c2_id){
              _this.x2 = x;
              _this.y2 = y;
              //console.log('x2: ' + x + 'y2: ' + y )
          }
      
        }
      }

      drawBezierCurve(x1,y1,x2,y2,duration){

        this.calculator = new CubicBezierCalculator(x1,y1,x2,y2,duration);
        this.calculator.editable = this.editable;
        this.input.value = x1.toFixed(2) + ',' + y1.toFixed(2) + ',' + x2.toFixed(2) + ',' + y2.toFixed(2)
        // 0,1
        if(this.isDragBezier){
        }
        else{
            this.c2.style.left = this.canvas.offsetWidth * this.canvas.paddingScale + (this.canvas.offsetWidth*(1 - 2*this.canvas.paddingScale))*x2  + 'px'
            this.c2.style.top = this.canvas.offsetHeight * this.canvas.paddingScale + (this.canvas.offsetHeight*(1 - 2*this.canvas.paddingScale))*(1-y2) + 'px'
            //1,0
            //bezier_controller_1.style.left = this.canvasoffsetWidth * (1 - this.canvaspaddingScale)  + 'px'
            this.c1.style.left = this.canvas.offsetWidth * this.canvas.paddingScale + (this.canvas.offsetWidth*(1 - 2*this.canvas.paddingScale))*x1  + 'px'
            this.c1.style.top = this.canvas.offsetHeight * this.canvas.paddingScale + (this.canvas.offsetHeight*(1 - 2*this.canvas.paddingScale))*(1-y1) + 'px'
        }
    
        DrawCurve(this.canvas,this.calculator,false)
    }

    drawBezierCurveWithCalculator(x1,y1,x2,y2,mCalculator){
        mCalculator.editable = this.editable;
        this.input.value = x1.toFixed(2) + ',' + y1.toFixed(2) + ',' + x2.toFixed(2) + ',' + y2.toFixed(2)
        // 0,1
        if(this.isDragBezier){
        }
        else{
            this.c2.style.left = this.canvas.offsetWidth * this.canvas.paddingScale + (this.canvas.offsetWidth*(1 - 2*this.canvas.paddingScale))*x2  + 'px'
            this.c2.style.top = this.canvas.offsetHeight * this.canvas.paddingScale + (this.canvas.offsetHeight*(1 - 2*this.canvas.paddingScale))*(1-y2) + 'px'
            //1,0
            //bezier_controller_1.style.left = this.canvasoffsetWidth * (1 - this.canvaspaddingScale)  + 'px'
            this.c1.style.left = this.canvas.offsetWidth * this.canvas.paddingScale + (this.canvas.offsetWidth*(1 - 2*this.canvas.paddingScale))*x1  + 'px'
            this.c1.style.top = this.canvas.offsetHeight * this.canvas.paddingScale + (this.canvas.offsetHeight*(1 - 2*this.canvas.paddingScale))*(1-y1) + 'px'
        }
        DrawCurve(this.canvas,mCalculator,false)
    }


}
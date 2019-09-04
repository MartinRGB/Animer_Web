function setupSliderAndInputController(canvas,slArray,iptArray,calc,calcType,interpolatorType,converter,converterType,consoleContainer){
  for(var i=0;i<slArray.length;i++){

    iptArray[i].onchange = function() {
      calcType = getCurrentCalculatorType()
      interpolatorType = getCurrentInterpolatorType();
      converterType = getCurrentConverterType();

      if(Number(this.value) <= Number(this.nextElementSibling.max) && Number(this.value) >= Number(this.nextElementSibling.min)){
        this.value = Number(this.value);
      }
      else if (Number(this.value) < Number(this.nextElementSibling.min)){
        this.value = Number(this.nextElementSibling.min);
      }
      else if (Number(this.value) > Number(this.nextElementSibling.max)){
        this.value = Number(this.nextElementSibling.max);
      }
      else{
        this.value = Number(0);
      }

      var factor1 = Number(iptArray[0].value);
      var factor2 = Number(iptArray[1].value);
      var factor3 = Number(iptArray[2].value);
      var factor4 = Number(iptArray[3].value);


      this.nextElementSibling.value = this.value
      var mProgress = (this.value - this.nextElementSibling.min)/(this.nextElementSibling.max - this.nextElementSibling.min)*100;
      this.nextElementSibling.style.background = 'linear-gradient(to right, #029CFF 0%, #029CFF '+ mProgress +'%, #363636 ' + mProgress + '%, #363636 100%)'
      this.nextElementSibling.nextElementSibling.style.left = 149 + (266-149)*mProgress/100 + 'px';

  
      switch(calcType){
        case "SpringAnimationCalculator":
            if(converterType !=null){
              //console.log(converterType)
              var className = converterType.constructor.name
              eval("converter = new " + className + "(" + factor1 + "," + factor2 + "," + factor3 + "," + factor4 + ")");
              console.log(converter);
              calc = new SpringAnimationCalculator(converter.stiffness,converter.dampingRatio,(converter.velocity == null)?0:converter.velocity);

              //console.log(calc)
            }
            else{
              calc = new SpringAnimationCalculator(factor1,factor2,factor3,1.0);
            }
            DrawCurve(canvas,calc,true);
            break;
        case "InterpolatorCalculator":
           switch(interpolatorType){
              case 'AccelerateDecelerate':
                calc = new InterpolatorCalculator(interpolatorType,null,factor1);
                break;
              case 'Bounce':
                calc = new InterpolatorCalculator(interpolatorType,null,factor1);
                break;
              case 'Linear':
                calc = new InterpolatorCalculator(interpolatorType,null,factor1);
                break;
              default:
                calc = new InterpolatorCalculator(interpolatorType,factor1,factor2);
            }
            DrawCurve(canvas,calc,false)
            break;
        case "FlingAnimationCalculator":
            calc = new FlingAnimationCalculator(factor1,factor2);
            DrawCurve(canvas,calc,true)
            break;
        case "CustomMocosSpringCalculator":
            calc = new CustomMocosSpringCalculator(factor1,factor2,factor3,factor4);
            DrawCurve(canvas,calc,true)
            break;
        case "CustomSpringCalculator":
            calc = new CustomSpringCalculator(factor1,factor2,factor3,factor4);
            DrawCurve(canvas,calc,true)
            break;
        case "CustomDampingCalculator":
            calc = new CustomDampingCalculator(factor1,factor2,factor3,factor4);
            DrawCurve(canvas,calc,true)
            break;
        case "CustomBounceCalculator":
            calc = new CustomBounceCalculator(factor1,factor2,factor3,factor4);
            DrawCurve(canvas,calc,true)
            break;
      case "CubicBezierCalculator":
            calc = mCalculator;
            calc.setDuration(factor1);
            DrawCurve(canvas,calc,false)
            break;
        default:
          //console.log(calc)
      }
      
      //### TODO ,still bugs
      listSelectEstimatedPara(calc,time_para);
    }

    slArray[i].oninput = function() {
      calcType = getCurrentCalculatorType()
      interpolatorType = getCurrentInterpolatorType();
      converterType = getCurrentConverterType();

      var factor1 = Number(slArray[0].value);
      var factor2 = Number(slArray[1].value);
      var factor3 = Number(slArray[2].value);
      var factor4 = Number(slArray[3].value);


      this.previousElementSibling.value = this.value
      var mProgress = (this.value - this.min)/(this.max - this.min)*100;
      this.style.background = 'linear-gradient(to right, #029CFF 0%, #029CFF '+ mProgress +'%, #363636 ' + mProgress + '%, #363636 100%)'
      this.nextElementSibling.style.left = 149 + (266-149)*mProgress/100 + 'px';

  
  
      switch(calcType){
        case "SpringAnimationCalculator":
            if(converterType !=null){
              var className = converterType.constructor.name
              eval("converter = new " + className + "(" + factor1 + "," + factor2 + "," + factor3 + "," + factor4 + ")");
              console.log(converter.mass)
              calc = new SpringAnimationCalculator(converter.stiffness,converter.dampingRatio,(converter.velocity == null)?0:converter.velocity);

            }
            else{
              calc = new SpringAnimationCalculator(factor1,factor2,factor3,1.0);
            }
            DrawCurve(canvas,calc,true);factor1
            break;
        case "InterpolatorCalculator":
            switch(interpolatorType){
              case 'AccelerateDecelerate':
                calc = new InterpolatorCalculator(interpolatorType,null,factor1);
                break;
              case 'Bounce':
                calc = new InterpolatorCalculator(interpolatorType,null,factor1);
                break;
              case 'Linear':
                calc = new InterpolatorCalculator(interpolatorType,null,factor1);
                break;
              default:
                calc = new InterpolatorCalculator(interpolatorType,factor1,factor2);
            }
            DrawCurve(canvas,calc,false)
            break;
        case "FlingAnimationCalculator":
            calc = new FlingAnimationCalculator(factor1,factor2);
            //console.log(calc);
            DrawCurve(canvas,calc,true);
            break;
        case "CustomMocosSpringCalculator":
            calc = new CustomMocosSpringCalculator(factor1,factor2,factor3,factor4);
            DrawCurve(canvas,calc,true)
            break;
        case "CustomSpringCalculator":
            calc = new CustomSpringCalculator(factor1,factor2,factor3,factor4);
            DrawCurve(canvas,calc,true)
            break;
        case "CustomDampingCalculator":
            calc = new CustomDampingCalculator(factor1,factor2,factor3,factor4);
            DrawCurve(canvas,calc,true)
            break;
        case "CustomBounceCalculator":
            calc = new CustomBounceCalculator(factor1,factor2,factor3,factor4);
            DrawCurve(canvas,calc,true)
            break;
        case "CubicBezierCalculator":
            calc = mCalculator;
            calc.setDuration(factor1);
            DrawCurve(canvas,calc,false)
            break;
        default:
      }
      
      //### TODO ,still bugs
      listSelectEstimatedPara(calc,time_para);
    }

    slArray[i].onchange = function() {
      //calc = getCurrentCalculatorType();
      listSelectEstimatedPara(calc,time_para);
    }

  }
}
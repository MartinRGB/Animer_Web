var mListChoosenCalculatorType;
var mListChoosenInterpolatorType;
var mListChoosenConverterType;

function setCurrentCalculatorType(calc){
  mListChoosenCalculatorType =calc;
}

function setCurrentInterpolatorType(intp){
  mListChoosenInterpolatorType = intp;
}

function setCurrentConverterType(conv){
  mListChoosenConverterType = conv;
}

function getCurrentCalculatorType(){
  return mListChoosenCalculatorType;
}

function getCurrentInterpolatorType(){
  return mListChoosenInterpolatorType;
}

function getCurrentConverterType(){
  return mListChoosenConverterType;
}

function listSelectEstimatedPara(calculatorData,timeParaE){
  if(calculatorData.duration != null){
    timeParaE.style.display = 'block'
    // console.log(calculatorData)
    if(calculatorData.transition != null){
      timeParaE.innerHTML = 'Estimated time - ' + Math.abs(calculatorData.duration).toFixed(2)*1000 + 'ms    |    Transition - ' + calculatorData.transition.toFixed(0) +'f'
    }
    else{
      timeParaE.innerHTML = 'Estimated time - ' + Math.abs(calculatorData.duration).toFixed(2)*1000 + 'ms'
    }

  }
  else{
    timeParaE.style.display = 'none'
  }
}
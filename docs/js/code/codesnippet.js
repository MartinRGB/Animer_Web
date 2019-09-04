
function updateCodeSnippet(calculator){

  if(calculator !=null){

    mCalculator = calculator;
    switch(calculator.constructor.name){
        case "SpringAnimationCalculator":

            const converter  = new AndroidSpringAnimationConverter(calculator.stiffness,calculator.dampingratio);

            document.getElementById("android-block").innerHTML = AndroidSpringCode(calculator,converter);

            document.getElementById("ios-block").innerHTML = iOSSpringCode(calculator,converter);

            document.getElementById("web-block").innerHTML = WebSpringCode(calculator,converter);

            document.getElementById("data-block").innerHTML = dataArrayCode(calculator);

            break;
        case "FlingAnimationCalculator":

            document.getElementById("android-block").innerHTML = AndroidFlingCode(calculator);

            document.getElementById("ios-block").innerHTML = NullCode('ios');

            document.getElementById("web-block").innerHTML = NullCode('web');

            document.getElementById("data-block").innerHTML = dataArrayCode(calculator);

                break;     
        case "InterpolatorCalculator":

            document.getElementById("android-block").innerHTML = AndroidInterpolatorCode(calculator);

            document.getElementById("ios-block").innerHTML = NullCode('ios');

            document.getElementById("web-block").innerHTML = NullCode('web');
            
            document.getElementById("data-block").innerHTML = dataArrayCode(calculator);

                break;
        case "CubicBezierCalculator":

            document.getElementById("android-block").innerHTML = AndroidBezierCode(calculator);

            document.getElementById("ios-block").innerHTML = iOSBezierCode(calculator);

            document.getElementById("web-block").innerHTML = WebBezierCode(calculator);

            document.getElementById("data-block").innerHTML = dataArrayCode(calculator);

                break;     
        default:

            document.getElementById("android-block").innerHTML = AndroidCustomInterpolatorCode(calculator);

            document.getElementById("ios-block").innerHTML = NullCode('ios');

            document.getElementById("web-block").innerHTML = NullCode('web');

            document.getElementById("data-block").innerHTML = dataArrayCode(calculator);
    }

  }

}


function AndroidSpringCode(calculator,converter){

    var mAndroidSpringString = 
    commentCode('// Android Spring Animation') + emptyCode() + emptyCode() + linkCode('[API]','https://developer.android.com/reference/androidx/dynamicanimation/animation/SpringAnimation.html') + '</br>' +
    typeCode('SpringAnimation') + emptyCode() +  normalCode('springAnimation = ') + emptyCode() + keywordCode('new') + emptyCode()  + typeCode('SpringAnimation') + normalCode('([view].[property],[finalValue]);') + '</br>' + 

    normalCode('springAnimation.getSpring().setStiffness(') + paraCode(calculator.stiffness) + normalCode(');') + '</br>' +
    normalCode('springAnimation.getSpring().setDampingRatio(') + paraCode(calculator.dampingratio) + normalCode(');') + '</br>' +
    normalCode('springAnimation.setStartVelocity(') + paraCode(calculator.velocity) + normalCode(');') + '</br>';

    var mReboundString =
    '</br>' + commentCode('// Facebook Rebound Animation') + emptyCode() + emptyCode() + linkCode('[Repo]','https://github.com/facebook/rebound') + '</br>' + 
    typeCode('SpringSystem') + emptyCode() +  normalCode('mSpringSystem =') + emptyCode() + typeCode('SpringSystem.create') + normalCode('();') + '</br>' +
    typeCode('Spring') + emptyCode() +  normalCode('mSpring =') + emptyCode() + normalCode('SpringSystem.createSpring();')  + '</br>' +
    typeCode('SpringConfig') + emptyCode() +  normalCode('mConfig =') + emptyCode() + typeCode('SpringConfig.fromBouncinessAndSpeed') + normalCode('(') + paraCode(converter.bounciness) + normalCode(',') + paraCode(converter.speed) + normalCode(');') + '</br>' +
    normalCode('mSpring.setSpringConfig(mConfig);') + '</br>';

    var mSpringInterpolatorString = 
    '</br>' + commentCode('// Custom Android Spring Interpolator') + emptyCode() + emptyCode() + linkCode('[Source Code]','https://github.com/MartinRGB/AndroidInterpolator_AE/blob/master/CustomInterpolator/CustomSpringInterpolator.java') + '</br>' + 
    typeCode('CustomSpringInterpolator') + emptyCode() +  normalCode('customSpringInterpolator = ') + emptyCode() + keywordCode('new') + emptyCode()  + typeCode('CustomSpringInterpolator')+ normalCode('(') + paraCodeWithId(0,'spring-interpolator-factor')+ normalCode(');') + '</br>' + 
  
    typeCode('[ObjectAnimator]') + normalCode('.setInterpolator(customSpringInterpolator)') + '</br>' +
    typeCode('[ObjectAnimator]') + normalCode('.setDuration(') + paraCodeWithId(0,'spring-interpolator-duration','spring-interpolator-duration')+ normalCode(');') + '</br>';

    var mFramerRK4String =
    '</br>' + commentCode('// Custom RK4 Framer Physics Animator in Android') + emptyCode() + emptyCode() + linkCode('[Repo]','https://github.com/unixzii/android-SpringAnimator') + '</br>' + 
    typeCode('Rk4SpringAnimator') + emptyCode() +  normalCode('animator = ') + emptyCode() + keywordCode('new') + emptyCode()  + typeCode('Rk4SpringAnimator') + normalCode('();') + '</br>' + 
    normalCode('animator.setTension(') + paraCode(calculator.tension) + normalCode(');') + '</br>' +
    normalCode('animator.setFriction(') + paraCode(calculator.friction) + normalCode(');') + '</br>' +
    normalCode('animator.setVelocity(') + paraCode(calculator.velocity) + normalCode(');') + '</br>';


    var mFramerDHOString =
    '</br>' + commentCode('// Custom DHO Physics Animator in Android') + emptyCode() + emptyCode() + linkCode('[Repo]','https://github.com/unixzii/android-SpringAnimator') + '</br>' + 
    typeCode('DhoSpringAnimator') + emptyCode() +  normalCode('animator = ') + emptyCode() + keywordCode('new') + emptyCode()  + typeCode('DhoSpringAnimator') + normalCode('();') + '</br>' + 
    normalCode('animator.setStiffness(') + paraCode(calculator.stiffness) + normalCode(');') + '</br>' +
    normalCode('animator.setDamping(') + paraCode(calculator.damping) + normalCode(');') + '</br>' +
    normalCode('animator.setMass(') + paraCode(calculator.mass) + normalCode(');') + '</br>' +
    normalCode('animator.setVelocity(') + paraCode(calculator.velocity) + normalCode(');') + '</br>';


    return mAndroidSpringString + mReboundString + mSpringInterpolatorString + mFramerRK4String + mFramerDHOString; 

}

function iOSSpringCode(calculator,converter){

    var mUIViewSpringString = commentCode('// iOS UIViewAnimation') + emptyCode() + emptyCode() + linkCode('[API]','https://developer.apple.com/documentation/uikit/uiview/1622594-animate') + '</br>' + 
    
    typeCode('UIView') + normalCode('.animate(') + '</br>' +
    emptyCode() + emptyCode() + emptyCode() +emptyCode() + normalCode('withDuration:') + emptyCode() + paraCode(calculator.durationForUIView) + normalCode(',') +  '</br>' +
    emptyCode() + emptyCode() + emptyCode() +emptyCode() + normalCode('delay:') + emptyCode() + paraCode(0.0) + normalCode(',') + '</br>' +
    emptyCode() + emptyCode() + emptyCode() +emptyCode() + normalCode('usingSpringWithDamping:') + emptyCode() + paraCode(calculator.dampingratio) + normalCode(',') + '</br>' +
    emptyCode() + emptyCode() + emptyCode() +emptyCode() + normalCode('initialSpringVelocity:') + emptyCode() + paraCode(0.0) + normalCode(',') + '</br>' +
    emptyCode() + emptyCode() + emptyCode() +emptyCode() + normalCode('options: [],') + '</br>' +
    emptyCode() + emptyCode() + emptyCode() +emptyCode() + normalCode('animations: ') + '</br>' +
    emptyCode() + emptyCode() + emptyCode() +emptyCode() + normalCode('{') + '</br>' +
    emptyCode() + emptyCode() + emptyCode() +emptyCode() + emptyCode() + emptyCode() + emptyCode() +emptyCode() + commentCode('// code here') + '</br>' +
    emptyCode() + emptyCode() + emptyCode() +emptyCode() + normalCode('},') + '</br>' +
    emptyCode() + emptyCode() + emptyCode() +emptyCode() + normalCode('completion: nil') + '</br>' +
    normalCode(')') + '</br>';

    var mCASpringAnimationString = 
    '</br>' +commentCode('// iOS CASpringAnimation') + emptyCode() + emptyCode() + linkCode('[API]','https://developer.apple.com/documentation/quartzcore/caspringanimation') + '</br>' + 
    keywordCode('let') + emptyCode() + normalCode('spring = ') + emptyCode()  +typeCode('CASpringAnimation') + normalCode('(') + typeCode('keyPath') + normalCode(':[property]') + normalCode(')') + '</br>' + 
    normalCode('spring.stiffness = ') + emptyCode() + paraCode(calculator.stiffness)  + '</br>' +
    normalCode('spring.damping = ') + emptyCode() + paraCode(calculator.damping)  + '</br>' +
    normalCode('spring.mass = ') + emptyCode() + paraCode(calculator.mass)  + '</br>' +
    normalCode('spring.initialVelocity = ') + emptyCode() + paraCode(calculator.velocity) + '</br>';

    var mPOPSpringAnimationString = 
    '</br>' +commentCode('// Facebook POP Spring Animation') + emptyCode() + emptyCode() + linkCode('[Repo]','https://github.com/facebook/pop') + '</br>' +
    keywordCode('let') + emptyCode() + normalCode('spring = ') + emptyCode()  +typeCode('POPSpringAnimation') + normalCode('(') + typeCode('propertyNamed') + normalCode(':[propertyName]') + normalCode(')') + '</br>' + 
    normalCode('spring.springBounciness = ') + emptyCode() + paraCode(converter.bounciness)  + '</br>' +
    normalCode('spring.springSpeed = ') + emptyCode() + paraCode(converter.speed)  + '</br>';


    return mUIViewSpringString + mCASpringAnimationString + mPOPSpringAnimationString; 

}

function WebSpringCode(calculator,converter){

    var mReboundSpringAnimationString = 
    commentCode('// Facebook ReboundJS Spring Animation') + emptyCode() + emptyCode() + linkCode('[Repo]','http://www.github.com/facebook/rebound-js') + '</br>' +
    keywordCode('var') + emptyCode() + normalCode('springSystem = ') + emptyCode() + keywordCode('new') + emptyCode()  +typeCode('rebound.SpringSystem') + normalCode('();') + '</br>' +
    keywordCode('var') + emptyCode() + normalCode('spring = ') + emptyCode() + normalCode('springSystem.') + typeCode('rebound.createSpringWithBouncinessAndSpeed') + normalCode('(') + paraCode(converter.bounciness) + normalCode(',')+ paraCode(converter.speed) + normalCode(');') + '</br>';

    var mFramerRK4String =
    '</br>' + commentCode('// (Legacy) Framer Classic RK4 Animation') + emptyCode() + emptyCode() + linkCode('[API]','https://classic.framer.com/docs/#layer.animate') + '</br>' + 
    normalCode('layerA =') + emptyCode() + keywordCode('new Layer') + '</br>' + 
    normalCode('animationA =') + emptyCode() + keywordCode('new Animation') + emptyCode() + normalCode('layerA') + '</br>' + 
    emptyCode() + emptyCode() + emptyCode() + emptyCode() + normalCode('x:[parameter]') + '</br>' + 
    emptyCode() + emptyCode() + emptyCode() + emptyCode() + normalCode('options:') + '</br>' + 
    emptyCode() + emptyCode() + emptyCode() + emptyCode() + emptyCode() + emptyCode() + emptyCode() + emptyCode() + normalCode('curve: Spring(tension:') + paraCode(calculator.tension) + normalCode(',friction:') + paraCode(calculator.friction) + normalCode(')') + '</br>';




    var mPOPMotionString = 
    '</br>' + commentCode('// PopMotion | FramerMotion') + emptyCode() + emptyCode() + linkCode('[PopMotion API]','https://popmotion.io/api/spring/') + emptyCode() + emptyCode() + linkCode('[FramerMotion API]','https://www.framer.com/api/animation/#spring') + '</br>' + 
    
    typeCode('spring') + normalCode('({') + '</br>' +
    emptyCode() +emptyCode() + normalCode('from:') + emptyCode() + normalCode('[parameter]') + normalCode(',') +  '</br>' +
    emptyCode() +emptyCode() + normalCode('to:') + emptyCode() + normalCode('[parameter]') + normalCode(',') +  '</br>' +

    emptyCode() +emptyCode() + normalCode('stiffness:') + emptyCode() + paraCode(calculator.stiffness) + normalCode(',') +  '</br>' +
    emptyCode() +emptyCode() + normalCode('damping:') + emptyCode() + paraCode(calculator.damping) + normalCode(',') +  '</br>' +
    emptyCode() +emptyCode() + normalCode('mass:') + emptyCode() + paraCode(calculator.mass) + normalCode(',') +  '</br>' +
    emptyCode() +emptyCode() + normalCode('velocity:') + emptyCode() + paraCode(calculator.velocity) +  '</br>' +
    normalCode('})') + '</br>';


    return mReboundSpringAnimationString + mFramerRK4String + mPOPMotionString;
}

function AndroidFlingCode(calculator){
    var mAndroidFlingString = 
    commentCode('// Android Fling Animation') + emptyCode() + emptyCode() + linkCode('[API]','https://developer.android.com/reference/androidx/dynamicanimation/animation/FlingAnimation.html') + '</br>' +
    typeCode('FlingAnimation') + emptyCode() +  normalCode('flingAnimation = ') + emptyCode() + keywordCode('new') + emptyCode()  + typeCode('FlingAnimation') + normalCode('([view].[property]);') + '</br>' + 

    normalCode('flingAnimation.setStartVelocity(') + paraCode(calculator.velocity) + normalCode(');') + '</br>' +
    normalCode('flingAnimation.setFriction(') + paraCode(calculator.friction) + normalCode(');') + '</br>';

    return mAndroidFlingString;
}

function AndroidInterpolatorCode(calculator){

    var mFactor = (calculator.factor == null)?'':paraCode(calculator.factor);

    var mAndroidInterpolatorString = 
    commentCode('// Android Interpolator Animation') + emptyCode() + emptyCode() + linkCode('[API]','https://developer.android.com/reference/android/view/animation/Interpolator') + '</br>' +
    normalCode('[Animator].setInterpolator(') + keywordCode('new') + emptyCode() + typeCode(calculator.type + 'Interpolator')+normalCode('(')+ mFactor +normalCode('));') + '</br>' +
    normalCode('[Animator].setDuration(') + paraCode(calculator.duration) + normalCode(');');

    return mAndroidInterpolatorString;
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}

function getAndroidMaterialInterpolatorName(string,calculator){
    var mInterpolatorString = commentCode('// Android Interpolator Animation') + emptyCode() + emptyCode() + linkCode('[API]','https://developer.android.com/reference/android/support/v4/view/animation/package-summary') + '</br>' +
    normalCode('[Animator].setInterpolator(') + keywordCode('new') + emptyCode() + typeCode(string + 'Interpolator')+normalCode('(')+ '' +normalCode('));') + '</br>' +
    normalCode('[Animator].setDuration(') + paraCode(calculator.duration) + normalCode(');') + '</br>' + '</br>';

    return mInterpolatorString;
}

function AndroidBezierCode(calculator){
   

    var mBezierString = commentCode('// Android PathInterpolator(Bezier) Animation') + emptyCode() + emptyCode() + linkCode('[API]','https://developer.android.com/reference/android/view/animation/PathInterpolator#PathInterpolator(float,%20float,%20float,%20float)') + '</br>' +
    normalCode('[Animator].setInterpolator(') + keywordCode('new') + emptyCode() + typeCode('PathInterpolator')+normalCode('(') + paraCode(calculator.bezier[0]) + ',' + paraCode(calculator.bezier[1]) + ',' + paraCode(calculator.bezier[2]) + ',' + paraCode(calculator.bezier[3]) +normalCode('));') + '</br>' + 
    normalCode('[Animator].setDuration(') + paraCode(calculator.duration) + normalCode(');') + '</br>';

    if(arraysEqual(calculator.bezier,[0.4, 0, 0.2, 1])){
        var mInterpolatorString = getAndroidMaterialInterpolatorName('FastOutSlowIn',calculator)
        return mInterpolatorString + mBezierString;
    }
    else if(arraysEqual(calculator.bezier,[0,0,0.2,1.0])){
        var mInterpolatorString = getAndroidMaterialInterpolatorName('LinearOutSlowIn',calculator)
        return mInterpolatorString + mBezierString;
    }
    else if(arraysEqual(calculator.bezier,[0.4,0,1,1.0])){
        var mInterpolatorString = getAndroidMaterialInterpolatorName('FastOutLinear',calculator)
        return mInterpolatorString + mBezierString;
    }
    else{
        return mBezierString;
    }

}

function getiOSDefaultCurve(string,calculator){
    var mString =
    '</br>' +commentCode('// iOS UIView Animation with default presets') + emptyCode() + emptyCode() + linkCode('[API]','https://developer.apple.com/documentation/uikit/uiview/animationcurve') + '</br>' +
    keywordCode('let') + emptyCode() + normalCode('animator =') + emptyCode() + typeCode('UIViewPropertyAnimator')+normalCode('(duration: [') + paraCode(calculator.duration) + normalCode('], curve: .') + typeCode(string) + normalCode('){') + commentCode('// code here')+normalCode('}') + '</br>';

    return mString;
}

function iOSBezierCode(calculator){

    var mCubicTimingString = commentCode('// iOS UIView Animation with UICubicTimingParameters') + emptyCode() + emptyCode() + linkCode('[API]','https://developer.apple.com/documentation/uikit/uicubictimingparameters') + '</br>' +
    keywordCode('let') + emptyCode() + normalCode('cubicTimingParameters =') + emptyCode() + typeCode('UICubicTimingParameters')+normalCode('(controlPoint1:') + emptyCode() + typeCode('CGPoint')+normalCode('(x:')+emptyCode()+paraCode(calculator.bezier[0])+normalCode(',y:')+emptyCode()+paraCode(calculator.bezier[1])+normalCode('),controlPoint2:')+emptyCode() + typeCode('CGPoint')+normalCode('(x:')+emptyCode()+paraCode(calculator.bezier[2])+normalCode(',y:')+emptyCode()+paraCode(calculator.bezier[3])+normalCode('))') + '</br>' +

    keywordCode('let') + emptyCode() + normalCode('animator =') + emptyCode() + typeCode('UIViewPropertyAnimator')+normalCode('(duration: [') + paraCode(calculator.duration) + normalCode('],timingParameters: cubicTimingParameters)') + '</br>';

    var mCAMediaTimingFunctionString = 
    '</br>' +commentCode('// iOS Core Animation with CAMediaTimingFunction') + emptyCode() + emptyCode() + linkCode('[API]','https://developer.apple.com/documentation/quartzcore/camediatimingfunction') + '</br>' +
    keywordCode('let') + emptyCode() + normalCode('animation =') + emptyCode() + typeCode('CABasicAnimation')+normalCode('(') + typeCode('keyPath') + normalCode(': [keyPath])') + '</br>' +

    normalCode('animation.timingFunction = ') + emptyCode() + typeCode('CAMediaTimingFunction') + normalCode('(') + typeCode('controlPoints') + normalCode(': ') + emptyCode() + paraCode(calculator.bezier[0]) + normalCode(',') + paraCode(calculator.bezier[1]) + normalCode(',') + paraCode(calculator.bezier[2]) + normalCode(',') + paraCode(calculator.bezier[3]) + normalCode(')') + '</br>' + 
    normalCode('animation.duration = ') + emptyCode() + paraCode(calculator.duration) + '</br>';
    
    var mUIViewAnimationCurveString;


    if(arraysEqual(calculator.bezier,[0.25,0.25,0.75,0.75])){
        mUIViewAnimationCurveString = getiOSDefaultCurve('linear',calculator)
        return mCubicTimingString + mCAMediaTimingFunctionString + mUIViewAnimationCurveString;
    }
    else if(arraysEqual(calculator.bezier,[0.42,0.00,1.00,1.00])){
        mUIViewAnimationCurveString = getiOSDefaultCurve('easeIn',calculator)
        return mCubicTimingString + mCAMediaTimingFunctionString + mUIViewAnimationCurveString;
    }
    else if(arraysEqual(calculator.bezier,[0.00,0.00,0.58,1.00])){
        mUIViewAnimationCurveString = getiOSDefaultCurve('easeOut',calculator)
        return mCubicTimingString + mCAMediaTimingFunctionString + mUIViewAnimationCurveString;

    }
    else if(arraysEqual(calculator.bezier,[0.42,0.00,0.58,1.00])){
        mUIViewAnimationCurveString = getiOSDefaultCurve('easeInOut',calculator)
        return mCubicTimingString + mCAMediaTimingFunctionString + mUIViewAnimationCurveString;
    }
    else{
        return mCubicTimingString + mCAMediaTimingFunctionString;
    }

}

function getCSSDefaultTimingFunction(string,calculator){
    var mString =
    commentCode('// CSS TimingFunctions') + emptyCode() + emptyCode() + linkCode('[API]','https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function') + '</br>' +
    keywordCode('transition-timing-function') + normalCode(': ') + emptyCode() + typeCode(string) + '</br>' +
    keywordCode('transition-duration: ') + emptyCode() + paraCode(calculator.duration)+ normalCode(';');

    return mString;
}

function WebBezierCode(calculator){


    var mDefaultCSSString;

    var mCubicBezierCSSString = 
    commentCode('// CSS TimingFunctions') + emptyCode() + emptyCode() + linkCode('[API]','https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function') + '</br>' +
    keywordCode('transition-timing-function') + normalCode(': cubic-bezier(') + paraCode(calculator.bezier[0]) + normalCode(',') + paraCode(calculator.bezier[1]) + normalCode(',') + paraCode(calculator.bezier[2]) + normalCode(',') + paraCode(calculator.bezier[3]) + normalCode(');') + '</br>' +
    keywordCode('transition-duration: ') + emptyCode() + paraCode(calculator.duration)+ normalCode(';');


    if(arraysEqual(calculator.bezier,[0.25,0.25,0.75,0.75])){
        mDefaultCSSString = getCSSDefaultTimingFunction('linear',calculator)
        return mDefaultCSSString;
    }
    else if(arraysEqual(calculator.bezier,[0.42,0.00,1.00,1.00])){
        mDefaultCSSString = getCSSDefaultTimingFunction('ease-in',calculator)
        return mDefaultCSSString;
    }
    else if(arraysEqual(calculator.bezier,[0.00,0.00,0.58,1.00])){
        mDefaultCSSString = getCSSDefaultTimingFunction('ease-out',calculator)
        return mDefaultCSSString;

    }
    else if(arraysEqual(calculator.bezier,[0.42,0.00,0.58,1.00])){
        mDefaultCSSString = getCSSDefaultTimingFunction('ease-in-out',calculator)
        return mDefaultCSSString;
    }
    else if(arraysEqual(calculator.bezier,[0.25,0.10,0.25,1.00])){
        mDefaultCSSString = getCSSDefaultTimingFunction('ease',calculator)
        return mDefaultCSSString;
    }
    else{
        return mCubicBezierCSSString;
    }

}

function getAndroidCustomInterpolator(link,factor,calculator,typeName){

    var mAndroidCustomInterpolatorString = 
    commentCode('// Android Custom Interpolator Animation') + emptyCode() + emptyCode() + linkCode('[Source Code]', link) + '</br>' +
    normalCode('[Animator].setInterpolator(') + keywordCode('new') + emptyCode() + typeCode(typeName + 'Interpolator')+normalCode('(')+ factor +normalCode('));');

    return mAndroidCustomInterpolatorString;
}

function AndroidCustomInterpolatorCode(calculator){
    
    var mString;

    switch(calculator.constructor.name){
        case "CustomMocosSpringCalculator":
            var mFactor = paraCode(calculator.tension) + normalCode(',') + paraCode(calculator.friction) + normalCode(',') + paraCode(calculator.velocity);
            mString = getAndroidCustomInterpolator('https://github.com/MartinRGB/AndroidInterpolator_AE/blob/master/CustomInterpolator/CustomMocosSpringInterpolator.java', mFactor, calculator,'CustomMocosSpring')
            break;
        case "CustomSpringCalculator":
            var mFactor = paraCode(calculator.factor);
            mString = getAndroidCustomInterpolator('https://github.com/MartinRGB/AndroidInterpolator_AE/blob/master/CustomInterpolator/CustomSpringInterpolator.java', mFactor, calculator,'CustomSpring') + '</br>' +
            normalCode('[Animator].setDuration(') + paraCode(calculator.duration) + normalCode(');');
            break;
        case "CustomBounceCalculator":
            var mFactor = paraCode(calculator.originalTension) + normalCode(',') + paraCode(calculator.originalFriction);
            mString = getAndroidCustomInterpolator('https://github.com/MartinRGB/AndroidInterpolator_AE/blob/master/CustomInterpolator/CustomBounceInterpolator.java', mFactor, calculator,'CustomBounce')
            break;
        case "CustomDampingCalculator":
            var mFactor = paraCode(calculator.originalTension) + normalCode(',') + paraCode(calculator.originalFriction);
            mString = getAndroidCustomInterpolator('https://github.com/MartinRGB/AndroidInterpolator_AE/blob/master/CustomInterpolator/CustomDampingInterpolator.java', mFactor, calculator,'CustomDamping')
            break;
        default:
    }

    return mString;
}

function dataArrayCode(calculator){

    return  commentCode('// Array length is ' + calculator.array.length) + '</br>' + '</br>' + normalCode(calculator.array.toString())
}

function NullCode(string){

    switch (string){
        case 'web':
            return  commentCode('🍶🍶🍶 No reference 🍶🍶🍶')
            break
        case 'android':
            return  commentCode('🥃🥃🥃 No reference 🥃🥃🥃')
            break
        case 'ios':
            return  commentCode('🍸🍸🍸 No reference 🍸🍸🍸')
            break
        case 'data':
            return  commentCode('🍷🍷🍷 No reference 🍷🍷🍷')
            break
        default:
            return commentCode('// ')
    }


}

function typeCode(string){
    return '<span class="code-type-color code-text">'+ string + '</span>'
}


function linkCode(string,link){
    return '<span class="code-link-color code-text"><a target="_blank" href="'+ link.toString() +'">' + string + '</a></span>'
}


function normalCode(string){
    return '<span class="code-normal-color code-text">'+ string + '</span>'
}

function emptyCode(){
    return '<span class="code-normal-color code-text">'+ '&nbsp;' + '</span>'
}

function keywordCode(string){
    return '<span class="code-keyword-color code-text">'+ string + '</span>'
}

function paraCode(para){
    return '<span class="code-para-color code-text">'+ ((Round(para,2))).toString() + '</span>'
}

function paraCodeWithId(para,id){
    return '<span id="'+ id.toString() + '" class="code-para-color code-text">'+ Round(para,1).toString() + '</span>'
}

function commentCode(string){
    return '<span class="code-comment-color code-text">'+ string.toString() + '</span>'
}
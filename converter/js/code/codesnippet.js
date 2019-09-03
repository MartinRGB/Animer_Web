function updateCodeSnippet(calculator){

  if(calculator !=null){
    console.log(calculator)
    document.getElementById("android-block").innerHTML = 
    AndroidSpringAnimation(calculator);

    document.getElementById("ios-block").innerHTML = 
    iOSSpringAnimation(calculator);
  }

}


function AndroidSpringAnimation(calculator){

    console.log(calculator.mass)
    var mAndroidSpringString = 
    commentCode('// Android Spring Animation') + emptyCode() + emptyCode() + linkCode('[API]','https://developer.android.com/reference/androidx/dynamicanimation/animation/SpringAnimation.html') + '</br>' + '</br>' + 
    typeCode('SpringAnimation') + emptyCode() +  normalCode('springAnimation = ') + emptyCode() + keywordCode('new') + emptyCode()  + typeCode('SpringAnimation') + normalCode('([view].[property],[finalValue]);') + '</br>' + 

    normalCode('springAnimation.getSpring().setStiffness(') + paraCode(calculator.stiffness) + normalCode(');') + '</br>' +
    normalCode('springAnimation.getSpring().setDampingRatio(') + paraCode(calculator.dampingratio) + normalCode(');') + '</br>' +
    normalCode('springAnimation.setStartVelocity(') + paraCode(calculator.velocity) + normalCode(');') + '</br>';

    const androidSpringConverter  = new AndroidSpringAnimationConverter(calculator.stiffness,calculator.dampingratio);
    // const origamiSpringConverter = new AndroidSpringAnimationConverter(calculator.stiffness,calculator.dampingratio,calculator.mass);
    // const framerRK4Converter  = new AndroidSpringAnimationConverter(calculator.tension,calculator.friction);
    // const framerDHOConverter  = new AndroidSpringAnimationConverter(calculator.stiffness,calculator.damping,(calculator.mass == null)?1:calculator.mass,calculator.velocity);

    var mReboundString =
    '</br>' + commentCode('// Rebound Animation') + emptyCode() + emptyCode() + linkCode('[Repo]','https://github.com/facebook/rebound') + '</br>' + '</br>' + 
    typeCode('SpringSystem') + emptyCode() +  normalCode('mSpringSystem =') + emptyCode() + typeCode('SpringSystem.create') + normalCode('();') + '</br>' +
    typeCode('Spring') + emptyCode() +  normalCode('mSpring =') + emptyCode() + normalCode('SpringSystem.createSpring();')  + '</br>' +
    typeCode('SpringConfig') + emptyCode() +  normalCode('mConfig =') + emptyCode() + typeCode('SpringConfig.fromBouncinessAndSpeed') + normalCode('(') + paraCode(androidSpringConverter.bounciness) + normalCode(',') + paraCode(androidSpringConverter.speed) + normalCode(');') + '</br>' +
    normalCode('mSpring.setSpringConfig(mConfig);') + '</br>';

    var mSpringInterpolatorString = 
    '</br>' + commentCode('// Custom Android Spring Interpolator') + emptyCode() + emptyCode() + linkCode('[Source Code]','https://github.com/MartinRGB/AndroidInterpolator_AE/blob/master/CustomInterpolator/CustomSpringInterpolator.java') + '</br>' + '</br>' + 
    typeCode('CustomSpringInterpolator') + emptyCode() +  normalCode('customSpringInterpolator = ') + emptyCode() + keywordCode('new') + emptyCode()  + typeCode('CustomSpringInterpolator')+ normalCode('(') + paraCodeWithId(0,'spring-interpolator-factor')+ normalCode(');') + '</br>' + 
  
    typeCode('[ObjectAnimator]') + normalCode('.setInterpolator(customSpringInterpolator)') + '</br>' +
    typeCode('[ObjectAnimator]') + normalCode('.setDuration(') + paraCodeWithId(0,'spring-interpolator-duration','spring-interpolator-duration')+ normalCode(');') + '</br>';

    var mFramerRK4String =
    '</br>' + commentCode('// Custom RK4 Framer Physics Animator in Android') + emptyCode() + emptyCode() + linkCode('[Source Code]','https://github.com/unixzii/android-SpringAnimator') + '</br>' + '</br>' + 
    typeCode('Rk4SpringAnimator') + emptyCode() +  normalCode('animator = ') + emptyCode() + keywordCode('new') + emptyCode()  + typeCode('Rk4SpringAnimator') + normalCode('();') + '</br>' + 
    normalCode('animator.setTension(') + paraCode(calculator.tension) + normalCode(');') + '</br>' +
    normalCode('animator.setFriction(') + paraCode(calculator.friction) + normalCode(');') + '</br>' +
    normalCode('animator.setVelocity(') + paraCode(calculator.velocity) + normalCode(');') + '</br>';



    var mFramerDHOString =
    '</br>' + commentCode('// Custom DHO Physics Animator in Android') + emptyCode() + emptyCode() + linkCode('[Source Code]','https://github.com/unixzii/android-SpringAnimator') + '</br>' + '</br>' + 
    typeCode('DhoSpringAnimator') + emptyCode() +  normalCode('animator = ') + emptyCode() + keywordCode('new') + emptyCode()  + typeCode('DhoSpringAnimator') + normalCode('();') + '</br>' + 
    normalCode('animator.setStiffness(') + paraCode(calculator.stiffness) + normalCode(');') + '</br>' +
    normalCode('animator.setDamping(') + paraCode(calculator.damping) + normalCode(');') + '</br>' +
    normalCode('animator.setMass(') + paraCode(calculator.mass) + normalCode(');') + '</br>' +
    normalCode('animator.setVelocity(') + paraCode(calculator.velocity) + normalCode(');') + '</br>';


    return mAndroidSpringString + mReboundString + mSpringInterpolatorString + mFramerRK4String + mFramerDHOString; 

}

function iOSSpringAnimation(calculator){

    var mUIViewSpringString = commentCode('// iOS UIViewAnimation') + emptyCode() + emptyCode() + linkCode('[API]','https://developer.apple.com/documentation/uikit/uiview/1622594-animate') + '</br>' + '</br>' + 
    
    typeCode('UIView') + normalCode('.animate(') + '</br>' +
    emptyCode() + emptyCode() + emptyCode() +emptyCode() + normalCode('withDuration:') + emptyCode() + paraCode(calculator.duration) + normalCode(',') +  '</br>' +
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
    '</br>' +commentCode('// iOS CASpringAnimation') + emptyCode() + emptyCode() + linkCode('[API]','https://developer.apple.com/documentation/quartzcore/caspringanimation') + '</br>' + '</br>' + 
    keywordCode('let') + emptyCode() + normalCode('spring = ') + emptyCode()  +typeCode('CASpringAnimation') + normalCode('(') + typeCode('keyPath') + normalCode(':[property]') + normalCode(')') + '</br>' + 
    normalCode('spring.stiffness = ') + emptyCode() + paraCode(calculator.stiffness)  + '</br>' +
    normalCode('spring.damping = ') + emptyCode() + paraCode(calculator.damping)  + '</br>' +
    normalCode('spring.mass = ') + emptyCode() + paraCode(calculator.mass)  + '</br>' +
    normalCode('spring.initialVelocity = ') + emptyCode() + paraCode(calculator.velocity) + '</br>';


    return mUIViewSpringString + mCASpringAnimationString; 

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
    return '<span class="code-para-color code-text">'+ (Number(Round(para,2))).toString() + '</span>'
}

function paraCodeWithId(para,id){
    return '<span id="'+ id.toString() + '" class="code-para-color code-text">'+ Round(para,1).toString() + '</span>'
}

function commentCode(string){
    return '<span class="code-comment-color code-text">'+ string.toString() + '</span>'
}
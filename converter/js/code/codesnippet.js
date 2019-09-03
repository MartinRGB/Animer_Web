function updateCodeSnippet(calculator){

  if(calculator !=null){
    console.log(calculator)
    document.getElementById("android-block").innerHTML = 
    AndroidSpringCode(calculator);

    document.getElementById("ios-block").innerHTML = 
    iOSSpringCode(calculator);

    document.getElementById("web-block").innerHTML = 
    WebSpringCode(calculator);
  }

}


function AndroidSpringCode(calculator){

    console.log(calculator.mass)
    var mAndroidSpringString = 
    commentCode('// Android Spring Animation') + emptyCode() + emptyCode() + linkCode('[API]','https://developer.android.com/reference/androidx/dynamicanimation/animation/SpringAnimation.html') + '</br>' +
    typeCode('SpringAnimation') + emptyCode() +  normalCode('springAnimation = ') + emptyCode() + keywordCode('new') + emptyCode()  + typeCode('SpringAnimation') + normalCode('([view].[property],[finalValue]);') + '</br>' + 

    normalCode('springAnimation.getSpring().setStiffness(') + paraCode(calculator.stiffness) + normalCode(');') + '</br>' +
    normalCode('springAnimation.getSpring().setDampingRatio(') + paraCode(calculator.dampingratio) + normalCode(');') + '</br>' +
    normalCode('springAnimation.setStartVelocity(') + paraCode(calculator.velocity) + normalCode(');') + '</br>';

    const androidSpringConverter  = new AndroidSpringAnimationConverter(calculator.stiffness,calculator.dampingratio);
    // const origamiSpringConverter = new AndroidSpringAnimationConverter(calculator.stiffness,calculator.dampingratio,calculator.mass);
    // const framerRK4Converter  = new AndroidSpringAnimationConverter(calculator.tension,calculator.friction);
    // const framerDHOConverter  = new AndroidSpringAnimationConverter(calculator.stiffness,calculator.damping,(calculator.mass == null)?1:calculator.mass,calculator.velocity);

    var mReboundString =
    '</br>' + commentCode('// Facebook Rebound Animation') + emptyCode() + emptyCode() + linkCode('[Repo]','https://github.com/facebook/rebound') + '</br>' + 
    typeCode('SpringSystem') + emptyCode() +  normalCode('mSpringSystem =') + emptyCode() + typeCode('SpringSystem.create') + normalCode('();') + '</br>' +
    typeCode('Spring') + emptyCode() +  normalCode('mSpring =') + emptyCode() + normalCode('SpringSystem.createSpring();')  + '</br>' +
    typeCode('SpringConfig') + emptyCode() +  normalCode('mConfig =') + emptyCode() + typeCode('SpringConfig.fromBouncinessAndSpeed') + normalCode('(') + paraCode(androidSpringConverter.bounciness) + normalCode(',') + paraCode(androidSpringConverter.speed) + normalCode(');') + '</br>' +
    normalCode('mSpring.setSpringConfig(mConfig);') + '</br>';

    var mSpringInterpolatorString = 
    '</br>' + commentCode('// Custom Android Spring Interpolator') + emptyCode() + emptyCode() + linkCode('[Source Code]','https://github.com/MartinRGB/AndroidInterpolator_AE/blob/master/CustomInterpolator/CustomSpringInterpolator.java') + '</br>' + 
    typeCode('CustomSpringInterpolator') + emptyCode() +  normalCode('customSpringInterpolator = ') + emptyCode() + keywordCode('new') + emptyCode()  + typeCode('CustomSpringInterpolator')+ normalCode('(') + paraCodeWithId(0,'spring-interpolator-factor')+ normalCode(');') + '</br>' + 
  
    typeCode('[ObjectAnimator]') + normalCode('.setInterpolator(customSpringInterpolator)') + '</br>' +
    typeCode('[ObjectAnimator]') + normalCode('.setDuration(') + paraCodeWithId(0,'spring-interpolator-duration','spring-interpolator-duration')+ normalCode(');') + '</br>';

    var mFramerRK4String =
    '</br>' + commentCode('// Custom RK4 Framer Physics Animator in Android') + emptyCode() + emptyCode() + linkCode('[Source Code]','https://github.com/unixzii/android-SpringAnimator') + '</br>' + 
    typeCode('Rk4SpringAnimator') + emptyCode() +  normalCode('animator = ') + emptyCode() + keywordCode('new') + emptyCode()  + typeCode('Rk4SpringAnimator') + normalCode('();') + '</br>' + 
    normalCode('animator.setTension(') + paraCode(calculator.tension) + normalCode(');') + '</br>' +
    normalCode('animator.setFriction(') + paraCode(calculator.friction) + normalCode(');') + '</br>' +
    normalCode('animator.setVelocity(') + paraCode(calculator.velocity) + normalCode(');') + '</br>';



    var mFramerDHOString =
    '</br>' + commentCode('// Custom DHO Physics Animator in Android') + emptyCode() + emptyCode() + linkCode('[Source Code]','https://github.com/unixzii/android-SpringAnimator') + '</br>' + 
    typeCode('DhoSpringAnimator') + emptyCode() +  normalCode('animator = ') + emptyCode() + keywordCode('new') + emptyCode()  + typeCode('DhoSpringAnimator') + normalCode('();') + '</br>' + 
    normalCode('animator.setStiffness(') + paraCode(calculator.stiffness) + normalCode(');') + '</br>' +
    normalCode('animator.setDamping(') + paraCode(calculator.damping) + normalCode(');') + '</br>' +
    normalCode('animator.setMass(') + paraCode(calculator.mass) + normalCode(');') + '</br>' +
    normalCode('animator.setVelocity(') + paraCode(calculator.velocity) + normalCode(');') + '</br>';


    return mAndroidSpringString + mReboundString + mSpringInterpolatorString + mFramerRK4String + mFramerDHOString; 

}

function iOSSpringCode(calculator){

    var mUIViewSpringString = commentCode('// iOS UIViewAnimation') + emptyCode() + emptyCode() + linkCode('[API]','https://developer.apple.com/documentation/uikit/uiview/1622594-animate') + '</br>' + 
    
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
    '</br>' +commentCode('// iOS CASpringAnimation') + emptyCode() + emptyCode() + linkCode('[API]','https://developer.apple.com/documentation/quartzcore/caspringanimation') + '</br>' + 
    keywordCode('let') + emptyCode() + normalCode('spring = ') + emptyCode()  +typeCode('CASpringAnimation') + normalCode('(') + typeCode('keyPath') + normalCode(':[property]') + normalCode(')') + '</br>' + 
    normalCode('spring.stiffness = ') + emptyCode() + paraCode(calculator.stiffness)  + '</br>' +
    normalCode('spring.damping = ') + emptyCode() + paraCode(calculator.damping)  + '</br>' +
    normalCode('spring.mass = ') + emptyCode() + paraCode(calculator.mass)  + '</br>' +
    normalCode('spring.initialVelocity = ') + emptyCode() + paraCode(calculator.velocity) + '</br>';

    const origamiSpringConverter = new AndroidSpringAnimationConverter(calculator.stiffness,calculator.dampingratio,calculator.mass);

    var mPOPSpringAnimationString = 
    '</br>' +commentCode('// Facebook POP Spring Animation') + emptyCode() + emptyCode() + linkCode('[Repo]','https://github.com/facebook/pop') + '</br>' +
    keywordCode('let') + emptyCode() + normalCode('spring = ') + emptyCode()  +typeCode('POPSpringAnimation') + normalCode('(') + typeCode('propertyNamed') + normalCode(':[propertyName]') + normalCode(')') + '</br>' + 
    normalCode('spring.springBounciness = ') + emptyCode() + paraCode(origamiSpringConverter.bounciness)  + '</br>' +
    normalCode('spring.springSpeed = ') + emptyCode() + paraCode(origamiSpringConverter.speed)  + '</br>';


    return mUIViewSpringString + mCASpringAnimationString + mPOPSpringAnimationString; 

}

function WebSpringCode(calculator){

    const origamiSpringConverter = new AndroidSpringAnimationConverter(calculator.stiffness,calculator.dampingratio,calculator.mass);

    var mReboundSpringAnimationString = 
    commentCode('// Facebook ReboundJS Spring Animation') + emptyCode() + emptyCode() + linkCode('[Repo]','http://www.github.com/facebook/rebound-js') + '</br>' +
    keywordCode('var') + emptyCode() + normalCode('springSystem = ') + emptyCode() + keywordCode('new') + emptyCode()  +typeCode('rebound.SpringSystem') + normalCode('();') + '</br>' +
    keywordCode('var') + emptyCode() + normalCode('spring = ') + emptyCode() + normalCode('springSystem.') + typeCode('rebound.createSpring') + normalCode('(') + paraCode(origamiSpringConverter.bounciness) + normalCode(',')+ paraCode(origamiSpringConverter.speed) + normalCode(');') + '</br>';

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


    // emptyCode() + emptyCode() + emptyCode() +emptyCode() + normalCode('completion: nil') + '</br>' +
    // normalCode(')') + '</br>';
    // spring({
    //     from: 0,
    //     to: 100,
    //     stiffness: 200,
    //     damping: 20
    //   })


    return mReboundSpringAnimationString + mFramerRK4String + mPOPMotionString;
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
function updateCodeSnippet(calculator){

  if(calculator !=null){
    console.log(calculator)
    document.getElementById("android-block").innerHTML = 
    AndroidSpringAnimation(calculator.stiffness,calculator.dampingratio,calculator.velocity);
  }

}


function AndroidSpringAnimation(stiffness,dampingRatio,velocity){

    var mAndroidSpringString = 
    commentCode('// Android Spring Animation') + emptyCode() + emptyCode() + linkCode('[API]','https://developer.android.com/reference/androidx/dynamicanimation/animation/SpringAnimation.html') + '</br>' + '</br>' + 
    typeCode('SpringAnimation') + emptyCode() +  normalCode('springAnimation = ') + emptyCode() + keywordCode('new') + emptyCode()  + typeCode('SpringAnimation') + normalCode('([view].[property],[finalValue]);') + '</br>' + 

    normalCode('springAnimation.getSpring().setStiffness(') + paraCode(stiffness) + normalCode(');') + '</br>' +
    normalCode('springAnimation.getSpring().setDampingRatio(') + paraCode(dampingRatio) + normalCode(');') + '</br>' +
    normalCode('springAnimation.setStartVelocity(') + paraCode(velocity) + normalCode(');') + '</br>';

    const androidSpringConverter  = new AndroidSpringAnimationConverter(stiffness,dampingRatio);

    var mReboundString =
    '</br>' + commentCode('// Rebound Animation') + emptyCode() + emptyCode() + linkCode('[Repo]','https://github.com/facebook/rebound') + '</br>' + '</br>' + 
    typeCode('SpringSystem') + emptyCode() +  normalCode('mSpringSystem =') + emptyCode() + typeCode('SpringSystem.create') + normalCode('();') + '</br>' +
    typeCode('Spring') + emptyCode() +  normalCode('mSpring =') + emptyCode() + normalCode('SpringSystem.createSpring();')  + '</br>' +
    typeCode('SpringConfig') + emptyCode() +  normalCode('mConfig =') + emptyCode() + typeCode('SpringConfig.fromBouncinessAndSpeed') + normalCode('(') + paraCode(androidSpringConverter.bounciness) + normalCode(',') + paraCode(androidSpringConverter.speed) + normalCode(');') + '</br>' +
    normalCode('mSpring.setSpringConfig(mConfig);');

    var mSpringInterpolatorString = 
    '</br>' + '</br>' + commentCode('// Custom Android Spring Interpolator') + emptyCode() + emptyCode() + linkCode('[Source Code]','https://github.com/MartinRGB/AndroidInterpolator_AE/blob/master/CustomInterpolator/CustomSpringInterpolator.java') + '</br>' + '</br>' + 
    typeCode('CustomSpringInterpolator') + emptyCode() +  normalCode('customSpringInterpolator = ') + emptyCode() + keywordCode('new') + emptyCode()  + typeCode('CustomSpringInterpolator(') + paraCodeWithId(0,'spring-interpolator-factor')+ normalCode(');') + '</br>' + 
  
    typeCode('[ObjectAnimator]') + normalCode('.setInterpolator(customSpringInterpolator)') + '</br>' +
    typeCode('[ObjectAnimator]') + normalCode('.setDuration(') + paraCodeWithId(0,'spring-interpolator-duration','spring-interpolator-duration')+ normalCode(');') + '</br>';
  

    return mAndroidSpringString + mReboundString + mSpringInterpolatorString;

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
    return '<span class="code-para-color code-text">'+ Round(para,2).toFixed(1).toString() + '</span>'
}

function paraCodeWithId(para,id){
    return '<span id="'+ id.toString() + '" class="code-para-color code-text">'+ Round(para,1).toString() + '</span>'
}

function commentCode(string){
    return '<span class="code-comment-color code-text">'+ string.toString() + '</span>'
}
class FlingAnimationDurationEvaluator {
    constructor(velocity, dampingRatio) {

        this.friction = dampingRatio*-4.2;
        this.velocity = velocity;
        this.transition = this.flingCalculator(this.velocity,this.friction)[0];
        this.duration = this.flingCalculator(this.velocity,this.friction)[1];
    }

    flingCalculator(velocity,friction){

        for (var i = 1/60;i < 5.;i += 1/60){
           
            var currentVelocity = velocity * Math.exp(i * friction) ;
            var currentTransition = (velocity/ friction) * (Math.exp(friction * i ) - 1);
            var speedThereshold = 2.3;

            if(Math.abs(currentVelocity) <= speedThereshold){
                return [currentTransition,i]; //Math.round(i*60)
            }
            else{
                //console.log('transitionVal is: ' + currentTransition + 'currentVelocity is: ' + currentVelocity + 'currentFrame is: ' + Math.round(i*60));
            }
    
        }
    }
    
}
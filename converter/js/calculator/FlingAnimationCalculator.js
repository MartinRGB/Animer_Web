
class FlingAnimationCalculator {
    constructor(velocity, dampingRatio) {
        this.friction = dampingRatio*-4.2;
        this.velocity = velocity;
        this.array = this.flingCalculator(this.velocity,this.friction)[0];
        this.duration = this.flingCalculator(this.velocity,this.friction)[1];
        this.transition = this.flingCalculator(this.velocity,this.friction)[2];
    }

    flingCalculator(velocity,friction){
        var transitionArray = [[0,0]];
        var sampleScale = 1.5;
        var maxItertation = 0;
        var maxValue = 0;

        for (var i = 1/(60*sampleScale);i < 20.;i += 1/(60*sampleScale)){
           
            var currentVelocity = velocity * Math.exp(i * friction) ;
            var currentTransition = (velocity/ friction) * (Math.exp(friction * i ) - 1);
            var speedThereshold = 2.3;
            if(Math.abs(currentVelocity) <= speedThereshold){

                maxItertation = i;
                maxValue = Math.abs(currentTransition);
                transitionArray = transitionArray.map(normalizeArray);
                return [transitionArray,maxItertation,currentTransition];

            }
            else{
                transitionArray.push([i,Math.abs(currentTransition)]);
            }
        }

        function normalizeArray(item) {
            item[0] = item[0]/maxItertation;
            item[1] = item[1]/maxValue;
            return item;
        }

    }

}
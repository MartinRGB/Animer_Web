class CustomDampingCalculator {
    constructor(tension,friction) {
        this.tension = tension;
        this.friction = friction;

        this.maxStifness = 50;
        this.maxFrictionMultipler = 1;
        this.mTension = 0;
        this.mFriction = 0;
    
        //Curve Position parameters(No Adjust)
        this.amplitude = 1;
        this.phase = 0;
    
        //Original Scale parameters(Better No Adjust)
        this.originalStiffness = 12;
        this.originalFrictionMultipler = 0.3;
        this.mass = 0.058;
    
        //Internal parameters
        this.pulsation = 0;
        // this.friction = 0;

        this.CustomDampingInterpolator(this.tension,this.friction)
        this.array = this.interpolatorCalculator();
    }




   computePulsation() {
        this.pulsation = Math.sqrt((this.originalStiffness + this.mTension) / this.mass);
    }

    computeFriction() {
        this.friction = (this.originalFrictionMultipler + this.mFriction) * this.pulsation;
    }

    computeInternalParameters() {
        // never call computeFriction() without
        // updating the pulsation
        this.computePulsation();
        this.computeFriction();
    }

    CustomDampingInterpolator(tension,friction) {

        this.mTension = Math.min(Math.max(tension,0),100) * (this.maxStifness - this.originalStiffness)/100;
        this.mFriction = Math.min(Math.max(friction,0),100) * (this.maxFrictionMultipler - this.originalFrictionMultipler)/100;

        this.computeInternalParameters();
    }

    interpolatorCalculator() {  
        var transitionArray = [[0,0]];
        var sampleScale = 1.5;

        for (var i = 1/(60*sampleScale);i < 1;i += 1/(60*sampleScale)){

            if(i >= (59*sampleScale)/(60*sampleScale)){
                transitionArray.push([i,this.getInterpolation(i)]);
                return transitionArray;
            }
            else{
                transitionArray.push([i,this.getInterpolation(i)]);
            }
        }
    }



    getInterpolation(ratio){ 
        if (ratio == 0.0 || ratio == 1.0){
            return ratio;
        }else{
            var value = this.amplitude *  Math.exp(-this.friction * ratio) *
                    Math.cos(this.pulsation * ratio + this.phase) ;
            return -(value)+1;
        }
    } 

}
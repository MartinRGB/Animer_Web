class InterpolatorCalculator {
    constructor(type,factor,duration) {
        this.factor = factor;
        this.type = type;
        this.array = this.interpolatorCalculator(this.type,this.factor);
        this.duration = duration;
    }

    interpolatorCalculator(type,factor) {  
        var transitionArray = [[0,0]];
        var sampleScale = 1.5;

        for (var i = 1/(60*sampleScale);i < 1;i += 1/(60*sampleScale)){

            if(i >= (59*sampleScale)/(60*sampleScale)){
                transitionArray.push([i,this.InterpolatorTypeChooser(i,type,factor)]);
                return transitionArray;
            }
            else{
                transitionArray.push([i,this.InterpolatorTypeChooser(i,type,factor)]);
            }
        }
    }

    setDuration(duration){
      this.duration = duration;
    }

    AccelerateInterpolator(t){
        return Math.pow(t,2*this.factor);
    }

    AccelerateDecelerateInterpolator(t){ 
        return Math.cos((t + 1)*Math.PI)/2 + 0.5; 
    } 

    InterpolatorTypeChooser(t,type,c){
        var animateVal
        switch(type)
        {
          case 'Linear':
            animateVal = t;
            break;
          case 'Accelerate':
            animateVal = Math.pow(t,2 * c)
            break;
          case 'Decelerate':
            animateVal = 1 - Math.pow(1-t,2 * c)
            break;
          case 'AccelerateDecelerate':
            animateVal = Math.cos((t + 1)*Math.PI)/2 + 0.5;
            break;
          case 'Anticipate':
            animateVal = (c+1)*Math.pow(t,3) - c * Math.pow(t,2);
            break;
          case 'Overshoot':
            animateVal = (c + 1) * Math.pow(t - 1,3) + c * Math.pow(t - 1,2) + 1;
            break;
          case 'AnticipateOvershoot':
            animateVal = this.getAOSI(t,c);
            break;
          case 'Bounce':
            animateVal = this.getBounce(t);
            break;
          case 'Cycle':
            animateVal = Math.sin(2*Math.PI * c * t);
            break;
          default:
        }
        return animateVal;
    }

    aosiFunctionA(t,s) {
        return t * t * ((s + 1) * t - s);
    }
    aosiFunctionB(t,s) {
        return t * t * ((s + 1) * t + s);
    }

    getAOSI(t,f) {
        if (t < 0.5) return 0.5 * this.aosiFunctionA(t * 2.0, f*1.5);
        else return 0.5 * (this.aosiFunctionB(t * 2.0 - 2.0, f*1.5) + 2.0);
    }

    bounce(t){
        return t * t * 8.0;
    }

    getBounce(t){
        t *= 1.1226;
        if (t < 0.3535) return this.bounce(t);
        else if (t < 0.7408) return this.bounce(t - 0.54719) + 0.7;
        else if (t < 0.9644) return this.bounce(t - 0.8526) + 0.9;
        else return this.bounce(t - 1.0435) + 0.95;
    }

}
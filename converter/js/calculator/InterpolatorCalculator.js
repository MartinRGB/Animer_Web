class InterpolatorCalculator {
    constructor(factor) {
        this.factor = factor;
        this.array = this.interpolatorCalculator(this.factor);
    }

    interpolatorCalculator(factor) {  
        var transitionArray = [[0,0]];
        var sampleScale = 1.5;

        for (var i = 1/(60*sampleScale);i < 1;i += 1/(60*sampleScale)){

            if(i >= (59*sampleScale)/(60*sampleScale)){
                transitionArray.push([i,this.AccelerateDecelerateInterpolator(i)]);
                return transitionArray;
            }
            else{
                transitionArray.push([i,this.AccelerateDecelerateInterpolator(i)]);
            }
        }
    }

    AccelerateDecelerateInterpolator(t){ 
        return Math.cos((t + 1)*Math.PI)/2 + 0.5; 
    } 

}
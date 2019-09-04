class CustomSpringCalculator {
    constructor(factor,duration) {
        this.factor = factor;
        this.array = this.interpolatorCalculator();
        this.duration = duration;
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
        if(ratio == 0.0 || ratio == 1.0){
            return ratio;
        }
        else{
            var value = (Math.pow(2, -10 * ratio) * Math.sin((ratio - this.factor / 4.0) * (2.0 * Math.PI) / this.factor) + 1);
            return value;
        }
    } 

}
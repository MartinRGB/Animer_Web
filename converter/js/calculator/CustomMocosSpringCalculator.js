class CustomMocosSpringCalculator {
    constructor(tension,friction,velocity) {
        this.tension = tension;
        this.friction = friction;
        this.velocity = velocity;

        this.mGamma = 0;
        this.mVDiv2 = 0;
        this.mOscilative = false;
        this.mEps = 0;
        this.mA = 0;
        this.mB = 0;
        this.mDuration = 0;


        this.CustomMocosSpringInterpolator(this.tension,this.friction,this.velocity)
        this.array = this.interpolatorCalculator();
    }


    CustomMocosSpringInterpolator(tension, damping, velocity) {
        //mEps = eps;
        var _this = this;
        _this.mEps = 0.001;
        _this.mOscilative = (4 * tension - damping * damping > 0);
        if (_this.mOscilative) {
            _this.mGamma = Math.sqrt(4 * tension - damping * damping) / 2;
            _this.mVDiv2 = damping / 2;
        } else {
            _this.mGamma = Math.sqrt(damping * damping - 4 * tension) / 2;
            _this.mVDiv2 = damping / 2;
        }
        _this.setInitialVelocity(velocity);
    }

    setInitialVelocity(v0) {
        var _this = this;
        if (_this.mOscilative) {
            _this.mB = Math.atan(-_this.mGamma / (v0 - _this.mVDiv2));
            _this.mA = -1 / Math.sin(_this.mB);
            _this.mDuration = Math.log(Math.abs(_this.mA) / _this.mEps) / _this.mVDiv2;
        } else {
            _this.mA = (v0 - (_this.mGamma + _this.mVDiv2)) / (2 * _this.mGamma);
            _this.mB = -1 - _this.mA;
            _this.mDuration = Math.log(Math.abs(_this.mA) / _this.mEps) / (_this.mVDiv2 - _this.mGamma);
        }
    }

    getDesiredDuration() {
        var _this = this;
        return _this.mDuration;
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
        var _this = this;
        if (ratio >= 1) {
            return 1;
        }
        var t = ratio * _this.mDuration;
        return (_this.mOscilative ?
                (_this.mA * Math.exp(-_this.mVDiv2 * t) * Math.sin(_this.mGamma * t + _this.mB) + 1) :
                (_this.mA * Math.exp((_this.mGamma - _this.mVDiv2) * t) + _this.mB * Math.exp(-(_this.mGamma + _this.mVDiv2) * t) + 1));
    } 

}
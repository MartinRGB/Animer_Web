class DataDrivenPropertyAnimator{
    constructor(calculator){
        this.data = this.parseData(calculator);
        this.dataLength = this.data.length;
        this.stepSize = 1 / (this.dataLength - 1)
        this.element = null;
        this.property = 'translationY'
        this.from = 0;
        this.to = 1;
        this.duration = 1;
        this.animationFrame = null
        this.transformPrefixString = null;
        this.transformSuffixString = null;
        this.progress = 0;
        this.callback = null;

    }


    parseData(calc){
        var data = [];
        for (var i = 0;i <calc.array.length - 1;i++){
            data.push(calc.array[i][1]);
        }
        data.push([1,1])
        return data;
    }

    setAttribute(element,property,from,to,duration){
        this.element = element;
        this.property = property
        this.from = from;
        this.to = to;
        this.duration = duration/1000.;
        this.initAnimationProperty(property)
    }

    setMultipleAttribute(element,property,prefix,suffix,from,to,duration){
        this.element = element;
        this.property = property
        this.from = from;
        this.to = to;
        this.duration = duration/1000.;
        this.transformPrefixString = prefix;
        this.transformSuffixString = suffix;
    }

    setCallback(callback){
        this.callback = callback;
    }

    initAnimationProperty(property){
        var _this = this;
        switch (property){
            case 'translationX':
                _this.transformPrefixString =`translate3d(`
                _this.transformSuffixString =`px,0px,0px)`
                break;
            case 'translationY':
                _this.transformPrefixString =`translate3d(0px,`
                _this.transformSuffixString =`px,0px)`
                break;
            case 'translationZ':
                _this.transformPrefixString =`translate3d(0px,0px,`
                _this.transformSuffixString =`px)`
                break;
            case 'scale':
                _this.transformPrefixString =`scale(`
                _this.transformSuffixString =`)`
                break;
            case 'rotate':
                _this.transformPrefixString =`rotate(`
                _this.transformSuffixString =`deg)`
                break;
            default:
        }
    }


    start(){
        var count = 0
        var _this = this;
        
        _this.end();

        function animate () {
            if (count/60 >= _this.duration) {
                _this.cancel(_this.animationFrame)
                _this.finish();
                return
            }

            _this.progress = (count/60)/_this.duration;

            var interpolation = _this.getInterpolation(_this.progress,_this.data,_this.dataLength,_this.stepSize);
    
            _this.setProgress(interpolation);

    
            count++

            // console.log(_this.progress + 'progress')
            // console.log(count + 'frame')
            // console.log(count * 16 + 'ms')
            
            _this.animationFrame = requestAnimationFrame(animate)
        }
        
        animate()
    }

    delayStart(delay){

        var _this = this;
        
        setTimeout(function() {
            _this.start();
        }, delay);

    }

    cancel(animation){
        cancelAnimationFrame(animation)
    }

    setProgress(progress){
        var _this =this;

        if(_this.element != null){

            if(!Array.isArray(_this.element)){
                _this.element.style.transform = _this.transformPrefixString + (_this.from+(_this.to-_this.from) * progress) + _this.transformSuffixString
            }
            else{
                for (var i = 0;i < ((_this.element).length);i++){
                    _this.element[i].style.transform = _this.transformPrefixString[i] + (_this.from[i]+(_this.to[i]-_this.from[i]) * progress) + _this.transformSuffixString[i];
                }
            }

        }
    }

    end(){
        var _this = this;

        _this.cancel(_this.animationFrame)
        _this.progress = 0;


        if(_this.element != null){
            if(!Array.isArray(_this.element)){
                _this.element.style.transform = _this.transformPrefixString + (_this.from+(_this.to-_this.from) *  _this.progress) + _this.transformSuffixString
            }
            else{
                for (var i = 0;i < ((_this.element).length);i++){
                    _this.element[i].style.transform = _this.transformPrefixString[i] + (_this.from[i]+(_this.to[i]-_this.from[i]) *  _this.progress) + _this.transformSuffixString[i];
                }
            }

        }
    }


    getInterpolation(progress,data,length,step) {
        if (progress >= 1.0) {
            return 1.0;
        }
        if (progress <= 0) {
            return 0;
        }
  
        // Calculate index - We use min with length - 2 to avoid IndexOutOfBoundsException when
        // we lerp (linearly interpolate) in the return statement
        var position = parseInt(Math.min((progress * (length - 1)), length - 2));
        // Calculate values to account for small offsets as the lookup table has discrete values
        var quantized = position * step;
        var diff = progress - quantized;
        var weight = diff / step;
  
        // Linearly interpolate between the table values
        return data[position] + weight * (data[position + 1] - data[position]);
    }

    finish(){
        if(this.callback){
            this.callback()
        }
    }
}
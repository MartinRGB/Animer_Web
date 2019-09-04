class LookupTableCalculator{
    constructor(value){
        this.mValues = value;
        this.mLength = value.length;
        this.mStepSize = 1 / (this.mLength - 1)


        // #####  Map another array's length to 60 #####
        //this.data = this.getAnimationArray(this.mValues,this.mLength,this.mStepSize);

    }


    getAnimationArray(values,length,stepSize){

        var mArray = [];

        for (var i=1/60;i<1;i += 1/60){
            mArray.push(this.getInterpolation(i,values,length,stepSize))
        }
        mArray.push(1.0);

        return mArray;
    }


    getInterpolation(input,values,length,step) {
        if (input >= 1.0) {
            return 1.0;
        }
        if (input <= 0) {
            return 0;
        }

        // Calculate index - We use min with length - 2 to avoid IndexOutOfBoundsException when
        // we lerp (linearly interpolate) in the return statement
        var position = parseInt(Math.min((input * (length - 1)), length - 2));
        // Calculate values to account for small offsets as the lookup table has discrete values
        var quantized = position * step;
        var diff = input - quantized;
        var weight = diff / step;

        // Linearly interpolate between the table values
        return values[position] + weight * (values[position + 1] - values[position]);
    }
}
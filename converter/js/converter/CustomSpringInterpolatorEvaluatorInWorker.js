function CustomSpringInterpolatorCalculation(stiffness,damping){

    var options = {
        velocity: 0,
        epsilon: 1 / 1000,
        stiffness: stiffness,
        damping: damping,
        mass: 1
    }
    var value = findCloseNum(computeMaxValue());
    // var factor = value;

    function computeMaxValue() {
        let time = 0;
        let value = 0;
        let velocity = options.velocity;
        let maxValue = 0;

        while (!(time > 0 && Math.abs(velocity) < options.epsilon)) {

            time += options.epsilon;

            let k = 0 - options.stiffness;
            let b = 0 - options.damping;
            let F_spring = k * ((value) - 1);
            let F_damper = b * (velocity);

            velocity += ((F_spring + F_damper) / options.mass) * options.epsilon;
            value += velocity * options.epsilon;

            if (maxValue < value) {
                maxValue = value;
            }
        }
        return maxValue;
    }

    function computeSpringMax(factor) {
        let maxValue = 0;
        let epsilon = options.epsilon;
        let count = 1 / epsilon;
        for (let i = 0; i < count; i++) {
            let x = i * options.epsilon;
            let result = Math.pow(2, -10 * x) * Math.sin((x - factor / 4) * (2 * Math.PI) / factor) + 1;

            if (maxValue < result) {
                maxValue = result;
            }
        }
        return maxValue;
    }

    function findCloseNum(num) {
        let arr = new Array(1/options.epsilon);
        for (let i = 0; i < 1/options.epsilon; i++) {
            arr[i] = computeSpringMax(i * options.epsilon)
        }
        var index = 0;
        var d_value = Number.MAX_VALUE;
        for (var i = 0; i < arr.length; i++) {
            var new_d_value = Math.abs(arr[i] - num);
            if (new_d_value <= d_value) {
                if (new_d_value === d_value && arr[i] < arr[index]) {
                    continue;
                }
                index = i;
                d_value = new_d_value;
            }
        }
        return index / (1/options.epsilon);
    }

    return value;
}


onmessage = function(e) {
    //console.log('Worker: Message received from main script');
    let stiffness = e.data[0];
    let damping = e.data[1];
    let duration = e.data[2];
    var workerResult;
    let factor = CustomSpringInterpolatorCalculation(stiffness,damping);

    workerResult =  'Estimated time - ' + (duration*1000).toFixed(0) + 'ms    |    Factor - ' + factor +'f';
    //console.log('Worker: Posting message back to main script');
    postMessage(workerResult);
}
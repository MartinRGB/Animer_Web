class CustomSpringInterpolatorEvaluator {
    constructor(stiffness, damping) {
        this.options = {
            velocity: 0,
            epsilon: 1 / 1000,
            stiffness: stiffness,
            damping: damping,
            mass: 1
        }
        this.value = this.findCloseNum(this.computeMaxValue());
        this.factor = this.value;
    }

    computeMaxValue() {
        let time = 0;
        let value = 0;
        let velocity = this.options.velocity;
        let maxValue = 0;

        while (!(time > 0 && Math.abs(velocity) < this.options.epsilon)) {

            time += this.options.epsilon;

            let k = 0 - this.options.stiffness;
            let b = 0 - this.options.damping;
            let F_spring = k * ((value) - 1);
            let F_damper = b * (velocity);

            velocity += ((F_spring + F_damper) / this.options.mass) * this.options.epsilon;
            value += velocity * this.options.epsilon;

            if (maxValue < value) {
                maxValue = value;
            }
        }
        return maxValue;
    }

    computeSpringMax(factor) {
        let maxValue = 0;
        let epsilon = this.options.epsilon;
        let count = 1 / epsilon;
        for (let i = 0; i < count; i++) {
            let x = i * this.options.epsilon;
            let result = Math.pow(2, -10 * x) * Math.sin((x - factor / 4) * (2 * Math.PI) / factor) + 1;

            if (maxValue < result) {
                maxValue = result;
            }
        }
        return maxValue;
    }

    findCloseNum(num) {
        let arr = new Array(1/this.options.epsilon);
        for (let i = 0; i < 1/this.options.epsilon; i++) {
            arr[i] = this.computeSpringMax(i * this.options.epsilon)
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
        return index / (1/this.options.epsilon);
    }
}

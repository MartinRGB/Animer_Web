class OrigamiSpringConverter {
    constructor(bounciness, speed) {
        this.bounciness = bounciness;
        this.speed = speed;
        let b = this.normalize(bounciness / 1.7, 0, 20.0);
        b = this.projectNormal(b, 0.0, 0.8);
        let s = this.normalize(speed / 1.7, 0, 20.0);
        this.bouncyTension = this.projectNormal(s, 0.5, 200)
        this.bouncyFriction = this.quadraticOutInterpolation(b, this.b3Nobounce(this.bouncyTension), 0.01);

        // Output
        this.tension = this.tensionConversion(this.bouncyTension);
        this.friction = this.frictionConversion(this.bouncyFriction);
        this.stiffness = this.tension;
        this.damping = this.friction;
        this.dampingRatio = this.computeDampingRatio(this.tension, this.friction);
        this.duration = this.computeDuration(this.tension, this.friction);
    }

    computeDampingRatio(tension, friction) {
        let mass = 1.0;
        return friction / (2 * Math.sqrt(mass * tension));
    }

    computeDuration(tension, friction) {
        let epsilon = 0.001
        let velocity = 0.0
        let mass = 1.0
        let dampingRatio = this.computeDampingRatio(tension, friction)
        let undampedFrequency = Math.sqrt(tension / mass)
        if (dampingRatio < 1) {
            let a = Math.sqrt(1 - Math.pow(dampingRatio, 2))
            let b = velocity / (a * undampedFrequency)
            let c = dampingRatio / a
            let d = -((b - c) / epsilon)
            if (d <= 0) {
                return 0.0
            }
            return Math.log(d) / (dampingRatio * undampedFrequency)
        } else {
            return 0.0
        }
    }

    tensionConversion(oValue) {
        return (oValue - 30.0) * 3.62 + 194.0;
    }

    frictionConversion(oValue) {
        return (oValue - 8.0) * 3.0 + 25.0;
    }

    normalize(value, startValue, endValue) {
        return (value - startValue) / (endValue - startValue);
    }

    projectNormal(n, start, end) {
        return start + (n * (end - start));
    }

    linearInterpolation(t, start, end) {
        return t * end + (1.0 - t) * start;
    }

    quadraticOutInterpolation(t, start, end) {
        return this.linearInterpolation(2 * t - t * t, start, end);
    }


    b3Friction1(x) {
        return (0.0007 * Math.pow(x, 3)) -
            (0.031 * Math.pow(x, 2)) + 0.64 * x + 1.28;
    }

    b3Friction2(x) {
        return (0.000044 * Math.pow(x, 3)) -
            (0.006 * Math.pow(x, 2)) + 0.36 * x + 2.;
    }

    b3Friction3(x) {
        return (0.00000045 * Math.pow(x, 3)) -
            (0.000332 * Math.pow(x, 2)) + 0.1078 * x + 5.84;
    }

    b3Nobounce(tension) {
        let friction = 0;
        if (tension <= 18) {
            friction = this.b3Friction1(tension);
        } else if (tension > 18 && tension <= 44) {
            friction = this.b3Friction2(tension);
        } else {
            friction = this.b3Friction3(tension);
        }
        return friction;
    }
}

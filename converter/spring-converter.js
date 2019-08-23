/**
 * 将 Origami PopAnimation 参数转换为
 * iOS CASpringAnimation，UIView.animate(:usingSpringWithDamping)
 * Android SpringAnimation
 * 可用的参数
 */

 //Source Code fork from xiaolin's Spring Converter(https://github.com/xiaolin-uxe/spring-converter)

 // Origami -> Other
 class OrigamiSpringConverter {
    constructor(bounciness, speed) {
        this.bounciness = bounciness;
        this.speed = speed;
        let b = this.normalize(bounciness / 1.7, 0, 20.0);
        b = this.projectNormal(b, 0.0, 0.8);
        let s = this.normalize(speed / 1.7, 0, 20.0);
        this.bouncyTension = this.projectNormal(s, 0.5, 200)
        this.bouncyFriction = this.quadraticOutInterpolation(b, this.b3Nobounce(this.bouncyTension), 0.01);

        // console.log(s)
        // console.log(b)
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

 // Other -> Android Interpolator

class AndroidSpringInterpolatorEvaluator {
    constructor(stiffness, damping) {
        this.options = {
            velocity: 0,
            epsilon: 1 / 1000,
            stiffness: stiffness,
            damping: damping,
            mass: 1,
        }
        this.value = this.findCloseNum(this.computeMaxValue());
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
        for (let i = 0; i < 1000; i++) {
            let x = i * this.options.epsilon;
            let result = Math.pow(2, -10 * x) * Math.sin((x - factor / 4) * (2 * Math.PI) / factor) + 1;

            if (maxValue < result) {
                maxValue = result;
            }
        }
        return maxValue;
    }

    findCloseNum(num) {
        let arr = new Array(1000);
        for (let i = 0; i < 1000; i++) {
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
        return index / 1000;
    }
}


 // Android Dynamic Animation -> Other

class AndroidDynamicAnimationConverter {
    constructor(stiffness, dampingratio) {
        this.stiffness = stiffness;
        this.dampingratio = dampingratio;



        // Output
        this.damping = this.computeDamping(stiffness,dampingratio);
        this.tension = this.stiffness;
        this.friction = this.damping;
        this.bouncyTension = this.bouncyTesnionConversion(this.tension);
        this.bouncyFriction = this.bouncyFrictionConversion(this.friction);
        this.duration = this.computeDuration(this.tension, this.friction);

        this.s = this.getParaS(this.bouncyTension,0.5,200);
        this.speed = this.computeSpeed(this.getParaS(this.bouncyTension,0.5,200),0.,20.);
        this.b = this.getParaB(this.bouncyFriction,this.b3Nobounce(this.bouncyTension), 0.01);
        this.bounciness = 20*1.7*this.b/0.8;

    }


    //#M
    computeDamping(stiffness,dampingRatio){
        let mass = 1.0;
        return dampingRatio * (2 * Math.sqrt(mass * stiffness));
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

    computeDampingRatio(tension, friction) {
        let mass = 1.0;
        return friction / (2 * Math.sqrt(mass * tension));
    }
    
    bouncyTesnionConversion(tension){
        return (tension - 194.0)/3.62 + 30.;
    }
    bouncyFrictionConversion(friction){
        return (friction - 25.)/3. + 8.;
    }

    getParaS(n,start,end){
        return (n - start)/(end - start);
    }

    getParaB(final, start, end) {

        var a = 1;
		var b = -2;
		var c = (final - start)/(end-start);
 
		var root_part = Math.sqrt(b * b - 4 * a * c);
		var denom = 2 * a;
 
		var root1 = ( -b + root_part ) / denom;
        var root2 = ( -b - root_part ) / denom;
        
        
        if(root2 <0) return root1
        if(root1 <0) return root2
        return Math.min(root1,root2)

    }

    computeSpeed(value,startValue,endValue){
        return (value * (endValue - startValue) + startValue)*1.7 ;
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


 // Framer DHO Animation -> Other ,Mass Default 1

class FramerDHOConverter {
    constructor(stiffness, damping) {
        this.stiffness = stiffness;
        this.damping = damping;

        // Output
        
        this.tension = this.stiffness;
        this.friction = this.damping;
        this.dampingRatio = this.computeDampingRatio(stiffness, damping);
        this.bouncyTension = this.bouncyTesnionConversion(this.tension);
        this.bouncyFriction = this.bouncyFrictionConversion(this.friction);
        this.duration = this.computeDuration(this.tension, this.friction);

        this.s = this.getParaS(this.bouncyTension,0.5,200);
        this.speed = this.computeSpeed(this.getParaS(this.bouncyTension,0.5,200),0.,20.);
        this.b = this.getParaB(this.bouncyFriction,this.b3Nobounce(this.bouncyTension), 0.01);
        this.bounciness = 20*1.7*this.b/0.8;

    }


    //#M
    computeDamping(stiffness,dampingRatio){
        let mass = 1.0;
        return dampingRatio * (2 * Math.sqrt(mass * stiffness));
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

    computeDampingRatio(stiffness,damping){
        let mass = 1.0;
        return damping/ (2 * Math.sqrt(mass * stiffness));
    }
    
    bouncyTesnionConversion(tension){
        return (tension - 194.0)/3.62 + 30.;
    }
    bouncyFrictionConversion(friction){
        return (friction - 25.)/3. + 8.;
    }

    getParaS(n,start,end){
        return (n - start)/(end - start);
    }

    getParaB(final, start, end) {

        var a = 1;
		var b = -2;
		var c = (final - start)/(end-start);
 
		var root_part = Math.sqrt(b * b - 4 * a * c);
		var denom = 2 * a;
 
		var root1 = ( -b + root_part ) / denom;
        var root2 = ( -b - root_part ) / denom;
        
        
        if(root2 <0) return root1
        if(root1 <0) return root2
        return Math.min(root1,root2)

    }

    computeSpeed(value,startValue,endValue){
        return (value * (endValue - startValue) + startValue)*1.7 ;
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

 // Framer RK4 Animation -> Other

class FramerRK4Converter {
    constructor(stiffness, damping) {
        this.stiffness = (stiffness);
        this.damping = (damping);

        // Output
        
        this.tension = this.stiffness;
        this.friction = this.damping;
        this.dampingRatio = this.computeDampingRatio(stiffness, damping);
        this.bouncyTension = this.bouncyTesnionConversion(this.tension);
        this.bouncyFriction = this.bouncyFrictionConversion(this.friction);
        this.duration = this.computeDuration(this.tension, this.friction);

        this.s = this.getParaS(this.bouncyTension,0.5,200);
        this.speed = this.computeSpeed(this.getParaS(this.bouncyTension,0.5,200),0.,20.);
        this.b = this.getParaB(this.bouncyFriction,this.b3Nobounce(this.bouncyTension), 0.01);
        this.bounciness = 20*1.7*this.b/0.8;

    }


    //#M
    computeDamping(stiffness,dampingRatio){
        let mass = 1.0;
        return dampingRatio * (2 * Math.sqrt(mass * stiffness));
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

    computeDampingRatio(stiffness,damping){
        let mass = 1.0;
        return damping/ (2 * Math.sqrt(mass * stiffness));
    }

    tensionFromOrigamiValue(oValue) {
        return (oValue - 30.0) * 3.62 + 194.0;
    }

    frictionFromOrigamiValue(oValue) {
        return (oValue - 8.0) * 3.0 + 25.0;
    }
    
    bouncyTesnionConversion(tension){
        return (tension - 194.0)/3.62 + 30.;
    }
    bouncyFrictionConversion(friction){
        return (friction - 25.)/3. + 8.;
    }

    getParaS(n,start,end){
        return (n - start)/(end - start);
    }

    getParaB(final, start, end) {

        var a = 1;
		var b = -2;
		var c = (final - start)/(end-start);
 
		var root_part = Math.sqrt(b * b - 4 * a * c);
		var denom = 2 * a;
 
		var root1 = ( -b + root_part ) / denom;
        var root2 = ( -b - root_part ) / denom;
        
        
        if(root2 <0) return root1
        if(root1 <0) return root2
        return Math.min(root1,root2)

    }

    computeSpeed(value,startValue,endValue){
        return (value * (endValue - startValue) + startValue)*1.7 ;
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

class UIViewSpringConverter {
    constructor(dampingRatio, duration) {
        // this.stiffness = this.tensionFromOrigamiValue(stiffness);
        // this.damping = this.frictionFromOrigamiValue(damping);
        this.dampingRatio = (dampingRatio);
        this.duration = (duration);

        // Output
        
        this.friction = this.computeFriction(this.dampingRatio,this.duration);
        this.damping = this.friction;
        this.tension = this.computeTension(this.dampingRatio,this.friction);
        this.stiffness = this.tension;
       
        this.bouncyTension = this.bouncyTesnionConversion(this.tension);
        this.bouncyFriction = this.bouncyFrictionConversion(this.friction);

        this.s = this.getParaS(this.bouncyTension,0.5,200);
        this.speed = this.computeSpeed(this.getParaS(this.bouncyTension,0.5,200),0.,20.);
        this.b = this.getParaB(this.bouncyFriction,this.b3Nobounce(this.bouncyTension), 0.01);
        this.bounciness = 20*1.7*this.b/0.8;

    }

    computeFriction(dampingratio, duration) {
        var a = Math.sqrt(1 - Math.pow(dampingratio, 2));
        var d = (dampingratio/a)*1000.;

        return 2*Math.log(d)/duration;
    }

    computeTension(dampingratio, friction) {
        return Math.pow(friction/(dampingratio*2),2);
    }

    bouncyTesnionConversion(tension){
        return (tension - 194.0)/3.62 + 30.;
    }
    bouncyFrictionConversion(friction){
        return (friction - 25.)/3. + 8.;
    }

    getParaS(n,start,end){
        return (n - start)/(end - start);
    }

    getParaB(final, start, end) {

        var a = 1;
		var b = -2;
		var c = (final - start)/(end-start);
 
		var root_part = Math.sqrt(b * b - 4 * a * c);
		var denom = 2 * a;
 
		var root1 = ( -b + root_part ) / denom;
        var root2 = ( -b - root_part ) / denom;
        
        
        if(root2 <0) return root1
        if(root1 <0) return root2
        return Math.min(root1,root2)

    }

    computeSpeed(value,startValue,endValue){
        return (value * (endValue - startValue) + startValue)*1.7 ;
    }

    normalize(value, startValue, endValue) {
        return (value - startValue) / (endValue - startValue);
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






class FlingAnimationDurationEvaluator {
    constructor(velocity, dampingRatio) {

        this.friction = dampingRatio*-4.2;
        this.velocity = velocity;
        this.value = this.flingCalculator(this.velocity,this.friction);
    }

    flingCalculator(velocity,friction){

        for (var i = 1/60;i < 5.;i += 1/60){
           
            var currentVelocity = velocity * Math.exp(i * friction) ;
            var currentTransition = (velocity/ friction) * (Math.exp(friction * i ) - 1);
            var speedThereshold = 2.3;

            if(Math.abs(currentVelocity) <= speedThereshold){
                return [currentTransition,i]; //Math.round(i*60)
            }
            else{
                //console.log('transitionVal is: ' + currentTransition + 'currentVelocity is: ' + currentVelocity + 'currentFrame is: ' + Math.round(i*60));
            }
    
        }
    }
    
}




let bounciness = 5;
let speed = 10.;

let stiffness =  1500
let dampingRatio =  0.5

let framerStiffness =  50
let framerDamping =  2

let framerTension =  200
let framerFriction =  25

let uiviewspring_dampingratio = 0.5;
let uiviewspring_duration = 0.5;

let flingVelocity = -4000;
let flingDampingRatio = 0.8;


let spring = new OrigamiSpringConverter(bounciness, speed);
let factor = new AndroidSpringInterpolatorEvaluator(spring.stiffness, spring.damping);

let dyanmic = new AndroidDynamicAnimationConverter(stiffness,dampingRatio);
let factor2 = new AndroidSpringInterpolatorEvaluator(dyanmic.stiffness, dyanmic.damping);
let dho = new FramerDHOConverter(framerStiffness,framerDamping);
let rk4 = new FramerRK4Converter(framerTension,framerFriction);
let uiviewSpring = new UIViewSpringConverter(uiviewspring_dampingratio,uiviewspring_duration);
let mFling = new FlingAnimationDurationEvaluator(flingVelocity, flingDampingRatio);

let UIViewSpring = {
    dampingRatio: spring.dampingRatio,
    duration: spring.duration
}

let CASpring = {
    mass: 1,
    stiffness: spring.stiffness,
    damping: spring.damping,
    initialVelocity: 0
}

let DynamicSpring = {
    dampingRatio: spring.dampingRatio,
    stiffness: spring.stiffness
}

let SpringInterpolator = {
    factor: factor.value,
    duration: spring.duration
}

function OutputPara(isLog){
    
    if(isLog){
        console.log('\n[iOS]UIView.animate:usingSpringWithDamping: \n\tdampingRatio: ' + UIViewSpring.dampingRatio + '\n\tduration: ' + UIViewSpring.duration);
        console.log('\n[iOS]CASpringAnimation: \n\tmass = ' + CASpring.mass + '\n\tstiffness = ' + CASpring.stiffness + '\n\tdamping = ' + CASpring.damping + '\n\tinitialVelocity = ' + CASpring.initialVelocity);
        console.log('\n[Android]SpringAnimation: \n\tdampingRatio = ' + DynamicSpring.dampingRatio + '\n\tstiffness = ' + DynamicSpring.stiffness);
        console.log('\n[Android]SpringInterpolator: \n\tfactor = ' + SpringInterpolator.factor + '\n\tduration = ' + SpringInterpolator.duration);
        console.log('\n[Android]Rebound: \n\tSpringConfig.fromBouncinessAndSpeed('+ bounciness + ',' + speed +');');

        console.log('Spring Duration: ' + spring.duration)

        console.log('DyanamicAnimation -----> Bounciness: ' + Math.round(dyanmic.bounciness))
        console.log('DyanamicAnimation ----------> Speed: ' + Math.round(dyanmic.speed))
        console.log('DyanamicAnimation --> BouncyTension: ' + Math.round(dyanmic.bouncyTension))
        console.log('DyanamicAnimation -> BouncyFriction: ' + Math.round(dyanmic.bouncyFriction))
        console.log('DyanamicAnimation ------> Stiffness: ' + Math.round(dyanmic.stiffness))
        console.log('DyanamicAnimation --------> Damping: ' + Math.round(dyanmic.damping))
        console.log('DyanamicAnimation --------> Duration: ' + (dyanmic.duration))

        console.log('DHO Stiffness: ' + dho.stiffness)
        console.log('DHO DampingRatio: ' + dho.dampingRatio)
        console.log('DHO Duration: ' + dho.duration)

        console.log('RK4 Stiffness: ' + rk4.stiffness)
        console.log('RK4 DampingRatio: ' + rk4.dampingRatio)
        console.log('RK4 Duration: ' + rk4.duration)

        console.log('UIViewSpring Stiffness: ' + uiviewSpring.stiffness);
        console.log('UIViewSpring DampingRatio: ' + uiviewSpring.dampingRatio);

        console.log('UIViewSpring Bounciness: ' + uiviewSpring.bounciness);
        console.log('UIViewSpring Speed: ' + uiviewSpring.speed);

        console.log('transitionVal is: ' + mFling.value[0]  + 'totalTime is: ' + mFling.value[1]);
    }

}

OutputPara(false);
/////////////////////////
//  Backup
/////////////////////////

// function flingCalculator(velocity,dampingRatio){
//     var mRealFriction = dampingRatio*-4.2;

//     for (var i = 1/60;i < 4.;i += 1/60){
       
//         var mFlingVelocity = velocity * Math.exp(i * mRealFriction) ;
//         var valTransition = (velocity/ mRealFriction) * (Math.exp(mRealFriction * i ) - 1);

//         if(Math.abs(mFlingVelocity) <= 0.08){
//             return;
//         }
//         else{
//             console.log('transitionVal is: ' + valTransition + 'currentVelocity is: ' + mFlingVelocity + 'currentFrame is: ' + Math.round(i*60));
//         }

//     }
// }

//flingCalculator(-4000,0.8);

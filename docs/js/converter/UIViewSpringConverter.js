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
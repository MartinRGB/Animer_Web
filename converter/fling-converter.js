



class FlingAnimationCalculator {
    constructor(velocity, dampingRatio) {

        this.friction = dampingRatio*-4.2;
        this.velocity = velocity;

        this.value = this.flingCalculator(this.velocity,this.friction);
    }

    flingCalculator(velocity,friction){

        for (var i = 1/60;i < 4.;i += 1/60){
           
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

let fling = new FlingAnimationCalculator(-4000, 0.8);

console.log(fling.value)

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





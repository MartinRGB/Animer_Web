function DrawCurve(canvas,dataSet,halfSize){
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    var paddingLeft = canvas.width*canvas.paddingScale;
    var paddingRight = canvas.width*canvas.paddingScale;
    var paddingTop = halfSize?(canvas.height/2):canvas.height*canvas.paddingScale;
    var paddingBottom = canvas.height*canvas.paddingScale;
    var realWidth = canvas.width - paddingLeft - paddingRight;
    var realHeight = canvas.height - paddingBottom - paddingTop;

    // Draw the Background

    context.fillStyle = "#FFFFFF08";
    if(dataSet !=null){
        if(dataSet.duration == 0){
            context.fillStyle = "#FF000014";
        }
        else{
            
        }
    }
    else{
        
    }
    context.fillRect(paddingLeft, canvas.height*canvas.paddingScale, canvas.width - paddingLeft - paddingRight, canvas.height*(1- canvas.paddingScale*2));

    // Draw the Gradient Coordinate
    context.beginPath();

    var grad= context.createLinearGradient(0, canvas.height-paddingBottom, canvas.width, canvas.height-paddingBottom);
    grad.addColorStop(0, "transparent");
    grad.addColorStop(0.08, "grey");
    grad.addColorStop(0.92, "grey");
    grad.addColorStop(1.0, "transparent");
    context.strokeStyle = grad;
    context.lineWidth = 0.5;


    context.moveTo(0, canvas.height-paddingBottom);
    context.lineTo(canvas.width, canvas.height-paddingBottom);

    // if(halfSize){
    //     context.moveTo(0, canvas.height/2);
    //     context.lineTo(canvas.width, canvas.height/2);
    // }

    context.moveTo(0, canvas.height*canvas.paddingScale);
    context.lineTo(canvas.width, canvas.height*canvas.paddingScale);

    context.stroke();

    context.beginPath();

    var grad2= context.createLinearGradient(paddingLeft, 0, paddingLeft,canvas.height);
    grad2.addColorStop(0, "transparent");
    grad2.addColorStop(0.08, "grey");
    grad2.addColorStop(0.92, "grey");
    grad2.addColorStop(1.0, "transparent");
    context.strokeStyle = grad2;
    context.lineWidth = 0.5;

    context.moveTo(paddingLeft, 0);
    context.lineTo(paddingLeft, canvas.height);

    context.moveTo(canvas.width - paddingRight, 0);
    context.lineTo(canvas.width - paddingRight, canvas.height);

    context.stroke();


   //console.log(dataSet.duration)

    if(dataSet != null){
        if(dataSet.bezier !=null){
            //Draw the BezierControlLine
            context.beginPath();
            context.strokeStyle = dataSet.editable?"#009CFF":"#a7a7a7";
            context.lineWidth = 4;
            context.moveTo(paddingLeft, canvas.height - paddingBottom);
            context.lineTo(paddingLeft + realWidth*dataSet.bezier[0], (canvas.height - paddingBottom) - realHeight*dataSet.bezier[1]);

            context.moveTo(canvas.width - paddingRight, paddingTop);
            context.lineTo(paddingLeft + realWidth*dataSet.bezier[2], (canvas.height - paddingBottom)- realHeight*dataSet.bezier[3]);
            context.stroke();
        }
        // context.beginPath();
        // context.arc(paddingLeft + realWidth*bezier[0], (canvas.height - paddingBottom) - realHeight*bezier[1], controlPointRadius, 0, 2 * Math.PI);
        // context.arc(paddingLeft + realWidth*bezier[2], (canvas.height - paddingBottom)- realHeight*bezier[3], controlPointRadius, 0, 2 * Math.PI);
        // context.fillStyle = 'blue';
        // context.fill();

        // point1x = paddingLeft + realWidth*bezier[0];
        // point1y = (canvas.height - paddingBottom) - realHeight*bezier[1];
        // point2x = paddingLeft + realWidth*bezier[2];
        // point2y = (canvas.height - paddingBottom) - realHeight*bezier[3];

        // console.log("1x: " + point1x/canvasDensity + " 1y: " + point1y/canvasDensity)
        // console.log("2x: " + point2x/canvasDensity + " 2y: " + point2y/canvasDensity)


        //Draw the Bezier Line
        var frameCount = dataSet.array.length;
        var transitionArray = dataSet.array;

        context.beginPath();
        context.strokeStyle = "#8255FF";
        context.shadowColor = '#0000003b';
        context.shadowBlur = 4;
        context.moveTo(paddingLeft, canvas.height-paddingBottom);

        for (i = 0; i < frameCount-1; i++)
        {
            var cX = i * (canvas.width - paddingLeft - paddingRight) / frameCount + paddingLeft;
            var nX = (i+1) * (canvas.width - paddingLeft - paddingRight) / frameCount + paddingLeft;
            var cY = (canvas.height - paddingBottom - paddingTop) - transitionArray[i][1]*(canvas.height - paddingBottom - paddingTop)/transitionArray[frameCount-1][1] + paddingTop;
            var nY = (canvas.height - paddingBottom - paddingTop) - transitionArray[i+1][1]*(canvas.height - paddingBottom - paddingTop)/transitionArray[frameCount-1][1] + paddingTop;
            var cXCenter = (cX + nX)/2;
            var cYCenter = (cY + nY)/2;
            if(i == frameCount - 2){
                context.quadraticCurveTo(cX, cY, (canvas.width - paddingRight),(paddingTop));
            } 
            else{
                context.quadraticCurveTo(cX, cY, cXCenter, cYCenter);
            }
        }

        // for (i = 0; i < frameCount; i++)
        // {
        //     var cX = i * (canvas.width - paddingLeft - paddingRight) / frameCount + paddingLeft;
        //     var cY = (canvas.height - paddingBottom - paddingTop) - transitionArray[i][1]*(canvas.height - paddingBottom - paddingTop)/transitionArray[frameCount-1][1] + paddingTop;
        //     context.lineTo(cX, cY);
        // }

        context.lineWidth = 4;
        context.lineCap = "round";
        context.stroke();
    }
}
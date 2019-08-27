function DrawCurve(canvas,dataSet,halfSize){
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    var paddingLeft = canvas.width*canvas.paddingScale;
    var paddingRight = canvas.width*canvas.paddingScale;
    var paddingTop = halfSize?(canvas.height/2):canvas.height*canvas.paddingScale;
    var paddingBottom = canvas.height*canvas.paddingScale;
    var realWidth = canvas.width - paddingLeft - paddingRight;
    var realHeight = canvas.height - paddingBottom - paddingTop;

    var frameCount = dataSet.array.length;
    var transitionArray = dataSet.array;

    //Draw the Coordinate
    context.beginPath();
    context.strokeStyle = "grey";
    context.lineWidth = 0.5;
    context.moveTo(0, canvas.height-paddingBottom);
    context.lineTo(canvas.width, canvas.height-paddingBottom);

    context.moveTo(0, canvas.height/2);
    context.lineTo(canvas.width, canvas.height/2);

    context.moveTo(0, canvas.height*canvas.paddingScale);
    context.lineTo(canvas.width, canvas.height*canvas.paddingScale);

    context.moveTo(paddingLeft, 0);
    context.lineTo(paddingLeft, canvas.height);

    context.moveTo(canvas.width - paddingRight, 0);
    context.lineTo(canvas.width - paddingRight, canvas.height);

    context.stroke();

    //Draw the BezierLine
    if(dataSet.bezier !=null){
        context.beginPath();
        context.strokeStyle = "rgba(33,150,243,0.5)";
        context.lineWidth = 4;
        context.moveTo(paddingLeft, canvas.height - paddingBottom);
        context.lineTo(paddingLeft + realWidth*dataSet.bezier[0], (canvas.height - paddingBottom) - realHeight*dataSet.bezier[1]);

        context.moveTo(canvas.width - paddingRight, paddingTop);
        context.lineTo(paddingLeft + realWidth*dataSet.bezier[2], (canvas.height - paddingBottom)- realHeight*dataSet.bezier[3]);
        context.stroke();

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

    }


    //Draw the Curve
    context.beginPath();
    context.strokeStyle = "green";
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

    context.lineWidth = 4;
    context.lineCap = "round";
    context.stroke();
}
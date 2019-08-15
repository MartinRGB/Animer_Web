#target aftereffects

// Android Interpolaotr 0.0.1
// MartinRGB 2019 (mail@ianhaigh.com)

// An After Effects adaptation of Android Interpolator equations.

SPRING_CODE = 	
"//var factor = 0.5;\n" + 

"var config = undefined;\n" + 
"var isPathShape = false;\n" + 

"function getCurrentInterpolation(ratio) {\n" + 
"        if (ratio == 0.0 || ratio == 1.0){\n" + 
"            return ratio;\n" + 
"    }\n" + 
"        else {\n" + 
"            var value =  Math.pow(2, -10 * ratio) * Math.sin((ratio - factor / 4.0) * (2.0 * Math.PI) / factor) + 1;\n" + 
"            return value;\n" + 
"        }\n" + 
"}\n" + 

"function calculate(a,b,c,d,e) {\n" + 
"        var k = c*getCurrentInterpolation(a/d)+b;\n" + 
"        return k;\n" + 
"}\n"

BOUNCE_CODE = 
"//var mTension = 0.;\n" + 
"//var mFriction = 0.;\n" + 

"var config = undefined;\n" + 
"var isPathShape = false;\n" + 

"//Parameters\n" + 
"var maxStifness = 50.;\n" + 
"var maxFrictionMultipler = 1.;\n" + 

"//Curve Position parameters(No Adjust)\n" + 
"var amplitude = 1.;\n" + 
"var phase = 0.;\n" + 

"//Original Scale parameters(Better No Adjust)\n" + 
"var originalStiffness = 12.;\n" + 
"var originalFrictionMultipler = 0.3;\n" + 
"var mass = 0.058;\n" + 

"//Internal parameters\n" + 
"var pulsation = Math.sqrt((originalStiffness + mTension) / mass);\n" + 
"var friction = (originalFrictionMultipler + mFriction) * pulsation;\n" + 

"function getCurrentInterpolation(ratio) {\n" + 
"    if (ratio == 0.0 || ratio == 1.0)\n" + 
"        return ratio;\n" + 
"    else {\n" + 
"        var value = amplitude * Math.exp(-friction * ratio) * Math.cos(pulsation * ratio + phase) ;\n" + 
"        return -Math.abs(value)+1.;\n" + 
"    }\n" + 
"}\n" + 

"function calculate(t,b,c,d) {\n" + 
"    return c*getCurrentInterpolation(t/d) + b;\n" + 
"}\n"

DAMPING_CODE = 
"//var mTension = 0.;\n" + 
"//var mFriction = 0.;\n" + 

"var config = undefined;\n" + 
"var isPathShape = false;\n" + 

"//Parameters\n" + 
"var maxStifness = 50.;\n" + 
"var maxFrictionMultipler = 1.;\n" + 

"//Curve Position parameters(No Adjust)\n" + 
"var amplitude = 1.;\n" + 
"var phase = 0.;\n" + 

"//Original Scale parameters(Better No Adjust)\n" + 
"var originalStiffness = 12.;\n" + 
"var originalFrictionMultipler = 0.3;\n" + 
"var mass = 0.058;\n" + 

"//Internal parameters\n" + 
"var pulsation = Math.sqrt((originalStiffness + mTension) / mass);\n" + 
"var friction = (originalFrictionMultipler + mFriction) * pulsation;\n" + 

"function getCurrentInterpolation(ratio) {\n" + 
"    if (ratio == 0.0 || ratio == 1.0)\n" + 
"        return ratio;\n" + 
"    else {\n" + 
"        var value = amplitude * Math.exp(-friction * ratio) * Math.cos(pulsation * ratio + phase) ;\n" + 
"        return -value+1.;\n" + 
"    }\n" + 
"}\n" + 

"function calculate(t,b,c,d) {\n" + 
"    return c*getCurrentInterpolation(t/d) + b;\n" + 
"}\n"

MOCOSSPRING_CODE =
"//var tension = 100.;\n" + 
"//var damping = 15.;\n" + 
"//var v0 = 20.;\n" + 

"var config = undefined;\n" + 
"var isPathShape = false;\n" + 

"var mGamma = 0., mVDiv2 = 0.;\n" + 
"var mEps = 0.001;\n" + 

"var mA = 0., mB = 0.;\n" + 
"var mDuration = 1000.;\n" + 

"if(4 * tension - damping * damping > 0){\n" + 
"        mGamma = Math.sqrt(4 * tension - damping * damping) / 2;\n" + 
"        mVDiv2 = damping / 2;\n" + 
"        mB = Math.atan(-mGamma / (v0 - mVDiv2));\n" + 
"        mA = -1 / Math.sin(mB);\n" + 
"        mDuration = Math.log(Math.abs(mA) / mEps) / mVDiv2;\n" + 
"}\n" + 
"else{\n" + 
"        mGamma = Math.sqrt(damping * damping - 4 * tension) / 2;\n" + 
"        mVDiv2 = damping / 2;\n" + 
"        mA = (v0 - (mGamma + mVDiv2)) / (2 * mGamma);\n" + 
"        mB = -1 - mA;\n" + 
"        mDuration = Math.log(Math.abs(mA) / mEps) / (mVDiv2 - mGamma);\n" + 

"}\n" + 

"function getDesiredDuration() {\n" + 
"    return mDuration;\n" + 
"}\n" + 

"function getCurrentInterpolation(ratio) {\n" + 
"    if (ratio >= 1) {\n" + 
"        return 1;\n" + 
"    }\n" + 
"    var t = ratio * mDuration;\n" + 
"        if(4 * tension - damping * damping > 0){\n" + 
"    return (mA * Math.exp(-mVDiv2 * t) * Math.sin(mGamma * t + mB) + 1) \n" + 
"    }\n" + 
"    else{\n" + 
"    return (mA * Math.exp((mGamma - mVDiv2) * t) + mB * Math.exp(-(mGamma + mVDiv2) * t) + 1)\n" + 
"    }\n" + 
"}\n" + 
"function calculate(t,b,c,d) {\n" + 
"    return c*getCurrentInterpolation(t/d) + b;\n" + 
"}\n"

ANDROIDSPRING_CODE = 
"//mStiffness = 1500;\n" + 
"//mDampingRatio = 0.5;\n" + 
"//mVelocity = 0.;\n" + 

"var config = undefined;\n" + 
"var isPathShape = false;\n" + 

"function getCurrentInterpolation(progress,time){\n" + 
"    if (progress >= 1) {\n" + 
"        return 1;\n" + 
"    }else{\n" + 
"        var deltaT = time;\n" + 
"        var starVal = 0;\n" + 
"        var endVal = 1;\n" + 

"        var mNaturalFreq = Math.sqrt(mStiffness);\n" + 
"        var mDampedFreq = mNaturalFreq*Math.sqrt(1.0 - mDampingRatio* mDampingRatio);\n" + 
"        var lastVelocity =  mVelocity;\n" + 
"        var lastDisplacement  = progress -  endVal;\n" + 
"        var coeffB = 1.0 / mDampedFreq * (mDampingRatio * mNaturalFreq * lastDisplacement + lastVelocity);\n" + 
"        var displacement = Math.pow(Math.E,-mDampingRatio * mNaturalFreq * deltaT) * (lastDisplacement * Math.cos(mDampedFreq * deltaT) + coeffB * Math.sin(mDampedFreq * deltaT));\n" + 
"        var mValue = displacement + endVal;\n" + 

"        if(time = 0){\n" + 
"            return starVal;\n" + 
"        }\n" + 
"        else{\n" + 
"            return mValue;\n" + 
"        }\n" + 
"    }\n" + 
"}\n" + 

"function calculate(t,b,c,d) {\n" + 
"    return c*getCurrentInterpolation(t/d,t) + b;\n" + 
"} \n"	

NORMALIZED_EASING_FUNCTION = 
"function getDimensions()\n" +
"{\n" +
"    try { key(1)[2]; return 3; } catch(e) { }\n" +
"    try { key(1)[1]; return 2; } catch(e) { }\n" +
"    return 1;\n" +
"}\n" +
"function getNormalizedValue(value, dim)\n" +
"{\n" +
"    if (dim == 1)\n" +
"        return [value];\n" +
"    var vals = []\n" +
"    for (var i=0; i < dim; i++)\n" +
"        vals.push(value[i]);\n" +
"    return vals;\n" +
"}\n" +
"function easeBootstrap()\n" +
"{\n" +
"    if (numKeys < 2)\n" +
"        return value;\n" +
"    var n = 0;\n" +
"    if (numKeys > 0) {\n" +
"        n = nearestKey(time).index;\n" +
"        if (key(n).time > time) { n-- }\n" +
"    }\n" +
"    try {\n" +
"        var key1 = key(n);\n" +
"        var key2 = key(n+1);\n" +
"    } catch(e) {\n" +
"        return null;\n" +
"    }\n" +
"    var t = time - key1.time;\n" +
"    var d = key2.time - key1.time;\n" +
"    // If there is a 3rd keyframe then stop at it.\n" +
"    if (numKeys >= n + 2)\n" +
"    {\n" +
"        key3 = key(n + 2);\n" +
"        if (time > key3.time)\n" +
"            return value;\n" +
"    }\n" +
"    if (isPathShape)\n" +
"    {\n" +
"        var b = key1.time;\n" +
"        var c = key2.time - key1.time;\n" +
"        return valueAtTime(calculate(t, b, c, d));\n" +
"    }\n" +
"    else\n" +
"    {\n" +
"        var values = [];\n" +
"        var propertyDimensions = getDimensions();\n" +
"        var vals = getNormalizedValue(value, propertyDimensions);\n" +
"        for (var i=0; i < propertyDimensions; i++)\n" +
"        {\n" +
"            var b = key1[i];\n" +
"            var c = key2[i] - key1[i];\n" +
"            values.push(calculate(t, b, c, d));\n" +
"        }\n" +
"        if (propertyDimensions == 1)\n" +
"            return values[0];\n" +
"        else\n" +
"            return values;\n" +
"    }\n" +
"}\n" +
"try { easeBootstrap() || value; } catch(e) { value; }\n"


function android_interpolator_script(ui_reference) {

	var android_interpolator = {}; // put all global variables on this object to avoid namespace clashes

	android_interpolator.CLEAR_EXPRESSION_BTN     = false; // this adds a button to the palette, "clear", that deletes expressions on all selected properties. Off by default.
	android_interpolator.VERSION                  = "0.0.1";
	android_interpolator.interpolatorEquation           = "";
	android_interpolator.palette                  = {};

	// palette controls
	android_interpolator.interpolatorList               = {};

	var INTERPOLATOR_MODE = 1;
	var factor1 = 0.5,factor2 = 0,factor3 = 0;
	var prefixParameters;

	android_interpolator.INTERPOLATOR_SETTINGS_KEY     = "spring"; 

	android_interpolator.interpolatorTypesAry = ['Spring','Bounce', 'Damping', 'MocosSpring','-','AndroidSpring']

	android_interpolator.TOOLTIP_INTERPOLATOR       = "选择物理插值器的类型";

	android_interpolator.strHelpText = 
	"Android Interpolaotr 使用 「时间轴 - 关键帧 - 插值」 的方式，去模拟 「迭代式」 力学动画。\n" +
	"\n" +
	"首先选择关键帧，然后选择插值器类型，参数调节完成后点击 「应用」 按钮即可 \n" + 
	"\n" +
	"(其中的 AndroidSpring 是 Android API 25 中迭代动画系统 DynamicAnimation 的 插值版本，参数完全对齐，只要保证足够的震荡时间即可)\n" 
	

	function an_main(thisObj)
	{ 
		an_createPalette(thisObj);
	}


	function an_set_interpolator_menu() {
		android_interpolator.interpolatorList.selection = 0;
	}

	function an_createPalette(thisObj)
	{
		var LIST_DIMENSIONS = [0, 0, 140, 15];
		var STATIC_TEXT_DIMENSIONS = [0, 0, 60, 15];

		android_interpolator.palette = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Easing", undefined, {resizeable: true});
		android_interpolator.palette.margins       = 6;
		android_interpolator.palette.alignChildren = 'left';

		// fix the text display in the popup menu - thanks Jeff Almasol
		var winGfx          = android_interpolator.palette.graphics;
		var darkColorBrush  = winGfx.newPen(winGfx.BrushType.SOLID_COLOR, [0,0,0], 1);
		var lightColorBrush = winGfx.newPen(winGfx.BrushType.SOLID_COLOR, [1,1,1], 1);

		// popup menus

		// "slider" group

		var	slGrp1 = android_interpolator.palette.add('group', undefined, 'Slider Group 1');
		var text1 = slGrp1.add('statictext', STATIC_TEXT_DIMENSIONS, 'Factor1:');
		var slider1 = slGrp1.add("slider", undefined, thisObj.numRows, 0, 100.);
		slider1.size = 'width: 150, height: 20';
		var value1 = slGrp1.add('statictext', STATIC_TEXT_DIMENSIONS, '0.5f');
		slider1.onChanging = function () {  
			if(INTERPOLATOR_MODE == 1){
				value1.text = slider1.value.toFixed(1).toString()/100. + '.f';
				factor1 = slider1.value.toFixed(1)/100.;
			}
			else if(INTERPOLATOR_MODE == 4){
				value1.text = (slider1.value*2.).toFixed(1).toString() + '.f';
				factor1 = (slider1.value*2.).toFixed(1);
			}
			else if(INTERPOLATOR_MODE == 5){
				value1.text = (slider1.value*30.).toFixed(1).toString() + '.f';
				factor1 = (slider1.value*30.).toFixed(1);
			}
			else{
				value1.text = slider1.value.toFixed(1).toString() + '.f';
				factor1 = slider1.value.toFixed(1);
			}

		}
		slider1.value = 50.;
		factor1 = 0.5;
				
		var	slGrp2 = android_interpolator.palette.add('group', undefined, 'Slider Group 2');
		slGrp2.visible = false;
		var text2 = slGrp2.add('statictext', STATIC_TEXT_DIMENSIONS, 'Factor2:');
		var slider2 = slGrp2.add("slider", undefined, thisObj.numRows, 0, 100);
		slider2.size = 'width: 150, height: 20';
		var value2 = slGrp2.add('statictext', STATIC_TEXT_DIMENSIONS, '100.f');
		slider2.onChanging = function () {  

			if(INTERPOLATOR_MODE == 2 || INTERPOLATOR_MODE == 3){
				value2.text = slider2.value.toFixed(1).toString()/10. + '.f';
				factor2 = slider2.value.toFixed(1)/10.;
			}
			else if(INTERPOLATOR_MODE == 5){
				value2.text = (slider2.value).toFixed(1).toString()/100. + '.f';
				factor2 = slider2.value.toFixed(1)/100.;
			}
			else{
				value2.text = slider2.value.toFixed(1).toString() + '.f';
				factor2 = slider2.value.toFixed(1);
			}
		}


		var	slGrp3 = android_interpolator.palette.add('group', undefined, 'Slider Group 3');
		slGrp3.visible = false;
		var text3 = slGrp3.add('statictext', STATIC_TEXT_DIMENSIONS, 'Factor3:');
		var slider3 = slGrp3.add("slider", undefined, thisObj.numRows, 0, 100);
		slider3.size = 'width: 150, height: 20';
		var value3 = slGrp3.add('statictext', STATIC_TEXT_DIMENSIONS, '100.f');
		slider3.onChanging = function () {  

			if(INTERPOLATOR_MODE == 4){
				value3.text = slider3.value.toFixed(1).toString() + '.f';
				factor3 = slider3.value.toFixed(1);
			}
			else if(INTERPOLATOR_MODE == 5){
				value3.text = (slider3.value*5.).toFixed(1).toString() + '.f';
				factor3 = (slider3.value*5.).toFixed(1);
			}

		}
				

		// "interpolator" menu

		var	interpolatorGrp = android_interpolator.palette.add('group', undefined, 'Easing group');
		interpolatorGrp.add('statictext', STATIC_TEXT_DIMENSIONS, '弹性类型:');

			android_interpolator.interpolatorList                          = interpolatorGrp.add('dropdownlist', LIST_DIMENSIONS, android_interpolator.interpolatorTypesAry);
			android_interpolator.interpolatorList.helpTip                  = android_interpolator.TOOLTIP_INTERPOLATOR;
			android_interpolator.interpolatorList.graphics.foregroundColor = darkColorBrush;

			an_set_interpolator_menu();

			android_interpolator.interpolatorList.onChange = function() {
				if (this.selection == null) {
					// tried to select a greyed-out item, ignore
					an_set_interpolator_menu();
					return;
				} else {
					app.settings.saveSetting("androidinterpolator", android_interpolator.INTERPOLATOR_SETTINGS_KEY, this.selection.toString());
					//alert("yo, you selected item " + this.selection.index);
					switch(this.selection.index) {
						case 0:
							INTERPOLATOR_MODE = 1;
							text1.text = 'Factor:';
							value1.text = '0.5f'
							slider1.max = 1;
							slider1.value = 50
							slGrp2.visible = false;
							slGrp3.visible = false;
							factor1 = 0.5;
							prefixParameters = 'var factor = 0.5; \n'
							break;
						case 1:
							INTERPOLATOR_MODE = 2;
							text1.text = 'Tension:';
							text2.text = 'Friction:';
							slider1.max = 20;
							slider2.max = 20;
							slider1.value = 0;
							slider2.value = 0;
							value1.text = '0.f'
							value2.text = '0.f'
							slGrp2.visible = true;
							slGrp3.visible = false;
							factor1 = 0.;
							factor2 = 0.;
							prefixParameters = 'var mTension = 0.;\n var mFriction = 0.;\n'
							break;
						case 2:
							INTERPOLATOR_MODE = 3;
							text1.text = 'Tension:';
							text2.text = 'Friction:';
							slider1.max = 20;
							slider2.max = 20;
							slider1.value = 0;
							slider2.value = 0;
							value1.text = '0.f'
							value2.text = '0.f'
							slGrp2.visible = true;
							slGrp3.visible = false;
							factor1 = 0.;
							factor2 = 0.;
							prefixParameters = 'var mTension = 0.;\n var mFriction = 0.;\n'
							break;
						case 3:
							INTERPOLATOR_MODE = 4;
							text1.text = 'Tension:';
							text2.text = 'Friction:';
							text3.text = 'Velocity:';
							slider1.max = 100;
							slider2.max = 100;
							slider3.max = 100;
							slider1.value = 50;
							slider2.value = 15;
							slider3.value = 20;
							value1.text = '100.f'
							value2.text = '15.f'
							value3.text = '20.f'
							slGrp2.visible = true;
							slGrp3.visible = true;
							factor1 = 100.;
							factor2 = 15.;
							factor3 = 20.;
							prefixParameters = 'var tension = 100.;\nvar damping = 15.;\nvar v0 = 20.;\n'
							break;
						case 5:
							INTERPOLATOR_MODE = 5;
							text1.text = 'Stiffness:';
							text2.text = 'Damping:';
							text3.text = 'Velocity:';
							slider1.max = 100;
							slider2.max = 100;
							slider3.max = 100;
							slider1.value = 50;
							slider2.value = 50;
							slider3.value = 0;
							value1.text = '1500.f'
							value2.text = '0.5f'
							value3.text = '0.f'
							slGrp2.visible = true;
							slGrp3.visible = true;
							factor1 = 1500.;
							factor2 = 0.5;
							factor3 = 0.;
							prefixParameters = 'var mStiffness = 1500.;\nvar mDampingRatio = 0.5;\nvar mVelocity = 0.;\n'
							break;
						default:
					}

				}
			}


		////////////////////
		// apply button
		////////////////////

		var buttonGrp = android_interpolator.palette.add('group', undefined, 'Button group');
		buttonGrp.add('statictext', STATIC_TEXT_DIMENSIONS, '');

		var applyBtn     = buttonGrp.add('button', undefined, '应用');
		applyBtn.onClick = an_applyExpressions;
		var helpBtn      = buttonGrp.add("button {text:'?', maximumSize:[30,30]}");
		helpBtn.onClick  = function() {alert("Android Interpolator v" + android_interpolator.VERSION + "\n" + android_interpolator.strHelpText, "Android Interpolator")};


		if (android_interpolator.palette instanceof Window) {
			android_interpolator.palette.show();
		} else {
			android_interpolator.palette.layout.layout(true);
		}

	}


	function an_trace(s) { // for debugging
		//$.writeln(s); // writes to the ExtendScript interface
		writeLn(s); // writes in the AE info window
	}

	function getParameters(mode_num){
		switch(mode_num) {
			case 1:
				prefixParameters = 'var factor = '+factor1.toString()+'; \n';
				break;
			case 2:
				prefixParameters = 'var mTension = '+factor1.toString()+';\n var mFriction = '+factor2.toString()+';\n';
				break;
			case 3:
				prefixParameters = 'var mTension = '+factor1.toString()+';\n var mFriction = '+factor2.toString()+';\n';
				break;
			case 4:
				prefixParameters = 'var tension = '+factor1.toString()+';\n var damping = '+factor2.toString()+';\n var v0 = '+factor3.toString()+';\n';
				break;
			case 5:
				prefixParameters = 'var mStiffness = '+factor1.toString()+';\n var mDampingRatio = '+factor2.toString()+';\n var mVelocity = '+factor3.toString()+';\n';
				break;
			default:

		}
	}

	function getInterpolatorType(mode_num){
		switch(mode_num) {
			case 1:
				return SPRING_CODE
				break;
			case 2:
				return BOUNCE_CODE
				break;
			case 3:
				return DAMPING_CODE
				break;
			case 4:
				return MOCOSSPRING_CODE
				break;
			case 5:
				return ANDROIDSPRING_CODE
				break;
			default:
		}
	}

	function an_applyExpressions() { // decide what external file to load

		if (!an_canProceed()) { return false; }

		app.beginUndoGroup("Android Interpolator");

		try {
			getParameters(INTERPOLATOR_MODE);
			android_interpolator.interpolatorEquation = prefixParameters + getInterpolatorType(INTERPOLATOR_MODE) + NORMALIZED_EASING_FUNCTION;
		} catch(e) {
			Window.alert(e);
			return false;
		}

		an_setProps(android_interpolator.interpolatorEquation);
		app.endUndoGroup();
	}

	function an_clearExpressions()
	{//{{{
		// TODO : "Object is invalid"
		// TODO : "null is not an object"
		var selectedProperties = activeItem.selectedProperties;
		for (var f in selectedProperties)
		{
			var currentProperty = selectedProperties[f];
			if (!currentProperty.canSetExpression) { continue; }
			currentProperty.expression = '';
		}
	}

	function an_setProps(expressionCode)
	{
		var selectedProperties = app.project.activeItem.selectedProperties;
		var numOfChangedProperties = 0;

		for (var f in selectedProperties)
		{
			var currentProperty = selectedProperties[f];

			if ((currentProperty.propertyValueType == PropertyValueType.SHAPE)) {
				//alert(android_interpolator.CURVACEOUS_ERROR_TXT);
				alert ('wrong!');
				continue;
			}

			if (!currentProperty.canSetExpression) { continue } // don't do anything if we can't set an expression
			if (currentProperty.numKeys < 2) { continue }       // likewise if there aren't at least two keyframes

			currentProperty.expression = expressionCode;
			numOfChangedProperties++;
		}
		// clearOutput(); // TODO
		// an_trace("Ease and Wizz:")
		var easingType = android_interpolator.interpolatorList.selection.toString();
		if (numOfChangedProperties == 1) {
			an_trace("Applied \"" +  easingType + "\" to one property.");
		} else {
			an_trace("Applied \"" +  easingType + "\" to " + numOfChangedProperties + " properties.");
		}
	}

	function an_canProceed()
	{ 
		var activeItem = app.project.activeItem;
		if (activeItem === null) {
			alert("Select a keyframe or two.");
			return false;
		}
		if (activeItem.selectedProperties == "") {
			alert("Please select at least one keyframe.")
			return false;
		}

		return true;
	}

	an_main(ui_reference);

}

android_interpolator_script(this);

#target aftereffects

// Physics Interpolaotr 0.1.0
// MartinRGB 2019 (mail@ianhaigh.com)

// An After Effects adaptation of Android Physics Interpolator equations.

function physics_interpolator_script(ui_reference) {

	var physics_interpolator = {}; // put all global variables on this object to avoid namespace clashes

	physics_interpolator.PHYSICS_FOLDER            = "physicInterpolators";
	physics_interpolator.CLEAR_EXPRESSION_BTN     = false; // this adds a button to the palette, "clear", that deletes expressions on all selected properties. Off by default.
	physics_interpolator.VERSION                  = "0.1.0";
	physics_interpolator.physicsEquation           = "";
	physics_interpolator.palette                  = {};

	// palette controls
	physics_interpolator.physicsList               = {};

	var PHYSICS_MODE = 1;
	var factor1 = 0.5,factor2 = 0,factor3 = 0;
	var prefixParameters;

	ANDROIDSPRING_CODE = "//mStiffness = 1500;\n" +
	"	//mDampingRatio = 0.5;\n" +
	"	//mVelocity = 0.;\n" +
		
	"	var config = undefined;\n" +
	"	var isPathShape = false;\n" +
		
	"	function getCurrentInterpolation(progress,time){\n" +
	"		if (progress >= 1) {\n" +
	"			return 1;\n" +
	"		}else{\n" +
	"			var deltaT = time;\n" +
	"			var starVal = 0;\n" +
	"			var endVal = 1;\n" +
		
	"			var mNaturalFreq = Math.sqrt(mStiffness);\n" +
	"			var mDampedFreq = mNaturalFreq*Math.sqrt(1.0 - mDampingRatio* mDampingRatio);\n" +
	"			var lastVelocity =  mVelocity;\n" +
	"			var lastDisplacement  = progress -  endVal;\n" +
	"			var coeffB = 1.0 / mDampedFreq * (mDampingRatio * mNaturalFreq * lastDisplacement + lastVelocity);\n" +
	"			var displacement = Math.pow(Math.E,-mDampingRatio * mNaturalFreq * deltaT) * (lastDisplacement * Math.cos(mDampedFreq * deltaT) + coeffB * Math.sin(mDampedFreq * deltaT));\n" +
	"			var mValue = displacement + endVal;\n" +
		
	"			if(time = 0){\n" +
	"				return starVal;\n" +
	"			}\n" +
	"			else{\n" +
	"				return mValue;\n" +
	"			}\n" +
	"		}\n" +
	"	}\n" +
		
	"	function calculate(t,b,c,d) {\n" +
	"		return c*getCurrentInterpolation(t/d,t) + b;\n" +
	"	}\n" 

	BOUNCE_CODE = "//var mTension = 0.;\n" +
	"	//var mFriction = 0.;\n" +
		
	"	var config = undefined;\n" +
	"	var isPathShape = false;\n" +
		
	"	//Parameters\n" +
	"	var maxStifness = 50.;\n" +
	"	var maxFrictionMultipler = 1.;\n" +
		
	"	//Curve Position parameters(No Adjust)\n" +
	"	var amplitude = 1.;\n" +
	"	var phase = 0.;\n" +
		
	"	//Original Scale parameters(Better No Adjust)\n" +
	"	var originalStiffness = 12.;\n" +
	"	var originalFrictionMultipler = 0.3;\n" +
	"	var mass = 0.058;\n" +
		
	"	//Internal parameters\n" +
	"	var pulsation = Math.sqrt((originalStiffness + mTension) / mass);\n" +
	"	var friction = (originalFrictionMultipler + mFriction) * pulsation;\n" +
		
	"	function getCurrentInterpolation(ratio) {\n" +
	"		if (ratio == 0.0 || ratio == 1.0)\n" +
	"			return ratio;\n" +
	"		else {\n" +
	"			var value = amplitude * Math.exp(-friction * ratio) * Math.cos(pulsation * ratio + phase) ;\n" +
	"		   return -Math.abs(value)+1.;\n" +
	"		}\n" +
	"	}\n" +
		
	"	function calculate(t,b,c,d) {\n" +
	"		return c*getCurrentInterpolation(t/d) + b;\n" +
	"	}\n" 
	

	DAMPING_CODE = "//var mTension = 0.;\n" +
	"	//var mFriction = 0.;\n" +
		
	"	var config = undefined;\n" +
	"	var isPathShape = false;\n" +
		
	"	//Parameters\n" +
	"	var maxStifness = 50.;\n" +
	"	var maxFrictionMultipler = 1.;\n" +
		
	"	//Curve Position parameters(No Adjust)\n" +
	"	var amplitude = 1.;\n" +
	"	var phase = 0.;\n" +
		
	"	//Original Scale parameters(Better No Adjust)\n" +
	"	var originalStiffness = 12.;\n" +
	"	var originalFrictionMultipler = 0.3;\n" +
	"	var mass = 0.058;\n" +
		
	"	//Internal parameters\n" +
	"	var pulsation = Math.sqrt((originalStiffness + mTension) / mass);\n" +
	"	var friction = (originalFrictionMultipler + mFriction) * pulsation;\n" +
		
	"	function getCurrentInterpolation(ratio) {\n" +
	"		if (ratio == 0.0 || ratio == 1.0)\n" +
	"			return ratio;\n" +
	"		else {\n" +
	"			var value = amplitude * Math.exp(-friction * ratio) * Math.cos(pulsation * ratio + phase) ;\n" +
	"			return -value+1.;\n" +
	"		}\n" +
	"	}\n" +
		
	"	function calculate(t,b,c,d) {\n" +
	"		return c*getCurrentInterpolation(t/d) + b;\n" +
	"	}\n" 
	

	MOCOSSPRING_CODE = "       //var tension = 100.;\n" +
	"	//var damping = 15.;\n" +
	"	//var v0 = 20.;\n" +
	"	\n" +
	"	var config = undefined;\n" +
	"	var isPathShape = false;\n" +
	"	\n" +
	"	var mGamma = 0., mVDiv2 = 0.;\n" +
	"	var mEps = 0.001;\n" +
	"	\n" +
	"	var mA = 0., mB = 0.;\n" +
	"	var mDuration = 1000.;\n" +
	"	\n" +
	"	if(4 * tension - damping * damping > 0){\n" +
	"		   mGamma = Math.sqrt(4 * tension - damping * damping) / 2;\n" +
	"		   mVDiv2 = damping / 2;\n" +
	"		   mB = Math.atan(-mGamma / (v0 - mVDiv2));\n" +
	"		   mA = -1 / Math.sin(mB);\n" +
	"		   mDuration = Math.log(Math.abs(mA) / mEps) / mVDiv2;\n" +
	"	}\n" +
	"	else{\n" +
	"			mGamma = Math.sqrt(damping * damping - 4 * tension) / 2;\n" +
	"			mVDiv2 = damping / 2;\n" +
	"			mA = (v0 - (mGamma + mVDiv2)) / (2 * mGamma);\n" +
	"			mB = -1 - mA;\n" +
	"			mDuration = Math.log(Math.abs(mA) / mEps) / (mVDiv2 - mGamma);\n" +
	"	\n" +
	"	}\n" +
	"	\n" +
	"	function getDesiredDuration() {\n" +
	"		return mDuration;\n" +
	"	}\n" +
	"	\n" +
	"	function getCurrentInterpolation(ratio) {\n" +
	"		if (ratio >= 1) {\n" +
	"			return 1;\n" +
	"		}\n" +
	"		var t = ratio * mDuration;\n" +
	"		 if(4 * tension - damping * damping > 0){\n" +
	"		return (mA * Math.exp(-mVDiv2 * t) * Math.sin(mGamma * t + mB) + 1) \n" +
	"		}\n" +
	"		else{\n" +
	"		return (mA * Math.exp((mGamma - mVDiv2) * t) + mB * Math.exp(-(mGamma + mVDiv2) * t) + 1)\n" +
	"		}\n" +
	"	}\n" +
	"	function calculate(t,b,c,d) {\n" +
	"		return c*getCurrentInterpolation(t/d) + b;\n" +
	"	}\n" 

	SPRING_CODE = "//var factor = 0.5;\n" +
	"\n" +
	"	var config = undefined;\n" +
	"	var isPathShape = false;\n" +
	"	\n" +
	"	function getCurrentInterpolation(ratio) {\n" +
	"			if (ratio == 0.0 || ratio == 1.0){\n" +
	"				return ratio;\n" +
	"		}\n" +
	"			else {\n" +
	"				var value =  Math.pow(2, -10 * ratio) * Math.sin((ratio - factor / 4.0) * (2.0 * Math.PI) / factor) + 1;\n" +
	"				return value;\n" +
	"			}\n" +
	"	}\n" +
	"	\n" +
	"	function calculate(a,b,c,d,e) {\n" +
	"			var k = c*getCurrentInterpolation(a/d)+b;\n" +
	"			return k;\n" +
	"	}\n"

	NORMALIZED_EASING_FUNCTION = "function getDimensions()\n" +
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


	physics_interpolator.PHYSICS_SETTINGS_KEY     = "spring"; 

	physics_interpolator.physicsTypesAry = ['Spring','Bounce', 'Damping', 'MocosSpring','-','AndroidSpring']

	physics_interpolator.TOOLTIP_PHYSICS       = "选择物理插值器的类型";

	physics_interpolator.strHelpText = "Physics Interpolaotr 使用 「时间轴 - 关键帧 - 插值」 的方式，去模拟 「迭代式」 力学动画。\n" +
		"\n" +
		"首先选择关键帧，然后选择插值器类型，参数调节完成后点击 「应用」 按钮即可 \n" + 
		"\n" +
		"(其中的 AndroidSpring 是 Android API 25 中迭代动画系统 DynamicAnimation 的 插值版本，参数完全对齐，只要保证足够的震荡时间即可)\n" 
	


	
	function pi_getHashValues(hash)
	{ // {{{
		var ary = [];
		for (var key in hash) {
			if (hash.hasOwnProperty(key)) {
				ary.push(hash[key]);
			}
		}

		return ary;
	} // }}}

	function pi_getHashKeys(hash)
	{ // {{{
		var ary = [];
		for (var key in hash) {
			if (hash.hasOwnProperty(key)) {
				ary.push(key);
			}
		}

		return ary;
	} // }}}

	function pi_fetchIndex(obj, key) {
		var ary = pi_getHashValues(obj);
		for (var c = 0; c < ary.length; c++) {
			if (ary[c] === key) return c;
		}
		return 0; // nothing matched, just select the first one
	}

	function pi_main(thisObj)
	{ //{{{
		pi_createPalette(thisObj);
	} //}}}

	function pi_getPathToEasingFolder()
	{ // {{{
		// much simpler, thanks Jeff
		var folderObj = new Folder((new File($.fileName)).path + "/" + physics_interpolator.PHYSICS_FOLDER);
		return folderObj;

	} // }}}

	function pi_set_physics_menu() {
		// if (app.settings.haveSetting("physicsinterpolator", physics_interpolator.PHYSICS_SETTINGS_KEY)) {
		// 	var value = app.settings.getSetting("physicsinterpolator", physics_interpolator.PHYSICS_SETTINGS_KEY); // from the settings
		// 	physics_interpolator.physicsList.selection = pi_fetchIndex(physics_interpolator.physicsTypesAry, value);
		// } else {
		// 	physics_interpolator.physicsList.selection = 0; // select the first item
		// }
		physics_interpolator.physicsList.selection = 0;
	}

	function pi_createPalette(thisObj)
	{//{{{
		var LIST_DIMENSIONS = [0, 0, 140, 15];
		var STATIC_TEXT_DIMENSIONS = [0, 0, 60, 15];

		physics_interpolator.palette = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Easing", undefined, {resizeable: true});
		physics_interpolator.palette.margins       = 6;
		physics_interpolator.palette.alignChildren = 'left';

		// fix the text display in the popup menu - thanks Jeff Almasol
		var winGfx          = physics_interpolator.palette.graphics;
		var darkColorBrush  = winGfx.newPen(winGfx.BrushType.SOLID_COLOR, [0,0,0], 1);
		var lightColorBrush = winGfx.newPen(winGfx.BrushType.SOLID_COLOR, [1,1,1], 1);

		// popup menus
		// {{{

		// "slider" group

		var	slGrp1 = physics_interpolator.palette.add('group', undefined, 'Slider Group 1');
		var text1 = slGrp1.add('statictext', STATIC_TEXT_DIMENSIONS, 'Factor1:');
		var slider1 = slGrp1.add("slider", undefined, thisObj.numRows, 0, 100.);
		slider1.size = 'width: 150, height: 20';
		var value1 = slGrp1.add('statictext', STATIC_TEXT_DIMENSIONS, '0.5f');
		slider1.onChanging = function () {  
			if(PHYSICS_MODE == 1){
				value1.text = slider1.value.toFixed(1).toString()/100. + '.f';
				factor1 = slider1.value.toFixed(1)/100.;
			}
			else if(PHYSICS_MODE == 4){
				value1.text = (slider1.value*2.).toFixed(1).toString() + '.f';
				factor1 = (slider1.value*2.).toFixed(1);
			}
			else if(PHYSICS_MODE == 5){
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
				
		var	slGrp2 = physics_interpolator.palette.add('group', undefined, 'Slider Group 2');
		slGrp2.visible = false;
		var text2 = slGrp2.add('statictext', STATIC_TEXT_DIMENSIONS, 'Factor2:');
		var slider2 = slGrp2.add("slider", undefined, thisObj.numRows, 0, 100);
		slider2.size = 'width: 150, height: 20';
		var value2 = slGrp2.add('statictext', STATIC_TEXT_DIMENSIONS, '100.f');
		slider2.onChanging = function () {  

			if(PHYSICS_MODE == 2 || PHYSICS_MODE == 3){
				value2.text = slider2.value.toFixed(1).toString()/10. + '.f';
				factor2 = slider2.value.toFixed(1)/10.;
			}
			else if(PHYSICS_MODE == 5){
				value2.text = (slider2.value).toFixed(1).toString()/100. + '.f';
				factor2 = slider2.value.toFixed(1)/100.;
			}
			else{
				value2.text = slider2.value.toFixed(1).toString() + '.f';
				factor2 = slider2.value.toFixed(1);
			}
		}


		var	slGrp3 = physics_interpolator.palette.add('group', undefined, 'Slider Group 3');
		slGrp3.visible = false;
		var text3 = slGrp3.add('statictext', STATIC_TEXT_DIMENSIONS, 'Factor3:');
		var slider3 = slGrp3.add("slider", undefined, thisObj.numRows, 0, 100);
		slider3.size = 'width: 150, height: 20';
		var value3 = slGrp3.add('statictext', STATIC_TEXT_DIMENSIONS, '100.f');
		slider3.onChanging = function () {  

			if(PHYSICS_MODE == 4){
				value3.text = slider3.value.toFixed(1).toString() + '.f';
				factor3 = slider3.value.toFixed(1);
			}
			else if(PHYSICS_MODE == 5){
				value3.text = (slider3.value*5.).toFixed(1).toString() + '.f';
				factor3 = (slider3.value*5.).toFixed(1);
			}

		}
				

		// "easing" menu

		var	physicsGrp = physics_interpolator.palette.add('group', undefined, 'Easing group');
			physicsGrp.add('statictext', STATIC_TEXT_DIMENSIONS, '弹性类型:');

			physics_interpolator.physicsList                          = physicsGrp.add('dropdownlist', LIST_DIMENSIONS, physics_interpolator.physicsTypesAry);
			physics_interpolator.physicsList.helpTip                  = physics_interpolator.TOOLTIP_PHYSICS;
			physics_interpolator.physicsList.graphics.foregroundColor = darkColorBrush;

			pi_set_physics_menu();

			physics_interpolator.physicsList.onChange = function() {
				if (this.selection == null) {
					// tried to select a greyed-out item, ignore
					pi_set_physics_menu();
					return;
				} else {
					app.settings.saveSetting("physicsinterpolator", physics_interpolator.PHYSICS_SETTINGS_KEY, this.selection.toString());
					//alert("yo, you selected item " + this.selection.index);
					switch(this.selection.index) {
						case 0:
							PHYSICS_MODE = 1;
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
							PHYSICS_MODE = 2;
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
							PHYSICS_MODE = 3;
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
							PHYSICS_MODE = 4;
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
							PHYSICS_MODE = 5;
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


	
	
		// }}}



		////////////////////
		// apply button
		////////////////////

		var buttonGrp = physics_interpolator.palette.add('group', undefined, 'Button group');
		buttonGrp.add('statictext', STATIC_TEXT_DIMENSIONS, '');

		var applyBtn     = buttonGrp.add('button', undefined, '应用');
		applyBtn.onClick = pi_applyExpressions;
		var helpBtn      = buttonGrp.add("button {text:'?', maximumSize:[30,30]}");
		helpBtn.onClick  = function() {alert("Physics Interpolator v" + physics_interpolator.VERSION + "\n" + physics_interpolator.strHelpText, "Physics Interpolator")};


		if (physics_interpolator.palette instanceof Window) {
			physics_interpolator.palette.show();
		} else {
			physics_interpolator.palette.layout.layout(true);
		}


	}//}}}


	function pi_trace(s) { // for debugging
	//{{{
		//$.writeln(s); // writes to the ExtendScript interface
		writeLn(s); // writes in the AE info window
	} //}}}

	function pi_readFile(filename)
	{ //{{{
		var physics_folder = pi_getPathToEasingFolder();
		var file_handle   = new File(physics_folder.fsName + '/' + filename);

		if (!file_handle.exists) {
			throw new Error("I can't find this file: '" + filename + "'. \n\nI looked in here: '" + physics_folder.fsName + "'. \n\nPlease refer to the installation guide and try installing again, or go to:\n\nhttp://aescripts.com/ease-and-wizz/\n\nfor more info.");
		}

		try {
			file_handle.open('r');
			var the_code = file_handle.read();
		} catch(e) {
			throw new Error("I couldn't read the easing equation file: " + e);
		} finally {
			file_handle.close();
		}

		return(the_code);
	} //}}}

	function pi_determineFileName() {
		// defaults
		var filenameSuffix          = ".txt";
		var springSuffix            = "_physicsinterpolator"

		var curveType = physics_interpolator.physicsList.selection.toString().toLowerCase();
		var fileToLoad = curveType + springSuffix + filenameSuffix;
		return fileToLoad;

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
				//prefixParameters = 'var tension = '+factor1.toString()+';\n var damping = '+factor2.toString+';\n var v0 = '+factor3.toString()+';\n';
				// prefixParameters = 'var tension = '+factor1.toString()+';\n var damping = '+factor2.toString()+';\n' + 'var v0 = ' + factor3.toString + ';\n';
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

	function pi_applyExpressions() { // decide what external file to load
	 // {{{

		if (!pi_canProceed()) { return false; }

		var fileToLoad = pi_determineFileName();

		app.beginUndoGroup("Physics Interpolator");

		try {
			getParameters(PHYSICS_MODE);
			physics_interpolator.physicsEquation = prefixParameters + getInterpolatorType(PHYSICS_MODE) + NORMALIZED_EASING_FUNCTION;
		} catch(e) {
			Window.alert(e);
			return false;
		}

		pi_setProps(physics_interpolator.physicsEquation);
		app.endUndoGroup();
	} // }}}

	function pi_clearExpressions()
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
	}//}}}

	function pi_setProps(expressionCode)
	{ //{{{
		var selectedProperties = app.project.activeItem.selectedProperties;
		var numOfChangedProperties = 0;

		for (var f in selectedProperties)
		{
			var currentProperty = selectedProperties[f];

			if ((currentProperty.propertyValueType == PropertyValueType.SHAPE)) {
				//alert(physics_interpolator.CURVACEOUS_ERROR_TXT);
				alert ('wrong!');
				continue;
			}

			if (!currentProperty.canSetExpression) { continue } // don't do anything if we can't set an expression
			if (currentProperty.numKeys < 2) { continue }       // likewise if there aren't at least two keyframes

			currentProperty.expression = expressionCode;
			numOfChangedProperties++;
		}
		// clearOutput(); // TODO
		// pi_trace("Ease and Wizz:")
		var easingType = physics_interpolator.physicsList.selection.toString();
		if (numOfChangedProperties == 1) {
			pi_trace("Applied \"" +  easingType + "\" to one property.");
		} else {
			pi_trace("Applied \"" +  easingType + "\" to " + numOfChangedProperties + " properties.");
		}
	} //}}}

	function pi_canProceed()
	{ // {{{
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
	} // }}}

	pi_main(ui_reference);

}

physics_interpolator_script(this);


		var options1;

		// store relevant slider-html-elements in arrays
		var sliders = document.getElementsByClassName("slider");
		var slider_values = new Array(4);
		slider_values = document.getElementsByClassName("slider_value");
		var vars = [1, 1, 0, 0]; // Start Values!


		function addEventListeners(_type, _event, _func){
			objects = window[_type];
			for(i=0; i < objects.length; i++){
				objects[i].addEventListener(_event, _func, false);
			}
		}

		function format(id){

			field = document.getElementById(id);

			// find index of the current slider
			index = -1;
			for(var i = 0, len = slider_values.length; i < len; i++) {
				if (slider_values[i].id === id) {
					index = i;
					break;
				}
			}

			// delete leading zeros
			if(!field.value.includes(',') && !field.value.includes('.'))
				field.value = field.value.replace(/^0+(?!\.|$)/, '');

			// delete decimal places (if more than 2. not rounded, just cut off)
			var val = field.value; // parseFloat(field.value);
			//val = (Math.floor(val * 100) / 100).toFixed(2);

			// Caution: Holzhammer. Allow commas: replace comma with dot, do regex-stuff, replace dot with comma
			if(val.includes(','))
			{
				val = val.replace(',', '.');
				val = val.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
				val = parseFloat(val);
			}

			val = parseFloat(val.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);
			field.value = val;
		}

		/*
		 * validate input of a text field
		 * allow numbers, max. one decimal separator, backspace, delete, LAK and RAK
		 */
		function validate(evt, v, id) {


		  var theEvent = evt || window.event;
		  var key = theEvent.keyCode || theEvent.which;
		  var el = document.getElementById(id);

		  // allow backspace, LAK and RAK
		  if(key == 8 || key == 37 || key == 39)
			return true;

		  // prevent false minus inputs: multiple minus or minus not at first position
		  if(key == 45) //or 173
		  {
			// only one allowed
			if(v.includes('-') || el.selectionStart > 0){
				theEvent.preventDefault();      // firefox
				theEvent.returnValue = false;   // chrome
				}
			else
				return true;
		  }

		  // prevent multiple decimal separators
		  if(key == 44 || key == 46)
		  //if(key == 188 || key == 190)
		  {
			if(v.includes(',') || v.includes('.')){
				theEvent.preventDefault();      // firefox
				theEvent.returnValue = false;   // chrome
				}
			else
				return true;
		  }

		  // regex for numbers
		  key = String.fromCharCode( key );
		  var regex = /[0-9]|\.|,/;
		  if( !regex.test(key)) {
			theEvent.returnValue = false;
			if(theEvent.preventDefault) theEvent.preventDefault();
		  }
		}

		function clip_value(id){

			field = document.getElementById(id);

			// find index of the current slider
			index = -1;
			for(var i = 0, len = slider_values.length; i < len; i++) {
				if (slider_values[i].id === id) {
					index = i;
					break;
				}
			}

			// if the input is invalid, reset field to the last accepted value
			val = field.value;
			if(isNaN(val) || val < -10 || val > 10){
				field.value = vars[index];
			}
		}

		$(function a() {

		// set values everywhere
		for(i = 0; i < vars.length; i++){
			slider_values[i].value = sliders[i].value = vars[i];
		}

		// add eventlistener to sliders
		addEventListeners("sliders", "input", function(){setValues(false);});

		// add eventlisteners to text fields

		// validate input (multiple decimal separators, ...)
		addEventListeners("slider_values", "keypress", function(e) {validate(e, this.value, this.id);});
		// plot and shit;
		addEventListeners("slider_values", "keyup", function(e) {sliderValueKeyPressed(e, this.value, this.id);});
		// if focus is lost
		addEventListeners("slider_values", "blur", function(e) {sliderValueFocusLost(this.id);});

		function sliderValueKeyPressed(e, v, id){

			var key = e.which || e.keyCode;

			if(key == 13){
				format(id);
				clip_value(id);
				setValues(true);
			}
			//else
				//setValues(false);
		}

		function sliderValueFocusLost(id){
			format(id);
			clip_value(id);
			setValues(true);
		}

		function my_sin(x){

			// without parsing, C and D would spack ab krass!
			vars[0] = parseFloat(vars[0]);
			vars[1] = parseFloat(vars[1]);
			vars[2] = parseFloat(vars[2]);
			vars[3] = parseFloat(vars[3]);

			return vars[0] * Math.sin(vars[1] * (x + vars[2])) + vars[3];
		}

		// called by the slider's eventlisteners
		// update function parameters, draw plot
		// typed: this function was called by typing a value, not by pressing enter
		function setValues(typed){

			if(typed)
			{
				//A = document.getElementById("rA").value = document.getElementById("sA").value;
				vars[0] = document.getElementById("rA").value = parseFloat(document.getElementById("sA").value.replace(",", "."), 10);
				vars[1] = document.getElementById("rB").value = parseFloat(document.getElementById("sB").value.replace(",", "."), 10);
				vars[2] = document.getElementById("rC").value = parseFloat(document.getElementById("sC").value.replace(",", "."), 10);
				vars[3] = document.getElementById("rD").value = parseFloat(document.getElementById("sD").value.replace(",", "."), 10);
			}
			else
			{
				vars[0] = document.getElementById("sA").value = document.getElementById("rA").value;
				vars[1] = document.getElementById("sB").value = document.getElementById("rB").value;
				vars[2] = document.getElementById("sC").value = document.getElementById("rC").value;
				vars[3] = document.getElementById("sD").value = document.getElementById("rD").value;
			}

			plot_it();
			document.getElementById("eq_A").textContent = vars[0];
			document.getElementById("eq_B").textContent = vars[1];
			document.getElementById("eq_C").textContent = vars[2];
			document.getElementById("eq_D").textContent = vars[3];
		}

		// setup plot
		function sampleFunction(x1, x2, func) {

			var d = [ ];
			var step = (x2-x1)/700;
			for (var i = x1; i < x2; i += step )
				d.push([i, func( i ) ]);

			return d;
		}

		function plot_it(){

			var data1 = sampleFunction( 0, 20, function(x){ return my_sin(x); } );

			var dataSet = [{
								data: data1,
								xaxis: 1,
							},
							{
								data: data1,
								xaxis: 2
							}
						   ]
			var plot1 = $.plot($("#chart1"), dataSet, options1);
		}

		options1 = {
			lines:
			{
				show: true
			},

			xaxes:
			[
				{ 	position: "top",
					tickSize: 1,
				},
				{ 	ticks: [[0.5*Math.PI,"0.5 \u03C0"],
							[Math.PI, "1 \u03C0"],
							[1.5*Math.PI, "1.5 \u03C0"],
							[2*Math.PI, "2 \u03C0"],
							[2.5*Math.PI, "2.5 \u03C0"],
							[3*Math.PI, "3 \u03C0"],
							[3.5*Math.PI, "3.5 \u03C0"],
							[4*Math.PI, "4 \u03C0"],
							[4.5*Math.PI, "4.5 \u03C0"],
							[5*Math.PI, "5 \u03C0"],
							[5.5*Math.PI, "5.5 \u03C0"],
							[6*Math.PI, "6 \u03C0"],
							[6.5*Math.PI, "6.5 \u03C0"],
							],
					position: "bottom",
				},
			],

			yaxis:
			{
				min: -5,
				max: 5,
				ticks: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5],
			},

			grid:
			{
				color: "#999"
			},

			colors:
			[
				"#dc0b15"
			]
		};

		plot_it();

		});

document.addEventListener('DOMContentLoaded', () => {
	let system_variables = {gravity: true, gravity_accel: 0.0091, interval_delay: 2, running: true};
	let settings = {nCircles: 80, minSize: 10, maxSize: 20, collision_handling_precision: 100};
	
	let grav_button = document.getElementById('grav');
	let halt_button = document.getElementById('halt');
	let start_button = document.getElementById('start');
	let add_player_button = document.getElementById('addPlayer');

	let nCirclesInput = document.getElementById('nCircles');
	let minSizeInput = document.getElementById('minSize');
	let maxSizeInput = document.getElementById('maxSize');
	let collision_precision = document.getElementById('collisions');

	grav_button.addEventListener("click", () => {
		system_variables.gravity = !system_variables.gravity;
		if(system_variables.gravity) {
			grav_button.classList.remove("red_btn");
			grav_button.classList.add("green_btn");
		} else {
			grav_button.classList.remove("green_btn");
			grav_button.classList.add("red_btn");
		}
	});

	halt_button.addEventListener("click", () => {
		system_variables.running = false;
	});

	start_button.addEventListener("click", () => {
		if(!system_variables.running) {
			system_variables.running = true; 
			system_variables.paused = false; 
			runScript(system_variables, settings);
		}
	});

	setUpInputEventKeyDownListener(nCirclesInput);
	setUpInputEventKeyDownListener(minSizeInput);
	setUpInputEventKeyDownListener(maxSizeInput);
	setUpInputEventKeyDownListener(collision_precision);

	nCirclesInput.addEventListener("keyup", (event) => {
		if(event.keyCode === 13) {
			nCirclesInput.classList.remove('yellow_input');
			nCirclesInput.classList.add('green_input');
			settings.nCircles = parseInt(nCirclesInput.value);
		}
	});

	minSizeInput.addEventListener("keyup", (event) => {
		if(event.keyCode === 13) {
			minSizeInput.classList.remove('yellow_input');
			minSizeInput.classList.add('green_input');
			settings.minSize = parseInt(minSizeInput.value);
		}
	});

	maxSizeInput.addEventListener("keyup", (event) => {
		if(event.keyCode === 13) {
			maxSizeInput.classList.remove('yellow_input');
			maxSizeInput.classList.add('green_input');
			settings.maxSize = parseInt(maxSizeInput.value);
		}
	});

	
	collision_precision.addEventListener("keyup", (event) => {
		if(event.keyCode === 13) {
			collision_precision.classList.remove('yellow_input');
			collision_precision.classList.add('green_input');
			settings.collision_handling_precision = parseInt(collision_precision.value);
		}
	});


	
	runScript(system_variables, settings);
});

function setUpInputEventKeyDownListener(inputField) {
	inputField.addEventListener("keydown", () => {
		inputField.classList.remove('green_input');
		inputField.classList.add('yellow_input');
	});
}


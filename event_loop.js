function runScript(system_variables, settings) {
	let canvas = document.getElementById('canvas_one');
	let context = canvas.getContext("2d"); 
	

	let sphere_number = settings.nCircles;
	let max_speed = 0.5; 
	let same_size = false; 
	let min_size = settings.minSize;
	let max_size = settings.maxSize;

    let spheres = generateSpheres(sphere_number, min_size, max_size, canvas, same_size, max_speed);
    //addPlayer(canvas, spheres);

    sphere_number = spheres.length; 
	
	let sphere_images = [];

	context.stroke();
	
	let event_loop = setInterval(() => {
		
	//Gravity
		if(system_variables.gravity) {
			for(i = 0; i < sphere_number; i++) {
				spheres[i].speedY += system_variables.gravity_accel;
			}
		}
		
		context.clearRect(0, 0, canvas.width, canvas.height);

	// Generate images
		for(i = 0; i < sphere_number; i++) {
			sphere_images[i] = {newX: spheres[i].x + spheres[i].speedX, newY: spheres[i].y + spheres[i].speedY};
		}
		
		let collisions_detected = false; 
		//Don't move on until all collisions resolved. WARNING: This is a huge performance overhead that grows
		//almost factorially with number of circles. Perhaps optimise. Also, can cause a crash if a collision
		//system is unresolvable. 
		//Quick and dirty fix to the crash: Break loop after X iterations. 
		let loop_number = 0; 
		do {
			loop_number++;
			// Check for collisions with walls. Complexity linear to sphere_number.
			collisions_detected = wallColide(sphere_number, sphere_images, spheres, canvas, system_variables.gravity);	
			// Check for collisions between circles, and update speed accordingly. Complexity factorial in sphere_number.
			if(!collisions_detected) {
				collisions_detected = advancedSphereCollide(sphere_number, sphere_images, spheres);
			} else {
				advancedSphereCollide(sphere_number, sphere_images, spheres);
			}
		} while(collisions_detected && (loop_number < settings.collision_handling_precision));
		
		for(i = 0; i < sphere_number; i++) {
			spheres[i].x = sphere_images[i].newX;
			spheres[i].y = sphere_images[i].newY;
			
		}
		
	// Draw circles. Linear to sphere_number.
		for(i = 0; i < sphere_number; i++) {
            context.beginPath();
            canvas.strokeStyle = "black";
            context.arc(spheres[i].x, spheres[i].y, spheres[i].size, 0, 2 * Math.PI);
            if(spheres[i].player = true) {
                canvas.strokeStyle = "blue";
            }
			context.closePath();
			context.stroke();
		}
		
		if(!system_variables.running) {
			clearInterval(event_loop);
		}
		


	}
	, system_variables.interval_delay);
	

}



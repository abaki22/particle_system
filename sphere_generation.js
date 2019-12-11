
/*
sphere_number: Number of spheres to create. WARNING: There is no guard against too many. Circles start 
clipping through walls. 
min_size: Minimum size of circles. 
max_size: Maximum size of circles.
canvas: The canvas you're going to draw the circles on.
max_speed: Maximum speed that the circles can start at. 
*/
function generateSpheres(sphere_number, min_size, max_size, canvas, same_size, max_speed) {
	let spheres = [];


	let currentX = max_size; 
	let currentY = max_size + 5;
	let sphere_size = 40; //max_size * Math.random();
	
	for(i = 0; i < sphere_number; i++) {
		if(!(currentY + max_size > canvas.height)) {
			if(same_size) {
				sphere_size = max_size - min_size;
			} else {
				do { 
					sphere_size = max_size * Math.random();
				} while (sphere_size < min_size);
			}
			
			currentX += sphere_size + max_size / 5;
			
			spheres[i] = {x: currentX, y: currentY, size: sphere_size, speedX: Math.random() * max_speed, speedY: Math.random() * max_speed,
						mass: Math.PI * Math.pow(sphere_size, 2), elasticity: 0.9, 
						wallCollisionFlagX: false, wallCollisionFlagY: false, player: false}
						
			currentX += sphere_size + max_size / 5;
			
			if(currentX + max_size + max_size / 5 + max_size > canvas.width) {
				currentX = max_size;
				currentY += max_size * 2; 
			}
		}
	}
	
	return spheres;
}
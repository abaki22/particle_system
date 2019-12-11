		
function wallColide(sphere_number, spheres_images, spheres, canvas, gravity) {
		let collisions_detected = false; 
		for(i = 0; i < sphere_number; i++) {
			spheres[i].wallCollisionFlagX = spheres[i].wallCollisionFlagY = 0; 
			
			if(spheres_images[i].newX + spheres[i].size >= canvas.width) {
				spheres[i].speedX = -spheres[i].speedX * spheres[i].elasticity;
				spheres_images[i].newX = spheres[i].x + spheres[i].speedX;
				collisions_detected = true; 
			} else if(spheres_images[i].newX - spheres[i].size <= 0) {
				spheres[i].speedX = -spheres[i].speedX * spheres[i].elasticity;
				spheres_images[i].newX = spheres[i].x + spheres[i].speedX;	
				collisions_detected = true; 
			}
			
			if(spheres_images[i].newY + spheres[i].size >= canvas.height) {
				spheres[i].speedY = -spheres[i].speedY * spheres[i].elasticity;
				spheres_images[i].newY = spheres[i].y + spheres[i].speedY;
				collisions_detected = true; 
			} else if(spheres_images[i].newY - spheres[i].size <= 0) {
				spheres[i].speedY = -spheres[i].speedY * spheres[i].elasticity;
				spheres_images[i].newY = spheres[i].y + spheres[i].speedY;	
				collisions_detected = true; 
			}
		}
		return collisions_detected;
}

// More advanced physics: Elastic collisions
// Approximately complexity O(n^2), n being number of spheres
function advancedSphereCollide(sphere_number, sphere_images, Spheres) {
		let collisions_detected = false; 
		for(i = 0; i < sphere_number; i++) {
			for(second_i = i + 1; second_i < sphere_number; second_i++) {
				if(Math.pow((sphere_images[second_i].newX - sphere_images[i].newX), 2) + 
				   Math.pow((sphere_images[i].newY - sphere_images[second_i].newY), 2) 
				   <= Math.pow((Spheres[i].size + Spheres[second_i].size), 2)) {
						
						let vx1 = Spheres[i].speedX;
						let vy1 = Spheres[i].speedY;
						let vx2 = Spheres[second_i].speedX;
						let vy2 = Spheres[second_i].speedY;
						
						let m1 = Spheres[i].mass;
						let m2 = Spheres[second_i].mass;
						
						Spheres[i].speedX = (vx1 * (m1 - m2) + (2 * m2 * vx2))/(m1 + m2);
						Spheres[i].speedY = (vy1 * (m1 - m2) + (2 * m2 * vy2))/(m1 + m2);
						Spheres[second_i].speedX = (vx2 * (m2 - m1) + (2 * m1 * vx1))/(m1 + m2);
						Spheres[second_i].speedY = (vy2 * (m2 - m1) + (2 * m1 * vy1))/(m1 + m2);
						
						sphere_images[i].newX = Spheres[i].x + Spheres[i].speedX * Spheres[i].elasticity;
						sphere_images[i].newY = Spheres[i].y + Spheres[i].speedY * Spheres[i].elasticity;
						sphere_images[second_i].newX = Spheres[second_i].x + Spheres[second_i].speedX;
						sphere_images[second_i].newY = Spheres[second_i].y + Spheres[second_i].speedY;
						collisions_detected = true;
				   }
			}
		}
		return collisions_detected; 
}

// Highly simplistic collisions: Treat other circles as walls. 
// Approximately complexity O(n^2), n being number of spheres
function spheresCollide(sphere_number, sphere_images, spheres) {
		for(i = 0; i < sphere_number; i++) {
			for(second_i = i + 1; second_i < sphere_number; second_i++) {
				if((Math.pow((sphere_images[second_i].newX - sphere_images[i].newX), 2) + 
				   Math.pow((sphere_images[i].newY - sphere_images[second_i].newY), 2)) 
				   <= Math.pow((spheres[i].size + spheres[second_i].size), 2)) {
					   console.log(sphere_images[second_i].newX);
					   console.log(sphere_images[i].newX);
					   console.log(Math.pow((spheres[i].size + spheres[second_i].size), 2));
						spheres[i].speedX = -spheres[i].speedX;
						spheres[i].x = spheres[i].x + spheres[i].speedX;
						spheres[i].speedY = -spheres[i].speedY;
						spheres[i].y = spheres[i].y + spheres[i].speedY;
						
						spheres[second_i].speedX = -spheres[second_i].speedX;
						spheres[second_i].x = spheres[second_i].x + spheres[second_i].speedX;
						spheres[second_i].speedY = -spheres[second_i].speedY;
						spheres[second_i].y = spheres[second_i].y + spheres[second_i].speedY;
				   }
			}
		}
}
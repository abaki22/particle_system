function addPlayer(canvas, spheres) {

    let playerSize = 30;
    let playerX = Math.random() * canvas.width;
    let playerY = Math.random() * canvas.height; 
    let empty_spot_found = false;

    let iterations = 0;
    // TODO: Player sometimes spawns inside wall. 
    do {
        empty_spot_found = true; 
        for(i = 0; i < spheres.length; i++) {
            if(Math.pow((playerX - spheres[i].x), 2) + 
              Math.pow((spheres[i].y - playerY), 2) 
              <= Math.pow((spheres[i].size + playerSize), 2)) {
                empty_spot_found = false;
                playerX = Math.random() * canvas.width;
                playerY = Math.random() * canvas.height; 
                i = spheres.length; 
              }
        }
    
        if((playerX + playerSize >= canvas.width) | (playerX - playerSize <= 0)) {
            empty_spot_found = false;
        } else if ((playerY + playerSize >= canvas.height) | (playerY - playerSize <= 0)) {
            empty_spot_found = false;
        }
        


       if(iterations > 1000) {
          empty_spot_found = true;
      } else {
          iterations++;
      }
    } while(!empty_spot_found);

    spheres[spheres.length] = {x: playerX, y: playerY, size: playerSize, speedX: 0, speedY: 0, 
                               mass: Math.PI * Math.pow(playerSize, 2), elasticity: 0.9, 
                               wallCollisionFlagX: false, wallCollisionFlagY: false,
                               player: true}
}
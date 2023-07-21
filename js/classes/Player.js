export default class Player {
   /**
    * @param {number} x - Initial x position
    * @param {number} y - Initial y position
    * @param {number} width - Player width
    * @param {number} height - Player height
    * @param {string} color - Player color
    * @param {number} velocityX - Initial velocity on the x-axis
    * @param {number} velocityY - Initial velocity on the y-axis
    * @param {CanvasRenderingContext2D} ctx - Rendering context
    */
   constructor(x, y, width, height, color, velocityX, velocityY, ctx) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.velocityX = velocityX;
      this.velocityY = velocityY;
      this.ctx = ctx;

      // dash logic
      this.isDashing = false;
      this.dashSpeed = 10;
      this.dashDuration = this.x * 5; // controls the dash distance
      this.dashCooldown = 1000;
      this.dashCooldownTimer = 0;
      this.isDashingCooldown = false;
      this.facingLeft = false;
      this.dashGravityMultiplier = 0.2;
   }

   update() {
      this.move();
      this.checkCollisionWithGround();
      this.draw();
   }

   move() {
      this.x += this.velocityX;
      this.y += this.velocityY;
   }

   draw() {
      if (this.ctx) {
         this.ctx.fillStyle = this.color;
         this.ctx.fillRect(this.x, this.y, this.width, this.height);
      }
   }

   checkCollisionWithGround() {
      if (this.y + this.height >= this.ctx.canvas.height) {
         this.y = this.ctx.canvas.height - this.height;
         this.velocityY = 0;
      }
   }

   // player movement

   moveForward() {
      this.velocityX = 5;
      this.facingLeft = false;
   }

   moveBackward() {
      this.velocityX = -5;
      this.facingLeft = true;
   }

   stop() {
      this.velocityX = 0;
   }

   jump() {
      if (this.y + this.height >= this.ctx.canvas.height) {
         this.velocityY = -10;
      }
   }

   dash() {
      if (this.isDashing || this.isDashingCooldown) return;

      const startDash = () => {
         this.isDashing = true;
         this.velocityX = this.dashSpeed * (this.facingLeft ? -1 : 1);
         if (this.velocityY < 0)
            // check if player not on air then apply less gravity for player
            this.velocityY = -10 * this.dashGravityMultiplier;
         requestAnimationFrame(updateDash);
      };

      const updateDash = (currentTime) => {
         const deltaTime = currentTime - prevTime;
         prevTime = currentTime;

         const progress = currentTime - startTime;
         const dashDistance = (progress / this.dashDuration) * this.dashSpeed;

         if (dashDistance < this.dashSpeed) {
            this.x += this.velocityX * (deltaTime / 1000);
            this.y += this.velocityY * (deltaTime / 1000);
            requestAnimationFrame(updateDash);
         } else {
            finishDash();
         }
      };

      const finishDash = () => {
         this.velocityX = 0;
         this.velocityY = 0;
         this.isDashingCooldown = true;

         setTimeout(() => {
            this.isDashing = false;
            this.isDashingCooldown = false;
         }, this.dashCooldown);
      };

      let startTime = performance.now();
      let prevTime = startTime;

      startDash();
   }
}

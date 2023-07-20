import PlayerControls from './PlayerControls.js';

export default class CustomPlayerControls extends PlayerControls {
   constructor(player) {
      super(player);
      this.customKeys = {
         Space: 'jump',
         KeyA: 'moveBackward',
         KeyD: 'moveForward',
         KeyE: 'dash',
      };
      this.horizontalKeys = ['KeyA', 'KeyD'];
      // dash logic
      this.isDashing = false;
      this.dashSpeed = 10;
      this.dashDuration = player.x * 5; // controls the dash distance
      this.dashCooldown = 1000;
      this.dashCooldownTimer = 0;
      this.isDashingCooldown = false;
      this.facingLeft = false;
      this.dashGravityMultiplier = 0.2;
   }
   moveForward() {
      this.player.velocityX = 5;
      this.facingLeft = false;
   }

   moveBackward() {
      this.player.velocityX = -5;
      this.facingLeft = true;
   }

   stop() {
      this.player.velocityX = 0;
   }

   jump() {
      if (this.player.y + this.player.height >= this.player.ctx.canvas.height) {
         this.player.velocityY = -10;
      }
   }

   dash() {
      if (this.isDashing || this.isDashingCooldown) return;

      const startDash = () => {
         this.isDashing = true;
         this.player.velocityX = this.dashSpeed * (this.facingLeft ? -1 : 1);
         if (this.player.velocityY < 0)
            // check if player not on air then apply less gravity for player
            this.player.velocityY = -10 * this.dashGravityMultiplier;
         requestAnimationFrame(updateDash);
      };

      const updateDash = (currentTime) => {
         const deltaTime = currentTime - prevTime;
         prevTime = currentTime;

         const progress = currentTime - startTime;
         const dashDistance = (progress / this.dashDuration) * this.dashSpeed;

         if (dashDistance < this.dashSpeed) {
            this.player.x += this.player.velocityX * (deltaTime / 1000);
            this.player.y += this.player.velocityY * (deltaTime / 1000);
            requestAnimationFrame(updateDash);
         } else {
            finishDash();
         }
      };

      const finishDash = () => {
         this.player.velocityX = 0;
         this.player.velocityY = 0;
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

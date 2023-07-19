import PlayerControls from './PlayerControls.js';

export default class CustomPlayerControls extends PlayerControls {
   constructor(player) {
      super(player);
      this.customKeys = {
         Space: 'jump',
         KeyA: 'moveBackward',
         KeyD: 'moveForward',
      };
      this.horizontalKeys = ['KeyA', 'KeyD'];
   }
   moveForward() {
      this.player.velocityX = 5;
   }

   moveBackward() {
      this.player.velocityX = -5;
   }

   stop() {
      this.player.velocityX = 0;
   }

   jump() {
      if (this.player.y + this.player.height >= this.player.ctx.canvas.height) {
         this.player.velocityY = -10;
      }
   }
}

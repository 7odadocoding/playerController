export default class PlayerControls {
   constructor(player) {
      this.player = player;
   }
   moveForward() {
      console.log('Method not implemented!');
   }
   moveBackward() {
      console.log('Method not implemented!');
   }
   stop() {
      console.log('Method not implemented!');
   }
   jump() {
      console.log('Method not implemented!');
   }
}

export class DefaultPlayerControls extends PlayerControls {
   constructor(player) {
      super(player);
      this.customKeys = {
         ArrowLeft: 'moveBackward',
         ArrowRight: 'moveForward',
         Space: 'jump',
      };
      this.horizontalKeys = ['ArrowLeft', 'ArrowRight'];
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

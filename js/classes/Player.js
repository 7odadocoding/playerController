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
}

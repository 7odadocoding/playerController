export default class Level {
   #gravity = 0.4;
   /**
    *  @param {CanvasRenderingContext2D} ctx
    *  @param {number} width
    *  @param {number} height
    *  @param {string} bg
    */
   constructor(width, height, bg, ctx) {
      this.width = width;
      this.height = height;
      this.bg = bg;
      this.ctx = ctx;
      this.entities = [];
   }

   update() {
      this.fillBg();
      this.updateEntities();
      requestAnimationFrame(this.update.bind(this));
   }

   fillBg() {
      if (this.ctx) {
         this.ctx.fillStyle = this.bg;
         this.ctx.fillRect(0, 0, this.width, this.height);
      }
   }

   resizeCanvas(canvas) {
      canvas.width = this.width;
      canvas.height = this.height;
   }

   centerEntity(entity) {
      entity.x = this.width / 2;
      entity.y = this.height - entity.height;
   }

   addEntity(entity) {
      this.entities.push(entity);
   }

   removeEntity(entity) {
      const index = this.entities.indexOf(entity);
      if (index !== -1) {
         this.entities.splice(index, 1);
      }
   }

   updateEntities() {
      for (const entity of this.entities) {
         entity.velocityY += this.#gravity;
         entity.update();
      }
   }
}

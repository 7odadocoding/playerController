export default class SpiritAnimator {
   constructor(spirit) {
      this.spirit = spirit;
      this.currentAnimation = 'default';
      this.animations = {
         default: { startFrame: 0, frames: spirit.frames, frameDuration: 200 },
      };
      this.currentFrame = this.animations[this.currentAnimation].startFrame;
      this.updateFrameDimensions();
      this.animationInterval = null;
   }

   startAnimation() {
      if (this.animationInterval) return;
      const frameDuration = this.animations[this.currentAnimation].frameDuration;
      this.animationInterval = setInterval(this.animate.bind(this), frameDuration);
   }

   stopAnimation() {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
      this.currentFrame = this.animations[this.currentAnimation].startFrame;
   }

   animate() {
      const animation = this.animations[this.currentAnimation];
      this.currentFrame = (this.currentFrame + 1) % animation.frames;
   }

   setAnimation(animationName) {
      if (this.animations.hasOwnProperty(animationName)) {
         this.currentAnimation = animationName;
         this.currentFrame = this.animations[animationName].startFrame;
         this.updateFrameDimensions();
      }
   }

   updateFrameDimensions() {
      const animation = this.animations[this.currentAnimation];
      this.frameWidth =
         (this.spirit.widthEnd - this.spirit.widthStart) / animation.frames;
      this.frameHeight = this.spirit.heightEnd - this.spirit.heightStart;
   }

   draw(ctx, x, y) {
      const animation = this.animations[this.currentAnimation];
      ctx.drawImage(
         this.spirit.image,
         this.spirit.widthStart + this.currentFrame * this.frameWidth,
         this.spirit.heightStart,
         this.frameWidth,
         this.frameHeight,
         x,
         y,
         this.frameWidth,
         this.frameHeight
      );
   }
}

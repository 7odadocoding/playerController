export default class Spirit {
   constructor(file, frames, width, height) {
      this.image = new Image();
      this.image.src = file;
      this.frames = frames;
      this.widthStart = width.start;
      this.widthEnd = width.end;
      this.heightStart = height.start;
      this.heightEnd = height.end;
      this.width = this.widthEnd - this.widthStart;
      this.height = this.heightEnd - this.heightStart;
   }
}

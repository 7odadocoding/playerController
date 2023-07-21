export default class PlayerController {
   /**
    * @param {Player} player
    * @param {HTMLElement} targetElement
    */
   constructor(player, targetElement, controls) {
      this.player = player;
      this.targetElement = targetElement;
      this.keyState = {};
      this.keyState = {};
      this.targetElement.addEventListener('keydown', this.handleKeyDown.bind(this));
      this.targetElement.addEventListener('keyup', this.handleKeyUp.bind(this));
      this.controls = controls;
   }

   handleKeyDown(event) {
      this.keyState[event.code] = true;
      this.controls.keymap[event.code]?.down(this.player);
   }

   handleKeyUp(event) {
      this.keyState[event.code] = false;
      if (
         !this.controls.keymap.hasOwnProperty(event.code) ||
         !this.controls.keymap[event.code]?.up
      )
         return;
      if (this.controls.isHorzintallyMoving(event, this.keyState)) {
         this.controls.keymap[event.code]?.up(this.player);
      }
   }
}

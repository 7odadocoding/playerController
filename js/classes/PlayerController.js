import { DefaultPlayerControls } from './PlayerControls.js';

export default class PlayerController {
   /**
    * @param {Player} player
    * @param {HTMLElement} targetElement
    */
   constructor(player, targetElement, Controller) {
      this.player = player;
      this.targetElement = targetElement;
      this.keyState = {};
      this.keyState = {};
      this.targetElement.addEventListener('keydown', this.handleKeyDown.bind(this));
      this.targetElement.addEventListener('keyup', this.handleKeyUp.bind(this));
      this.controller = new Controller(player) || new DefaultPlayerControls(player);
   }

   handleKeyDown(event) {
      this.keyState[event.code] = true;
      const controlMethod = this.controller.customKeys[event.code];
      if (controlMethod) {
         this.controller[controlMethod]?.();
      }
   }

   handleKeyUp(event) {
      this.keyState[event.code] = false;
      if (!this.controller.customKeys.hasOwnProperty(event.code)) return;
      if (this.isHorzintallyMoving(event)) {
         this.controller.stop();
      }
   }
   isHorzintallyMoving(event) {
      return (
         this.controller.horizontalKeys &&
         this.controller.horizontalKeys.includes(event.code) &&
         !this.controller.horizontalKeys.some((key) => this.keyState[key])
      );
   }
}

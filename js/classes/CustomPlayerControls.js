import PlayerControls from './PlayerControls.js';

export default class CustomPlayerControls extends PlayerControls {
   constructor(player, keymap) {
      super(player, keymap);
      this.horizontalKeys = ['KeyA', 'KeyD'];
   }
   isHorzintallyMoving(event, keyState) {
      return (
         this.horizontalKeys &&
         this.horizontalKeys.includes(event.code) &&
         !this.horizontalKeys.some((key) => keyState[key])
      );
   }
}

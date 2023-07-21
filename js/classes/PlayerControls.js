export default class PlayerControls {
   constructor(player, keymap) {
      this.player = player;
      this.keymap = keymap;
   }
}

export class DefaultPlayerControls extends PlayerControls {
   constructor(player) {
      super(player, keymap);
      keymap = {
         Space: {
            up: (player) => player.jump(),
         },
         ArrowLeft: {
            up: (player) => player.moveBackward(),
            down: (player) => player.stop(),
         },
         ArrowRight: {
            up: (player) => player.moveForward(),
            down: (player) => player.stop(),
         },
         ControlRight: {
            up: (player) => player.dash(),
         },
      };
      this.horizontalKeys = ['ArrowLeft', 'ArrowRight'];
   }
}

# 2dPlayerSimpleController

This is a simple PlayerController for 2D games built with HTML canvas 2D context. It allows you to move, jump, and interact with the environment using keyboard inputs.

## Features

- Smooth movement and collision detection
- Customizable player attributes and settings
- Customizable keys

## How to use

1. Clone or download this repository.

2. Use the arrow keys to move and the spacebar to jump by default. Alternatively, you can customize your own keys (see below).

3. Enjoy!

## Customizing keys

You can customize the keys for different actions by creating a `CustomPlayerControls` class and extending it from `PlayerControls`. For example:

```javascript
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

```

To use the custom controls, create a new player controller and pass the `controls` as an instance of `CustomPlayerControls` class as the third argument. If you want to use the default controls, you can use an instance of `DefaultPlayerControls` in `controls` argument when creating the `PlayerController`, and it will automatically use`DefaultPlayerControls` (arrow key, space and right control) :

```javascript
//Here's an example of how the keymap looks 
const customKeyMap = {
   Space: {
      down: (player) => player.jump(),
   },
   KeyA: {
      down: (player) => player.moveBackward(),
      up: (player) => player.stop(),
   },
   KeyD: {
      down: (player) => player.moveForward(),
      up: (player) => player.stop(),
   },
   KeyE: {
      down: (player) => player.dash(),
   },
};
//Create a player instance
const player = new Player(50, 50, 20, 20, 'red', 0, 0, ctx);

// then create controls and make sure to include fallback to default controls
const controls = new CustomPlayerControls(player, customKeyMap) || new DefaultPlayerControls(player);
//Then in addition to passing player and controls pass targetElement that controller will listen for events on
const playerController = new PlayerController(player, targetElement, controls);

```

The `customKeyMap` object passed to the `controls` class should have a property for each key you want to listen to. The value of each property should be an object that includes two functions: `up` and `down`. These functions take the player as an argument and define what to do with the player when the key is pressed or released.

## Contributing

This project is open source and welcomes contributions. Feel free to fork, modify, or add any feature you like. You can also submit issues or pull requests if you find any bugs or have any suggestions.

## To-do list

- [ ] Add mobile support 
- [ ] Add sprite animation based on the player's state [partially done]

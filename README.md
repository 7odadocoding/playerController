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
class CustomPlayerControls extends PlayerControls {
   constructor(player) {
      super(player);
      this.customKeys = {
         Space: 'jump',
         KeyA: 'moveBackward',
         KeyD: 'moveForward',
      };
      this.horizontalKeys = ['KeyA', 'KeyD'];
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
```

To use the custom controls, create a new player controller and pass the `CustomPlayerControls`
class as the third argument The `CustomPlayerControls` parameter is used to pass a custom controls class to the `PlayerController`. If you want to use the default controls, you can omit the `Controller` argument when creating the `PlayerController`, and it will automatically use `DefaultPlayerControls` :

```javascript
const playerController = new PlayerController(player, targetElement, CustomPlayerControls);
```

The `customKeys` object in the `CustomPlayerControls` class should have a property for each action you want to customize, and a string representing the corresponding method name in the player controls. The `horizontalKeys` property is an array of keys that affect the horizontal movement of the player. You can use any valid KeyboardEvent.code values as keys.

## Contributing

This project is open source and welcomes contributions. Feel free to fork, modify, or add any feature you like. You can also submit issues or pull requests if you find any bugs or have any suggestions.

## To-do list

- Add sprite animation

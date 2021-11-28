// Import Internal Dependencies
import Vector2 from "./src/Vector2.js";

// Vars
const stdout = process.stdout;

export class VirtualTTY {
  #currLen = 0;
  #contentByLines = [];
  #maxLenBehavior = "overwriteStart";
  #maxStrLength = 0;

  static alignLeft(vTTY, heigh = vTTY.position.y, padding = 1) {
    return new Vector2(vTTY.size.x + padding, heigh);
  }

  constructor(pos, size, options = Object.create(null)) {
    this.position = Vector2.toVector2(pos);
    this.size = Vector2.toVector2(size);
    this.#maxStrLength = this.size.y * this.size.x;

    // console.log('Terminal size: ' + process.stdout.columns + 'x' + process.stdout.rows);
  }

  getLocalPosition() {
    const x = this.#currLen % this.size.x;
    const y = Math.floor(this.#currLen / this.size.x);

    return new Vector2(x, y);
  }

  getFullScreenContent() {
    for (let y = 0; y < this.size.y; y++) {
      this.cursorTo(new Vector2(0, y));
      stdout.write(" ".repeat(this.size.x));
    }
  }

  cursorTo(vector) {
    if (!VirtualTTY.DEBUG) {
      stdout.cursorTo(this.position.x + vector.x, this.position.y + vector.y);
    }
  }

  triggerMaxLenBehavior() {
    switch (this.#maxLenBehavior) {
      case "overwriteStart": {
        this.#currLen = 0;
        break;
      }
      case "overwriteEnd": {
        this.#currLen -= str.length;
        break;
      }
      case "stream": {
        break;
      }
    }

    return this.getLocalPosition();
  }

  rawWrite(str) {
    if (!VirtualTTY.DEBUG) {
      stdout.write(str);
    }
    this.#currLen += str.length;
  }

  write(str) {
    let local = this.getLocalPosition();
    if (local.y >= this.size.y) {
      local = this.triggerMaxLenBehavior();
    }
    // if (local.x === 0) {
    //     str = str.trimStart();
    // }
    this.cursorTo(local);

    const div = this.size.x - local.x;
    // console.log(local, div);

    if (div >= str.length) {
      this.rawWrite(str);
    }
    else {
      this.rawWrite(str.slice(0, div));
      this.write(str.slice(div));
    }
  }

  clear() {
    for (let y = 0; y < this.size.y; y++) {
      this.cursorTo(new Vector2(0, y));
      stdout.write(" ".repeat(this.size.x));
    }
    this.#currLen = 0;
  }
}
VirtualTTY.DEBUG = false;

export { Vector2 };

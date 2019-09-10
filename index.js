"use strict";

// Vars
const stdout = process.stdout;

process.stdout.on("resize", () => {
    console.log("screen size has changed!");
    console.log(`${process.stdout.columns}x${process.stdout.rows}`);
});

class Vector2 {
    constructor(x, y = x) {
        if (typeof x !== "number") {
            throw new TypeError("x must be a number");
        }
        if (typeof y !== "number") {
            throw new TypeError("y must be a number");
        }

        this.x = x;
        this.y = y;
    }
}

class CharsChunk {
    /**
     * @class CharsChunk
     * @param {!Vector2} pos
     * @param {!Vector2} size
     */
    constructor(pos, size) {
        if (!(pos instanceof Vector2)) {
            throw new TypeError("pos must be a Vector2");
        }
        if (!(size instanceof Vector2)) {
            throw new TypeError("size must be a Vector2");
        }

        this.position = pos;
        this.size = size;
        this.delta = new Vector2(0, 0);
        this.currLen = 0;
    }

    getLocalPosition() {
        const x = this.currLen % this.size.x;
        const y = Math.ceil(this.currLen / this.size.x);

        // TODO: include dx and dy
        return new Vector2(x, y);
    }

    write(str) {
        const local = this.getLocalPosition();

        stdout.cursorTo(local.x, local.y);
        const div = this.size.x - local.x;

        if (div >= str.length) {
            stdout.write(str);
            this.currLen += str.length;
        }
        else {
            const rt = str.slice(div);
            stdout.write(rt);
            this.currLen += rt.length;
            this.write(str.slice(0, div));
        }
    }

    // clear() {

    // }
}

module.exports = {
    Vector2,
    CharsChunk
};

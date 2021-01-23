"use strict";

class Vector2 {
    constructor(x = 0, y = x) {
        this.x = Number(x);
        this.y = Number(y);
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    static toVector2(any) {
        if (any instanceof Vector2) {
            return any.clone();
        }
        else if (typeof any === "number") {
            return new Vector2(any);
        }
        else if (Array.isArray(any)) {
            const [x, y] = any;

            return new Vector2(x, y);
        }

        throw new Error("Not a valid vector2");
    }
}

module.exports = Vector2;

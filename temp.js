"use strict";

const { VirtualTTY, Vector2 } = require("./");
const faker = require("faker");

const size = new Vector2(35, 5);
const vT1 = new VirtualTTY(new Vector2(0, 2), size);
const vT2 = new VirtualTTY(VirtualTTY.alignLeft(vT1, void 0, 5), size);

setInterval(() => {
    vT1.write(`${faker.lorem.word()} `);
    vT2.write(`${faker.lorem.word()} `);
}, 500);



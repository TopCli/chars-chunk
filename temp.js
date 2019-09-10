"use strict";

const { CharsChunk, Vector2 } = require("./");

const gA = new CharsChunk(
    new Vector2(0, 0),
    new Vector2(10, 5)
);

setInterval(() => {
    gA.write("helloss");
}, 2000);

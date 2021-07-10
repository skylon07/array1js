const { expect } = require("@jest/globals")
const { Test } = require("../Array1.js")

it("returns a string", () => {
    expect(typeof Test()).toBe("string")
})

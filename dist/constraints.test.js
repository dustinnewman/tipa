"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
// import { NOCODA, ONSET } from "./constraints"
// describe("NOCODA", () => {
//     it("should assign zero violations to a syllable with no coda", () => {
//         const word = tokenize(".ma.")
//         if (word) {
//             const violations = NOCODA(word)
//             expect(violations).to.equal(0)
//         }
//     })
//     it("should assign one violation to a syllable with a coda", () => {
//         const word = tokenize(".mæt.")
//         if (word) {
//             const violations = NOCODA(word)
//             expect(violations).to.equal(1)
//         }
//     })
//     it("should assign one violation to a syllable with a coda", () => {
//         const word = tokenize(".mæv̥.ə")
//         if (word) {
//             const violations = NOCODA(word)
//             expect(violations).to.equal(1)
//         }
//     })
// })
// describe("ONSET", () => {
//     it("should assign zero violations to a syllable with an onset", () => {
//         const word = tokenize(".ma.")
//         if (word) {
//             const violations = ONSET(word)
//             expect(violations).to.equal(0)
//         }
//     })
//     it("should assign one violation to a syllable without an onset", () => {
//         const word = tokenize(".æt.")
//         if (word) {
//             const violations = ONSET(word)
//             expect(violations).to.equal(1)
//         }
//     })
// })
// describe("MAX", () => {
//     it("should assign zero violations to faithful candidate", () => {
//         const input = tokenize(".ma.")
//         const output = tokenize(".ma.")
//         const correspondence = [0, 1, 2, 3]
//         if (input && output) {
//             const violations = MAX(input, output, correspondence)
//             expect(violations).to.equal(0)
//         }
//     })
//     it("should assign one violation", () => {
//         const input = tokenize(".ma.")
//         const output = tokenize(".m.")
//         const correspondence = [0, 1, null, 2]
//         if (input && output) {
//             const violations = MAX(input, output, correspondence)
//             expect(violations).to.equal(1)
//         }
//     })
//     it("should not assign violations for epenthesis", () => {
//         const input = tokenize(".ma.")
//         const output = tokenize(".mat.")
//         const correspondence = [0, 1, 2, 4]
//         if (input && output) {
//             const violations = MAX(input, output, correspondence)
//             expect(violations).to.equal(0)
//         }
//     })
// })

/*
Copyright © 2020 Xah Lee

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

URL: SVG Circle Arc http://xahlee.info/js/svg_circle_arc.html
Version 2019-06-19
*/

const cos = Math.cos;
const sin = Math.sin;
const π = Math.PI;
const radius = 100;

const f_matrix_times = (
  [[a, b], [c, d]]: [[number, number], [number, number]],
  [x, y]: [number, number]
): [number, number] => [a * x + b * y, c * x + d * y];
const f_rotate_matrix = (x: number): [[number, number], [number, number]] => [
  [cos(x), -sin(x)],
  [sin(x), cos(x)],
];
const f_vec_add = (
  [a1, a2]: [number, number],
  [b1, b2]: [number, number]
): [number, number] => [a1 + b1, a2 + b2];

// original
export const f_svg_ellipse_arc = (
  [cx, cy]: [number, number],
  [rx, ry]: [number, number],
  [t1, Δ]: [number, number],
  φ: number
) => {
  Δ = Δ % (2 * π);
  const rotMatrix = f_rotate_matrix(φ);
  const [sX, sY] = f_vec_add(
    f_matrix_times(rotMatrix, [rx * cos(t1), ry * sin(t1)]),
    [cx, cy]
  );
  const [eX, eY] = f_vec_add(
    f_matrix_times(rotMatrix, [rx * cos(t1 + Δ), ry * sin(t1 + Δ)]),
    [cx, cy]
  );
  const fA = Δ > π ? 1 : 0;
  const fS = Δ > 0 ? 1 : 0;
  return (
    `M ${sX} ${sY} ` +
    `A ${[rx, ry, (φ / (2 * π)) * 360, fA, fS, eX, eY].join(" ")}`
  );
};

export const pieSlice = (
  [cx, cy]: [number, number],
  [rx, ry]: [number, number],
  [t1, Δ]: [number, number],
  φ: number
) => {
  Δ = Δ % (2 * π);
  const rotMatrix = f_rotate_matrix(φ);
  const [sX, sY] = f_vec_add(
    f_matrix_times(rotMatrix, [rx * cos(t1), ry * sin(t1)]),
    [cx, cy]
  );
  const [eX, eY] = f_vec_add(
    f_matrix_times(rotMatrix, [rx * cos(t1 + Δ), ry * sin(t1 + Δ)]),
    [cx, cy]
  );
  const fA = Δ > π ? 1 : 0;
  const fS = Δ > 0 ? 1 : 0;
  return (
    `M ${sX} ${sY} ` +
    ` A ${[rx, ry, (φ / (2 * π)) * 360, fA, fS, eX, eY].join(" ")}` +
    `L ${eX * 0.1} ${eY * 0.1} ` +
    ` A ${[
      rx * 0.1,
      ry * 0.1,
      (φ / (2 * π)) * 360,
      fA,
      1 - fS,
      sX * 0.1,
      sY * 0.1,
    ].join(" ")}` +
    `L ${sX} ${sY}`
  );
};

/*
returns a SVG path element that represent a ellipse.
cx,cy → center of ellipse
rx,ry → major minor radius
t1 → start angle, in radian.
Δ → angle to sweep, in radian. positive.
φ → rotation on the whole, in radian
URL: SVG Circle Arc http://xahlee.info/js/svg_circle_arc.html
Version 2019-06-19
 */
export const svg_pie_slice = (start: number, sweep: number) => {
  sweep = sweep % (2 * π);

  // outer arc
  const [sX1, sY1] = [radius * cos(start), radius * sin(start)];
  const [eX1, eY1] = [radius * cos(start + sweep), radius * sin(start + sweep)];
  const fA1 = sweep > π ? 1 : 0;
  const fS1 = sweep > 0 ? 1 : 0;

  const arc1 = [radius, radius, 0, fA1, fS1, eX1, eY1].join(" ");
  return `M ${sX1 * 0.1} ${sY1 * 0.1} L ${sX1} ${sY1} A ${arc1} L ${
    eX1 * 0.1
  } ${eY1 * 0.1} Z`;
};

const padZero = (str: string, len = 2) => {
  const zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
};

export const invertColor = (hex: string, bw = true) => {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }
  const r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    // https://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
  }
  // invert color components
  const rs = (255 - r).toString(16);
  const gs = (255 - g).toString(16);
  const bs = (255 - b).toString(16);
  // pad each with zeros and return
  return "#" + padZero(rs) + padZero(gs) + padZero(bs);
};

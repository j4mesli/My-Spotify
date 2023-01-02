"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComplementaryColor = void 0;
const getComplementaryColor = (arr) => {
    let r = arr[0];
    let g = arr[1];
    let b = arr[2];
    // rgb to hsl
    r /= 255.0;
    g /= 255.0;
    b /= 255.0;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = (max + min) / 2.0;
    let s = (max + min) / 2.0;
    let l = (max + min) / 2.0;
    if (max == min) {
        h = 0;
        s = 0;
    }
    else {
        const d = max - min;
        s = (l > 0.5 ? d / (2.0 - max - min) : d / (max + min));
        if (max == r && g >= b)
            h = 1.0472 * (g - b) / d;
        else if (max == r && g < b)
            h = 1.0472 * (g - b) / d + 6.2832;
        else if (max == g)
            h = 1.0472 * (b - r) / d + 2.0944;
        else if (max == b)
            h = 1.0472 * (r - g) / d + 4.1888;
    }
    h = h / 6.2832 * 360.0 + 0;
    // Shift hue to opposite side of wheel and convert to [0-1] value
    h += 180;
    if (h > 360)
        h -= 360;
    h /= 360;
    // Convert h s and l values into r g and b values
    if (s === 0)
        r = g = b = l;
    else {
        const hue2rgb = (p, q, t) => {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    return [r, g, b];
};
exports.getComplementaryColor = getComplementaryColor;


const alpha = (fg, bg) => {
    const [fg_r, fg_g, fg_b, fg_a] = fg;
    const [bg_r, bg_g, bg_b, bg_a] = bg;
    const a = (fg_a / 255) + (bg_a / 255) * (1 - (fg_a / 255));
    const r = (fg_r / 255 * fg_a / 255) + (bg_r / 255 * bg_a / 255 * (1 - (fg_a / 255)));
    const g = (fg_g / 255 * fg_a / 255) + (bg_g / 255 * bg_a / 255 * (1 - (fg_a / 255)));
    const b = (fg_b / 255 * fg_a / 255) + (bg_b / 255 * bg_a / 255 * (1 - (fg_a / 255)));
    return [parseInt(r * 255, 10), parseInt(g * 255, 10), parseInt(b * 255, 10), parseInt(a * 255, 10)];
}

const multiply = (fg, bg) => {
    const fg_a = fg[3] / 255;
    const bg_a = bg[3] / 255;

    const r = fg_a * (fg[0] / 255) * (bg[0] / 255) + (1 - fg_a) * (bg[0] / 255);
    const g = fg_a * (fg[1] / 255) * (bg[1] / 255) + (1 - fg_a) * (bg[1] / 255);
    const b = fg_a * (fg[2] / 255) * (bg[2] / 255) + (1 - fg_a) * (bg[2] / 255);
    const a = fg_a + (1 - fg_a) * bg_a;
    return [parseInt(r * 255, 10), parseInt(g * 255, 10), parseInt(b * 255, 10), parseInt(a * 255, 10)];
}

const additive = (fg, bg) => {
    const a = fg[3] + bg[3] > 255 ? 255 : fg[3] + bg[3];
    const r = (fg[0] * fg[3] + bg[0] * bg[3]) / a;
    const g = (fg[1] * fg[3] + bg[1] * bg[3]) / a;
    const b = (fg[2] * fg[3] + bg[2] * bg[3]) / a;
    return [r, g, b, a];
}

const screen = (fg, bg) => {
    const fg_a = fg[3] / 255;
    const bg_a = bg[3] / 255;

    const r = fg_a * (1 - (1 - (fg[0] / 255)) * (1 - (bg[0] / 255))) + (1 - fg_a) * (bg[0] / 255);
    const g = fg_a * (1 - (1 - (fg[1] / 255)) * (1 - (bg[1] / 255))) + (1 - fg_a) * (bg[1] / 255);
    const b = fg_a * (1 - (1 - (fg[2] / 255)) * (1 - (bg[2] / 255))) + (1 - fg_a) * (bg[2] / 255);
    const a = fg_a + (1 - fg_a) * bg_a;
    return [parseInt(r * 255, 10), parseInt(g * 255, 10), parseInt(b * 255, 10), parseInt(a * 255, 10)];
}

const difference = (fg, bg) => {
    const r = Math.abs(fg[0] - bg[0]);
    const g = Math.abs(fg[1] - bg[1]);
    const b = Math.abs(fg[2] - bg[2]);
    const a = bg[3];
    return [r, g, b, a];
}


const blendModes = {
    'alpha': alpha,
    'multiply': multiply,
    'additive': additive,
    'screen': screen,
    'difference': difference,
}
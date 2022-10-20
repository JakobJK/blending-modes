const blendModeOption = document.getElementById('blending-mode')
const changeImage = (e) => {
    const blendMode = e.target.value;
    updateImage(blendModes[blendMode]);
}
blendModeOption.addEventListener("change", changeImage);

const blendCanvas = document.getElementById('blend');
const backgroundImage = document.getElementById('background');
const foregroundImage = document.getElementById('foreground');

const foregroundCanvas = document.createElement('canvas');
foregroundCanvas.width = foregroundImage.width;
foregroundCanvas.height = foregroundImage.height;

const backgroundCanvas = document.createElement('canvas');
backgroundCanvas.width = backgroundImage.width;
backgroundCanvas.height = backgroundImage.height;

const updateImage = (blendMode) => {
    const bgCtx = backgroundCanvas.getContext('2d');
    const fgCtx = foregroundCanvas.getContext('2d');

    fgCtx.drawImage(foregroundImage, 0, 0);
    bgCtx.drawImage(backgroundImage, 0, 0);

    const blendCtx = blendCanvas.getContext('2d');

    const { data: fgData } = fgCtx.getImageData(0, 0, 1000, 500, { colorSpace: "srgb" });
    const { data: bgData } = bgCtx.getImageData(0, 0, 1000, 500, { colorSpace: "srgb" });
    const blendImageData = blendCtx.getImageData(0, 0, 1000, 500, { colorSpace: "srgb" });

    blendCtx.clearRect(0, 0, blendCanvas.width, blendCanvas.height);
    for (let i = 0; i < blendImageData.data.length; i += 4) {
        const foreground = fgData.slice(i, i + 4);
        const background = bgData.slice(i, i + 4);
        const [r, g, b, a] = blendMode(foreground, background);
        blendImageData.data[i] = r;
        blendImageData.data[i + 1] = g;
        blendImageData.data[i + 2] = b;
        blendImageData.data[i + 3] = a;
    }
    blendCtx.putImageData(blendImageData, 0, 0, 0, 0, 1000, 500, { colorSpace: "srgb" });
}

setTimeout(() => {
    updateImage(blendModes['alpha']);
}, 100);


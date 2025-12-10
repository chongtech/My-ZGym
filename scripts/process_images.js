const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

const IMAGES_DIR = path.join(__dirname, '../assets/images/onboarding');
const FILES_TO_PROCESS = [
    'body_chest.png',
    'body_back.png',
    'body_arms.png',
    'body_shoulders.png',
    'body_abs.png',
    'body_legs.png',
    'body_glutes.png',
    'body_fullbody.png'
];

async function processImage(filename) {
    const filePath = path.join(IMAGES_DIR, filename);

    if (!fs.existsSync(filePath)) {
        console.log(`Skipping ${filename} (not found)`);
        return;
    }

    try {
        console.log(`Processing ${filename}...`);
        const image = await Jimp.read(filePath);

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];
            // alpha is idx + 3

            // Logic to detect "Red/Orange" muscle highlight
            // The muscle is reddish/orange (High R, Med G, Low B). 
            // The body is Grey (R~G~B).
            // The background is Black (Low R, Low G, Low B).

            // Check if pixel is "reddish" enough to be a highlight
            // R must be significantly greater than B (orange/red excludes blue)
            // R must be greater than G (to exclude yellow/white/grey)
            const isReddish = (r > b + 30) && (r > g + 20) && (r > 50);

            if (!isReddish) {
                // Set alpha to 0 for non-highlight pixels (Black BG or Grey Body)
                this.bitmap.data[idx + 3] = 0;
            } else {
                // Optional: Ensure the highlight is fully opaque or slightly blended?
                // Keep strictly as is for now, just making other stuff transparent.
                this.bitmap.data[idx + 3] = 255;
            }
        });

        await image.writeAsync(filePath); // Overwrite the file
        console.log(`Saved processed ${filename}`);

    } catch (err) {
        console.error(`Error processing ${filename}:`, err);
    }
}

async function run() {
    for (const file of FILES_TO_PROCESS) {
        await processImage(file);
    }
    console.log('Done processing images.');
}

run();

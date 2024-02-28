const fs = require(`fs`)
const path = require(`path`)
const { createCanvas, loadImage } = require(`canvas`)

const inputFolder = `..\\assets\\icons`
const outputFolder = `..\\release`
const backgroundColor = `#030305`

function process(inputFolder, outputFolder) {
    try {
        // make folder
        if (!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder, { recursive: true })
        }

        // get input
        fs.readdirSync(inputFolder).forEach(async file => {
            const inputFilePath = path.join(inputFolder, file)
            const outputFilePath = path.join(outputFolder, file)

            // if file, load image & scale
            if (fs.statSync(inputFilePath).isFile()) {
                const image = await loadImage(inputFilePath)

                // use canvas to scale
                const canvas = createCanvas(image.width * 8, image.height * 8)
                const ctx = canvas.getContext(`2d`)
                ctx.imageSmoothingEnabled = false // no fancy scaling

                // set background to wallpaper color
                ctx.fillStyle = backgroundColor
                ctx.fillRect(0, 0, canvas.width, canvas.height)

                // paste image on top of that
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

                // save as png
                const out = fs.createWriteStream(outputFilePath)
                const stream = canvas.createPNGStream()
                stream.pipe(out)
                console.log(`Scaled ${file} successfully.`)
            }
        });

        console.log(`All images scaled successfully.`)
    } catch (error) {
        console.error(`Error scaling images:`, error)
    }
}

// run
process(inputFolder, outputFolder)
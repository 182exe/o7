const fs = require(`fs`)
const path = require(`path`)
const archiver = require(`archiver`)

function createZipFile(inputFolder, zipFileName, secondaryZipContents) {
    try {
        // stream to zip, pipe to output
        const output = fs.createWriteStream(zipFileName)
        const archive = archiver(`zip`, {
            zlib: { level: 9 } // not sure of a good value for this; 9 was the value used in most references i found
        })
        archive.pipe(output)

        // add images to archive
        fs.readdirSync(inputFolder).forEach(file => {
            const filePath = path.join(inputFolder, file)
            if (fs.statSync(filePath).isFile()) {
                archive.append(fs.createReadStream(filePath), { name: file })
            }
        });

        // add zip includes
        fs.readdirSync(secondaryZipContents).forEach(file => {
            const filePath = path.join(secondaryZipContents, file)
            if (fs.statSync(filePath).isFile()) {
                archive.append(fs.createReadStream(filePath), { name: file })
            }
        });

        // 'finish zipping' the files
        archive.finalize()

        console.log(`Zip file "${zipFileName}" created successfully.`)
    } catch (error) {
        console.error(`Error creating zip file:`, error)
    }
}

const inputFolder = `..\\release`
const includes = `..\\assets\\include`
const zipFileName = `..\\release\\all.zip`

createZipFile(inputFolder, zipFileName, includes)
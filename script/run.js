const { exec } = require(`child_process`)
const fs = require(`fs`)
const path = require(`path`)
const { loadingAnimation, clearLoadingAnimation } = require(`./animation`)

// run shell cmd
function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error)
                return
            }
            resolve(stdout.trim())
        })
    })
}

// main
async function releaseProcess() {
    const releaseDir = `..\\release`

    try {
        let anim;

        // clear release dir
        anim = loadingAnimation(`Clearing release folder...`)
        fs.readdirSync(releaseDir).forEach(file => {
            const filePath = path.join(releaseDir, file)
            fs.unlinkSync(filePath)
        })
        clearLoadingAnimation(anim, `Emptied release folder.`)

        anim = loadingAnimation(`Installing dependencies...`)
        // run ci to get all the dependencies
        await executeCommand(`npm ci`)
        clearLoadingAnimation(anim, `Finished installing.`)

        // run render.js then zip.js
        anim = loadingAnimation(`Scaling and processing images...`)
        await executeCommand(`node render.js`)
        clearLoadingAnimation(anim, `Images rendered successfully.`)

        anim = loadingAnimation(`Creating zip file...`)
        await executeCommand(`node zip.js`)
        clearLoadingAnimation(anim, `Zip file created successfully.`)

        console.log(`Release process completed.`)
    } catch (error) {
        console.error(`Error during release process:`, error)
    }
}

// start
releaseProcess()
const fs = require('fs');
const path = require('path');

const stylesDirectory = path.join(__dirname, 'styles');
const resultDir = path.join(__dirname, 'project-dist');
const componentsDir = path.join(__dirname, 'components');
const templateFilePath = path.join(__dirname, 'template.html');

const read = (filePath) => {
    return fs.promises.readFile(filePath, 'utf-8');
}

const makeHtml = async (indexHtmlPath) => {
    let templateData = await read(templateFilePath);
    const components = templateData.match(/{{(\w+)}}/gm);
    for (const component of components) {
        const componentName = component.replace('{{', '').replace('}}', '') + '.html';
        const componentPath = path.join(componentsDir, componentName);
        const componentData = await read(componentPath);
        templateData = templateData.replace(component, componentData);
    }
    fs.writeFile(indexHtmlPath, templateData, (err) => {
        if (err) {
            console.log('Error while writing to index.html')
            return;
        }
    });
}

const makeCss = (cssBundleFilePath) => {
    const bundleCss = fs.createWriteStream(cssBundleFilePath);
    fs.readdir(stylesDirectory, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.log(err.message)
        }
        for(const file of files) {
            const filePath = path.join(stylesDirectory, file.name);
            if (file.isFile() && path.extname(file.name) === '.css') {
                fs.createReadStream(filePath).pipe(bundleCss);
            }
        }
    });
}

const copyDir = (origin, target) => {
    fs.mkdir(target, (err) => {
        fs.readdir(origin, {withFileTypes: true}, (err, files) => {
            files.forEach(file => {
                if (file.isDirectory()) {
                    copyDir(path.join(origin, file.name), path.join(target, file.name))
                } else {
                    fs.copyFile(path.join(origin, file.name), path.join(target, file.name), (err) => {
                        if (err) {
                            console.log('Error while copy');
                            return;
                        }
                    })
                }
            })
        })
    })
}

const makeAssets = (resultAssetsDirectory) => {
    let assetsDirectory = path.join(__dirname, 'assets');
    fs.rm(resultAssetsDirectory, { recursive: true, force: true }, () => {
        copyDir(assetsDirectory, resultAssetsDirectory)
    })
}

fs.mkdir(resultDir, (err) => {
    const bundleCssPath = path.join(resultDir, 'style.css');
    const indexHtmlPath = path.join(resultDir, 'index.html');
    const assets = path.join(resultDir, 'assets');

    makeHtml(indexHtmlPath);
    makeCss(bundleCssPath);
    makeAssets(assets)
});



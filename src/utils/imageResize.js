const sharp = require("sharp");

async function ChangeimageSize(imagePath, imageSize) {
    return new Promise((resolve, reject) => {
        sharp(imagePath)
            .resize(imageSize.width, imageSize.height)
            .toBuffer()
            .then((imageData) => resolve(imageData))
            .catch(() => reject(null))
    });
}

async function GetImageSize(imagePath, newSize) {
    return new Promise((resolve, reject) => {
        sharp(imagePath)
            .metadata()
            .then((metadata) => {
                if (metadata.height && metadata.width) {
                    
                    let newSz = resizeDimensions(metadata.width, metadata.height, newSize);

                    let newDimension = {
                        height: newSz.height,
                        width: newSz.width,
                        format: metadata.format ?? ""
                    };

                    resolve(newDimension);
                }
                reject("No image dimensions returned");
            })
            .catch(e => reject(e));
    })
}

async function RotateImage(image) {
    return await sharp(image)
        .rotate()
        .toBuffer()
}

async function prepareImage(imgArray, newSize) {
    const imgBuffer = Buffer.from(imgArray, Array.isArray(imgArray) ? undefined : "base64");
    const ratatedImage = await RotateImage(imgBuffer);
    const imageSize = await GetImageSize(ratatedImage, newSize);
    return await ChangeimageSize(ratatedImage, imageSize);
}

module.exports = {
    ChangeimageSize,
    GetImageSize,
    prepareImage
}

function resizeDimensions(width, height, targetSize) {
    if (width <= targetSize || height <= targetSize) {
      return { width, height };
    }
  
    const aspectRatio = width / height;
  
    if (width > height) {
      width = targetSize;
      height = Math.round(targetSize / aspectRatio);
    } else {
      height = targetSize;
      width = Math.round(targetSize * aspectRatio);
    }
  
    return { width, height };
}
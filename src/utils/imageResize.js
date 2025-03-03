const sharp = require("sharp");
const fs = require("fs");

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
                    
                    let newSz = resizeDimensions(metadata.width, metadata.height, 300);

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

async function prepareImage(buffer) {
    const imgBuffer = Buffer.from(buffer, Array.isArray(buffer) ? undefined : "base64");
    const imageSize = await GetImageSize(imgBuffer, 250);
    return await ChangeimageSize(imgBuffer, imageSize);
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
const QRCode = require('qrcode');

async function QRCode_Generate(data) {
    if(typeof(data) !== "string") return null;
    let QRData = await QRCode.toDataURL(data).then(url => url).catch(() => null);
    return QRData;
}

module.exports = {
    QRCode_Generate
}
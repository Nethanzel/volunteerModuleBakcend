const fs = require('fs');
const path = require("path");
const puppeteer = require('puppeteer');
const handleBars = require('handlebars');
const { prepMember, prepMembers } = require('../assets/utils');
const { QRCode_Generate } = require("./qr-generate");

async function generateMemberForm(member) {
    let font = fs.readFileSync(path.resolve("./src/reports/assets/Carme_Sans_Light.otf")).toString('base64');
    let boldFont = fs.readFileSync(path.resolve("./src/reports/assets/Carme_Sans_Bold.otf")).toString('base64');

    let html = fs.readFileSync(path.resolve("./src/reports/templates/memberFormTemplate.html"), 'utf8');
    let render = handleBars.compile(html);

    member = prepMember(member);

    html = render({
        logo: "data:image/png;base64," + fs.readFileSync(path.resolve("./src/reports/assets/logo.png"), {encoding: 'base64'}),
        warn: "data:image/png;base64," + fs.readFileSync(path.resolve("./src/reports/assets/warn.png"), {encoding: 'base64'}),
        customFontBold: `data:font/otf;base64,${boldFont}`,
        customFont: `data:font/otf;base64,${font}`,
        qr: await QRCode_Generate(member.referenceCode),
        member
    });

    html = html.replaceAll("&quot;", '"');

    return await generate(html);
}

async function generateMembersForm(members) {
    let font = fs.readFileSync(path.resolve("./src/reports/assets/Carme_Sans_Light.otf")).toString('base64');
    let boldFont = fs.readFileSync(path.resolve("./src/reports/assets/Carme_Sans_Bold.otf")).toString('base64');

    let html = fs.readFileSync(path.resolve("./src/reports/templates/membersReportTemplamte.html"), 'utf8');
    let render = handleBars.compile(html);

    members = prepMembers(members);

    html = render({
        logo: "data:image/png;base64," + fs.readFileSync(path.resolve("./src/reports/assets/logo.png"), {encoding: 'base64'}),
        customFontBold: `data:font/otf;base64,${boldFont}`,
        customFont: `data:font/otf;base64,${font}`,
        members
    });

    html = html.replaceAll("&quot;", '"');

    return await generate(html, true);
}

async function generate(html, landscape = false) {
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html);
    let pdf = await page.pdf({ format: 'A4', landscape });
    await browser.close();

    let file = Buffer.from(pdf, "base64");

    return file.toString("base64");
}

module.exports = {
    generateMemberForm,
    generateMembersForm
}
const sharp = require('sharp');
const fs = require('fs');

async function testPdf() {
  try {
    const pdfBuffer = fs.readFileSync('./src/assets/KHANYA MOLOKE Graphic Designer Creative Portfolio for website.pdf');
    await sharp(pdfBuffer, { page: 0 }).toFile('./test_page0.jpg');
    console.log("SUCCESS!");
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}
testPdf();

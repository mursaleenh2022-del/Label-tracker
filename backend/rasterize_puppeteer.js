const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const pdfBase64 = fs.readFileSync("D:/Dashboard ecommerce/backend/1unit Stronger With You Intensely by Armani cologne men's EDP 3.3po.pdf").toString('base64');
  
  const browser = await puppeteer.launch({executablePath: 'C:/Users/Chaudhary Computers/.cache/puppeteer/chrome/win64-152.0.7977.42/chrome-win64/chrome.exe'});
  const page = await browser.newPage();
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
    </head>
    <body>
      <script>
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        
        async function render() {
          try {
            const pdfData = atob('${pdfBase64}');
            const uint8Array = new Uint8Array(pdfData.length);
            for (let i = 0; i < pdfData.length; i++) {
              uint8Array[i] = pdfData.charCodeAt(i);
            }
            
            const pdf = await pdfjsLib.getDocument({data: uint8Array}).promise;
            const page = await pdf.getPage(1);
            
            const viewport = page.getViewport({scale: 2.0});
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const ctx = canvas.getContext('2d');
            
            await page.render({canvasContext: ctx, viewport: viewport}).promise;
            
            const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
            window.renderedBase64 = dataUrl;
          } catch(e) {
            window.renderedBase64 = 'ERROR:' + e.toString();
          }
        }
        render();
      </script>
    </body>
    </html>
  `;
  
  await page.setContent(html);
  
  const result = await page.waitForFunction('window.renderedBase64 !== undefined');
  const b64 = await result.jsonValue();
  
  if (b64.startsWith('ERROR')) {
    console.error(b64);
    process.exit(1);
  }
  
  const base64Data = b64.replace('data:image/jpeg;base64,', "");
  fs.writeFileSync('rasterized_test.jpg', base64Data, 'base64');
  console.log('Saved rasterized_test.jpg');
  await browser.close();
})();

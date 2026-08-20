import * as pdfjsLib from 'pdfjs-dist';

// Configure the worker for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/' + pdfjsLib.version + '/pdf.worker.min.mjs';

export async function rasterizePdfToJpeg(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const page = await pdf.getPage(1);
  
  // Render at 2x scale for high quality Vision extraction
  const viewport = page.getViewport({ scale: 2.0 });
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  await page.render({ canvasContext: ctx, viewport: viewport }).promise;
  
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(new File([blob], file.name.replace('.pdf', '.jpg'), { type: 'image/jpeg' }));
    }, 'image/jpeg', 0.9);
  });
}


import React from 'react';

const PdfPreviewer = ({ pdfUrl, height = '70vh', useGoogleViewer = true, className = '' }) => {
  if (!pdfUrl) return null;

  const isAbsolute = /^https?:\/\//i.test(pdfUrl);
  const shouldUseGoogle = useGoogleViewer && isAbsolute;
  const src = shouldUseGoogle
    ? `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(pdfUrl)}`
    : `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`;

  return (
    <div className={`w-full overflow-hidden rounded-md ${className}`}>
      <iframe
        title="PDF Preview"
        src={src}
        style={{ width: '100%', height, border: 'none' }}
        loading="lazy"
      />
    </div>
  );
};

export default PdfPreviewer;



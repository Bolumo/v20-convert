import React from 'react';

export default function FinalView({ content }) {
  const handleDownload = async () => {
    try {
      const response = await fetch('/api/docx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html: content }),
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cv.docx';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <button onClick={handleDownload}>Download DOCX</button>
    </div>
  );
}

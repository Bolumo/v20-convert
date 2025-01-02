import React, { useState } from 'react';

export default function TemplateEditor({ initialText, onSave }) {
  const [content, setContent] = useState(initialText);
  const [prompt, setPrompt] = useState('');

  const handleReprocess = async () => {
    try {
      const response = await fetch('/api/reprocess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template: content,
          prompt,
        }),
      });
      const data = await response.json();
      setContent(data.processedText);
    } catch (error) {
      console.error('Reprocess error:', error);
    }
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={20}
      />
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt for text processing..."
      />
      <button onClick={handleReprocess}>Process Text</button>
      <button onClick={() => onSave(content)}>Save</button>
    </div>
  );
}

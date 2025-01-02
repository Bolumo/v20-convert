import React, { useState } from 'react';
import Upload from './Upload';
import TemplateEditor from './TemplateEditor';
import FinalView from './FinalView';

export default function Home() {
  const [step, setStep] = useState('upload');
  const [content, setContent] = useState('');

  const handleUploadComplete = (text) => {
    setContent(text);
    setStep('edit');
  };

  const handleSave = (editedContent) => {
    setContent(editedContent);
    setStep('final');
  };

  return (
    <div>
      {step === 'upload' && <Upload onUploadComplete={handleUploadComplete} />}
      {step === 'edit' && (
        <TemplateEditor initialText={content} onSave={handleSave} />
      )}
      {step === 'final' && <FinalView content={content} />}
    </div>
  );
}

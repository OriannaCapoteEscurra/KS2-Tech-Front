import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loader({ text = 'Cargando...', fullScreen = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center p-4 space-y-4 text-primary">
      <Loader2 className="w-8 h-8 animate-spin text-accent" />
      {text && <p className="text-sm font-medium animate-pulse">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center py-8">
      {content}
    </div>
  );
}

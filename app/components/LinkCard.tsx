// app/components/LinkCard.tsx
"use client";

import Microlink from '@microlink/react';

export default function LinkCard({ url }: { url: string }) {
  return (
    <div className="my-4">
      {/* size="large" にすると、いただいた画像のように
        画像が大きく表示されるダイナミックなカードになります！
      */}
      <Microlink 
        url={url} 
        size="large" 
        style={{ width: '100%', maxWidth: '600px', borderRadius: '0.5rem' }} 
      />
    </div>
  );
}
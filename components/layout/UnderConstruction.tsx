// components/layout/UnderConstruction.tsx
import React from 'react';
import Image from 'next/image';

export default function UnderConstruction() {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/under-construct.png"
          alt="Under Construction"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4">
        <p className="text-[20px] text-white font-thin tracking-wider">
          &quot;Website is <span className="font-bold">Under Construction</span>&quot;
        </p>
      </div>
    </div>
  );
}
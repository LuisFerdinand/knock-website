// app/intro-test/page.tsx
"use client";

import { useState } from "react";
import IntroLoader from "@/components/IntroLoader";

export default function IntroTestPage() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen">
      {showIntro && (
        <IntroLoader 
          onComplete={() => {
            console.log("Intro completed!");
            setShowIntro(false);
          }} 
        />
      )}
      
      {!showIntro && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Intro Test Complete</h1>
            <button 
              onClick={() => setShowIntro(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Replay Intro
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
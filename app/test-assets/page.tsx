// app/test-assets/page.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

export default function TestAssetsPage() {
  const [mp3Status, setMp3Status] = useState<string>("Not tested");
  const [movStatus, setMovStatus] = useState<string>("Not tested");
  const [gifStatus, setGifStatus] = useState<string>("Loading...");

  const testMP3 = async () => {
    try {
      const audio = new Audio("/knock-sound.mp3");
      audio.volume = 0.5;
      await audio.play();
      setMp3Status("✅ Playing successfully!");
      setTimeout(() => {
        audio.pause();
        setMp3Status("✅ MP3 works!");
      }, 2000);
    } catch (error) {
      setMp3Status(`❌ Failed: ${error}`);
    }
  };

  const testMOV = async () => {
    try {
      const audio = new Audio("/knock-sound.mov");
      audio.volume = 0.5;
      await audio.play();
      setMovStatus("✅ Playing successfully!");
      setTimeout(() => {
        audio.pause();
        setMovStatus("✅ MOV works!");
      }, 2000);
    } catch (error) {
      setMovStatus(`❌ Failed: ${error}`);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Asset Test Page
        </h1>

        {/* GIF Test */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h2 className="text-2xl font-semibold mb-4">GIF Test</h2>
          <div className="space-y-4">
            <div className="relative w-64 h-64 border-2 border-dashed border-border rounded-lg overflow-hidden">
              <Image
                src="/logo.gif"
                alt="Test GIF"
                fill
                className="object-contain"
                unoptimized
                onLoad={() => {
                  console.log("GIF loaded successfully");
                  setGifStatus("✅ GIF loaded successfully!");
                }}
                onError={(e) => {
                  console.error("GIF failed to load:", e);
                  setGifStatus("❌ GIF failed to load!");
                }}
              />
            </div>
            <p className="text-lg">
              Status: <span className="font-semibold">{gifStatus}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Expected path: <code className="bg-muted px-2 py-1 rounded">/public/logo.gif</code>
            </p>
          </div>
        </div>

        {/* Audio Tests */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h2 className="text-2xl font-semibold mb-4">Audio Tests</h2>
          
          {/* MP3 Test */}
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">MP3 Audio</h3>
            <button
              onClick={testMP3}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Test MP3 Sound
            </button>
            <p className="mt-2 text-lg">
              Status: <span className="font-semibold">{mp3Status}</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Expected path: <code className="bg-muted px-2 py-1 rounded">/public/knock-sound.mp3</code>
            </p>
          </div>

          {/* MOV Test */}
          <div>
            <h3 className="text-xl font-medium mb-2">MOV Audio (Fallback)</h3>
            <button
              onClick={testMOV}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Test MOV Sound
            </button>
            <p className="mt-2 text-lg">
              Status: <span className="font-semibold">{movStatus}</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Expected path: <code className="bg-muted px-2 py-1 rounded">/public/knock-sound.mov</code>
            </p>
          </div>
        </div>

        {/* Browser Console Info */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h2 className="text-2xl font-semibold mb-4">Browser Console</h2>
          <p className="text-muted-foreground mb-2">
            Open your browser console (F12) to see detailed logs.
          </p>
          <p className="text-sm text-muted-foreground">
            Look for messages starting with ✅ or ❌ to see what&apos;s working.
          </p>
        </div>

        {/* File Structure Guide */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h2 className="text-2xl font-semibold mb-4">Expected File Structure</h2>
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`your-project/
├── public/
│   ├── logo.gif           ← Your animated logo
│   ├── knock-sound.mp3    ← Audio file (recommended)
│   └── knock-sound.mov    ← Audio file (fallback)
├── components/
│   └── IntroLoader.tsx
└── app/
    └── page.tsx`}
          </pre>
        </div>

        {/* Direct File Access */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h2 className="text-2xl font-semibold mb-4">Direct File Access</h2>
          <p className="mb-4 text-muted-foreground">
            Try accessing files directly in your browser:
          </p>
          <ul className="space-y-2">
            <li>
              <a 
                href="/logo.gif" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                http://localhost:3000/logo.gif
              </a>
            </li>
            <li>
              <a 
                href="/knock-sound.mp3" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                http://localhost:3000/knock-sound.mp3
              </a>
            </li>
            <li>
              <a 
                href="/knock-sound.mov" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                http://localhost:3000/knock-sound.mov
              </a>
            </li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            If these links show 404 errors, the files are not in the correct location.
          </p>
        </div>

        {/* Next Steps */}
        <div className="border border-green-500/50 rounded-lg p-6 bg-green-500/10">
          <h2 className="text-2xl font-semibold mb-4 text-green-700 dark:text-green-400">
            Next Steps
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Verify all assets load successfully on this page</li>
            <li>Check browser console for any errors</li>
            <li>If GIF doesn&apos;t load, check file name (case-sensitive)</li>
            <li>If audio doesn&apos;t play, convert MOV to MP3</li>
            <li>Once everything works here, the IntroLoader should work too</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
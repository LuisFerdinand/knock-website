// components/home/Hero.tsx
"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col overflow-hidden">
      {/* 
        PARALLAX BACKGROUND IMAGE
        'fixed bottom-0': Pins the image to the bottom of the viewport.
        'z-0': Puts it at the very back.
        As you scroll, this image stays still while the content slides over it.
        Your next sections (Services, etc.) will eventually scroll up and cover this.
      */}
      <div className="fixed bottom-0 left-0 w-full h-[120vh] -z-10 grayscale-[80%] contrast-125">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop"
          alt="Modern architecture sketch"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Slight darkening for better text contrast if needed elsewhere */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* 
        TOP HALF (Colored Overlay)
        'h-1/2': Takes up exactly 50% of the screen height.
        'bg-background': Uses your global CSS variables.
          - Light Mode: White
          - Dark Mode: Dark Teal (from your globals.css)
        'z-10': Sits on top of the image, hiding the top part of it.
      */}
      <div className="h-1/2 w-full bg-background z-10 transition-colors duration-300 relative">
        {/* Optional Gradient to smooth the transition into the image */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent opacity-100" />
      </div>

      {/* 
        CONTENT AREA - Now positioned at top left
        'absolute top-0 left-0': Position text absolutely over the top half.
        'z-20': Ensures text is above the color overlay.
        'items-start justify-start': Aligns content to the top left.
        'text-left': Aligns text to the left.
      */}
      <div className="absolute top-0 left-0 w-full h-1/2 z-20 flex flex-col items-start justify-center pt-20 pointer-events-none">
        <div className="container-custom w-full pointer-events-auto">
          <h1 className="text-foreground mb-0 tracking-loose text-left">
            Home & Space<br />
           Improvement <br />Studio
          </h1>

          <p className="text-lg md:text-xl max-w-xl mb-10 text-left tracking-tight text-secondary">
            Izinkan team kami mengetuk <br />
            pintu rumah Anda! Knock-knock
          </p>         
        </div>
      </div>

      {/* 
        BOTTOM HALF (Window to Image)
        This div is invisible (pointer-events-none), it just marks the space where the image shows through.
      */}
      <div className="h-1/2 w-full relative z-0 pointer-events-none" />

    </section>
  );
}
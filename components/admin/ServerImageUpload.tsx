// components/admin/ServerImageUpload.tsx
"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ServerImageUploadProps {
  onImageUpload: (url: string, publicId: string) => void;
  currentImage?: string;
  label?: string;
  folder?: string;
}

export default function ServerImageUpload({ 
  onImageUpload, 
  currentImage, 
  label,
  folder = "portfolio" 
}: ServerImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || "");

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPreview(data.url);
        onImageUpload(data.url, data.publicId);
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  }, [onImageUpload]);

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      
      {preview && (
        <div className="relative w-full h-48 rounded-md overflow-hidden">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="flex items-center space-x-2">
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById("image-upload")?.click()}
          disabled={uploading}
          className="w-full"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
      </div>
    </div>
  );
}
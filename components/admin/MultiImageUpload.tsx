/* eslint-disable @typescript-eslint/no-explicit-any */
// components/admin/MultiImageUpload.tsx
"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2, GripVertical } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ImageData {
  url: string;
  publicId: string;
  id: string;
}

interface MultiImageUploadProps {
  onImagesChange: (images: ImageData[]) => void;
  currentImages?: ImageData[];
  label?: string;
  folder?: string;
  maxFiles?: number;
}

export default function MultiImageUpload({
  onImagesChange,
  currentImages = [],
  label = "Upload Images",
  folder = "portfolio/gallery",
  maxFiles = 10,
}: MultiImageUploadProps) {
  const [images, setImages] = useState<ImageData[]>(currentImages);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList) => {
    const fileArray = Array.from(files);
    
    // Check max files limit
    if (images.length + fileArray.length > maxFiles) {
      setError(`Maximum ${maxFiles} images allowed`);
      return;
    }

    // Validate all files
    for (const file of fileArray) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload only image files");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Each file must be less than 5MB");
        return;
      }
    }

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    const newImages: ImageData[] = [];

    try {
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const data = await response.json();
        
        if (data.success) {
          newImages.push({
            url: data.url,
            publicId: data.publicId,
            id: `${Date.now()}-${i}`,
          });
        }

        setUploadProgress(Math.round(((i + 1) / fileArray.length) * 100));
      }

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      onImagesChange(updatedImages);
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload some images. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleUpload(files);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files);
    }
  }, [images.length, maxFiles, folder]);

  const handleRemove = (id: string) => {
    const updatedImages = images.filter((img) => img.id !== id);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...images];
    const [movedItem] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedItem);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />

      {/* Upload Area */}
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer hover:border-primary/50",
          dragActive ? "border-primary bg-primary/5" : "border-gray-300",
          uploading && "opacity-50 cursor-not-allowed",
          images.length >= maxFiles && "hidden"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          {uploading ? (
            <>
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-sm text-gray-600">
                Uploading... {uploadProgress}%
              </p>
              <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <Upload className="h-10 w-10 text-gray-400" />
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  {label}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Drag and drop or click to browse
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG up to 5MB • {images.length}/{maxFiles} images
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative group aspect-video rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-100"
            >
              <Image
                src={image.url}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              
              {/* Overlay with controls */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white/90 hover:bg-white"
                  onClick={() => {
                    // Replace this specific image
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = async (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        setUploading(true);
                        setError(null);
                        try {
                          const formData = new FormData();
                          formData.append("file", file);
                          formData.append("folder", folder);

                          const response = await fetch("/api/upload", {
                            method: "POST",
                            body: formData,
                          });

                          if (!response.ok) {
                            throw new Error(`Failed to upload ${file.name}`);
                          }

                          const data = await response.json();
                          
                          if (data.success) {
                            // Replace the image at this index
                            const updatedImages = [...images];
                            updatedImages[index] = {
                              url: data.url,
                              publicId: data.publicId,
                              id: image.id, // Keep the same ID
                            };
                            setImages(updatedImages);
                            onImagesChange(updatedImages);
                          }
                        } catch (error) {
                          console.error('Replace error:', error);
                          setError("Failed to replace image.");
                        } finally {
                          setUploading(false);
                        }
                      }
                    };
                    input.click();
                  }}
                >
                  <Upload className="h-4 w-4 text-gray-700" />
                </Button>
                <Button
                  type="button"
                  variant="default"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleRemove(image.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Image number badge */}
              <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <p className="text-xs text-gray-500 text-center">
          {images.length} of {maxFiles} images uploaded
        </p>
      )}
    </div>
  );
}
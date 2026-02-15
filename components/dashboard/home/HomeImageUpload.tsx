// components/dashboard/home/HomeImageUpload.tsx
"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface HomeImageUploadProps {
  onImageUpload: (url: string, publicId: string) => void;
  currentImage: string;
  currentPublicId: string | null;
  label: string;
  folder: string;
  aspectRatio?: "square" | "portrait" | "video";
}

export function HomeImageUpload({
  onImageUpload,
  currentImage,
  currentPublicId,
  label,
  folder,
  aspectRatio = "portrait",
}: HomeImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload: JPEG, PNG, WEBP, or GIF');
      return;
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds maximum of 5MB`);
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      if (data.success && data.url && data.publicId) {
        onImageUpload(data.url, data.publicId);
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("Upload failed - invalid response");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  }, [folder]);

  const handleRemove = async () => {
    if (currentPublicId) {
      try {
        await fetch("/api/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicId: currentPublicId }),
        });
      } catch (error) {
        console.warn("Failed to delete from Cloudinary");
      }
    }

    onImageUpload("", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("Image removed");
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "video":
        return "aspect-video";
      case "portrait":
      default:
        return "aspect-[3/4]";
    }
  };

  return (
    <div className="space-y-2">
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />

      {!currentImage ? (
        <div
          className={`relative border-2 border-dashed rounded-lg transition-all cursor-pointer ${getAspectClass()} flex items-center justify-center ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          } ${uploading && "opacity-50 cursor-not-allowed pointer-events-none"}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
        >
          <div className="text-center p-4">
            {uploading ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                <p className="text-sm text-muted-foreground mt-2">Uploading...</p>
              </>
            ) : (
              <>
                <Upload className={`h-8 w-8 mx-auto ${dragActive ? "text-primary" : "text-muted-foreground"}`} />
                <p className="text-sm text-primary mt-2 font-medium">{label}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Drag and drop or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG, WEBP, GIF (max 5MB)
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="relative group">
          <div className={`relative w-full overflow-hidden rounded-lg border-2 border-border ${getAspectClass()}`}>
            <Image
              src={currentImage}
              alt="Preview"
              fill
              className="object-cover"
            />
            
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-white mx-auto" />
                  <p className="text-white text-sm mt-2">Uploading...</p>
                </div>
              </div>
            )}
          </div>

          {!uploading && (
            <div className="flex gap-2 mt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
              >
                <Upload className="h-4 w-4 mr-2" />
                Replace
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemove}
                className="flex-1"
              >
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
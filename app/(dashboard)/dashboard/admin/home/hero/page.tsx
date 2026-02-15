// app/(dashboard)/dashboard/admin/home/hero/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/dashboard/admin/ImageUpload";

interface HeroData {
  id?: number;
  title: string;
  description: string;
  backgroundImage: string;
  backgroundImagePublicId: string | null;
  isActive: boolean;
}

export default function HeroManagementPage() {
  const [heroData, setHeroData] = useState<HeroData>({
    title: "",
    description: "",
    backgroundImage: "",
    backgroundImagePublicId: null,
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const response = await fetch("/api/admin/home/hero");
      if (!response.ok) throw new Error("Failed to fetch hero data");
      const result = await response.json();
      if (result.data) {
        setHeroData(result.data);
      }
    } catch (error) {
      toast.error("Failed to fetch hero data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (url: string, publicId: string) => {
    setHeroData(prev => ({
      ...prev,
      backgroundImage: url,
      backgroundImagePublicId: publicId,
    }));
  };

  const handleImageRemove = async () => {
    if (!heroData.backgroundImagePublicId) {
      // Just clear the state if no publicId
      setHeroData(prev => ({
        ...prev,
        backgroundImage: "",
        backgroundImagePublicId: null,
      }));
      return;
    }

    try {
      const response = await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: heroData.backgroundImagePublicId }),
      });

      if (!response.ok) throw new Error("Failed to delete image");

      setHeroData(prev => ({
        ...prev,
        backgroundImage: "",
        backgroundImagePublicId: null,
      }));
      toast.success("Image removed successfully");
    } catch (error) {
      console.error("Error removing image:", error);
      toast.error("Failed to remove image from cloud storage");
      // Still clear the state even if cloud deletion fails
      setHeroData(prev => ({
        ...prev,
        backgroundImage: "",
        backgroundImagePublicId: null,
      }));
    }
  };

  const handleSave = async () => {
    if (!heroData.title || !heroData.description || !heroData.backgroundImage) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/home/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(heroData),
      });

      if (!response.ok) throw new Error("Failed to save hero data");

      toast.success("Hero section saved successfully");
      fetchHeroData();
    } catch (error) {
      toast.error("Failed to save hero section");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Hero Section Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage the hero section on your home page
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Content</CardTitle>
          <CardDescription>Edit the main hero section content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Textarea
              id="title"
              placeholder="Home & Space\nImprovement\nStudio"
              value={heroData.title}
              onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
              rows={4}
              className="font-mono"
            />
            <p className="text-sm text-muted-foreground">
              Use \n for line breaks in the title
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Enter hero description..."
              value={heroData.description}
              onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
              rows={4}
            />
          </div>

          {/* Background Image */}
          <div className="space-y-2">
            <Label>Background Image *</Label>
            <ImageUpload
              onImageUpload={handleImageUpload}
              currentImage={heroData.backgroundImage}
              label="Upload Hero Background"
              folder="home/hero"
              aspectRatio="video"
              showRemoveButton={true}
            />
            <p className="text-sm text-muted-foreground">
              Recommended size: 1920x1080px for best quality
            </p>
          </div>

          {/* Active Status */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              checked={heroData.isActive}
              onChange={(e) => setHeroData({ ...heroData, isActive: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              Active (show on website)
            </Label>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="text-white"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
// app/(dashboard)/dashboard/admin/about/main-section/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { HomeImageUpload } from "@/components/dashboard/home/HomeImageUpload";

interface MainSectionData {
  id?: number;
  heading: string;
  description: string;
  image: string;
  imagePublicId: string | null;
  isActive: boolean;
}

export default function AboutMainSectionPage() {
  const [sectionData, setSectionData] = useState<MainSectionData>({
    heading: "",
    description: "",
    image: "",
    imagePublicId: null,
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSectionData();
  }, []);

  const fetchSectionData = async () => {
    try {
      const response = await fetch("/api/admin/about/main-section");
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      if (result.data) {
        setSectionData(result.data);
      }
    } catch (error) {
      toast.error("Failed to fetch main section data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (url: string, publicId: string) => {
    setSectionData(prev => ({
      ...prev,
      image: url,
      imagePublicId: publicId,
    }));
  };

  const handleSave = async () => {
    if (!sectionData.heading || !sectionData.description || !sectionData.image) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/about/main-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sectionData),
      });

      if (!response.ok) throw new Error("Failed to save");

      toast.success("Main section saved successfully");
      fetchSectionData();
    } catch (error) {
      toast.error("Failed to save main section");
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
      <div>
        <h1 className="text-3xl font-bold">Main Section</h1>
        <p className="text-muted-foreground mt-1">
          Manage the main introduction section of your About page
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Main Section Content</CardTitle>
          <CardDescription>Edit the heading, description, and main image</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="heading">Heading *</Label>
            <Input
              id="heading"
              value={sectionData.heading}
              onChange={(e) => setSectionData({ ...sectionData, heading: e.target.value })}
              placeholder="Menciptakan Ruang yang Menginspirasi"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={sectionData.description}
              onChange={(e) => setSectionData({ ...sectionData, description: e.target.value })}
              rows={8}
              placeholder="Enter full description..."
            />
          </div>

          <div className="space-y-2">
            <Label>Section Image *</Label>
            <HomeImageUpload
              onImageUpload={handleImageUpload}
              currentImage={sectionData.image}
              currentPublicId={sectionData.imagePublicId}
              label="Upload Main Section Image"
              folder="about/main"
              aspectRatio="portrait"
            />
            <p className="text-xs text-muted-foreground">
              Recommended: 800x1000px (4:3 aspect ratio)
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              checked={sectionData.isActive}
              onChange={(e) => setSectionData({ ...sectionData, isActive: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              Active (show on website)
            </Label>
          </div>

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
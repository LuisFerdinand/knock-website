// app/(dashboard)/dashboard/admin/about/hero-section/page.tsx
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

interface HeroSectionData {
  id?: number;
  heading: string;
  subheading: string;
  ctaConsultText: string;
  ctaConsultLink: string;
  ctaPortfolioText: string;
  ctaPortfolioLink: string;
  image: string;
  imagePublicId: string | null;
  isActive: boolean;
}

export default function AboutHeroSectionPage() {
  const [sectionData, setSectionData] = useState<HeroSectionData>({
    heading: "",
    subheading: "",
    ctaConsultText: "",
    ctaConsultLink: "",
    ctaPortfolioText: "",
    ctaPortfolioLink: "",
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
      const response = await fetch("/api/admin/about/hero-section");
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      if (result.data) {
        setSectionData(result.data);
      }
    } catch (error) {
      toast.error("Failed to fetch hero section data");
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
    if (!sectionData.heading || !sectionData.subheading || !sectionData.image ||
        !sectionData.ctaConsultText || !sectionData.ctaConsultLink ||
        !sectionData.ctaPortfolioText || !sectionData.ctaPortfolioLink) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/about/hero-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sectionData),
      });

      if (!response.ok) throw new Error("Failed to save");

      toast.success("Hero section saved successfully");
      fetchSectionData();
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
      <div>
        <h1 className="text-3xl font-bold">Hero Section</h1>
        <p className="text-muted-foreground mt-1">
          Manage the hero section with call-to-action buttons
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Content</CardTitle>
          <CardDescription>Edit heading, subheading, CTAs, and hero image</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="heading">Heading *</Label>
            <Input
              id="heading"
              value={sectionData.heading}
              onChange={(e) => setSectionData({ ...sectionData, heading: e.target.value })}
              placeholder="Tentang Knock Studio"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subheading">Subheading *</Label>
            <Textarea
              id="subheading"
              value={sectionData.subheading}
              onChange={(e) => setSectionData({ ...sectionData, subheading: e.target.value })}
              rows={3}
              placeholder="Short description..."
            />
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            <div className="space-y-4">
              <h3 className="font-semibold">Primary CTA (Consult)</h3>
              <div className="space-y-2">
                <Label htmlFor="ctaConsultText">Button Text *</Label>
                <Input
                  id="ctaConsultText"
                  value={sectionData.ctaConsultText}
                  onChange={(e) => setSectionData({ ...sectionData, ctaConsultText: e.target.value })}
                  placeholder="Konsultasi dengan Kami"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaConsultLink">Button Link *</Label>
                <Input
                  id="ctaConsultLink"
                  value={sectionData.ctaConsultLink}
                  onChange={(e) => setSectionData({ ...sectionData, ctaConsultLink: e.target.value })}
                  placeholder="/schedule"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Secondary CTA (Portfolio)</h3>
              <div className="space-y-2">
                <Label htmlFor="ctaPortfolioText">Button Text *</Label>
                <Input
                  id="ctaPortfolioText"
                  value={sectionData.ctaPortfolioText}
                  onChange={(e) => setSectionData({ ...sectionData, ctaPortfolioText: e.target.value })}
                  placeholder="Lihat Karya Kami"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaPortfolioLink">Button Link *</Label>
                <Input
                  id="ctaPortfolioLink"
                  value={sectionData.ctaPortfolioLink}
                  onChange={(e) => setSectionData({ ...sectionData, ctaPortfolioLink: e.target.value })}
                  placeholder="/portfolio"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <Label>Hero Image *</Label>
            <HomeImageUpload
              onImageUpload={handleImageUpload}
              currentImage={sectionData.image}
              currentPublicId={sectionData.imagePublicId}
              label="Upload Hero Image"
              folder="about/hero"
              aspectRatio="square"
            />
            <p className="text-xs text-muted-foreground">
              Recommended: 1000x1000px (square aspect ratio)
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
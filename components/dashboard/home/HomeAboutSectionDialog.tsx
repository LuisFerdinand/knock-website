// components/dashboard/home/HomeAboutSectionDialog.tsx
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { HomeImageUpload } from "./HomeImageUpload";

interface AboutSection {
  id?: number;
  heading: string;
  description: string;
  highlightText: string;
  yearsLabel: string;
  clientsLabel: string;
  mainImage: string;
  mainImagePublicId: string | null;
  secondaryImage: string;
  secondaryImagePublicId: string | null;
  isActive: boolean;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  section: AboutSection | null;
  onSuccess: () => void;
}

export function HomeAboutSectionDialog({ open, onOpenChange, section, onSuccess }: Props) {
  const [formData, setFormData] = useState<AboutSection>({
    heading: "",
    description: "",
    highlightText: "",
    yearsLabel: "",
    clientsLabel: "",
    mainImage: "",
    mainImagePublicId: null,
    secondaryImage: "",
    secondaryImagePublicId: null,
    isActive: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (section) {
      setFormData(section);
    } else {
      setFormData({
        heading: "",
        description: "",
        highlightText: "",
        yearsLabel: "",
        clientsLabel: "",
        mainImage: "",
        mainImagePublicId: null,
        secondaryImage: "",
        secondaryImagePublicId: null,
        isActive: true,
      });
    }
  }, [section, open]);

  const handleMainImageUpload = (url: string, publicId: string) => {
    setFormData(prev => ({
      ...prev,
      mainImage: url,
      mainImagePublicId: publicId,
    }));
  };

  const handleSecondaryImageUpload = (url: string, publicId: string) => {
    setFormData(prev => ({
      ...prev,
      secondaryImage: url,
      secondaryImagePublicId: publicId,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.heading || !formData.description || !formData.mainImage || !formData.secondaryImage) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/home/about/section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save section");

      toast.success("Section saved successfully");
      onSuccess();
    } catch (error) {
      toast.error("Failed to save section");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit About Section</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="heading">Heading *</Label>
            <Input
              id="heading"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              placeholder="Menciptakan Ruang yang Menginspirasi..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="highlightText">Highlight Text</Label>
            <Textarea
              id="highlightText"
              value={formData.highlightText}
              onChange={(e) => setFormData({ ...formData, highlightText: e.target.value })}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="yearsLabel">Years Label *</Label>
              <Input
                id="yearsLabel"
                value={formData.yearsLabel}
                onChange={(e) => setFormData({ ...formData, yearsLabel: e.target.value })}
                placeholder="Tahunan"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientsLabel">Clients Label *</Label>
              <Input
                id="clientsLabel"
                value={formData.clientsLabel}
                onChange={(e) => setFormData({ ...formData, clientsLabel: e.target.value })}
                placeholder="Puluhan"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Main Image */}
            <div className="space-y-2">
              <Label>Main Image *</Label>
              <HomeImageUpload
                onImageUpload={handleMainImageUpload}
                currentImage={formData.mainImage}
                currentPublicId={formData.mainImagePublicId}
                label="Upload Main Image"
                folder="home/about-main"
                aspectRatio="portrait"
              />
              <p className="text-xs text-muted-foreground">
                Large main image (3:4 aspect ratio)
              </p>
            </div>

            {/* Secondary Image */}
            <div className="space-y-2">
              <Label>Secondary Image *</Label>
              <HomeImageUpload
                onImageUpload={handleSecondaryImageUpload}
                currentImage={formData.secondaryImage}
                currentPublicId={formData.secondaryImagePublicId}
                label="Upload Secondary Image"
                folder="home/about-secondary"
                aspectRatio="square"
              />
              <p className="text-xs text-muted-foreground">
                Smaller overlay image (1:1 square)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="isActive" className="cursor-pointer">Active</Label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving} className="text-white">
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
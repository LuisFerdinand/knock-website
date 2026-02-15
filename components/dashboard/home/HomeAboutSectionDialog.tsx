// components/dashboard/home/HomeAboutSectionDialog.tsx
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

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
  const [isUploadingMain, setIsUploadingMain] = useState(false);
  const [isUploadingSecondary, setIsUploadingSecondary] = useState(false);

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

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "main" | "secondary"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const setUploading = type === "main" ? setIsUploadingMain : setIsUploadingSecondary;
    setUploading(true);

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("folder", `home/about-${type}`);

    try {
      const response = await fetch("/api/upload-home", {
        method: "POST",
        body: formDataUpload,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      
      if (type === "main") {
        setFormData(prev => ({
          ...prev,
          mainImage: data.url,
          mainImagePublicId: data.publicId,
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          secondaryImage: data.url,
          secondaryImagePublicId: data.publicId,
        }));
      }
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async (type: "main" | "secondary") => {
    const publicId = type === "main" ? formData.mainImagePublicId : formData.secondaryImagePublicId;
    if (!publicId) return;

    try {
      await fetch("/api/upload-home", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      if (type === "main") {
        setFormData(prev => ({
          ...prev,
          mainImage: "",
          mainImagePublicId: null,
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          secondaryImage: "",
          secondaryImagePublicId: null,
        }));
      }
      toast.success("Image removed");
    } catch (error) {
      toast.error("Failed to remove image");
    }
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
              {formData.mainImage ? (
                <div className="space-y-2">
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image src={formData.mainImage} alt="Main" fill className="object-cover" />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveImage("main")}
                    className="w-full"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-4">
                  <Label htmlFor="main-image" className="cursor-pointer block text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-primary mt-2 block">Upload Main Image</span>
                    <Input
                      id="main-image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "main")}
                      disabled={isUploadingMain}
                      className="hidden"
                    />
                  </Label>
                  {isUploadingMain && <Loader2 className="h-6 w-6 animate-spin mx-auto mt-2" />}
                </div>
              )}
            </div>

            {/* Secondary Image */}
            <div className="space-y-2">
              <Label>Secondary Image *</Label>
              {formData.secondaryImage ? (
                <div className="space-y-2">
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image src={formData.secondaryImage} alt="Secondary" fill className="object-cover" />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveImage("secondary")}
                    className="w-full"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-4">
                  <Label htmlFor="secondary-image" className="cursor-pointer block text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-primary mt-2 block">Upload Secondary Image</span>
                    <Input
                      id="secondary-image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "secondary")}
                      disabled={isUploadingSecondary}
                      className="hidden"
                    />
                  </Label>
                  {isUploadingSecondary && <Loader2 className="h-6 w-6 animate-spin mx-auto mt-2" />}
                </div>
              )}
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
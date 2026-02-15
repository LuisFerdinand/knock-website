// components/dashboard/home/HomeAboutFeatureDialog.tsx
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AboutFeature {
  id?: number;
  feature: string;
  order: number;
  isActive: boolean;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature: AboutFeature | null;
  onSuccess: () => void;
}

export function HomeAboutFeatureDialog({ open, onOpenChange, feature, onSuccess }: Props) {
  const [formData, setFormData] = useState<AboutFeature>({
    feature: "",
    order: 0,
    isActive: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (feature) {
      setFormData(feature);
    } else {
      setFormData({
        feature: "",
        order: 0,
        isActive: true,
      });
    }
  }, [feature, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.feature) {
      toast.error("Please enter a feature");
      return;
    }

    setIsSaving(true);
    try {
      const url = feature
        ? `/api/admin/home/about/features/${feature.id}`
        : "/api/admin/home/about/features";
      const method = feature ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save feature");

      toast.success(`Feature ${feature ? "updated" : "created"} successfully`);
      onSuccess();
    } catch (error) {
      toast.error("Failed to save feature");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{feature ? "Edit Feature" : "Add Feature"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="feature">Feature *</Label>
            <Input
              id="feature"
              value={formData.feature}
              onChange={(e) => setFormData({ ...formData, feature: e.target.value })}
              placeholder="Tim desain berpengalaman"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="order">Order</Label>
            <Input
              id="order"
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              Active
            </Label>
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
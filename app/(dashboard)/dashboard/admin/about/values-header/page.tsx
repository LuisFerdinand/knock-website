// app/(dashboard)/dashboard/admin/about/values-header/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ValuesSectionData {
  id?: number;
  heading: string;
  description: string;
  isActive: boolean;
}

export default function AboutValuesSectionPage() {
  const [sectionData, setSectionData] = useState<ValuesSectionData>({
    heading: "",
    description: "",
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSectionData();
  }, []);

  const fetchSectionData = async () => {
    try {
      const response = await fetch("/api/admin/about/values-section");
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      if (result.data) {
        setSectionData(result.data);
      }
    } catch (error) {
      toast.error("Failed to fetch values section data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!sectionData.heading || !sectionData.description) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/about/values-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sectionData),
      });

      if (!response.ok) throw new Error("Failed to save");

      toast.success("Values section header saved successfully");
      fetchSectionData();
    } catch (error) {
      toast.error("Failed to save values section");
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
        <h1 className="text-3xl font-bold">Values Section Header</h1>
        <p className="text-muted-foreground mt-1">
          Manage the heading and description for the Values section
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Section Header</CardTitle>
          <CardDescription>Edit the values section heading and description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="heading">Heading *</Label>
            <Input
              id="heading"
              value={sectionData.heading}
              onChange={(e) => setSectionData({ ...sectionData, heading: e.target.value })}
              placeholder="Nilai-Nilai Kami"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={sectionData.description}
              onChange={(e) => setSectionData({ ...sectionData, description: e.target.value })}
              rows={4}
              placeholder="Enter section description..."
            />
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


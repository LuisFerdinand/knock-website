// app/(dashboard)/dashboard/admin/home/about/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { HomeAboutSectionDialog } from "@/components/dashboard/home/HomeAboutSectionDialog";
import { HomeAboutFeatureDialog } from "@/components/dashboard/home/HomeAboutFeatureDialog";

interface AboutSection {
  id: number;
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

interface AboutFeature {
  id: number;
  feature: string;
  order: number;
  isActive: boolean;
}

export default function HomeAboutPage() {
  const [section, setSection] = useState<AboutSection | null>(null);
  const [features, setFeatures] = useState<AboutFeature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sectionDialogOpen, setSectionDialogOpen] = useState(false);
  const [featureDialogOpen, setFeatureDialogOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<AboutFeature | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch section
      const sectionResponse = await fetch("/api/admin/home/about/section");
      if (sectionResponse.ok) {
        const sectionData = await sectionResponse.json();
        setSection(sectionData.data);
      }

      // Fetch features
      const featuresResponse = await fetch("/api/admin/home/about/features");
      if (featuresResponse.ok) {
        const featuresData = await featuresResponse.json();
        setFeatures(featuresData.data || []);
      }
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFeature = async (id: number) => {
    if (!confirm("Are you sure you want to delete this feature?")) return;

    try {
      const response = await fetch(`/api/admin/home/about/features/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete feature");

      toast.success("Feature deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete feature");
    }
  };

  const handleToggleActive = async (feature: AboutFeature) => {
    try {
      const response = await fetch(`/api/admin/home/about/features/${feature.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !feature.isActive }),
      });

      if (!response.ok) throw new Error("Failed to update feature");

      toast.success(`Feature ${!feature.isActive ? "activated" : "deactivated"}`);
      fetchData();
    } catch (error) {
      toast.error("Failed to update feature");
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
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">About Section Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage the about section on your home page
            </p>
          </div>
        </div>

        {/* Section Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Section Content</CardTitle>
                <CardDescription>Manage the about section content and images</CardDescription>
              </div>
              <Button onClick={() => setSectionDialogOpen(true)} className="text-white">
                <Edit className="h-4 w-4 mr-2" />
                Edit Section
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {section ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-1">Heading</h3>
                  <p className="text-muted-foreground">{section.heading}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Description</h3>
                  <p className="text-muted-foreground">{section.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-1">Years Label</h3>
                    <p className="text-muted-foreground">{section.yearsLabel}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Clients Label</h3>
                    <p className="text-muted-foreground">{section.clientsLabel}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Main Image</h3>
                    <div className="relative w-full h-48 rounded-lg overflow-hidden">
                      <Image
                        src={section.mainImage}
                        alt="Main"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Secondary Image</h3>
                    <div className="relative w-full h-48 rounded-lg overflow-hidden">
                      <Image
                        src={section.secondaryImage}
                        alt="Secondary"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No section content configured yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Features List</CardTitle>
                <CardDescription>Manage the feature list items</CardDescription>
              </div>
              <Button
                onClick={() => {
                  setEditingFeature(null);
                  setFeatureDialogOpen(true);
                }}
                className="text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No features found. Create your first feature.
                    </TableCell>
                  </TableRow>
                ) : (
                  features.map((feature) => (
                    <TableRow key={feature.id}>
                      <TableCell className="font-medium">{feature.feature}</TableCell>
                      <TableCell>{feature.order}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            feature.isActive
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400"
                          }`}
                        >
                          {feature.isActive ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleActive(feature)}
                          >
                            {feature.isActive ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingFeature(feature);
                              setFeatureDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteFeature(feature.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <HomeAboutSectionDialog
        open={sectionDialogOpen}
        onOpenChange={setSectionDialogOpen}
        section={section}
        onSuccess={() => {
          fetchData();
          setSectionDialogOpen(false);
        }}
      />

      <HomeAboutFeatureDialog
        open={featureDialogOpen}
        onOpenChange={setFeatureDialogOpen}
        feature={editingFeature}
        onSuccess={() => {
          fetchData();
          setFeatureDialogOpen(false);
          setEditingFeature(null);
        }}
      />
    </>
  );
}
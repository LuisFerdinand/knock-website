// app/(dashboard)/dashboard/admin/home/services/page.tsx
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
import { HomeServicesSectionDialog } from "@/components/dashboard/home/HomeServicesSectionDialog";
import { HomeServiceDialog } from "@/components/dashboard/home/HomeServiceDialog";

interface ServiceSection {
  id: number;
  heading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export default function HomeServicesPage() {
  const [section, setSection] = useState<ServiceSection | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sectionDialogOpen, setSectionDialogOpen] = useState(false);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch section header
      const sectionResponse = await fetch("/api/admin/home/services/section");
      if (sectionResponse.ok) {
        const sectionData = await sectionResponse.json();
        setSection(sectionData.data);
      }

      // Fetch services
      const servicesResponse = await fetch("/api/admin/home/services");
      if (servicesResponse.ok) {
        const servicesData = await servicesResponse.json();
        setServices(servicesData.data || []);
      }
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await fetch(`/api/admin/home/services/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete service");

      toast.success("Service deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete service");
    }
  };

  const handleToggleActive = async (service: Service) => {
    try {
      const response = await fetch(`/api/admin/home/services/${service.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !service.isActive }),
      });

      if (!response.ok) throw new Error("Failed to update service");

      toast.success(`Service ${!service.isActive ? "activated" : "deactivated"}`);
      fetchData();
    } catch (error) {
      toast.error("Failed to update service");
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
            <h1 className="text-3xl font-bold text-foreground">Services Section Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage the services section on your home page
            </p>
          </div>
        </div>

        {/* Section Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Section Header</CardTitle>
                <CardDescription>Manage the services section heading and description</CardDescription>
              </div>
              <Button onClick={() => setSectionDialogOpen(true)} className="text-white">
                <Edit className="h-4 w-4 mr-2" />
                Edit Header
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {section ? (
              <div className="space-y-4">
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
                    <h3 className="font-semibold mb-1">CTA Text</h3>
                    <p className="text-muted-foreground">{section.ctaText}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">CTA Link</h3>
                    <p className="text-muted-foreground">{section.ctaLink}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No section header configured yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Service Items */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Service Items</CardTitle>
                <CardDescription>Manage individual service cards</CardDescription>
              </div>
              <Button
                onClick={() => {
                  setEditingService(null);
                  setServiceDialogOpen(true);
                }}
                className="text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No services found. Create your first service.
                    </TableCell>
                  </TableRow>
                ) : (
                  services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.title}</TableCell>
                      <TableCell>{service.icon}</TableCell>
                      <TableCell>{service.order}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            service.isActive
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400"
                          }`}
                        >
                          {service.isActive ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleActive(service)}
                          >
                            {service.isActive ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingService(service);
                              setServiceDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteService(service.id)}
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
      <HomeServicesSectionDialog
        open={sectionDialogOpen}
        onOpenChange={setSectionDialogOpen}
        section={section}
        onSuccess={() => {
          fetchData();
          setSectionDialogOpen(false);
        }}
      />

      <HomeServiceDialog
        open={serviceDialogOpen}
        onOpenChange={setServiceDialogOpen}
        service={editingService}
        onSuccess={() => {
          fetchData();
          setServiceDialogOpen(false);
          setEditingService(null);
        }}
      />
    </>
  );
}
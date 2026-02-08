/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Loader2,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
} from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import MultiImageUpload, { ImageData } from "@/components/admin/MultiImageUpload";
import { Project } from "@/lib/db/schema";

// Form data interface
interface FormData {
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  completion: string;
  description: string;
  beforeImage: string;
  beforeImagePublicId: string;
  afterImage: string;
  afterImagePublicId: string;
  galleryImages: ImageData[];
  tags: string[];
  client: string;
  scope: string;
  budget: string;
  team: string;
}

// Form steps for better UX
const FORM_STEPS = [
  { id: 1, name: "Basic Info", description: "Project details" },
  { id: 2, name: "Images", description: "Upload images" },
  { id: 3, name: "Additional", description: "Extra details" },
];

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState("projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);

  // Form state
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    location: "",
    year: new Date().getFullYear().toString(),
    area: "",
    completion: "Completed",
    description: "",
    beforeImage: "",
    beforeImagePublicId: "",
    afterImage: "",
    afterImagePublicId: "",
    galleryImages: [],
    tags: [],
    client: "",
    scope: "",
    budget: "",
    team: "",
  });

  // Fetch projects
  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter projects
  useEffect(() => {
    let filtered = projects;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    setFilteredProjects(filtered);
  }, [projects, searchQuery, categoryFilter]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image uploads
  const handleBeforeImageUpload = (url: string, publicId: string) => {
    setFormData((prev) => ({
      ...prev,
      beforeImage: url,
      beforeImagePublicId: publicId,
    }));
  };

  const handleAfterImageUpload = (url: string, publicId: string) => {
    setFormData((prev) => ({
      ...prev,
      afterImage: url,
      afterImagePublicId: publicId,
    }));
  };

  const handleGalleryImagesChange = (images: ImageData[]) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: images,
    }));
  };

  // Handle tags
  const handleTagsChange = (value: string) => {
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    setFormData((prev) => ({ ...prev, tags }));
  };

  const removeTag = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, index) => index !== indexToRemove),
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      location: "",
      year: new Date().getFullYear().toString(),
      area: "",
      completion: "Completed",
      description: "",
      beforeImage: "",
      beforeImagePublicId: "",
      afterImage: "",
      afterImagePublicId: "",
      galleryImages: [],
      tags: [],
      client: "",
      scope: "",
      budget: "",
      team: "",
    });
    setCurrentStep(1);
  };

  // Validate current step
  const validateStep = (step: number): boolean => {
    if (step === 1) {
      return !!(
        formData.title &&
        formData.category &&
        formData.location &&
        formData.year &&
        formData.area &&
        formData.description
      );
    }
    if (step === 2) {
      return !!(formData.beforeImage && formData.afterImage);
    }
    return true;
  };

  // Create new project
  const handleCreateProject = async () => {
    try {
      const payload = {
        ...formData,
        galleryImages: formData.galleryImages.map((img) => img.url),
        galleryImagePublicIds: formData.galleryImages.map((img) => img.publicId),
      };

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to create project");

      await fetchProjects();
      resetForm();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating project:", error);
      setError("Failed to create project");
    }
  };

  // Update project
  const handleUpdateProject = async () => {
    if (!selectedProject) return;

    try {
      const payload = {
        ...formData,
        galleryImages: formData.galleryImages.map((img) =>
          typeof img === "string" ? img : img.url
        ),
        galleryImagePublicIds: formData.galleryImages.map((img) =>
          typeof img === "object" ? img.publicId : ""
        ),
      };

      const response = await fetch(`/api/projects/${selectedProject.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to update project");

      await fetchProjects();
      resetForm();
      setIsEditModalOpen(false);
      setSelectedProject(null);
    } catch (error) {
      console.error("Error updating project:", error);
      setError("Failed to update project");
    }
  };

  // Delete project
  const handleDeleteProject = async () => {
    if (!projectToDelete) return;

    try {
      const response = await fetch(`/api/projects/${projectToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete project");

      await fetchProjects();
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    } catch (error) {
      console.error("Error deleting project:", error);
      setError("Failed to delete project");
    }
  };

  // Open edit modal with project data
  const openEditModal = (project: Project) => {
    setSelectedProject(project);
    
    // Convert gallery images to ImageData format
    const galleryImages: ImageData[] = Array.isArray(project.galleryImages)
      ? project.galleryImages.map((url: any, index: number) => ({
          url: typeof url === 'string' ? url : url,
          publicId: Array.isArray(project.galleryImagePublicIds) 
            ? (project.galleryImagePublicIds[index] as string || "") 
            : "",
          id: `${Date.now()}-${index}`,
        }))
      : [];

    setFormData({
      title: project.title,
      category: project.category,
      location: project.location,
      year: project.year,
      area: project.area,
      completion: project.completion,
      description: project.description,
      beforeImage: project.beforeImage,
      beforeImagePublicId: project.beforeImagePublicId || "",
      afterImage: project.afterImage,
      afterImagePublicId: project.afterImagePublicId || "",
      galleryImages,
      tags: Array.isArray(project.tags) ? project.tags.map(String) : [],
      client: project.client || "",
      scope: project.scope || "",
      budget: project.budget || "",
      team: project.team || "",
    });
    setCurrentStep(1); // Reset to first step
    setIsEditModalOpen(true);
  };

  const openDeleteDialog = (id: number) => {
    setProjectToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Get unique categories
  const categories = Array.from(new Set(projects.map((p) => p.category)));

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" style={{ color: 'var(--color-primary)' }} />
            <p className="mt-4 text-lg text-gray-600">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-20 px-4 pt-28">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--color-primary)' }}>Portfolio Admin</h1>
          <p className="text-gray-600 mt-1">
            Manage your portfolio projects and content
          </p>
        </div>
        <Button 
          onClick={() => setIsCreateModalOpen(true)} 
          size="lg"
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-700)] text-white"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Project
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center justify-between">
          <span>{error}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setError(null)}
            className="text-red-700 hover:text-red-900"
          >
            Dismiss
          </Button>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6" style={{ backgroundColor: 'var(--color-tertiary)' }}>
          <TabsTrigger 
            value="projects" 
            className="data-[state=active]:bg-[var(--color-primary)] data-[state=active]:text-white"
          >
            Projects
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="data-[state=active]:bg-[var(--color-primary)] data-[state=active]:text-white"
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Projects Table */}
          <Card>
            <CardHeader>
              <CardTitle>Projects ({filteredProjects.length})</CardTitle>
              <CardDescription>
                View and manage all your portfolio projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProjects.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <p className="text-gray-500">No projects found</p>
                          <Button
                            variant="link"
                            onClick={() => {
                              setSearchQuery("");
                              setCategoryFilter("all");
                            }}
                            className="mt-2"
                            style={{ color: 'var(--color-primary)' }}
                          >
                            Clear filters
                          </Button>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProjects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell className="font-mono text-sm">
                            #{project.id}
                          </TableCell>
                          <TableCell className="font-medium">
                            {project.title}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="secondary" 
                              style={{ backgroundColor: 'var(--color-secondary-100)', color: 'var(--color-secondary-800)' }}
                            >
                              {project.category}
                            </Badge>
                          </TableCell>
                          <TableCell>{project.location}</TableCell>
                          <TableCell>{project.year}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                project.completion === "Completed"
                                  ? "default"
                                  : "outline"
                              }
                              style={{
                                backgroundColor: project.completion === "Completed" 
                                  ? 'var(--color-primary-600)' 
                                  : 'transparent',
                                color: project.completion === "Completed" 
                                  ? 'white' 
                                  : 'var(--color-primary-600)',
                                borderColor: 'var(--color-primary-600)'
                              }}
                            >
                              {project.completion}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  window.open(`/portfolio/${project.id}`, "_blank")
                                }
                                style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditModal(project)}
                                style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openDeleteDialog(project.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">
                  Total Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>{projects.length}</div>
                <p className="text-xs text-gray-500 mt-1">
                  All time
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" style={{ color: 'var(--color-secondary)' }}>{categories.length}</div>
                <p className="text-xs text-gray-500 mt-1">
                  Unique categories
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">
                  Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" style={{ color: 'var(--color-primary-600)' }}>
                  {new Set(projects.map((p) => p.location)).size}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Unique locations
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">
                  Latest Year
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" style={{ color: 'var(--color-secondary-600)' }}>
                  {projects.length > 0
                    ? Math.max(...projects.map((p) => parseInt(p.year)))
                    : "N/A"}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Most recent project
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
              <CardDescription>
                Projects distribution by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category) => {
                  const count = projects.filter(
                    (p) => p.category === category
                  ).length;
                  const percentage = (count / projects.length) * 100;

                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{category}</span>
                        <span className="text-gray-500">
                          {count} projects ({percentage.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: 'var(--color-primary)'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Project Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-6xl w-fullmax-h-[95vh] overflow-hidden flex flex-col p-0" style={{ backgroundColor: 'var(--color-background)' }}>
          <DialogHeader className="px-8 pt-8 pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <DialogTitle className="text-2xl" style={{ color: 'var(--color-foreground)' }}>Create New Project</DialogTitle>
            <DialogDescription className="text-base" style={{ color: 'var(--color-muted-foreground)' }}>
              Add a new project to your portfolio. Fill in all the required information.
            </DialogDescription>
          </DialogHeader>

          {/* Progress Steps */}
          <div className="flex items-center justify-between px-8 py-4 border-b bg-gray-50/50" style={{ borderColor: 'var(--color-border)' }}>
            {FORM_STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      currentStep > step.id
                        ? "text-white"
                        : currentStep === step.id
                        ? "text-primary"
                        : "text-gray-300"
                    }`}
                    style={{
                      backgroundColor: currentStep > step.id 
                        ? 'var(--color-primary)' 
                        : 'transparent',
                      borderColor: currentStep >= step.id 
                        ? 'var(--color-primary)' 
                        : 'var(--color-border)'
                    }}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="font-semibold">{step.id}</span>
                    )}
                  </div>
                  <div className="ml-3">
                    <p
                      className={`text-sm font-semibold ${
                        currentStep >= step.id
                          ? "text-gray-900"
                          : "text-gray-400"
                      }`}
                      style={{ 
                        color: currentStep >= step.id 
                          ? 'var(--color-foreground)' 
                          : 'var(--color-muted-foreground)' 
                      }}
                    >
                      {step.name}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < FORM_STEPS.length - 1 && (
                  <div className="flex-1 h-0.5 mx-4 bg-gray-200">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: currentStep > step.id ? "100%" : "0%",
                        backgroundColor: 'var(--color-primary)'
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-6">
            <ProjectFormSteps
              currentStep={currentStep}
              formData={formData}
              handleInputChange={handleInputChange}
              handleBeforeImageUpload={handleBeforeImageUpload}
              handleAfterImageUpload={handleAfterImageUpload}
              handleGalleryImagesChange={handleGalleryImagesChange}
              handleTagsChange={handleTagsChange}
              removeTag={removeTag}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center px-8 py-5 border-t bg-gray-50/50" style={{ borderColor: 'var(--color-border)' }}>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => {
                if (currentStep === 1) {
                  resetForm();
                  setIsCreateModalOpen(false);
                } else {
                  setCurrentStep((prev) => prev - 1);
                }
              }}
              className="min-w-[120px]"
              style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              {currentStep === 1 ? "Cancel" : "Previous"}
            </Button>

            <div className="text-sm font-medium" style={{ color: 'var(--color-muted-foreground)' }}>
              Step {currentStep} of {FORM_STEPS.length}
            </div>

            <Button
              type="button"
              size="lg"
              onClick={() => {
                if (currentStep === FORM_STEPS.length) {
                  handleCreateProject();
                } else {
                  if (validateStep(currentStep)) {
                    setCurrentStep((prev) => prev + 1);
                  } else {
                    setError("Please fill in all required fields");
                    setTimeout(() => setError(null), 3000);
                  }
                }
              }}
              disabled={!validateStep(currentStep)}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-700)] text-white min-w-[120px]"
            >
              {currentStep === FORM_STEPS.length ? "Create Project" : "Next"}
              {currentStep < FORM_STEPS.length && (
                <ChevronRight className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Project Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col p-0" style={{ backgroundColor: 'var(--color-background)' }}>
          <DialogHeader className="px-8 pt-8 pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <DialogTitle className="text-2xl" style={{ color: 'var(--color-foreground)' }}>Edit Project</DialogTitle>
            <DialogDescription className="text-base" style={{ color: 'var(--color-muted-foreground)' }}>
              Update the project details and information.
            </DialogDescription>
          </DialogHeader>

          {/* Progress Steps */}
          <div className="flex items-center justify-between px-8 py-4 border-b bg-gray-50/50" style={{ borderColor: 'var(--color-border)' }}>
            {FORM_STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors cursor-pointer hover:scale-105 ${
                      currentStep > step.id
                        ? "text-white"
                        : currentStep === step.id
                        ? "text-primary"
                        : "text-gray-300"
                    }`}
                    style={{
                      backgroundColor: currentStep > step.id 
                        ? 'var(--color-primary)' 
                        : 'transparent',
                      borderColor: currentStep >= step.id 
                        ? 'var(--color-primary)' 
                        : 'var(--color-border)'
                    }}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="font-semibold">{step.id}</span>
                    )}
                  </button>
                  <div className="ml-3">
                    <p
                      className={`text-sm font-semibold ${
                        currentStep >= step.id
                          ? "text-gray-900"
                          : "text-gray-400"
                      }`}
                      style={{ 
                        color: currentStep >= step.id 
                          ? 'var(--color-foreground)' 
                          : 'var(--color-muted-foreground)' 
                      }}
                    >
                      {step.name}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < FORM_STEPS.length - 1 && (
                  <div className="flex-1 h-0.5 mx-4 bg-gray-200">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: currentStep > step.id ? "100%" : "0%",
                        backgroundColor: 'var(--color-primary)'
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-6">
            <ProjectFormSteps
              currentStep={currentStep}
              formData={formData}
              handleInputChange={handleInputChange}
              handleBeforeImageUpload={handleBeforeImageUpload}
              handleAfterImageUpload={handleAfterImageUpload}
              handleGalleryImagesChange={handleGalleryImagesChange}
              handleTagsChange={handleTagsChange}
              removeTag={removeTag}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center px-8 py-5 border-t bg-gray-50/50" style={{ borderColor: 'var(--color-border)' }}>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => {
                if (currentStep === 1) {
                  resetForm();
                  setIsEditModalOpen(false);
                  setSelectedProject(null);
                } else {
                  setCurrentStep((prev) => prev - 1);
                }
              }}
              className="min-w-[120px]"
              style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              {currentStep === 1 ? "Cancel" : "Previous"}
            </Button>

            <div className="text-sm font-medium" style={{ color: 'var(--color-muted-foreground)' }}>
              Step {currentStep} of {FORM_STEPS.length}
            </div>

            <Button
              type="button"
              size="lg"
              onClick={() => {
                if (currentStep === FORM_STEPS.length) {
                  handleUpdateProject();
                } else {
                  if (validateStep(currentStep)) {
                    setCurrentStep((prev) => prev + 1);
                  } else {
                    setError("Please fill in all required fields");
                    setTimeout(() => setError(null), 3000);
                  }
                }
              }}
              disabled={!validateStep(currentStep)}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-700)] text-white min-w-[120px]"
            >
              {currentStep === FORM_STEPS.length ? "Update Project" : "Next"}
              {currentStep < FORM_STEPS.length && (
                <ChevronRight className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent style={{ backgroundColor: 'var(--color-background)' }}>
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: 'var(--color-foreground)' }}>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription style={{ color: 'var(--color-muted-foreground)' }}>
              This action cannot be undone. This will permanently delete the
              project and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Project Form Steps Component
interface ProjectFormStepsProps {
  currentStep: number;
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleBeforeImageUpload: (url: string, publicId: string) => void;
  handleAfterImageUpload: (url: string, publicId: string) => void;
  handleGalleryImagesChange: (images: ImageData[]) => void;
  handleTagsChange: (value: string) => void;
  removeTag: (index: number) => void;
}

function ProjectFormSteps({
  currentStep,
  formData,
  handleInputChange,
  handleBeforeImageUpload,
  handleAfterImageUpload,
  handleGalleryImagesChange,
  handleTagsChange,
  removeTag,
}: ProjectFormStepsProps) {
  return (
    <div className="space-y-8">
      {/* Step 1: Basic Info */}
      {currentStep === 1 && (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>Basic Information</h3>
            <p className="text-sm text-gray-500 mb-6">Enter the core details about your project</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="title" className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>
                  Project Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Modern Villa Renovation"
                  required
                  className="h-12 text-base"
                  style={{ borderColor: 'var(--color-border)' }}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="category" className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange({
                      target: { name: "category", value },
                    } as any)
                  }
                >
                  <SelectTrigger className="h-12 text-base" style={{ borderColor: 'var(--color-border)' }}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Industrial">Industrial</SelectItem>
                    <SelectItem value="Hospitality">Hospitality</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Office">Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="location" className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>
                  Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Beverly Hills, CA"
                  required
                  className="h-12 text-base"
                  style={{ borderColor: 'var(--color-border)' }}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="year" className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>
                  Year <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="2024"
                  required
                  className="h-12 text-base"
                  style={{ borderColor: 'var(--color-border)' }}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="area" className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>
                  Area <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="e.g., 4,500 sq ft"
                  required
                  className="h-12 text-base"
                  style={{ borderColor: 'var(--color-border)' }}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="completion" className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>
                  Status <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.completion}
                  onValueChange={(value) =>
                    handleInputChange({
                      target: { name: "completion", value },
                    } as any)
                  }
                >
                  <SelectTrigger className="h-12 text-base" style={{ borderColor: 'var(--color-border)' }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Planned">Planned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>
              Project Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={8}
              placeholder="Describe the project, its goals, challenges, and achievements..."
              required
              className="text-base resize-none"
              style={{ borderColor: 'var(--color-border)' }}
            />
            <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
              {formData.description.length} characters
            </p>
          </div>
        </div>
      )}

      {/* Step 2: Images */}
      {currentStep === 2 && (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>Project Images</h3>
            <p className="text-sm text-gray-500 mb-6">
              Upload before/after images and gallery photos for your project
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>
                Before Image <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-gray-500 mb-3">Upload the before state of the project</p>
              <ImageUpload
                onImageUpload={handleBeforeImageUpload}
                currentImage={formData.beforeImage}
                label="Upload Before Image"
                folder="portfolio/before"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>
                After Image <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-gray-500 mb-3">Upload the completed/after state of the project</p>
              <ImageUpload
                onImageUpload={handleAfterImageUpload}
                currentImage={formData.afterImage}
                label="Upload After Image"
                folder="portfolio/after"
              />
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <Label className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>Gallery Images (Optional)</Label>
            <p className="text-sm text-gray-500 mb-4">
              Add additional project images to showcase details, process, and final results
            </p>
            <MultiImageUpload
              onImagesChange={handleGalleryImagesChange}
              currentImages={formData.galleryImages}
              label="Upload Gallery Images"
              folder="portfolio/gallery"
              maxFiles={10}
            />
          </div>
        </div>
      )}

      {/* Step 3: Additional Details */}
      {currentStep === 3 && (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>Additional Details</h3>
            <p className="text-sm text-gray-500 mb-6">
              Add extra information about the project (all optional)
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="tags" className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>Tags</Label>
            <Input
              id="tags"
              name="tags"
              value={formData.tags.join(", ")}
              onChange={(e) => handleTagsChange(e.target.value)}
              placeholder="e.g., Modern, Luxury, Sustainable, Energy Efficient"
              className="h-12 text-base"
              style={{ borderColor: 'var(--color-border)' }}
            />
            <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>Separate tags with commas</p>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 p-4 bg-gray-50 rounded-lg">
                {formData.tags.map((tag: string, idx: number) => (
                  <Badge 
                    key={idx} 
                    variant="secondary"
                    className="px-3 py-1.5 text-sm cursor-pointer hover:bg-red-100 transition-colors"
                    style={{ backgroundColor: 'var(--color-secondary-100)', color: 'var(--color-secondary-800)' }}
                    onClick={() => removeTag(idx)}
                  >
                    {tag}
                    <X className="ml-2 h-3 w-3" />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="client" className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>Client Name</Label>
              <Input
                id="client"
                name="client"
                value={formData.client}
                onChange={handleInputChange}
                placeholder="e.g., Private Client or ABC Corporation"
                className="h-12 text-base"
                style={{ borderColor: 'var(--color-border)' }}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="budget" className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>Budget</Label>
              <Input
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="e.g., $800K - $1M"
                className="h-12 text-base"
                style={{ borderColor: 'var(--color-border)' }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="scope" className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>Project Scope</Label>
            <Textarea
              id="scope"
              name="scope"
              value={formData.scope}
              onChange={handleInputChange}
              rows={5}
              placeholder="e.g., Full interior renovation, kitchen remodel, bathroom upgrades, flooring replacement..."
              className="text-base resize-none"
              style={{ borderColor: 'var(--color-border)' }}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="team" className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>Team Members</Label>
            <Textarea
              id="team"
              name="team"
              value={formData.team}
              onChange={handleInputChange}
              rows={5}
              placeholder="e.g., Lead Designer: Jane Doe, Architect: John Smith, Project Manager: Sarah Johnson..."
              className="text-base resize-none"
              style={{ borderColor: 'var(--color-border)' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
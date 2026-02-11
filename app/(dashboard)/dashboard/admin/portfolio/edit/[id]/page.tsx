/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboard)/dashboard/admin/portfolio/edit/[id]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ImageUpload from '@/components/admin/ImageUpload';
import MultiImageUpload from '@/components/admin/MultiImageUpload';
import type { ImageData } from '@/components/admin/MultiImageUpload';

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  completion: string;
  description: string;
  beforeImage?: string;
  beforeImagePublicId?: string;
  afterImage: string;
  afterImagePublicId?: string;
  galleryImages: string[];
  galleryImagePublicIds: string[];
  tags: string[];
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  order: number;
  client?: string;
  scope?: string;
  budget?: string;
  team?: string;
}

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [tagsInput, setTagsInput] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    year: '',
    area: '',
    completion: 'completed' as 'completed' | 'in progress',
    description: '',
    tags: [] as string[],
    client: '',
    scope: '',
    budget: '',
    team: '',
    status: 'published' as 'published' | 'draft' | 'archived',
    featured: false,
    order: 0,
  });

  const [imageData, setImageData] = useState({
    beforeImage: '',
    beforeImagePublicId: '',
    afterImage: '',
    afterImagePublicId: '',
    galleryImages: [] as ImageData[],
  });

  useEffect(() => {
    const resolvedParams = params instanceof Promise ? params : Promise.resolve(params);
    resolvedParams.then((p) => {
      fetchProject(p.id);
    });
  }, [params]);

  const fetchProject = async (id: string) => {
    try {
      const response = await fetch(`/api/portfolio/${id}`);
      const data = await response.json();
      
      if (response.ok) {
        setProject(data);
        setFormData({
          title: data.title,
          category: data.category,
          location: data.location,
          year: data.year,
          area: data.area,
          completion: data.completion || 'completed',
          description: data.description,
          tags: data.tags || [],
          client: data.client || '',
          scope: data.scope || '',
          budget: data.budget || '',
          team: data.team || '',
          status: data.status || 'published',
          featured: data.featured || false,
          order: data.order || 0,
        });
        setTagsInput((data.tags || []).join(', '));
        setImageData({
          beforeImage: data.beforeImage || '',
          beforeImagePublicId: data.beforeImagePublicId || '',
          afterImage: data.afterImage || '',
          afterImagePublicId: data.afterImagePublicId || '',
          galleryImages: (data.galleryImages || []).map((url: string, index: number) => ({
            url,
            publicId: (data.galleryImagePublicIds || [])[index] || '',
            id: `${index}`,
          })),
        });
      } else {
        toast.error('Failed to fetch project');
        router.push('/dashboard/admin/portfolio');
      }
    } catch (error) {
      toast.error('Failed to fetch project');
      router.push('/dashboard/admin/portfolio');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!project) return;

    if (!imageData.afterImage) {
      toast.error('After image is required');
      setActiveTab('images');
      return;
    }

    setSaving(true);

    try {
      const projectData = {
        ...formData,
        beforeImage: imageData.beforeImage || null,
        beforeImagePublicId: imageData.beforeImagePublicId || null,
        afterImage: imageData.afterImage,
        afterImagePublicId: imageData.afterImagePublicId,
        galleryImages: imageData.galleryImages.map(img => img.url),
        galleryImagePublicIds: imageData.galleryImages.map(img => img.publicId),
      };

      const response = await fetch(`/api/portfolio/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        toast.success('Project updated successfully');
        router.push('/dashboard/admin/portfolio');
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update project');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update project');
    } finally {
      setSaving(false);
    }
  };

  const handleTagsChange = (value: string) => {
    setTagsInput(value);
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setFormData({ ...formData, tags });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Project not found</h2>
          <p className="text-muted-foreground mb-4">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/dashboard/admin/portfolio">
            <Button>Back to Portfolio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link href="/dashboard/admin/portfolio">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Edit Project</h1>
            <p className="text-muted-foreground mt-1">{project.title}</p>
          </div>
        </div>
        <Button onClick={handleSubmit} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Modern Villa Renovation"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Residential, Commercial, etc."
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Beverly Hills, CA"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Year *</Label>
                    <Input
                      id="year"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      placeholder="2024"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="area">Area *</Label>
                    <Input
                      id="area"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder="2,500 sq ft"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="completion">Completion *</Label>
                    <Select
                      value={formData.completion}
                      onValueChange={(value: 'completed' | 'in progress') =>
                        setFormData({ ...formData, completion: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in progress">In Progress</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the project, its challenges, and achievements..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags *</Label>
                  <Input
                    id="tags"
                    value={tagsInput}
                    onChange={(e) => handleTagsChange(e.target.value)}
                    placeholder="Modern, Luxury, Minimalist"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Separate tags with commas
                  </p>
                </div>
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client">Client (Optional)</Label>
                    <Input
                      id="client"
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      placeholder="Client name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget (Optional)</Label>
                    <Input
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="$500,000"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="scope">Scope (Optional)</Label>
                  <Textarea
                    id="scope"
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    placeholder="Full renovation, interior design, landscape..."
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="team">Team (Optional)</Label>
                  <Textarea
                    id="team"
                    value={formData.team}
                    onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                    placeholder="Architects, contractors, designers involved..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Publishing Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: 'published' | 'draft' | 'archived') =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                      />
                      <Label htmlFor="featured" className="cursor-pointer">Featured Project</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Before Image</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Upload a before image if this is a renovation project
                </p>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  onImageUpload={(url, publicId) => {
                    setImageData({
                      ...imageData,
                      beforeImage: url,
                      beforeImagePublicId: publicId,
                    });
                  }}
                  currentImage={imageData.beforeImage}
                  label="Upload Before Image"
                  folder={`portfolio/${formData.title.toLowerCase().replace(/\s+/g, '-') || 'project'}/before`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>After Image *</CardTitle>
                <p className="text-sm text-muted-foreground">
                  This is the main project image (required)
                </p>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  onImageUpload={(url, publicId) => {
                    setImageData({
                      ...imageData,
                      afterImage: url,
                      afterImagePublicId: publicId,
                    });
                  }}
                  currentImage={imageData.afterImage}
                  label="Upload After Image"
                  folder={`portfolio/${formData.title.toLowerCase().replace(/\s+/g, '-') || 'project'}/after`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gallery Images</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Upload additional images to showcase different angles and details
                </p>
              </CardHeader>
              <CardContent>
                <MultiImageUpload
                  onImagesChange={(images) => {
                    setImageData({
                      ...imageData,
                      galleryImages: images,
                    });
                  }}
                  currentImages={imageData.galleryImages}
                  label="Upload Gallery Images"
                  folder={`portfolio/${formData.title.toLowerCase().replace(/\s+/g, '-') || 'project'}/gallery`}
                  maxFiles={10}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center pt-6 border-t">
          <Link href="/dashboard/admin/portfolio">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
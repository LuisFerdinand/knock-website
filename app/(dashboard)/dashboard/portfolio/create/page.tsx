/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboard)/dashboard/portfolio/create/page.tsx
"use client";

import { useState } from 'react';
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

export default function CreateProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    year: '',
    area: '',
    completion: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required images
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

      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        toast.success('Project created successfully');
        router.push('/dashboard/portfolio');
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create project');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create project');
    } finally {
      setSaving(false);
    }
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData({ ...formData, tags });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link href="/dashboard/portfolio">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Create New Project</h1>
            <p className="text-muted-foreground mt-1">Add a new project to your portfolio</p>
          </div>
        </div>
        <Button onClick={handleSubmit} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Creating...' : 'Create Project'}
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
                    <Input
                      id="completion"
                      value={formData.completion}
                      onChange={(e) => setFormData({ ...formData, completion: e.target.value })}
                      placeholder="Q2 2024"
                      required
                    />
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
                    value={formData.tags.join(', ')}
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
          <Link href="/dashboard/portfolio">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Creating...' : 'Create Project'}
          </Button>
        </div>
      </form>
    </div>
  );
}
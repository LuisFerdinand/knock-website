// app/(dashboard)/dashboard/admin/settings/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Loader2, Upload, Save } from 'lucide-react';
import { Toaster, toast as sonnerToast } from 'sonner';

interface MetadataSettings {
  id?: number;
  siteName?: string;
  siteTitle?: string;
  siteDescription?: string;
  keywords?: string[];
  author?: string;
  themeColor?: string;
}

interface FaviconSettings {
  id?: number;
  favicon?: string;
  faviconPublicId?: string;
  appleTouchIcon?: string;
  appleTouchIconPublicId?: string;
  ogImage?: string;
  ogImagePublicId?: string;
}

export default function SettingsPage() {
  const [metadataSettings, setMetadataSettings] = useState<MetadataSettings>({});
  const [faviconSettings, setFaviconSettings] = useState<FaviconSettings>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [metadataRes, faviconRes] = await Promise.all([
          fetch('/api/admin/settings/metadata'),
          fetch('/api/admin/settings/favicon'),
        ]);

        if (metadataRes.ok) {
          const metadataData = await metadataRes.json();
          setMetadataSettings(metadataData.data || {});
        }

        if (faviconRes.ok) {
          const faviconData = await faviconRes.json();
          setFaviconSettings(faviconData.data || {});
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        sonnerToast.error('Failed to load settings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleMetadataSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/settings/metadata', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadataSettings),
      });

      if (response.ok) {
        sonnerToast.success('Metadata settings saved successfully');
      } else {
        throw new Error('Failed to save metadata settings');
      }
    } catch (error) {
      console.error('Error saving metadata settings:', error);
      sonnerToast.error('Failed to save metadata settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFaviconSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/settings/favicon', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(faviconSettings),
      });

      if (response.ok) {
        sonnerToast.success('Favicon settings saved successfully');
      } else {
        throw new Error('Failed to save favicon settings');
      }
    } catch (error) {
      console.error('Error saving favicon settings:', error);
      sonnerToast.error('Failed to save favicon settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await fetch('/api/admin/settings/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Failed to upload ${type}`);
      }
      
      // Update the appropriate field based on type
      if (type === 'favicon') {
        setFaviconSettings(prev => ({
          ...prev,
          favicon: data.data.url,
          faviconPublicId: data.data.publicId,
        }));
      } else if (type === 'apple-touch-icon') {
        setFaviconSettings(prev => ({
          ...prev,
          appleTouchIcon: data.data.url,
          appleTouchIconPublicId: data.data.publicId,
        }));
      } else if (type === 'og-image') {
        setFaviconSettings(prev => ({
          ...prev,
          ogImage: data.data.url,
          ogImagePublicId: data.data.publicId,
        }));
      }

      sonnerToast.success(`${type.replace('-', ' ')} uploaded successfully`);
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      sonnerToast.error(error instanceof Error ? error.message : `Failed to upload ${type}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleKeywordsChange = (value: string) => {
    const keywords = value.split(',').map(k => k.trim()).filter(k => k);
    setMetadataSettings(prev => ({ ...prev, keywords }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
          <p className="text-muted-foreground">
            Manage your website metadata and favicon settings.
          </p>
        </div>
        <Separator />
        <Tabs defaultValue="metadata" className="space-y-4">
          <TabsList>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
            <TabsTrigger value="favicon">Favicon & Images</TabsTrigger>
          </TabsList>
          <TabsContent value="metadata" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Site Metadata</CardTitle>
                <CardDescription>
                  Update your website's SEO metadata and information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={metadataSettings.siteName || ''}
                      onChange={(e) => setMetadataSettings(prev => ({ ...prev, siteName: e.target.value }))}
                      placeholder="Home & Space Improvement Studio"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteTitle">Site Title</Label>
                    <Input
                      id="siteTitle"
                      value={metadataSettings.siteTitle || ''}
                      onChange={(e) => setMetadataSettings(prev => ({ ...prev, siteTitle: e.target.value }))}
                      placeholder="Home & Space Improvement Studio"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={metadataSettings.siteDescription || ''}
                    onChange={(e) => setMetadataSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                    placeholder="Premium interior design and architecture services for your dream home"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                  <Input
                    id="keywords"
                    value={metadataSettings.keywords?.join(', ') || ''}
                    onChange={(e) => handleKeywordsChange(e.target.value)}
                    placeholder="interior design, architecture, home improvement"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={metadataSettings.author || ''}
                      onChange={(e) => setMetadataSettings(prev => ({ ...prev, author: e.target.value }))}
                      placeholder="Your Name"
                    />
                  </div>
                  {/* <div className="space-y-2">
                    <Label htmlFor="themeColor">Theme Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="themeColor"
                        type="color"
                        value={metadataSettings.themeColor || '#9C7E5A'}
                        onChange={(e) => setMetadataSettings(prev => ({ ...prev, themeColor: e.target.value }))}
                        className="w-12 h-12 p-1 border rounded"
                      />
                      <Input
                        value={metadataSettings.themeColor || '#9C7E5A'}
                        onChange={(e) => setMetadataSettings(prev => ({ ...prev, themeColor: e.target.value }))}
                        placeholder="#9C7E5A"
                      />
                    </div>
                  </div> */}
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={handleMetadataSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="favicon" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Favicon & Images</CardTitle>
                <CardDescription>
                  Update your website's favicon and social media images.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="favicon">Favicon</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                      {faviconSettings.favicon ? (
                        <img
                          src={faviconSettings.favicon}
                          alt="Favicon"
                          className="mx-auto h-16 w-16 object-contain"
                        />
                      ) : (
                        <div className="mx-auto h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Upload className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      <input
                        type="file"
                        id="favicon"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'favicon')}
                        disabled={isUploading}
                      />
                      <Button
                        variant="outline"
                        className="mt-2"
                        onClick={() => document.getElementById('favicon')?.click()}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      32x32px PNG, ICO or SVG
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appleTouchIcon">Apple Touch Icon</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                      {faviconSettings.appleTouchIcon ? (
                        <img
                          src={faviconSettings.appleTouchIcon}
                          alt="Apple Touch Icon"
                          className="mx-auto h-16 w-16 object-contain"
                        />
                      ) : (
                        <div className="mx-auto h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Upload className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      <input
                        type="file"
                        id="appleTouchIcon"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'apple-touch-icon')}
                        disabled={isUploading}
                      />
                      <Button
                        variant="outline"
                        className="mt-2"
                        onClick={() => document.getElementById('appleTouchIcon')?.click()}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      180x180px PNG
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ogImage">OG Image</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                      {faviconSettings.ogImage ? (
                        <img
                          src={faviconSettings.ogImage}
                          alt="OG Image"
                          className="mx-auto h-16 w-16 object-contain"
                        />
                      ) : (
                        <div className="mx-auto h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Upload className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      <input
                        type="file"
                        id="ogImage"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'og-image')}
                        disabled={isUploading}
                      />
                      <Button
                        variant="outline"
                        className="mt-2"
                        onClick={() => document.getElementById('ogImage')?.click()}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      1200x630px PNG or JPG
                    </p>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={handleFaviconSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </>
  );
}
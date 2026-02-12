// lib/site-settings.ts
import { db } from './db';
import { siteSettings, type SiteSetting, type NewSiteSetting } from './db/schema';
import { eq } from 'drizzle-orm';

export async function getSiteSettings() {
  try {
    const settings = await db.select().from(siteSettings);
    return settings;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    throw new Error('Failed to fetch site settings');
  }
}

export async function getSiteSettingByKey(key: string) {
  try {
    const setting = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, key))
      .limit(1);
    
    return setting[0] || null;
  } catch (error) {
    console.error(`Error fetching site setting with key ${key}:`, error);
    throw new Error(`Failed to fetch site setting with key ${key}`);
  }
}

export async function createSiteSetting(setting: NewSiteSetting) {
  try {
    const [newSetting] = await db
      .insert(siteSettings)
      .values(setting)
      .returning();
    
    return newSetting;
  } catch (error) {
    console.error('Error creating site setting:', error);
    throw new Error('Failed to create site setting');
  }
}

export async function updateSiteSetting(id: number, setting: Partial<NewSiteSetting>) {
  try {
    const [updatedSetting] = await db
      .update(siteSettings)
      .set({ ...setting, updatedAt: new Date() })
      .where(eq(siteSettings.id, id))
      .returning();
    
    return updatedSetting;
  } catch (error) {
    console.error(`Error updating site setting with id ${id}:`, error);
    throw new Error(`Failed to update site setting with id ${id}`);
  }
}

export async function deleteSiteSetting(id: number) {
  try {
    await db.delete(siteSettings).where(eq(siteSettings.id, id));
    return true;
  } catch (error) {
    console.error(`Error deleting site setting with id ${id}:`, error);
    throw new Error(`Failed to delete site setting with id ${id}`);
  }
}

export async function getMetadataSettings() {
  try {
    const metadataSetting = await getSiteSettingByKey('metadata');
    return metadataSetting;
  } catch (error) {
    console.error('Error fetching metadata settings:', error);
    throw new Error('Failed to fetch metadata settings');
  }
}

export async function updateMetadataSettings(data: {
  siteName?: string;
  siteTitle?: string;
  siteDescription?: string;
  keywords?: string[];
  author?: string;
  themeColor?: string;
}) {
  try {
    const existingSetting = await getSiteSettingByKey('metadata');
    
    if (existingSetting) {
      // Map the data to the correct column names
      return await db
        .update(siteSettings)
        .set({
          siteName: data.siteName,
          siteTitle: data.siteTitle,
          siteDescription: data.siteDescription,
          keywords: data.keywords,
          author: data.author,
          themeColor: data.themeColor,
          updatedAt: new Date()
        })
        .where(eq(siteSettings.id, existingSetting.id))
        .returning();
    } else {
      return await db
        .insert(siteSettings)
        .values({
          key: 'metadata',
          siteName: data.siteName,
          siteTitle: data.siteTitle,
          siteDescription: data.siteDescription,
          keywords: data.keywords,
          author: data.author,
          themeColor: data.themeColor,
        })
        .returning();
    }
  } catch (error) {
    console.error('Error updating metadata settings:', error);
    throw new Error('Failed to update metadata settings');
  }
}

export async function getFaviconSettings() {
  try {
    const faviconSetting = await getSiteSettingByKey('favicon');
    return faviconSetting;
  } catch (error) {
    console.error('Error fetching favicon settings:', error);
    throw new Error('Failed to fetch favicon settings');
  }
}

export async function updateFaviconSettings(data: {
  favicon?: string;
  faviconPublicId?: string;
  appleTouchIcon?: string;
  appleTouchIconPublicId?: string;
  ogImage?: string;
  ogImagePublicId?: string;
}) {
  try {
    const existingSetting = await getSiteSettingByKey('favicon');
    
    if (existingSetting) {
      return await db
        .update(siteSettings)
        .set({
          favicon: data.favicon,
          faviconPublicId: data.faviconPublicId,
          appleTouchIcon: data.appleTouchIcon,
          appleTouchIconPublicId: data.appleTouchIconPublicId,
          ogImage: data.ogImage,
          ogImagePublicId: data.ogImagePublicId,
          updatedAt: new Date()
        })
        .where(eq(siteSettings.id, existingSetting.id))
        .returning();
    } else {
      return await db
        .insert(siteSettings)
        .values({
          key: 'favicon',
          favicon: data.favicon,
          faviconPublicId: data.faviconPublicId,
          appleTouchIcon: data.appleTouchIcon,
          appleTouchIconPublicId: data.appleTouchIconPublicId,
          ogImage: data.ogImage,
          ogImagePublicId: data.ogImagePublicId,
        })
        .returning();
    }
  } catch (error) {
    console.error('Error updating favicon settings:', error);
    throw new Error('Failed to update favicon settings');
  }
}
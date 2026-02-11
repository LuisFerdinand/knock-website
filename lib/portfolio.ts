// lib/portfolio.ts
import { db } from './db/index';
import { projects, type Project, type NewProject } from './db/schema';
import { v2 as cloudinary } from 'cloudinary';
import { eq, desc, asc } from 'drizzle-orm';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export class PortfolioManager {
  /**
   * Get all projects
   */
  static async getAllProjects() {
    return await db
      .select()
      .from(projects)
      .orderBy(asc(projects.order), desc(projects.createdAt));
  }

  /**
   * Get project by ID
   */
  static async getProjectById(id: number) {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id))
      .limit(1);
    
    return project || null;
  }

  /**
   * Create a new project
   */
  static async createProject(data: NewProject) {
    const [newProject] = await db
      .insert(projects)
      .values(data)
      .returning();
    
    return newProject;
  }

  /**
   * Update an existing project
   */
  static async updateProject(id: number, data: Partial<NewProject>) {
    const [updatedProject] = await db
      .update(projects)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    
    return updatedProject;
  }

  /**
   * Delete a project and its images from Cloudinary
   */
  static async deleteProject(id: number) {
    const project = await this.getProjectById(id);
    if (!project) throw new Error('Project not found');

    // Collect all public IDs to delete
    const publicIdsToDelete: string[] = [];
    
    if (project.beforeImagePublicId) {
      publicIdsToDelete.push(project.beforeImagePublicId);
    }
    
    if (project.afterImagePublicId) {
      publicIdsToDelete.push(project.afterImagePublicId);
    }
    
    if (project.galleryImagePublicIds && Array.isArray(project.galleryImagePublicIds)) {
      publicIdsToDelete.push(...project.galleryImagePublicIds);
    }

    // Delete images from Cloudinary
    if (publicIdsToDelete.length > 0) {
      try {
        await cloudinary.api.delete_resources(publicIdsToDelete);
        console.log(`✓ Deleted ${publicIdsToDelete.length} images from Cloudinary`);
      } catch (error) {
        console.error('❌ Error deleting images from Cloudinary:', error);
        // Continue with project deletion even if image deletion fails
      }
    }

    // Delete project from database
    await db.delete(projects).where(eq(projects.id, id));
    
    return true;
  }

  /**
   * Reorder projects
   */
  static async reorderProjects(projectOrders: { id: number; order: number }[]) {
    const updates = projectOrders.map(({ id, order }) =>
      db.update(projects).set({ order }).where(eq(projects.id, id))
    );
    
    await Promise.all(updates);
    return true;
  }

  /**
   * Toggle project featured status
   */
  static async toggleFeatured(id: number) {
    const project = await this.getProjectById(id);
    if (!project) throw new Error('Project not found');

    return await this.updateProject(id, { featured: !project.featured });
  }

  /**
   * Update project status
   */
  static async updateStatus(id: number, status: 'published' | 'draft' | 'archived') {
    return await this.updateProject(id, { status });
  }

  /**
   * Get published projects only (for public display)
   */
  static async getPublishedProjects() {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.status, 'published'))
      .orderBy(asc(projects.order), desc(projects.createdAt));
  }

  /**
   * Get featured projects
   */
  static async getFeaturedProjects() {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.featured, true))
      .orderBy(asc(projects.order), desc(projects.createdAt));
  }

  /**
   * Get projects by completion status (e.g., "completed", "in progress")
   */
  static async getProjectsByCompletion(completion: string) {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.completion, completion))
      .orderBy(asc(projects.order), desc(projects.createdAt));
  }

  /**
   * Get projects that are in progress
   */
  static async getInProgressProjects() {
    return await this.getProjectsByCompletion('in progress');
  }

  /**
   * Get completed projects
   */
  static async getCompletedProjects() {
    return await this.getProjectsByCompletion('completed');
  }
}
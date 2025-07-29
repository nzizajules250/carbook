import { ID } from 'appwrite';
import { storage } from './client';
import type { Models } from 'appwrite';

const STORAGE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!;

export const storageService = {
  // Upload file
  async uploadFile(file: File): Promise<Models.File> {
    try {
      const response = await storage.createFile(
        STORAGE_BUCKET_ID,
        ID.unique(),
        file
      );
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to upload file');
    }
  },

  // Get file preview URL
  getFilePreview(fileId: string, width?: number, height?: number): URL {
    return storage.getFilePreview(
      STORAGE_BUCKET_ID,
      fileId,
      width,
      height
    );
  },

  // Get file download URL
  getFileDownload(fileId: string): URL {
    return storage.getFileDownload(STORAGE_BUCKET_ID, fileId);
  },

  // Delete file
  async deleteFile(fileId: string): Promise<void> {
    try {
      await storage.deleteFile(STORAGE_BUCKET_ID, fileId);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete file');
    }
  },

  // List files
  async listFiles(): Promise<Models.FileList> {
    try {
      const response = await storage.listFiles(STORAGE_BUCKET_ID);
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to list files');
    }
  }
};
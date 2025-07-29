import { ID, Query } from 'appwrite';
import { account } from './client';
import type { Models } from 'appwrite';

export interface CreateUserAccount {
  email: string;
  password: string;
  name: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export const authService = {
  // Create a new user account
  async createUserAccount({ email, password, name }: CreateUserAccount): Promise<Models.User<Models.Preferences>> {
    try {
      const userAccount = await account.create(ID.unique(), email, password, name);
      if (userAccount) {
        return this.login({ email, password });
      }
      return userAccount;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create account');
    }
  },

  // Login user
  async login({ email, password }: LoginUser): Promise<Models.Session> {
    try {
      const session = await account.createEmailSession(email, password);
      return session;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to login');
    }
  },

  // Get current user
  async getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      return null;
    }
  },

  // Logout user
  async logout(): Promise<void> {
    try {
      await account.deleteSession('current');
    } catch (error: any) {
      throw new Error(error.message || 'Failed to logout');
    }
  },

  // Update user preferences (for role management)
  async updatePreferences(prefs: Models.Preferences): Promise<Models.User<Models.Preferences>> {
    try {
      const user = await account.updatePrefs(prefs);
      return user;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update preferences');
    }
  },

  // Reset password
  async resetPassword(email: string): Promise<Models.Token> {
    try {
      const token = await account.createRecovery(email, `${window.location.origin}/reset-password`);
      return token;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to send reset email');
    }
  },

  // Update password
  async updatePassword(password: string, oldPassword: string): Promise<Models.User<Models.Preferences>> {
    try {
      const user = await account.updatePassword(password, oldPassword);
      return user;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update password');
    }
  },

  // Update user name
  async updateName(name: string): Promise<Models.User<Models.Preferences>> {
    try {
      const user = await account.updateName(name);
      return user;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update name');
    }
  },

  // Update user email
  async updateEmail(email: string, password: string): Promise<Models.User<Models.Preferences>> {
    try {
      const user = await account.updateEmail(email, password);
      return user;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update email');
    }
  }
};
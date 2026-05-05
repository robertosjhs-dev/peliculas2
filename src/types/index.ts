export type UserRole = 'user' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  createdAt: any;
}

export type Visibility = 'public' | 'private' | 'draft';

export interface Movie {
  id: string;
  title: string;
  director: string;
  releaseYear: number;
  synopsis: string;
  genres: string[];
  posterUrl: string;
  rating: number;
  visibility: Visibility;
  createdAt: any;
  updatedAt: any;
  creatorId: string;
  isFeatured?: boolean;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

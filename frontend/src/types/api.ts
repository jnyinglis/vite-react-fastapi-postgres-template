/**
 * Generated TypeScript types from FastAPI OpenAPI schema
 *
 * 🚨 DO NOT EDIT MANUALLY 🚨
 * This file is auto-generated. Run 'make generate-types' to regenerate.
 *
 * Generated at: 2025-09-13T21:53:11.669859
 */

// API Response wrapper types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  detail: string;
  type?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

// Authentication types
export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in?: number;
}



export interface AppleAuthRequest {
  authorization: Record<string, any>;
  user?: Record<string, any> | null;
}

export interface EmailAuth {
  email: string;
  password: string;
}

export interface EmailRegister {
  email: string;
  password: string;
  fullName?: string | null;
}

export interface GoogleAuthRequest {
  credential: string;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  service: string;
}

export interface MagicLinkRequest {
  email: string;
}

export interface MagicLinkVerify {
  token: string;
}

export interface MessageResponse {
  message: string;
}

export interface TokenRefresh {
  refreshToken: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
  expiresIn: number;
}

export interface User {
  email: string;
  fullName?: string | null;
  avatarUrl?: string | null;
  isActive?: boolean;
  id: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt?: string | null;
}

export interface ValidationError {
  loc: string | number[];
  msg: string;
  type: string;
}


export class ApiClient {
  constructor(private baseUrl: string = '/api', private fetchFn: typeof fetch = fetch) {}

  private async fetch(path: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${path}`;
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('access_token');
    if (token) {
      (defaultHeaders as any)['Authorization'] = `Bearer ${token}`;
    }

    const response = await this.fetchFn(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response;
  }

  async healthCheckApiHealthGet(): Promise<HealthResponse> {
    const response = await this.fetch('/api/health', {
      method: 'GET',
    });
    return response.json();
  }
  async getBuildInfoApiBuildInfoGet(): Promise<Record<string, any>> {
    const response = await this.fetch('/api/build-info', {
      method: 'GET',
    });
    return response.json();
  }
  async getAuthConfigApiAuthConfigGet(): Promise<Record<string, any>> {
    const response = await this.fetch('/api/auth/config', {
      method: 'GET',
    });
    return response.json();
  }
  async loginEmailApiAuthLoginEmailPost(data: EmailAuth): Promise<TokenResponse> {
    const response = await this.fetch('/api/auth/login/email', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async registerEmailApiAuthRegisterEmailPost(data: EmailRegister): Promise<User> {
    const response = await this.fetch('/api/auth/register/email', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async requestMagicLinkApiAuthMagicLinkRequestPost(data: MagicLinkRequest): Promise<MessageResponse> {
    const response = await this.fetch('/api/auth/magic-link/request', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async verifyMagicLinkApiAuthMagicLinkVerifyPost(data: MagicLinkVerify): Promise<TokenResponse> {
    const response = await this.fetch('/api/auth/magic-link/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async googleAuthApiAuthGooglePost(data: GoogleAuthRequest): Promise<TokenResponse> {
    const response = await this.fetch('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async appleAuthApiAuthApplePost(data: AppleAuthRequest): Promise<TokenResponse> {
    const response = await this.fetch('/api/auth/apple', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async refreshTokenApiAuthRefreshPost(data: TokenRefresh): Promise<TokenResponse> {
    const response = await this.fetch('/api/auth/refresh', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async getCurrentUserProfileApiUsersMeGet(): Promise<User> {
    const response = await this.fetch('/api/users/me', {
      method: 'GET',
    });
    return response.json();
  }
  async getUserProfileApiUsersProfileGet(): Promise<User> {
    const response = await this.fetch('/api/users/profile', {
      method: 'GET',
    });
    return response.json();
  }
  async rootGet(): Promise<any> {
    const response = await this.fetch('/', {
      method: 'GET',
    });
    return response.json();
  }
}

// Default API client instance
export const apiClient = new ApiClient();

// Utility types
export type AuthProvider = "google" | "apple" | "email";

export interface User {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// API endpoint types for better type safety
export namespace API {
  export namespace Auth {
    export interface GoogleRequest {
      credential: string;
      clientId: string;
    }

    export interface AppleRequest {
      authorization: {
        code: string;
        id_token: string;
      };
      user?: {
        email: string;
        name: {
          firstName: string;
          lastName: string;
        };
      };
    }

    export interface MagicLinkRequest {
      email: string;
    }

    export interface MagicLinkVerify {
      token: string;
    }
  }

  export namespace Users {
    export interface CreateRequest {
      email: string;
      fullName?: string;
      password?: string;
    }

    export interface UpdateRequest {
      fullName?: string;
      avatarUrl?: string;
    }
  }
}

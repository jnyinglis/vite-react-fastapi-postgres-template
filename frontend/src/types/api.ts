/**
 * Generated TypeScript types from FastAPI OpenAPI schema
 *
 * 🚨 DO NOT EDIT MANUALLY 🚨
 * This file is auto-generated. Run 'make generate-types' to regenerate.
 *
 * Generated at: 2025-09-15T08:05:51.316285
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



export interface AppleAuthAuthorization {
  code: string;
  idToken: string;
}

export interface AppleAuthRequest {
  authorization: AppleAuthAuthorization;
  user?: AppleAuthUser | null;
}

export interface AppleAuthUser {
  email?: string | null;
  name?: AppleAuthUserName | null;
}

export interface AppleAuthUserName {
  firstName?: string | null;
  lastName?: string | null;
}

export interface EmailAuth {
  email: string;
  password: string;
}

export interface EmailRegister {
  email: string;
  fullName?: string | null;
  password: string;
}

export interface GoogleAuthRequest {
  credential: string;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}

export interface HealthResponse {
  service: string;
  status: string;
  timestamp: string;
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
  expiresIn: number;
  refreshToken: string;
  tokenType?: string;
}

export interface User {
  avatarUrl?: string | null;
  createdAt: string;
  email: string;
  fullName?: string | null;
  id: string;
  isActive?: boolean;
  isVerified: boolean;
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

  async rootGet(): Promise<any> {
    const response = await this.fetch('/', {
      method: 'GET',
    });
    return response.json();
  }
  async getSecurityTxtWellKnownSecurityTxtGet(): Promise<any> {
    const response = await this.fetch('/.well-known/security.txt', {
      method: 'GET',
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
  async getAuthConfigApiAuthConfigGet(): Promise<Record<string, any>> {
    const response = await this.fetch('/api/auth/config', {
      method: 'GET',
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
  async loginEmailApiAuthLoginEmailPost(data: EmailAuth): Promise<TokenResponse> {
    const response = await this.fetch('/api/auth/login/email', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async logoutApiAuthLogoutPost(): Promise<MessageResponse> {
    const response = await this.fetch('/api/auth/logout', {
      method: 'POST',
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
  async refreshTokenApiAuthRefreshPost(data: TokenRefresh): Promise<TokenResponse> {
    const response = await this.fetch('/api/auth/refresh', {
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
  async getBuildInfoApiBuildInfoGet(): Promise<Record<string, any>> {
    const response = await this.fetch('/api/build-info', {
      method: 'GET',
    });
    return response.json();
  }
  async healthCheckApiHealthGet(): Promise<HealthResponse> {
    const response = await this.fetch('/api/health', {
      method: 'GET',
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
  async getRobotsRobotsTxtGet(): Promise<any> {
    const response = await this.fetch('/robots.txt', {
      method: 'GET',
    });
    return response.json();
  }
  async getSitemapSitemapXmlGet(): Promise<any> {
    const response = await this.fetch('/sitemap.xml', {
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

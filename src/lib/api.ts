// src/lib/api.ts
// Centralized API client for ShikshaVision backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('sv_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    // Handle CSV download
    if (response.headers.get('content-type')?.includes('text/csv')) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const disposition = response.headers.get('content-disposition');
      const filename = disposition
        ? disposition.split('filename=')[1]?.replace(/"/g, '')
        : 'leads.csv';
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      return { success: true, message: 'Download started' };
    }

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        ...data,
      };
    }

    return data;
  }

  async post<T = any>(endpoint: string, body: Record<string, any>): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    return this.handleResponse<T>(response);
  }

  async get<T = any>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    let url = `${this.baseUrl}${endpoint}`;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, value);
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  async put<T = any>(endpoint: string, body: Record<string, any>): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    return this.handleResponse<T>(response);
  }
}

export const api = new ApiClient(API_BASE_URL);

// ── Type definitions for API responses ──────────────────────────────────────

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  university: string;
  course: string;
  source: string;
  status: string;
  assignedCounselor: string;
  notes: string;
  createdAt: string;
}

export interface LeadsResponse {
  leads: Lead[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FilterOptions {
  universities: string[];
  courses: string[];
  statuses: string[];
}

export interface AuthResponse {
  token: string;
  user: {
    email?: string;
    phone?: string;
    role: string;
  };
}

import axios from 'axios';

export class AuthError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export class NetworkError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends Error {
  constructor(message: string, public fields?: Record<string, string>) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const handleApiError = (error: unknown): Error => {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const data = error.response?.data;

    // Handle validation errors
    if (statusCode === 400 && data?.errors) {
      return new ValidationError('Validation failed', data.errors);
    }

    // Handle authentication errors
    if (statusCode === 401) {
      return new AuthError(data?.message || 'Authentication failed', 'UNAUTHORIZED');
    }

    // Handle other specific status codes
    if (statusCode === 404) {
      return new NetworkError('Resource not found', statusCode);
    }

    if (statusCode === 500) {
      return new NetworkError('Internal server error', statusCode);
    }

    // Generic network error
    return new NetworkError(
      data?.message || 'Network error occurred',
      statusCode
    );
  }

  // Handle non-Axios errors
  return error instanceof Error ? error : new Error('An unexpected error occurred');
};
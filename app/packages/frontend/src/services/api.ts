// API Configuration
// In development, use proxy from package.json (react-scripts handles this)
// In production, use full URL or environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

export interface BottleData {
  id?: number;
  name: string;
  maker: string;
  abv: number | null;
  msrp: number | null;
  image_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

export interface ApiError {
  error: {
    message: string;
  };
}

/**
 * Handle API errors
 */
async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({
      error: { message: `HTTP error! status: ${response.status}` }
    }));
    throw new Error(error.error?.message || 'An error occurred');
  }
  return response.json();
}

/**
 * Identify a bottle from an image file
 */
export async function identifyBottle(imageFile: File): Promise<BottleData> {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(`${API_BASE_URL}/bottles/identify`, {
    method: 'POST',
    body: formData,
  });

  const result = await handleResponse<BottleData>(response);
  return result.data;
}

/**
 * Check in (add) a new bottle to the database
 */
export async function checkInBottle(bottleData: BottleData): Promise<BottleData> {
  const response = await fetch(`${API_BASE_URL}/bottles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bottleData),
  });

  const result = await handleResponse<BottleData>(response);
  return result.data;
}

/**
 * Check out (remove) a bottle from the database
 */
export async function checkOutBottle(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/bottles/${id}`, {
    method: 'DELETE',
  });

  await handleResponse(response);
}

/**
 * Get all bottles from the database
 */
export async function getAllBottles(): Promise<BottleData[]> {
  const response = await fetch(`${API_BASE_URL}/bottles`);
  const result = await handleResponse<BottleData[]>(response);
  return result.data;
}

/**
 * Get a specific bottle by ID
 */
export async function getBottleById(id: number): Promise<BottleData> {
  const response = await fetch(`${API_BASE_URL}/bottles/${id}`);
  const result = await handleResponse<BottleData>(response);
  return result.data;
}

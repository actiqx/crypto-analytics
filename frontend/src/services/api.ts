import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';
const COINCAP_BASE = 'https://api.coincap.io/v2';

// --- Asset Services ---

export const fetchAssets = async () => {
  try {
    const response = await axios.get(`${API_BASE}/assets`);
    return response.data;
  } catch (error) {
    console.warn("Backend unavailable, falling back to CoinCap directly.");
    const response = await axios.get(`${COINCAP_BASE}/assets`, { params: { limit: 50 } });
    return response.data.data;
  }
};

export const deleteAsset = async (assetId: string) => {
  const response = await axios.delete(`${API_BASE}/assets/${assetId}`);
  return response.data;
};

export const fetchAssetHistory = async (assetId: string) => {
  try {
    const response = await axios.get(`${API_BASE}/assets/${assetId}/history`);
    return response.data.data;
  } catch (error) {
    console.warn("Backend unavailable, falling back to CoinCap directly.");
    const response = await axios.get(`${COINCAP_BASE}/assets/${assetId}/history`, { params: { interval: 'd1' } });
    return response.data.data;
  }
};

// --- User Services ---

export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE}/users`);
  return response.data;
};

export const createUser = async (userData: { email: string; full_name: string; role: string }) => {
  const response = await axios.post(`${API_BASE}/users`, userData);
  return response.data;
};

export const updateUser = async (userId: number, userData: { full_name?: string; role?: string }) => {
  const response = await axios.patch(`${API_BASE}/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId: number) => {
  const response = await axios.delete(`${API_BASE}/users/${userId}`);
  return response.data;
};

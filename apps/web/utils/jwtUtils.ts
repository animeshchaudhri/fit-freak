import { getRefreshToken, saveTokens, clearTokens } from './tokenManager';
import axios from 'axios';

export const getNewAccessToken = async (): Promise<string | undefined> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/access-token`, {
      refreshToken: refreshToken
    });
    const { accessToken } = response.data;
    saveTokens(accessToken, refreshToken);
    return accessToken;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    clearTokens();
    return undefined;
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    const { exp } = decodedPayload;
    
    return Date.now() >= exp * 1000;
  } catch (error) {
    return true;
  }
}; 
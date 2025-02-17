import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ACCESS_TOKEN_NAME = 'accessToken';
const REFRESH_TOKEN_NAME = 'refreshToken';

export const saveTokens = (accessToken: string, refreshToken: string): void => {
  cookies.set(ACCESS_TOKEN_NAME, accessToken, {
    path: '/',
    sameSite: 'strict',
  });

  cookies.set(REFRESH_TOKEN_NAME, refreshToken, {
    path: '/',
    sameSite: 'strict',
  });
};

export const getAccessToken = (): string | undefined => {
  return cookies.get(ACCESS_TOKEN_NAME);
};

export const getRefreshToken = (): string | undefined => {
  return cookies.get(REFRESH_TOKEN_NAME);
};

export const clearTokens = (): void => {
  cookies.remove(ACCESS_TOKEN_NAME, { path: '/' });
  cookies.remove(REFRESH_TOKEN_NAME, { path: '/' });
}; 
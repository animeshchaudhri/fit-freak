import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ACCESS_TOKEN_NAME = 'accessToken';
const REFRESH_TOKEN_NAME = 'refreshToken';

const MAX_AGE = 60 * 60 * 24 * 30;
export const saveTokens = (accessToken: string, refreshToken: string): void => {
  cookies.set(ACCESS_TOKEN_NAME, accessToken, {
    path: '/',
    sameSite: 'strict',
    maxAge: MAX_AGE,
    domain: window.location.hostname
  });

  cookies.set(REFRESH_TOKEN_NAME, refreshToken, {
    path: '/',
    sameSite: 'strict',
    maxAge: MAX_AGE,
    domain: window.location.hostname
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
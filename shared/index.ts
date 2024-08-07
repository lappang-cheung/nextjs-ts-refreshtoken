export interface UserDocument {
  id: string,
  name: string,
  tokenVersion: number,
  getHubUserId: string
}

export interface AccessTokenPayload {
  userId: string
}

export interface RefreshTokenPayload {
  userId: string,
  version: number
}

export enum Cookies {
  AccessToken = 'access',
  RefreshToken = 'refresh'
}

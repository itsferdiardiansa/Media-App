export interface JwtPayload {
  sub: string;
  email?: string; 
  username?: string; 
  iat?: number; 
  exp?: number;
  [key: string]: any;
}

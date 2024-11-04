import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as jwksClient from 'jwks-rsa';
import { promisify } from 'util';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from './jwt-payload.interface';
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class AuthService {
  private cognito;
  private jwksClient;

  constructor() {
    AWS.config.update({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    
    this.cognito = new AWS.CognitoIdentityServiceProvider({
      region: process.env.AWS_REGION,
    });

    this.jwksClient = jwksClient({
      jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
    });
  }

  async login(email: string, password: string): Promise<any> {
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };
  
    try {
      const response = await this.cognito.initiateAuth(params).promise();
  
      if (response.AuthenticationResult) {
        return response.AuthenticationResult;
      } else if (response.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
        throw new UnauthorizedException('New password required');
      } else {
        throw new UnauthorizedException('Authentication failed');
      }
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Invalid credentials');
    }
  }

  async register(email: string, password: string): Promise<{ message: string }> {
    const userPoolId = process.env.AWS_COGNITO_USER_POOL_ID;
    const uniqueUsername = uuidv4();

    try {
      await this.cognito
        .adminCreateUser({
          UserPoolId: userPoolId,
          Username: uniqueUsername,
          TemporaryPassword: password,
          UserAttributes: [
            { Name: 'email', Value: email },
            { Name: 'email_verified', Value: 'true' },
          ],
          MessageAction: 'SUPPRESS',
        })
        .promise();

      await this.cognito
        .adminSetUserPassword({
          UserPoolId: userPoolId,
          Username: uniqueUsername,
          Password: password,
          Permanent: true,
        })
        .promise();

      return { message: 'User registered successfully' };
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Registration failed');
    }
  }

  async validateToken(token: string): Promise<JwtPayload> {
    try {
      const decodedToken: any = jwt.decode(token, { complete: true });
      const getSigningKey = promisify(this.jwksClient.getSigningKey.bind(this.jwksClient));
      const key = await getSigningKey(decodedToken.header.kid);
      const signingKey = key.getPublicKey();

      return jwt.verify(token, signingKey) as JwtPayload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

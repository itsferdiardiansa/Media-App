import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import awsConfig from './config/aws.config';
import databaseConfig from './config/database.config';
import cacheConfig from './config/cache.config';
import appConfig from './config/app.config';

// Auth
import { AuthModule } from './auth/auth.module';

import { PostsModule } from './modules/posts/posts.module';
import { TagsModule } from './modules/tags/tags.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [awsConfig, databaseConfig, cacheConfig, appConfig],
    }),
    AuthModule,

    PostsModule,
    TagsModule,
    CommentsModule,
  ],
})
export class AppModule {}

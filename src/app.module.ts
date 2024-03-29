import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi'
import { DatabaseModule } from './database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';
import { NotesModule } from './notes/notes.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    PostsModule,
    NotesModule,
    AuthenticationModule,
    UsersModule,
    CategoriesModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: ExceptionsLoggerFilter,
  },],
})
export class AppModule {}

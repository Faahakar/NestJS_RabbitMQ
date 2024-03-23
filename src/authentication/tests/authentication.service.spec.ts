
import { AuthenticationService } from '../authentication.service';
import { Test } from '@nestjs/testing';
import { UsersModule } from '../../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../../database/database.module';
import * as Joi from '@hapi/joi';
import { UsersService } from 'src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from 'src/users/user.entity';
 
describe('The AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            // ...
          }),
          JwtModule.registerAsync({
            // ...
          }),
        ],
        providers: [
          UsersService,
          AuthenticationService,
          {
            provide: getRepositoryToken(User),
            useValue: {},
          }
        ],
      }).compile();
    authenticationService = await module.get<AuthenticationService>(AuthenticationService);
  })
  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = '6e901bd5-a652-4179-aa2b-de82c451d61b';
      expect(
        typeof authenticationService.getCookieWithJwtToken(userId)
      ).toEqual('string')
    })
  })
});
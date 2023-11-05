import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credentials } from './entities/creds.entity';
import { Usernames } from 'src/common/entity/username.entity';
import { MediaType } from 'src/common/entity/media-type.entity';
import { Profile } from './entities/profile.entity';
import { Media } from 'src/common/entity/media.entity';
import { Connections } from './entities/connections.entity';
import { Links } from './entities/links.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Credentials, Usernames, MediaType, Profile, Media, Connections, Links])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
}

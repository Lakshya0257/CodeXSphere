import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Comments } from './entities/comments.entity';
import { MediaType } from 'src/common/entity/media-type.entity';
import { Tags } from './entities/tags.entity';
import { Usernames } from 'src/common/entity/username.entity';
import { Credentials } from 'src/user/entities/creds.entity';
import { Profile } from 'src/user/entities/profile.entity';
import { BlogLikes } from './entities/likes.entity';
import { BlogContent } from './entities/blog-content.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Blog , Comments, MediaType, Tags, Usernames, Credentials, Profile, BlogLikes, BlogContent])
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}

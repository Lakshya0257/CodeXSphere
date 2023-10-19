import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { User } from 'src/user/entities/user.entity';
import { Comments } from './entities/comments.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { TagsService } from 'src/tags/tags.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Blog , User, Comments, Tag])
  ],
  controllers: [BlogsController],
  providers: [BlogsService, TagsService],
})
export class BlogsModule {}

import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { User } from 'src/user/entities/user.entity';
import { Comments } from './entities/comments.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Blog , User, Comments])
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
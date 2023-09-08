import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";
import { Blog } from "./entities/blog.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Comments } from "./entities/comments.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UserCredsDto } from "./dto/user-creds.dto";

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>
  ) {}

  //Blogs services methods

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const checkUser = await this.userRepository.findOne({
      where: { user_id: createBlogDto.userId , key : createBlogDto.key },
    }); 
    if (!checkUser) {
      throw new NotFoundException("User not found");
    } else {
      let blog: Blog = new Blog();
      blog.thumbnail_url = createBlogDto.thumbnail_url;
      blog.heading = createBlogDto.heading;
      blog.body = createBlogDto.body;
      blog.user_id = createBlogDto.userId;
      blog.likes = [];
      return this.blogRepository.save(blog);
    }
  }

  findAll(): Promise<Blog[]> {
    return this.blogRepository.find();
  }

  getUserBlogs(id: string) {
    return this.blogRepository.find({ where: { user_id: id } });
  }

  async followingBlogs(userCredsDto : UserCredsDto){
    const user = await this.userRepository.findOne({ where: { user_id: userCredsDto.user_id , key:userCredsDto.key} });
    if (user) {
      let blogs: Blog[];
      for (let id of user.following_ids) {
        (await this.getUserBlogs(id)).forEach((blog) => {
          blogs.push(blog);
        });
      }

      return {
        status: "success",
        data: blogs,
      };
    }
    throw new UnauthorizedException("Invalid Credentials");
  }

  async deleteBlog(blog_id: string, userCreds: UserCredsDto) {
    const blog = await this.blogRepository.findOne({
      where: { blog_id:blog_id },
    });

    const user = await this.userRepository.findOne({where: { user_id: userCreds.user_id , key: userCreds.key}})

    if (blog.user_id !== userCreds.user_id || !user) {
      throw new UnauthorizedException("Unauthorized access");
    } else {
      await this.blogRepository.delete(blog_id);
      return {
        status: "deleted",
      };
    }
  }

  async updateBlog(blog_id:string, updateBlogDto: UpdateBlogDto){
    const user = await this.userRepository.findOne({ where: {user_id: updateBlogDto.userId, key: updateBlogDto.key}});
    if(user){
      const blog = await this.blogRepository.update({user_id: user.user_id, blog_id: blog_id} , updateBlogDto);
      return {
        'status': 'updated',
        data : blog
      }
    }else{
      throw new UnauthorizedException("Invalid Credentials");
    }
    
  }




  //Comment service methods

  async getComments(blog_id: string) {
    const blogComments = await this.commentsRepository.find({
      where: { blog_id: blog_id },
    });
    return {
      status: "success",
      data: blogComments,
    };
  }

  async deleteComment(userCreds: UserCredsDto, comment_id: string) {
    const comment = await this.commentsRepository.findOne({
      where: { comment_id: comment_id },
    });
    const user = await this.userRepository.findOne({where: { user_id: userCreds.user_id , key: userCreds.key}})
    if (comment.user_id === userCreds.user_id && user) {
      await this.commentsRepository.delete(comment_id);
      return {
        status: "deleted",
      };
    } else {
      throw new UnauthorizedException("Invalid Credentials");
    }
  }

  async likeComment(comment_id: string, userCreds: UserCredsDto){
    const user = await this.userRepository.findOne({ where: { user_id:userCreds.user_id , key:userCreds.key } });
    if (user) {
      const getComment = await this.commentsRepository.findOne({
        where: { comment_id: comment_id },
      });
      if (getComment.likes.includes(user.user_id)) {
        getComment.likes.splice(getComment.likes.indexOf(user.user_id), 1);
      } else {
        getComment.likes.push(user.user_id);
      }
      await this.commentsRepository.update(comment_id, getComment);
      return {
        status: "success",
      };
    } else {
      throw new UnauthorizedException("Unauthorized access");
    }
  }

  async postComment(newCommentDto: CreateCommentDto){
    const user = await this.userRepository.findOne({ where: { user_id: newCommentDto.user_id , key: newCommentDto.key} });
    if(user){
      let comment = new Comments();
      comment.blog_id= newCommentDto.blog_id;
      comment.comment=newCommentDto.comment;
      comment.likes=[];
      comment.user_id=newCommentDto.user_id;
      return this.commentsRepository.save(comment);
    }else{
      throw new UnauthorizedException("Unauthorized access");
    }
  }
}

import {
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { UpdateBlogDto } from "./dto/update-blog.dto";
import { Blog } from "./entities/blog.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Comments } from "./entities/comments.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { MediaType } from "src/common/entity/media-type.entity";
import { Media } from "src/common/entity/media.entity";
import { Usernames } from "src/common/entity/username.entity";
import { Tags } from "./entities/tags.entity";
import { OptionalUserCredsDto, UserCredsDto } from "src/common/dtos/user-creds.dto";
import { Profile } from "src/user/entities/profile.entity";
import { BlogLikes } from "./entities/likes.entity";
import { BlogContent } from "./entities/blog-content.entity";
import { LikeBlogDto } from "./dto/like-blog.dto";

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
    @InjectRepository(BlogContent) private readonly blogContent: Repository<BlogContent>,
    @InjectRepository(MediaType) private readonly mediaTypeRepository: Repository<MediaType>,
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
    @InjectRepository(BlogLikes) private readonly blogLikesRepository: Repository<BlogLikes>,
    @InjectRepository(Usernames) private readonly usernamesRepository: Repository<Usernames>,
    @InjectRepository(Tags) private readonly tagsRepository: Repository<Tags>,
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>
  ) {}

  //Blogs services methods
  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    let media_type: MediaType = await this.mediaTypeRepository.findOne({ where: {type: 'blog'} })
    if(media_type===null){
      const newMedia: MediaType = new MediaType({type: 'blog'});
      media_type = await this.mediaTypeRepository.save(newMedia);
    }
    let media : Media = new Media({'image': createBlogDto.thumbnail_url, 'media_type': media_type})
    let tagsList: Tags[] = [];
    for(const tag of createBlogDto.tags){
      const getTag: Tags = await this.tagsRepository.findOne({ where: {'tag_name': tag}})
      if(getTag){
        tagsList.push(getTag);
      }else{
        const newTag: Tags = new Tags({tag_name: tag});
        tagsList.push(await this.tagsRepository.save(newTag));
      }
    }
    let blog : Blog = new Blog({'user': createBlogDto.user_id, 'title': createBlogDto.title, thumbnail: media, tags: tagsList});
    blog.body=new BlogContent({body: createBlogDto.body});
    return await this.blogRepository.save(blog);
  }



  async updateBlog(blog_id:string, updateBlogDto: UpdateBlogDto){
    let blog = await this.blogRepository.findOne({where: {blog_id: blog_id, user: updateBlogDto.user_id},relations:['thumbnail','tags','body']});
    if(!blog){
      return new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    }
    blog.body.body=updateBlogDto.body;
    blog.title=updateBlogDto.title;
    blog.thumbnail.image=updateBlogDto.thumbnail_url;
    if(updateBlogDto.tags!==null && updateBlogDto.tags.length!==0){
      let tagsList: Tags[] = [];
      for(const tag of updateBlogDto.tags){
      const getTag: Tags = await this.tagsRepository.findOne({ where: {'tag_name': tag}})
      if(getTag){
        tagsList.push(getTag);
      }else{
        const newTag: Tags = new Tags({tag_name: tag});
        tagsList.push(await this.tagsRepository.save(newTag));
      }
    }
    blog.tags=tagsList;
    }
    await this.blogRepository.save(blog);
    return {
      'status': 'success',
      'data': 'Updated successfully'
    }
  }


  async deleteBlog(blog_id:string, userCreds: UserCredsDto){
    const blog = await this.blogRepository.findOne({where: {blog_id: blog_id, user: userCreds.user_id}});
    if(!blog){
      return new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    }
    await this.blogRepository.remove(blog);
    return {
      status: 'success',
      "data": "Deleted successfully"
    }
  }

  async getAllTags(){
    return await this.tagsRepository.find();
  }

  async getBlogsOfTag(tagId: string, curUser: OptionalUserCredsDto){
    const blogs = await this.tagsRepository.findOne({ where: {tag_name: tagId},relations: ['blogs','blogs.thumbnail','blogs.creator','blogs.creator.avatar','blogs.tags']});
    if(curUser.user_id){
      for(const blog of blogs.blogs){
        const liked = await this.blogLikesRepository.findOne({where: {blog_id: blog.blog_id, user_id: curUser.user_id}});
        if(liked){
          blog['liked']= true;
        }else{
          blog['liked']= false;
        }
      }
      return blogs;
    }
    return blogs;
    
  }

  async likeBlog(likeBlogDto: LikeBlogDto){
    const like = await this.blogLikesRepository.findOne({where: {blog_id: likeBlogDto.blog_id, user_id: likeBlogDto.user_id}});
    if(like){
      await this.blogLikesRepository.delete(like);
      await this.updateTotalLikes(likeBlogDto.blog_id);
      return{
        "status": "disliked"
      }
    }
    const newLike = new BlogLikes({blog_id: likeBlogDto.blog_id, user_id: likeBlogDto.user_id, liked_to: likeBlogDto.liked_to});
    await this.blogLikesRepository.save(newLike);
    await this.updateTotalLikes(likeBlogDto.blog_id);
    return{
      "status": "liked"
    }
  }

  async followingBlogs(userCreds: UserCredsDto){
    const user = await this.profileRepository.findOne({ where: {user_id: userCreds.user_id},relations: ['following_to']});
    let blogList :Blog[] = [];
    for(const following_user of user.following_to){
      const blogs = await this.blogRepository.find({where: {user: following_user.following_id}, relations:['thumbnail','creator','creator.avatar','tags']});
      for(const blog of blogs){
        const liked = await this.blogLikesRepository.findOne({where: {blog_id: blog.blog_id, user_id: userCreds.user_id}});
        if(liked){
          blog['liked']= true;
        }else{
          blog['liked']= false;
        }
      }
      blogList.concat(blogs);
    }
    return blogList;
  }

  async findAll(user: OptionalUserCredsDto): Promise<Blog[]> {
    const blogs = await this.blogRepository.find({relations:['thumbnail','creator','creator.avatar','tags']});
    if(user.user_id){
      console.log("Checking likes")
      for(const blog of blogs){
        const liked = await this.blogLikesRepository.findOne({where: {blog_id: blog.blog_id, user_id: user.user_id}});
        if(liked){
          blog['liked']= true;
        }else{
          blog['liked']= false;
        }
      }
      return blogs;
    }
    return blogs;
  }

  async getBlogById(blogId: string, user: OptionalUserCredsDto){
    const blog= await this.blogRepository.findOne({where: {blog_id: blogId}, relations:['thumbnail','creator','creator.avatar','tags','body']})
    if(user.user_id){
      const liked = await this.blogLikesRepository.findOne({where: {blog_id: blog.blog_id, user_id: user.user_id}});
      if(liked){
        blog['liked']= true;
      }else{
        blog['liked']= false;
      }
      return blog;
    }
    return blog;
  }

  async getUserBlogs(id: string, user: OptionalUserCredsDto) {
    console.log(user);
    const blogs= await this.blogRepository.find({ where: { user: id },relations:['thumbnail','creator','creator.avatar','tags'] });
    if(user.user_id){
      for(const blog of blogs){
        const liked = await this.blogLikesRepository.findOne({where: {blog_id: blog.blog_id, user_id: user.user_id}});
        if(liked){
          blog['liked']= true;
        }else{
          blog['liked']= false;
        }
      }
      return blogs;
    }
    return blogs;
  }




  //Helpers
  async updateTotalLikes(blogId: string) {
    const blog = await this.blogRepository.findOne({where:{ blog_id: blogId}, relations: ['liked_users']});

    if (blog) {
      blog.total_likes = blog.liked_users.length;
      await this.blogRepository.save(blog);
    }
  }

  
  //Comment service methods
  async getComments(blog_id: string) {
    return await this.commentsRepository.find({
      where: { blog_id: blog_id },
      relations:['user', 'user.avatar']
    });
  }

  async deleteComment(userCreds: UserCredsDto, comment_id: string) {
    const comment = await this.commentsRepository.findOne({where: {comment_id: comment_id , user_id: userCreds.user_id}})
    if(comment){
      await this.commentsRepository.remove(comment);
      return {
        "status": "success",
        "message": "Comment deleted successfully"
      }
    }
    throw new HttpException("Incorrect credentials or comment_id", HttpStatus.BAD_REQUEST)
  }

  async updateComment(comment_id: string,update: CreateCommentDto) {
    const comment = await this.commentsRepository.findOne({where: {comment_id: comment_id , user_id: update.user_id}})
    if(comment){
      comment.comment=update.comment;
      await this.commentsRepository.save(comment);
      return {
        "status": "success",
        "message": "Comment updated successfully"
      }
    }
    throw new HttpException("Incorrect credentials or comment_id", HttpStatus.BAD_REQUEST)
  }

  async postComment(blog_id:string,newCommentDto: CreateCommentDto){
    const comment: Comments = new Comments({user_id:newCommentDto.user_id, comment: newCommentDto.comment,blog_id:blog_id});
    return await this.commentsRepository.save(comment);
  }


}

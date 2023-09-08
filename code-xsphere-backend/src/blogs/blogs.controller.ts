import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { UserCredsDto } from './dto/user-creds.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  //Get all blogs from various users(Homepage)
  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  // Get all user following blogs
  @Get('followings')
  getFollowingBlogs(@Body() userCreds: UserCredsDto){
    return this.blogsService.followingBlogs(userCreds);
  }

  //Get blogs list of particular user
  @Get(':user_id')
  findOne(@Param('user_id') id: string) {
    return this.blogsService.getUserBlogs(id);
  }

  //Update blog
  @Patch(':blog_id')
  update(@Param('blog_id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.updateBlog(id, updateBlogDto);
  }

  //Delete blog
  @Delete(':blog_id')
  remove(@Param('blog_id') id: string , @Body() userCreds: UserCredsDto) {
    return this.blogsService.deleteBlog(id,userCreds);
  }




  //Comments controllers


  //Get blog comments
  @Get(':blog_id/comments')
  getComments(@Param('blog_id') id: string){
    return this.blogsService.getComments(id);
  }

  //delete comment
  @Delete('comments/:comment_id')
  deleteComment(@Param('comment_id') id:string, userCreds: UserCredsDto){
    return this.blogsService.deleteComment(userCreds,id);
  }

  @Post(':comment_id/like')
  likeComment(@Param('comment_id') id:string, @Body() userCreds: UserCredsDto){
    return this.blogsService.likeComment(id,userCreds);
  }

  @Post('comment/new')
  newComment(@Body() newComment: CreateCommentDto){
    return this.blogsService.postComment(newComment);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserAuthGuard } from 'src/helpers/guards/user-auth/user-auth.guard';
import { OptionalUserCredsDto, UserCredsDto } from 'src/common/dtos/user-creds.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  //creating new blogs
  @Post()
  @UseGuards(UserAuthGuard)
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @Post(':blog_id')
  @UseGuards(UserAuthGuard)
  updateBlog(@Param('blog_id') blogId: string,@Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.updateBlog(blogId, updateBlogDto);
  }

  @Delete(':blog_id')
  @UseGuards(UserAuthGuard)
  deleteBlog(@Param('blog_id') blogId: string,@Body() userCreds: UserCredsDto) {
    return this.blogsService.deleteBlog(blogId,userCreds);
  }

  @Get('tags')
  getTags(){
    return this.blogsService.getAllTags();
  }

  @Get('tags/:tag_id')
  @UseGuards(UserAuthGuard)
  getBlogs(@Param('tag_id') tagId: string,@Body() user: OptionalUserCredsDto){
    return this.blogsService.getBlogsOfTag(tagId,user);
  }

  //Get all blogs from various users(Homepage)
  @Get()
  @UseGuards(UserAuthGuard)
  findAll(@Body() user: OptionalUserCredsDto) {
    return this.blogsService.findAll(user);
  }

  // Get all user following blogs
  @Get('followings')
  @UseGuards(UserAuthGuard)
  getFollowingBlogs(@Body() creds: UserCredsDto){
    return this.blogsService.followingBlogs(creds);
  }

  //Get blogs list of particular user
  @Get(':user_id')
  @UseGuards(UserAuthGuard)
  findOne(@Param('user_id') id: string, @Body() user: OptionalUserCredsDto) {
    return this.blogsService.getUserBlogs(id,user);
  }




  //Comments controllers


  //Get blog comments
  @Get('comments/:blog_id')
  getComments(@Param('blog_id') id: string){
    return this.blogsService.getComments(id);
  }

  //delete comment
  @Delete('comments/:comment_id')
  @UseGuards(UserAuthGuard)
  deleteComment(@Param('comment_id') id:string, @Body() userCreds:UserCredsDto){
    return this.blogsService.deleteComment(userCreds,id);
  }

  @Post('comments/:blog_id')
  @UseGuards(UserAuthGuard)
  newComment(@Param('blog_id') blog_id: string, @Body() newComment: CreateCommentDto){
    return this.blogsService.postComment(blog_id,newComment);
  }

  @Post('comments/update/:comment_id')
  @UseGuards(UserAuthGuard)
  updateComment(@Param('comment_id') comment_id: string, @Body() updateComment: CreateCommentDto){
    return this.blogsService.updateComment(comment_id,updateComment);
  }
}

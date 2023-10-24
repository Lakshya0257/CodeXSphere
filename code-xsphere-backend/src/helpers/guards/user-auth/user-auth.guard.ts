import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credentials } from 'src/user/entities/creds.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAuthGuard implements CanActivate {
  // private credentials: Repository<Credentials>;

  @InjectRepository(Credentials) private readonly credentials: Repository<Credentials>

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    // const route = context.getHandler();
    // const method = route; //HTTP method (e.g., 'GET', 'POST').

    // Access the route path from the request object:
    const path = request.route.path;

    const { user_id, key } = request.body;

    if ((path === '/user/:user_id' || path==='/blogs' || path==='/blogs/tags/:tag_id' || path==='/blogs/:user_id') && !user_id && !key) {
      return true;
    }

    

    if (!user_id || !key) {
      throw new HttpException('Missing user_id or key in the request body', HttpStatus.BAD_REQUEST);
    }

    const user = await this.credentials.findOne({where: {user_id: user_id , key: key}});
    if(user!==null){
      return true;
    }else{
      return false;
    }
  }
}

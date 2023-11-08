import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsModule } from './blogs/blogs.module';
import { UserModule } from './user/user.module';
import * as cors from 'cors';
import { Credentials } from './user/entities/creds.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Credentials]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:'ep-crimson-firefly-70756794.ap-southeast-1.aws.neon.tech',
      url: 'postgres://lakshyabhati24:0oPaImQNi2rX@ep-crimson-firefly-70756794.ap-southeast-1.aws.neon.tech/neondb?options=project%3Dep-crimson-firefly-70756794',
      username: 'lakshyabhati24',
      password: '0oPaImQNi2rX',
      database: 'neondb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging:true,
      ssl:true
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule.forRoot({
    //       isGlobal:true,
    //       envFilePath : "local.env"
    //   })],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get('PGHOST'),
    //     username: configService.get('PGUSER'),
    //     password: configService.get('PGPASSWORD'),
    //     database: configService.get('PGDATABASE'),
    //     url:configService.get("URL"),
    //     synchronize: true,
    //     ssl:true
    //   }),
    //   inject: [ConfigService],
    // }),
    // DatabaseConnectionModule,
    BlogsModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Enable CORS with custom options
    const corsOptions = {
      origin: 'http://localhost:4200', // Replace with your frontend app's URL
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // Enable passing cookies, if needed
    };
    
    consumer.apply(cors(corsOptions)).forRoutes('*');
  }
}

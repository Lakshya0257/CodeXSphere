import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[
        TypeOrmModule.forRoot({
            type: 'postgres',
            host:'ep-crimson-firefly-70756794.ap-southeast-1.aws.neon.tech',
            url: 'postgres://lakshyabhati24:0oPaImQNi2rX@ep-crimson-firefly-70756794.ap-southeast-1.aws.neon.tech/neondb?options=project%3Dep-crimson-firefly-70756794',
            username: 'lakshyabhati24',
            password: '0oPaImQNi2rX',
            database: 'neondb',
            entities: [__dirname + '../**/**/*.entity{.ts,.js}'],
            synchronize: true,
            logging:true,
            ssl:true
          }),
    ],
    providers: []
})
export class DatabaseConnectionModule {

}

import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from '../config/configuration';
import { CustomLogger } from '../logger/logger';
import { MongooseConfigService } from '../mongoose/mongoose';
import { getEnvPath } from '../util';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { TagsModule } from './tags/tags.module';

const envFilePath = getEnvPath(`${__dirname}/../envs`);
console.log('envFilePath', envFilePath);
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: envFilePath,
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
      inject: [ConfigService],
    }),
    MoviesModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomLogger).forRoutes('*');
  }
}

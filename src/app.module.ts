import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/entities/User.entity';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';
import { AppController } from './app.controller';
import { GalleriesModule } from './galleries/galleries.module';
import { Gallery } from './galleries/entities/gallery.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        // entities: ['dist/src/**/*.entity.{js,ts}'],
        entities: [User, Gallery],
        synchronize: true,
      }),
    }),
    UsersModule,
    AuthModule,
    BooksModule,
    GalleriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LocalMiddleware);
  // }
}

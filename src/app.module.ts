import { HttpStatus, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import {
  loggingMiddleware,
  PrismaClientExceptionFilter,
  PrismaModule,
  QueryInfo,
} from 'nestjs-prisma';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    // PrismaModule.forRoot({
    //   prismaServiceOptions: {
    //     middlewares: [
    //       loggingMiddleware({
    //         logger: new Logger('PrismaMiddleware'),
    //         logLevel: 'log', // default is `debug`
    //         logMessage: (query: QueryInfo) =>
    //           `[Prisma Query] ${query.model}.${query.action} - ${query.executionTime}ms`,
    //       }),
    //     ],
    //   },
    // }),
    // ,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter, {
          // Prisma Error Code: HTTP Status Response
          P2000: HttpStatus.BAD_REQUEST,
          P2002: HttpStatus.CONFLICT,
          P2025: HttpStatus.NOT_FOUND,
        });
      },
      inject: [HttpAdapterHost],
    },
    AppService,
  ],
})
export class AppModule {}

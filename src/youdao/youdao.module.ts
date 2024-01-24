import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { YoudaoController } from './youdao.controller'
import { YoudaoService } from './youdao.service'
import { LoggerMiddleware } from '../middleware/logger.middleware'

@Module({
  imports: [
    CacheModule.register({
      ttl: 60 * 60 * 1000 * 1, // 1 hour
      max: 100,
    }),
  ],
  controllers: [YoudaoController],
  providers: [YoudaoService],
})
export class YoudaoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}

import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { YoudaoController } from './youdao.controller'
import { YoudaoService } from './youdao.service'

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
export class YoudaoModule {}

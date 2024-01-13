import { NestFactory } from '@nestjs/core'
import { YoudaoModule } from './youdao/youdao.module'

async function bootstrap() {
  const app = await NestFactory.create(YoudaoModule)
  await app.listen(9002)
}
bootstrap()

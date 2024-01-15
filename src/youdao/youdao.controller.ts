import { Controller, Get, Query, ValidationPipe } from '@nestjs/common'
import { YoudaoService } from './youdao.service'
import { TranslateDto } from './youdao.dto'

@Controller('youdao')
export class YoudaoController {
  constructor(private readonly appService: YoudaoService) {}

  @Get()
  async translate(@Query(new ValidationPipe()) dto: TranslateDto) {
    const { text } = dto
    const res = await this.appService.translate(text)
    return {
      en: res.enParaphrase,
      ec: res.ecParaphrase,
      media: res.mediaSentsPart,
    }
  }
}

import { Controller, Get, Query } from '@nestjs/common'
import { YoudaoService } from './youdao.service'
import { TranslateDto } from './youdao.dto'

@Controller('youdao')
export class YoudaoController {
  constructor(private readonly appService: YoudaoService) {}

  @Get()
  async translate(@Query() dto: TranslateDto) {
    const { text } = dto
    return this.appService.translate(text)
  }
}

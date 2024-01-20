import {
  Controller,
  Get,
  Query,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common'
import { YoudaoService } from './youdao.service'
import { TranslateDto } from './youdao.dto'

@Controller('youdao')
export class YoudaoController {
  constructor(private readonly appService: YoudaoService) {}

  @Get()
  async translate(@Query(new ValidationPipe()) dto: TranslateDto) {
    const { text } = dto
    const { enParaphrase, ecParaphrase, mediaSentsPart } =
      await this.appService.translate(text)

    if (
      !enParaphrase?.length &&
      !ecParaphrase?.length &&
      !mediaSentsPart?.length
    ) {
      throw new NotFoundException('No result')
    }

    return {
      text,
      en: enParaphrase,
      ec: ecParaphrase,
      media: mediaSentsPart,
    }
  }
}

import {
  Controller,
  Logger,
  Get,
  Query,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common'
import { YoudaoService } from './youdao.service'
import { TranslateDto } from './youdao.dto'

@Controller('youdao')
export class YoudaoController {
  private readonly logger = new Logger(YoudaoController.name)
  constructor(private readonly appService: YoudaoService) {}

  @Get()
  async translate(@Query(new ValidationPipe()) dto: TranslateDto) {
    const { text } = dto
    const { enParaphrase, ecParaphrase, mediaSentsPart, phonetic } =
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
      phonetic,
      en: enParaphrase,
      ec: ecParaphrase,
      media: mediaSentsPart,
    }
  }
}

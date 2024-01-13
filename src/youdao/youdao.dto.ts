import { IsString, IsNotEmpty } from 'class-validator'
export class TranslateDto {
  @IsString()
  @IsNotEmpty()
  text: string
}

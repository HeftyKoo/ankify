import type { YoudaoResponse } from './youdao.interface'

export class YoudaoTranslation {
  data: YoudaoResponse
  constructor(data: YoudaoResponse) {
    this.data = data
  }

  // English paraphrase
  get enParaphrase() {
    return this.data.ee?.word?.trs
  }

  // Chinese paraphrase
  get ecParaphrase() {
    return this.data.ec?.word?.trs
  }

  // media_sents_part
  get mediaSentsPart() {
    return this.data.media_sents_part
  }
}

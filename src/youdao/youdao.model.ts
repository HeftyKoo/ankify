import type { YoudaoResponse } from './youdao.interface'

export class YoudaoTranslation {
  data: YoudaoResponse
  constructor(data: YoudaoResponse) {
    this.data = data
  }

  // English paraphrase
  get enParaphrase() {
    return this.data.ee?.word?.trs?.map((item) => {
      return {
        pos: item.pos,
        tr: item.tr.map((item) => {
          return {
            tran: item.tran,
            similarWords: item['similar-words'],
          }
        }),
      }
    })
  }

  // Chinese paraphrase
  get ecParaphrase() {
    return this.data.ec?.word?.trs
  }

  // media_sents_part
  get mediaSentsPart() {
    return this.data.media_sents_part?.sent
      ?.filter((item) => item['@mediatype'] === 'audio')
      .map((item) => {
        return {
          eng: item.eng,
          url: item.snippets.snippet[0].streamUrl,
        }
      })
  }
}

import { Injectable, Inject } from '@nestjs/common'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import puppeteer from 'puppeteer'
import { YoudaoTranslation } from './youdao.model'

@Injectable()
export class YoudaoService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async translate(text: string): Promise<YoudaoTranslation> {
    const CACHE_KEY = 'youdao_' + text

    const currentCache =
      await this.cacheManager.get<YoudaoTranslation>(CACHE_KEY)
    if (currentCache) {
      return currentCache
    }

    return new Promise(async (resolve) => {
      const browser = await puppeteer.launch({
        headless: false,
        devtools: true,
      })

      const page = await browser.newPage()
      await page.goto('https://youdao.com/')
      const $input = await page.$('#search_input')
      $input.type(text)

      page.on('response', async (response) => {
        const request = response.request()
        const url = request.url()
        const method = request.method()
        if (url.includes('jsonapi_s') && method === 'POST') {
          const text = new YoudaoTranslation(await response.json())
          browser.close()
          this.cacheManager.set(CACHE_KEY, text)
          resolve(text)
        }
      })

      await Promise.all([
        page.waitForNavigation(),
        page.click('.translate_btn'),
      ])
    })
  }
}

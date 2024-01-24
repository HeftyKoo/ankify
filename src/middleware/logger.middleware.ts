import { Injectable, NestMiddleware, Logger } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP')
  private logReq(req: Request) {
    const { ip, method, originalUrl } = req
    const userAgent = req.get('user-agent') || ''
    const reqBody: any[] = []
    let reqErrorMessage = ''

    req.on('data', (chunk) => {
      reqBody.push(chunk)
    })

    req.on('end', () => {
      const requestBody = Buffer.concat(reqBody).toString()
      this.logger.log(
        `Request: ${method} ${originalUrl} ${ip} ${userAgent} query: ${JSON.stringify(
          req.query,
        )} params: ${JSON.stringify(
          req.params,
        )} ${requestBody} ${reqErrorMessage}`,
      )
    })

    req.on('error', (error) => {
      reqErrorMessage = error.message
    })
  }
  private logRes(req: Request, res: Response) {
    const { ip, method, originalUrl } = req
    const startTime = process.hrtime()
    const userAgent = req.get('user-agent') || ''
    let responseBody: Body

    const _send = res.send
    res.send = function (body) {
      responseBody = body
      return _send.call(this, body)
    }

    res.on('finish', () => {
      const { statusCode } = res
      const duration = process.hrtime(startTime)
      const durationMs = (duration[0] * 1000 + duration[1] / 1e6).toFixed(2)
      if (statusCode >= 400) {
        this.logger.error(
          `${method} ${originalUrl} ${statusCode} ${durationMs}ms - ${userAgent} ${ip} - ${responseBody}`,
        )
        return
      }

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${durationMs}ms - ${userAgent} ${ip} - ${responseBody}`,
      )
    })
  }
  use(req: Request, res: Response, next: NextFunction) {
    this.logReq(req)
    this.logRes(req, res)
    next()
  }
}

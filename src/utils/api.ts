import { Response } from 'express'

/**
 * Sends standard response in JSON format
 * @param res - Response object
 * @param status - Status code
 * @param message - Response message
 * @param result - Response data
 */
export function sendResponse(
   res: Response,
   status: number = 200,
   message: string = 'Ok',
   result: any = {}
) {
   res.status(status)
   res.json({
      message,
      result,
   })
}

/**
 * Sends standard response with 200 status code
 * @param res - Response object
 * @param message - Response message
 * @param result - Response data
 */
export function send200Response(res: Response, message?: string, result?: any) {
   sendResponse(res, 200, message, result)
}

/**
 * Sends standard response with 201 status code
 * @param res - Response object
 * @param message - Response message
 * @param result - Response data
 */
export function send201Response(res: Response, message: string = 'Created', result?: any) {
   sendResponse(res, 201, message, result)
}

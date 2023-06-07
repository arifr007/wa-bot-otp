/**
 * @module WaWebClientController
 * @description Controller for handling WhatsApp message operations.
 */
import { Controller, Post, Body } from '@nestjs/common'
import { WaWebClientService } from './wa-web-client.service'
import { OtpRequestDto } from './dto/otp-request.dto'
import { BaseResponseDto } from '../commons/base-response.dto'
import { Message } from 'whatsapp-web.js'

/**
 * @class WaWebClientController
 * @description Controller for handling WhatsApp message operations.
 * @exports WaWebClientController
 */
@Controller('message')
export class WaWebClientController {
  constructor(private readonly waWebClientService: WaWebClientService) { }

  /**
   * @method sendOtp
   * @description Sends an OTP message to a specified phone number.
   * @param {OtpRequestDto} payload - The payload containing the phone number.
   * @returns {Promise<BaseResponseDto<Message>>} A promise that resolves to the response DTO containing the success status, message, and data.
   */
  @Post()
  public async sendOtp(
    @Body() payload: OtpRequestDto,
  ): Promise<BaseResponseDto<Message>> {
    const result = await this.waWebClientService.sendOtp(payload.number)
    return new BaseResponseDto({
      success: result ? true : false,
      message: null,
      data: result,
    })
  }
}

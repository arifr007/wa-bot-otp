/**
 * @module OtpRequestDto
 * @description DTO (Data Transfer Object) for OTP (One-Time Password) request.
 * @exports OtpRequestDto
 */
import { ApiProperty } from "@nestjs/swagger"

/**
 * @class OtpRequestDto
 * @description DTO (Data Transfer Object) for OTP (One-Time Password) request.
 * @exports OtpRequestDto
 */
export class OtpRequestDto {
  /**
   * @property {string} number - The phone number for which the OTP is requested.
   * @ApiProperty - Decorator from `@nestjs/swagger` used to generate API documentation.
   */
  @ApiProperty()
  number: string
}

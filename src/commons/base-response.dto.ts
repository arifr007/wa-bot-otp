/**
 * @module BaseResponseDto
 * @description DTO (Data Transfer Object) for the base response.
 * @template T - The type of the data property.
 * @exports BaseResponseDto
 */
import { ApiProperty } from "@nestjs/swagger"

/**
 * @class BaseResponseDto
 * @description DTO (Data Transfer Object) for the base response.
 * @template T - The type of the data property.
 * @exports BaseResponseDto
 */
export class BaseResponseDto<T> {
  /**
   * @property {boolean} success - Indicates the success status of the response.
   * @ApiProperty - Decorator from `@nestjs/swagger` used to generate API documentation.
   */
  @ApiProperty()
  success: boolean

  /**
   * @property {T} data - The data payload of the response.
   * @ApiProperty - Decorator from `@nestjs/swagger` used to generate API documentation.
   */
  @ApiProperty()
  data: T

  /**
   * @property {string} message - The message associated with the response.
   * @ApiProperty - Decorator from `@nestjs/swagger` used to generate API documentation.
   */
  @ApiProperty()
  message: string

  /**
   * @constructor
   * @param {Partial<BaseResponseDto<T>>} partial - Partial data to initialize the response DTO.
   */
  constructor(partial: Partial<BaseResponseDto<T>>) {
    Object.assign(this, partial)
  }
}

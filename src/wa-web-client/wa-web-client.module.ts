/**
 * @file This file contains the definition and configuration of the `WaWebClientModule` class.
 * It is responsible for configuring the WhatsApp Web Client module in NestJS.
 */

import { Module } from '@nestjs/common'
import { WaWebClientService } from './wa-web-client.service'
import { WaWebClientController } from './wa-web-client.controller'

/**
 * The `WaWebClientModule` class is responsible for configuring the WhatsApp Web Client module in NestJS.
 * It defines the controllers and providers that are part of this module.
 *
 * This module provides the necessary components to interact with the WhatsApp Web Client,
 * including a service for handling client operations and a controller for exposing the relevant endpoints.
 *
 * @module WaWebClientModule
 */
@Module({
  controllers: [WaWebClientController],
  providers: [WaWebClientService],
})
export class WaWebClientModule {}

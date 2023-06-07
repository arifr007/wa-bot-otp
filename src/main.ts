/**
 * @file This file contains the main entry point of the application.
 * It creates and starts the NestJS application with the specified settings.
 */

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Client, Location, List, Buttons, LocalAuth } from 'whatsapp-web.js'

/**
 * Main entry point of the application.
 * It creates and starts the NestJS application with the specified settings.
 *
 * @async
 * @function bootstrap
 */
async function bootstrap() {
  // Create an instance of the NestFactory and initialize the AppModule
  const app = await NestFactory.create(AppModule)

  // Set a global prefix for all routes
  app.setGlobalPrefix('api/v1')

  // Start listening for incoming requests on port 3000
  await app.listen(3000)
}

// Call the bootstrap function to start the application
bootstrap()

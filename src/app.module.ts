/**
  @module AppModule
  @description The main module of the application.
*/
import { Global, Module } from '@nestjs/common'
import { WaWebClientModule } from './wa-web-client/wa-web-client.module'
/**
  @class AppModule
  @description The main module of the application.
  @exports AppModule
*/
@Global()
@Module({
  imports: [WaWebClientModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
/**
 * @file This file contains the test script for the `WaWebClientController` class.
 * It tests the functionality of the `WaWebClientController` controller.
 */

import { Test, TestingModule } from '@nestjs/testing'
import { WaWebClientController } from './wa-web-client.controller'
import { WaWebClientService } from './wa-web-client.service'

/**
 * Test script for the `WaWebClientController` class.
 * It tests the functionality of the `WaWebClientController` controller.
 *
 * @describe WaWebClientController
 */
describe('WaWebClientController', () => {
  let controller: WaWebClientController

  /**
   * Executes before each test case in the test suite.
   * It creates a testing module and initializes the `WaWebClientController` instance.
   *
   * @beforeEach
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaWebClientController],
      providers: [WaWebClientService],
    }).compile()

    controller = module.get<WaWebClientController>(WaWebClientController)
  })

  /**
   * Tests if the `WaWebClientController` instance is defined.
   *
   * @test
   */
  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})

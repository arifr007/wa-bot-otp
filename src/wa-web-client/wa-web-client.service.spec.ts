/**
 * @file This file contains the test specification for the `WaWebClientService` class.
 * It tests the functionality of the `WaWebClientService` service.
 */

import { Test, TestingModule } from '@nestjs/testing'
import { WaWebClientService } from './wa-web-client.service'

/**
 * Test specification for the `WaWebClientService` class.
 * It tests the functionality of the `WaWebClientService` service.
 *
 * @describe WaWebClientService
 */
describe('WaWebClientService', () => {
  let service: WaWebClientService

  /**
   * Executes before each test case in the test suite.
   * It creates a testing module and initializes the `WaWebClientService` instance.
   *
   * @beforeEach
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaWebClientService],
    }).compile()

    service = module.get<WaWebClientService>(WaWebClientService)
  })

  /**
   * Tests if the `WaWebClientService` instance is defined.
   *
   * @test
   */
  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

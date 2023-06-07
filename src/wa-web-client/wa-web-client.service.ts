/**
 * WhatsApp Web Client Service
 * 
 * This service provides functionalities to interact with WhatsApp using the WhatsApp Web API.
 */
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { Client, LocalAuth, Message } from 'whatsapp-web.js'

@Injectable()
export class WaWebClientService {
  private client: Client

  /**
   * Constructor for WaWebClientService
   */
  constructor() {
    if (!this.client) {
      this.client = this.initialize()
    }
  }

  /**
   * Initializes the WhatsApp client.
   * @returns The initialized WhatsApp client.
   */
  initialize(): Client {
    const client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        args: ['--no-sandbox'],
        headless: true,
      },
    })

    client.initialize()

    client.on('loading_screen', (percent, message) => {
      console.log('LOADING SCREEN', percent, message)
    })

    client.on('qr', (qr) => {
      console.log('QR RECEIVED', qr)
    })

    client.on('authenticated', () => {
      console.log('AUTHENTICATED')
    })

    client.on('auth_failure', msg => {
      console.error('AUTHENTICATION FAILURE', msg)
    })

    client.on('ready', () => {
      console.log('READY')
    })

    client.on('message_create', (msg) => {
      // Fired on all message creations, including your own
      if (msg.fromMe) {
        console.log('send message to:', msg.to, ': message:', msg.body)
      }
    })

    client.on('change_state', state => {
      console.log('CHANGE STATE', state)
    })

    // Change to false if you don't want to reject incoming calls
    let rejectCalls = true

    client.on('call', async (call) => {
      console.log('Call received, rejecting. GOTO Line 261 to disable', call)
      if (rejectCalls) await call.reject()
      await client.sendMessage(call.from, `[${call.fromMe ? 'Outgoing' : 'Incoming'}] Phone call from ${call.from}, type ${call.isGroup ? 'group' : ''} ${call.isVideo ? 'video' : 'audio'} call. ${rejectCalls ? 'This call was automatically rejected by the script.' : ''}`)
    })

    client.on('disconnected', (reason) => {
      console.log('Client was logged out', reason)
    })

    return client
  }

  /**
   * Sends a message to the specified number.
   * @param numberId - The number ID to send the message to.
   * @param message - The message to send.
   * @returns A Promise that resolves to the sent message.
   * @throws BadRequestException if the number ID is invalid or not registered on WhatsApp.
   * @throws InternalServerErrorException if the client failed to load.
   */
  async sendMessage(numberId: string, message: string): Promise<Message> {
    if (!(/^\d*$/.test(numberId))) throw new BadRequestException('Invalid number')
    const client = this.client
    if (!client) throw new InternalServerErrorException('Failed to load client')

    const contactId = await client.getNumberId(numberId)
    if (!contactId) throw new BadRequestException('Number not registered on WhatsApp')
    console.log('contactId', contactId)
    const contact = await client.getContactById(contactId._serialized)
    console.log('contact', contact)
    if (!contact) throw new BadRequestException('Number not registered on WhatsApp')

    const chat = await contact.getChat()
    return await chat.sendMessage(message)
  }

  /**
   * Sends an OTP (One-Time Password) message to the specified number.
   * @param numberId - The number ID to send the OTP to.
   * @returns A Promise that resolves to the sent OTP message.
   */
  async sendOtp(numberId: string): Promise<Message> {
    const message = `Rumah Siap Kerja - ${this.getOtp()} adalah kode verifikasi untuk verifikasi akun. PENTING: Mohon tidak menyebarkan kode ke orang lain atau pihak Rumah Siap Kerja, demi keamanan akun.`
    return await this.sendMessage(numberId, message)
  }

  /**
   * Generates an OTP (One-Time Password) of the specified length.
   * @param length - The length of the OTP. Defaults to 6.
   * @returns The generated OTP.
   */
  getOtp(length = 6): string {
    let otp = ''
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10)
    }
    return otp
  }
}

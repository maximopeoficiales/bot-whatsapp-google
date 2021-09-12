import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { WhatsappService } from './whatsapp/whatsapp.service';
import { MessageService } from './message/message.service';
import { GoogleService } from './google/google.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AppService, WhatsappService, MessageService, GoogleService],
})
export class AppModule {


}

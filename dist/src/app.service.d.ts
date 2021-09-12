import { Client, Message } from 'whatsapp-web.js';
import { GoogleService } from './google/google.service';
import { MessageService } from './message/message.service';
import { ResultGoogle } from './types/ResultGoogle';
import { WhatsappService } from './whatsapp/whatsapp.service';
export declare class AppService {
    private readonly _wsService;
    private readonly _message;
    private readonly _google;
    client: Client;
    constructor(_wsService: WhatsappService, _message: MessageService, _google: GoogleService);
    messageInitilizer(): Promise<void>;
    searchGoogle(msg: Message): Promise<void>;
    searchGoogleFull(msg: Message): Promise<void>;
    sendResultsGoogle(from: string, search: string, results: ResultGoogle): Promise<void>;
}

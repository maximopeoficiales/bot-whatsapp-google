import { Client } from 'whatsapp-web.js';
export declare class WhatsappService {
    client: Client;
    SESSION_FILE_PATH: string;
    sessionData: any;
    constructor();
    withSession(): void;
    withOutSession(): void;
    sendMediaPath(number: string, fileName: string): Promise<void>;
    sendMediaUrl(number: string, url: string): Promise<void>;
}

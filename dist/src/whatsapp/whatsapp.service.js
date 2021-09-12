"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappService = void 0;
const path = require("path");
const ora = require("ora");
const chalk = require("chalk");
const whatsapp_web_js_1 = require("whatsapp-web.js");
const fs = require("fs");
const qrcode = require("qrcode-terminal");
const common_1 = require("@nestjs/common");
let WhatsappService = class WhatsappService {
    constructor() {
        this.SESSION_FILE_PATH = path.join(__dirname, '..', '..', '..', 'session.json');
        console.log(this.SESSION_FILE_PATH);
        (fs.existsSync(this.SESSION_FILE_PATH)) ? this.withSession() : this.withOutSession();
    }
    withSession() {
        const spinner = ora(`Cargando ${chalk.yellow('Validando session con Whatsapp...')}`);
        this.sessionData = require(this.SESSION_FILE_PATH);
        spinner.start();
        this.client = new whatsapp_web_js_1.Client({
            session: this.sessionData
        });
        this.client.on('ready', () => {
            console.log('Client is ready!');
            spinner.stop();
        });
        this.client.on('auth_failure', () => {
            spinner.stop();
            console.log('** Error de autentificacion vuelve a generar el QRCODE (Borrar el archivo session.json) **');
        });
        this.client.initialize();
    }
    withOutSession() {
        console.log('No tenemos session guardada');
        this.client = new whatsapp_web_js_1.Client({});
        this.client.on('qr', qr => {
            qrcode.generate(qr, { small: true });
        });
        this.client.on('ready', () => {
            console.log('Client is ready!');
        });
        this.client.on('auth_failure', () => {
            console.log('** Error de autentificacion vuelve a generar el QRCODE **');
        });
        this.client.on('authenticated', (session) => {
            this.sessionData = session;
            fs.writeFile(this.SESSION_FILE_PATH, JSON.stringify(session), function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });
        this.client.initialize();
    }
    async sendMediaPath(number, fileName) {
        number = number.replace('@c.us', '');
        number = `${number}@c.us`;
        const media = whatsapp_web_js_1.MessageMedia.fromFilePath(`./../mediaSend/${fileName}`);
        if (number.includes("@g.us")) {
            number = number.replace('@c.us', '');
        }
        await this.client.sendMessage(number, media);
    }
    async sendMediaUrl(number, url) {
        number = number.replace('@c.us', '');
        number = `${number}@c.us`;
        if (number.includes("@g.us")) {
            number = number.replace('@c.us', '');
        }
        const media = await whatsapp_web_js_1.MessageMedia.fromUrl(url, {
            unsafeMime: true, reqOptions: {},
        });
        if (media.data) {
            await this.client.sendMessage(number, media);
        }
    }
};
WhatsappService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], WhatsappService);
exports.WhatsappService = WhatsappService;
//# sourceMappingURL=whatsapp.service.js.map
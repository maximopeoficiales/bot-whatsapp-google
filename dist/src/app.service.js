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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("./config");
const google_service_1 = require("./google/google.service");
const message_service_1 = require("./message/message.service");
const whatsapp_service_1 = require("./whatsapp/whatsapp.service");
let AppService = class AppService {
    constructor(_wsService, _message, _google) {
        this._wsService = _wsService;
        this._message = _message;
        this._google = _google;
        const { client } = this._wsService;
        this.client = client;
        this.messageInitilizer();
    }
    async messageInitilizer() {
        this.client.on('message', async (msg) => {
            const { from, body } = msg;
            console.log(from, body);
            if (body == "!MostrarOpciones" || body == `!${config_1.config.nameBot}`) {
                let opciones = this._message.getOptions();
                await this.client.sendMessage(from, opciones);
            }
            await this.searchGoogle(msg);
            await this.searchGoogleFull(msg);
            await this.searchGoogleImages(msg);
        });
    }
    async searchGoogle(msg) {
        const { from, body } = msg;
        if (body === "!search") {
            await this.client.sendMessage(from, this._message.setTextWithBr([
                "👉 Escriba ⮕ !search :busqueda",
                "👽 Ejemplo: ⮕ !search spiderman"
            ]));
        }
        if (body.includes("!search")) {
            let search = body.replace("!search", "").trim();
            if (search !== "") {
                await this.client.sendMessage(from, `💬 Estas buscando '${search}'💬`);
                await this.client.sendMessage(from, `💬 Cargando resultados.... '${search}'💬`);
                let results = await this._google.searchDefinition(search);
                await this.sendResultsGoogle(from, search, results);
            }
            else {
                await this.client.sendMessage(from, `No haz buscado nada bro, intentelo de nuevo 😒😒`);
            }
        }
    }
    async searchGoogleImages(msg) {
        const { from, body } = msg;
        if (body === "!imagesSearch") {
            await this.client.sendMessage(from, this._message.setTextWithBr([
                "👉 Escriba ⮕ !imagesSearch :busqueda",
                "👽 Ejemplo: ⮕ !imagesSearch spiderman"
            ]));
        }
        if (body.includes("!imagesSearch")) {
            let search = body.replace("!imagesSearch", "").trim();
            if (search !== "") {
                await this.client.sendMessage(from, `💬 Estas buscando '${search}'💬`);
                await this.client.sendMessage(from, `💬 Cargando resultados.... '${search}'💬`);
                let results = await this._google.searchImages(search);
                console.log(results);
                await this.sendImagesGoogle(from, search, results);
            }
            else {
                await this.client.sendMessage(from, `No haz buscado nada bro, intentelo de nuevo 😒😒`);
            }
        }
    }
    async searchGoogleFull(msg) {
        const { from, body } = msg;
        if (body === "!fullSearch") {
            await this.client.sendMessage(from, this._message.setTextWithBr([
                "👉 Escriba ⮕ !fullSearch :busqueda",
                "👽 Ejemplo: ⮕ !fullSearch spiderman"
            ]));
        }
        if (body.includes("!fullSearch")) {
            let search = body.replace("!fullSearch", "").trim();
            if (search !== "") {
                await this.client.sendMessage(from, `💬 Estas buscando '${search}'💬`);
                await this.client.sendMessage(from, `💬 Cargando resultados.... '${search}'💬`);
                let results = await this._google.searchDefinition(search, true);
                console.log(results);
                await this.sendResultsGoogle(from, search, results);
            }
            else {
                await this.client.sendMessage(from, `No haz buscado nada bro, intentelo de nuevo 😒😒`);
            }
        }
    }
    async sendResultsGoogle(from, search, results) {
        if (results.definitions.length) {
            results.definitions.forEach(async (definition, index) => {
                await this.client.sendMessage(from, `${index + 1}- ${definition}`);
            });
            await this.client.sendMessage(from, `💬 Imagenes de '${search}'💬`);
            await this.client.sendMessage(from, `💬 Cargando imagenes ....💬`);
        }
        else {
            await this.client.sendMessage(from, `No hay resultados definiciones con '${search}', intentelo con otra palabra 😒😒`);
        }
        if (results.images.length > 0) {
            results.images.forEach(async (img) => {
                await this._wsService.sendMediaUrl(from, img);
            });
        }
        else {
            await this.client.sendMessage(from, `No hay imagenes con '${search}' 😒😒`);
        }
    }
    async sendImagesGoogle(from, search, results) {
        if (results.length > 0) {
            results.forEach(async (img) => {
                await this._wsService.sendMediaUrl(from, img);
            });
        }
        else {
            await this.client.sendMessage(from, `No hay imagenes con '${search}' 😒😒`);
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [whatsapp_service_1.WhatsappService,
        message_service_1.MessageService,
        google_service_1.GoogleService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map
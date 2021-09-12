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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../config");
let MessageService = class MessageService {
    constructor() {
    }
    setTextWithBr(data) {
        return data.join("\n");
    }
    getOptions() {
        return [
            `👋 Hola, Soy ${config_1.config.nameBot}`,
            'Soy un bot encargado de realizar busquedas en internet',
            `Tengo estas opciones por momento:`,
            '✅ Buscar en Google ⮕ !search',
            '✅ Busqueda completa en Google ⮕ !fullSearch',
            '✅ Proximamente buscar Google Imagenes....',
        ].join("\n");
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map
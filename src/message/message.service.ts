import { Injectable } from '@nestjs/common';
import { config } from '../config';
@Injectable()
export class MessageService {
    constructor(
    ) {
    }
    setTextWithBr(data: string[]): string {
        return data.join("\n");
    }
    getOptions(): string {
        return [
            `👋 Hola, Soy ${config.nameBot}`,
            'Soy un bot encargado de realizar busquedas en internet',
            `Tengo estas opciones por momento:`,
            // `✅ Listar ${config.maxPage} memes ⮕ !listMemes`,
            // '✅ Generar meme ⮕ !generateMeme',
            '✅ Buscar en Google ⮕ !search',
            '✅ Busqueda completa en Google ⮕ !fullSearch',
            '✅ Busqueda de imagenes en Google ⮕ !imagesSearch',
            '✅ Proximamente descarga en pdf....',
        ].join("\n");
    }


}

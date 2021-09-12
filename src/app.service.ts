import { Injectable } from '@nestjs/common';
import { Client, Message } from 'whatsapp-web.js';
import { config } from './config';
import { GoogleService } from './google/google.service';
import { MessageService } from './message/message.service';
import { ResultGoogle } from './types/ResultGoogle';
import { WhatsappService } from './whatsapp/whatsapp.service';

@Injectable()
export class AppService {
  client: Client;
  constructor(
    private readonly _wsService: WhatsappService,
    private readonly _message: MessageService,
    private readonly _google: GoogleService,
  ) {
    const { client } = this._wsService;
    this.client = client;
    this.messageInitilizer();
  }
  async messageInitilizer() {
    this.client.on('message', async msg => {
      const { from, body } = msg;
      console.log(from, body);
      if (body == "!MostrarOpciones" || body == `!${config.nameBot}`) {
        let opciones = this._message.getOptions();
        await this.client.sendMessage(from, opciones);
      }

      // esperando busquedas de google
      await this.searchGoogle(msg);
      await this.searchGoogleFull(msg);
      await this.searchGoogleImages(msg);
    });

  }



  async searchGoogle(msg: Message) {
    const { from, body } = msg;

    if (body === "!search") {
      await this.client.sendMessage(from, this._message.setTextWithBr([
        "👉 Escriba ⮕ !search :busqueda",
        "👽 Ejemplo: ⮕ !search spiderman"]));
    }

    if (body.includes("!search")) {
      let search = body.replace("!search", "").trim();
      if (search !== "") {
        await this.client.sendMessage(from, `💬 Estas buscando '${search}'💬`);
        await this.client.sendMessage(from, `💬 Cargando resultados.... '${search}'💬`);
        let results = await this._google.searchDefinition(search);
        await this.sendResultsGoogle(from, search, results);
      } else {
        await this.client.sendMessage(from, `No haz buscado nada bro, intentelo de nuevo 😒😒`);
      }
    }
  }

  async searchGoogleImages(msg: Message) {
    const { from, body } = msg;

    if (body === "!imagesSearch") {
      await this.client.sendMessage(from, this._message.setTextWithBr([
        "👉 Escriba ⮕ !imagesSearch :busqueda",
        "👽 Ejemplo: ⮕ !imagesSearch spiderman"]));
    }

    if (body.includes("!imagesSearch")) {
      let search = body.replace("!imagesSearch", "").trim();

      if (search !== "") {
        await this.client.sendMessage(from, `💬 Estas buscando '${search}'💬`);
        await this.client.sendMessage(from, `💬 Cargando resultados.... '${search}'💬`);
        let results = await this._google.searchImages(search);
        console.log(results);

        await this.sendImagesGoogle(from, search, results);
      } else {
        await this.client.sendMessage(from, `No haz buscado nada bro, intentelo de nuevo 😒😒`);
      }
    }
  }
  async searchGoogleFull(msg: Message) {
    const { from, body } = msg;

    if (body === "!fullSearch") {
      await this.client.sendMessage(from, this._message.setTextWithBr([
        "👉 Escriba ⮕ !fullSearch :busqueda",
        "👽 Ejemplo: ⮕ !fullSearch spiderman"]));
    }

    if (body.includes("!fullSearch")) {
      let search = body.replace("!fullSearch", "").trim();

      if (search !== "") {
        await this.client.sendMessage(from, `💬 Estas buscando '${search}'💬`);
        await this.client.sendMessage(from, `💬 Cargando resultados.... '${search}'💬`);
        let results = await this._google.searchDefinition(search, true);
        console.log(results);

        await this.sendResultsGoogle(from, search, results);
      } else {
        await this.client.sendMessage(from, `No haz buscado nada bro, intentelo de nuevo 😒😒`);
      }
    }
  }


  async sendResultsGoogle(from: string, search: string, results: ResultGoogle) {
    if (results.definitions.length) {
      results.definitions.forEach(async (definition, index) => {
        await this.client.sendMessage(from, `${index + 1}- ${definition}`);
      });
      await this.client.sendMessage(from, `💬 Imagenes de '${search}'💬`);
      await this.client.sendMessage(from, `💬 Cargando imagenes ....💬`);


    } else {
      await this.client.sendMessage(from, `No hay resultados definiciones con '${search}', intentelo con otra palabra 😒😒`);
    }

    if (results.images.length > 0) {
      results.images.forEach(async (img) => {
        await this._wsService.sendMediaUrl(from, img);
      });
    } else {
      await this.client.sendMessage(from, `No hay imagenes con '${search}' 😒😒`);
    }

  }

  async sendImagesGoogle(from: string, search: string, results: string[]) {

    if (results.length > 0) {
      results.forEach(async (img) => {
        await this._wsService.sendMediaUrl(from, img);
      });
    } else {
      await this.client.sendMessage(from, `No hay imagenes con '${search}' 😒😒`);
    }

  }
}
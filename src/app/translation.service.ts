import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: any = {};  // Aquí almacenamos las traducciones cargadas
  private currentLanguage: string = 'es';  // Idioma por defecto

  constructor() { }

  // Método para cargar las traducciones para un idioma
  loadTranslations(language: string) {
    this.currentLanguage = language;
    
    // Dependiendo del idioma, cargamos el archivo JSON correspondiente
    if (language === 'es') {
      this.translations = require('../assets/i18n/es.json');
    } else if (language === 'en') {
      this.translations = require('../assets/i18n/en.json');
    } else {
      console.warn(`Idioma no soportado: ${language}`);
    }
  }

  // Método para cambiar el idioma
  changeLanguage(language: string) {
    this.loadTranslations(language);
  }

  // Método para obtener la traducción de una clave
  getTranslation(key: string): string {
    return this.translations[key] || key;  // Si no hay traducción, retorna la clave
  }
}

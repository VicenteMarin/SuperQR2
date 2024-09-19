import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslationService } from '../translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  // 'styleUrls' en lugar de 'styleUrl'
})
export class HomeComponent implements OnInit, OnDestroy {
  welcome: string = '';
  instructions: string = '';
  languageSubscription!: Subscription;

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.loadTranslations(); // Cargar traducciones inicialmente
    
    // Escuchar cambios de idioma y actualizar traducciones
    this.languageSubscription = this.translationService.onLanguageChange().subscribe(() => {
      this.loadTranslations();
    });
  }

  // Método para cargar traducciones
  loadTranslations() {
    this.welcome = this.translationService.getTranslation('¡Bienvenido a restaurant La prueba!');
    this.instructions = this.translationService.getTranslation('Empieza aquí tu pedido');
  }

  ngOnDestroy() {
    // Asegurarse de cancelar la suscripción cuando el componente se destruya
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}




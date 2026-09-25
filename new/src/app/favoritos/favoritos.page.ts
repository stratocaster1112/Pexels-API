import { Component, inject } from '@angular/core';
import { FavoritosService } from '../services/favoritos';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: false,
})
export class FavoritosPage {

  private favoritosService = inject(FavoritosService);

  fotoSelecionada: any = null;

  get favoritos() {
    return this.favoritosService.favoritos;
  }

  abrirFoto(foto: any) {
    this.fotoSelecionada = foto;
  }

  fecharFoto() {
    this.fotoSelecionada = null;
  }

  desfavoritar(foto: any) {

    this.favoritosService.favoritos =
      this.favoritosService.favoritos.filter(
        item => item.id !== foto.id
      );

    this.fotoSelecionada = null;
  }

}
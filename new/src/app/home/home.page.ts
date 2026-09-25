import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { PexelsService } from '../services/pexels';
import { FavoritosService } from '../services/favoritos';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage {

  private pexels = inject(PexelsService);
  private cdr = inject(ChangeDetectorRef);

  busca = '';
  fotos: any[] = [];
  fotoSelecionada: any = null;

  private favoritosService = inject(FavoritosService);

  favoritar(foto: any) {

    const existe = this.favoritosService.favoritos.some(
      item => item.id === foto.id
    );

    if (existe) {

      this.favoritosService.favoritos =
        this.favoritosService.favoritos.filter(
          item => item.id !== foto.id
        );

    } else {

      this.favoritosService.favoritos = [
        ...this.favoritosService.favoritos,
        foto
      ];

    }

    this.cdr.markForCheck();
  }

  pesquisar() {

    const termo = this.busca.trim();

    console.log('PESQUISANDO:', termo);

    if (!termo) {
      return;
    }

    this.pexels.buscarFotos(termo).subscribe({

      next: (resultado) => {

        console.log('RESULTADO:', resultado);

        this.fotos = resultado.photos;

        this.cdr.markForCheck();

      },

      error: (erro) => {
        console.error('ERRO:', erro);
      }

    });
  }

  abrirFoto(foto: any) {

    this.fotoSelecionada = foto;

    this.cdr.markForCheck();

  }

  fecharFoto() {

    this.fotoSelecionada = null;

    this.cdr.markForCheck();

  }

}

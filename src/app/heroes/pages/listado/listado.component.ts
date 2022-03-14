import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
    `
      mat-card{
        margin-top: 20px;
      }
    `
  ],
})
export class ListadoComponent implements OnInit {
  constructor(private heroesServices: HeroesService) {}

  heroes: Heroe[] = [];

  ngOnInit(): void {
    this.heroesServices.getHeores()
    .subscribe((heroes) => {
      this.heroes = heroes;
    });
  }
}

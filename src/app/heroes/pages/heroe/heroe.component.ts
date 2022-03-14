import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 10px;
      }
    `,
  ],
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;

  constructor(
    private readonly activeRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(
        switchMap((params) => {
          const heroe = this.heroesService.getHeroePorId(params['id']);
          return heroe;
        })
      )
      .subscribe({
        next: (heroe) => {
          this.heroe = heroe;
        },
        error: (err) => {
          console.error(err);
        },
      });
    // getHeroePorId of my services
    // this.heroesService.getHeroePorId(id).subscribe((heroe) => {
    //   this.heroe = heroe;
    // });
  }
  regresar() {
    this.router.navigate(['/heroes/listado']);
  }
}

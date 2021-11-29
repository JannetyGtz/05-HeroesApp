import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.verificaAutentacion()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigate(['./auth/login']);
          }
        })
      );

    // if (this.authService.auth.id) {
    //   return true;
    // }

    console.log('Bloqueado por AuthLoad - CanACtivate')

    // return false;
  }


  //El canLoad evita que se acceda a cierto módulo, pero si este ya ha sido cargado, no lo evita, para eso
  //se usa el canActive. 
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.verificaAutentacion()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigate(['./auth/login']);
          }
        })
      );
    // if (this.authService.auth.id) {
    //   return true;
    // }
    console.log('Bloqueado por AutLoad - CanLoad')
    // return false;
  }
}

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
@Injectable({ providedIn: 'root' })
export class Authguard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let token = localStorage.getItem('token')
        if (token) {
            return true
        } else {
            this.router.navigate(['/logIn'])
            return false
        }
    }
}
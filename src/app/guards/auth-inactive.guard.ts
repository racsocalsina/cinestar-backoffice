import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
    providedIn: 'root',
})
export class AuthInactiveGuard implements CanActivateChild {
    constructor(private authService: AuthService, private router: Router) { }
    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.isLogged()) {
            this.router.navigate(['/users']);
            return false;
        }
        return true;
    }
}


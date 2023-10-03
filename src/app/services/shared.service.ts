import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthService } from './auth.service';
import { Roles } from '@tools/enums';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    constructor(public http: HttpClient, private authService: AuthService) {}

    getParams() {
        return this.http.get(`${environment.apiUrl}/users/parameters`);
    }

    checkPermission(permissionName: string) {
        let ret = false;
        const user = this.authService.getUser();

        if (user == null) return ret;

        const moduleName = permissionName.split('-').pop();
        const modules = user.modules;
        const module = modules.find((i) => i.name === moduleName);
        const permission = module.permissions.find(
            (i) => i.name == permissionName
        );

        if (permission) {
            ret = permission.allow;
        }

        return ret;
    }

    currentUserIsSuperAdmin() {
        let user = this.authService.getUser();
        return user.role == Roles.SUPER_ADMIN;
    }
}

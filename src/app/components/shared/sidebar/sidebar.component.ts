import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SharedService } from '@services/shared.service';

declare var $: any;

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    selectedMenu: any;
    currentUserIsSuperAdmin: Boolean = false;

    constructor(private router: Router, public sharedService: SharedService) {}

    ngOnInit(): void {
        $('.scroll-sidebar').perfectScrollbar();

        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                this.activeMenu(this.router.url || '');
            }
        });

        this.currentUserIsSuperAdmin = this.sharedService.currentUserIsSuperAdmin();
        this.activeMenu(this.router.url || '');
    }

    activeMenu(url: string): void {
        if (
            url.includes('channels') ||
            url.includes('chains') ||
            url.includes('flags')
        ) {
            this.addClass('channels');
        } else if (url.includes('categories') || url.includes('attributes')) {
            this.addClass('categories');
        } else if (
            url.includes('users') ||
            url.includes('clients') ||
            url.includes('profiles')
        ) {
            this.addClass('users');
        } else if (url.includes('cities') || url.includes('zones')) {
            this.addClass('cities');
        } else if (url.includes('skus')) {
            this.addClass('skus');
        } else if (url.includes('promotions')) {
            this.addClass('promotions');
        } else if (url.includes('awards')) {
            this.addClass('awards');
        } else if (url.includes('reports')) {
            this.addClass('reports');
        } else if (url.includes('settings')) {
            this.addClass('settings');
        } else if (url.includes('logs')) {
            this.addClass('logs');
        } else if (url.includes('content-managements')) {
            this.addClass('content-managements');
        } else if (url.includes('banners')) {
            this.addClass('banners');
        } else if (this.selectedMenu) {
            this.selectedMenu.classList.remove('active');
            this.selectedMenu.childNodes[1].classList.remove('in');
        }
    }

    addClass(id: string): void {
        if (this.selectedMenu) {
            this.selectedMenu.classList.remove('active');
            this.selectedMenu.childNodes[1].classList.remove('in');
        }

        this.selectedMenu = document.getElementById(id);
        if (this.selectedMenu) {
            this.selectedMenu.classList.add('active');
            this.selectedMenu.childNodes[1].classList.add('in');
        }
    }
}

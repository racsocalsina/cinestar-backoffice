import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import Swal from 'sweetalert2'
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  @HostListener('window:resize', [])
  setMiniSidebar(): void {
    const width = (window.innerWidth > 0) ? window.innerWidth : window.screen.width;
    const topOffset = 0;
    if (width < 1170) {
      $('body').addClass('mini-sidebar');
      $('.navbar-brand .main-logo').hide();
      $('.navbar-brand .icon-logo').show();
      $('.sidebartoggler i').addClass('ti-menu');
    } else {
      $('body').removeClass('mini-sidebar');
      $('.navbar-brand .main-logo').show();
      $('.navbar-brand .icon-logo').hide();
    }

    let height = ((window.innerHeight > 0) ? window.innerHeight : window.screen.height) - 1;
    height = height - topOffset;
    if (height < 1) { height = 1; }
    if (height > topOffset) {
      $('.page-wrapper').css('min-height', (height) + 'px');
    }
  }

  sidebarToggler(): void {
    const body = $('body');
    if (body.hasClass('mini-sidebar')) {
      body.trigger('resize');
      body.removeClass('mini-sidebar');
      $('.navbar-brand .main-logo').show();
      $('.navbar-brand .icon-logo').hide();
    } else {
      body.trigger('resize');
      body.addClass('mini-sidebar');
      $('.navbar-brand .main-logo').hide();
      $('.navbar-brand .icon-logo').show();
    }
  }

  navToggler(): void {
    const nav = $('.nav-toggler i');
    $('body').toggleClass('show-sidebar');
    nav.toggleClass('ti-menu');
    nav.addClass('ti-close');
  }

  onClickLogout() {
    Swal.fire({
      title: 'Advertencia',
      text: '¿Estás seguro de cerrar sesión?',
      icon: 'warning',
      confirmButtonText: 'OK',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.authService.deleteUser();
          this.router.navigate(['/login']);
        }
      });
  }
}

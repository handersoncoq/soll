import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StyleManagerService } from '../services/style-manager/style-manager.service';

@Injectable({
  providedIn: 'root'
})
export class PostLoginGuard implements CanActivate {

  constructor(private styleManager: StyleManagerService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.applyPostLoginThemes();
    return true;
  }

  private applyPostLoginThemes(): void {
    this.styleManager.setDashboardTheme(true);
    
    const preferredTheme = localStorage.getItem('theme');
    if (preferredTheme === 'Dark Mode') {
      document.body.classList.add('dark-mode');
      this.styleManager.setTheme(true);
    } else {
      document.body.classList.remove('dark-mode');
      this.styleManager.setTheme(false);
    }
  }
}

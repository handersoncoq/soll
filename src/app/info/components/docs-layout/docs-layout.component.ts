import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ScreenLayoutService } from 'src/app/utils/screen-layout/screen-layout.service';
import { DocsStoreService } from '../../services/docs-store.service';
import { filter, Observable } from 'rxjs';

@Component({
  selector: 'app-docs-layout',
  templateUrl: './docs-layout.component.html',
  styleUrl: './docs-layout.component.scss',
})
export class DocsLayoutComponent {
  menuOpen = false;
  currentTitle: string | null = null;
  currentCategory: string | null = null;

  isMobile$: Observable<boolean>;

  constructor(
    private screenLayoutService: ScreenLayoutService,
    private router: Router,
    private docsStore: DocsStoreService
  ) {
    this.isMobile$ = this.screenLayoutService.isMobile$;
  }

  ngOnInit() {
    // Update title/category whenever the route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const slug = this.router.url.split('/').pop();
        if (!slug) return;

        const docs = this.docsStore.getDocsSnapshot();
        const doc = docs.find((d) => d.slug === slug);

        if (doc) {
          this.currentTitle = doc.title.rendered;
          const catId = doc.categories?.[0];
          const cat = this.docsStore
            .getCategoriesSnapshot()
            .find((c) => c.id === catId);
          this.currentCategory = cat ? cat.name : null;
        }
      });
  }

  htmlDecode(text: string): string {
    return (
      new DOMParser().parseFromString(text, 'text/html').documentElement
        .textContent || text
    );
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}

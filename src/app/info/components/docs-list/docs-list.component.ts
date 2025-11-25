import { Component, OnInit } from '@angular/core';
import { DocsService } from '../../services/docs.service';
import { SollDoc } from 'src/app/interaces/SollDoc';
import { DocsCategory } from 'src/app/interaces/DocsCategory';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docs-list',
  templateUrl: './docs-list.component.html',
  styleUrls: ['./docs-list.component.scss'],
})
export class DocsListComponent implements OnInit {
  categories: DocsCategory[] = [];
  docs: SollDoc[] = [];

  // Final grouped structure for the sidebar
  groupedDocs: { category: DocsCategory; docs: SollDoc[] }[] = [];

  constructor(private docsService: DocsService, private router: Router) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  private loadAllData() {
    this.docsService.getAllCategories().subscribe((categories) => {
      this.categories = categories;

      this.docsService.getAllDocs().subscribe((docs) => {
        this.docs = docs;
        this.groupDocsByCategory();

        const defaultDoc = this.docs.find((d) => d.slug === 'what-is-soll');

        if (defaultDoc) {
          this.router.navigate(['/info', defaultDoc.slug]);
        }
      });
    });
  }

  private groupDocsByCategory() {
    this.groupedDocs = [];

    this.categories.forEach((cat) => {
      const docsInCat = this.docs.filter((d) => d.categories?.includes(cat.id));

      if (docsInCat.length > 0) {
        this.groupedDocs.push({
          category: cat,
          docs: docsInCat,
        });
      }
    });

    this.groupedDocs.sort((a, b) => {
      if (a.category.slug === 'getting-started') return -1;
      if (b.category.slug === 'getting-started') return 1;
      return a.category.name.localeCompare(b.category.name);
    });
  }
}

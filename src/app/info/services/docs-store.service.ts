import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SollDoc } from 'src/app/interaces/SollDoc';
import { DocsCategory } from 'src/app/interaces/DocsCategory';

@Injectable({
  providedIn: 'root',
})
export class DocsStoreService {
  private docsSubject = new BehaviorSubject<SollDoc[]>([]);
  private categoriesSubject = new BehaviorSubject<DocsCategory[]>([]);

  docs$ = this.docsSubject.asObservable();
  categories$ = this.categoriesSubject.asObservable();

  setDocs(docs: SollDoc[]) {
    this.docsSubject.next(docs);
  }

  setCategories(categories: DocsCategory[]) {
    this.categoriesSubject.next(categories);
  }

  getDocsSnapshot(): SollDoc[] {
    return this.docsSubject.value;
  }

  getCategoriesSnapshot(): DocsCategory[] {
    return this.categoriesSubject.value;
  }

  getDocBySlug(slug: string): SollDoc | undefined {
    return this.docsSubject.value.find((d) => d.slug === slug);
  }

  getDocsByCategory(categoryId: number): SollDoc[] {
    return this.docsSubject.value.filter((d) =>
      d.categories?.includes(categoryId)
    );
  }

  getCategoryBySlug(slug: string): DocsCategory | undefined {
    return this.categoriesSubject.value.find((c) => c.slug === slug);
  }

  getCategoryById(id: number): DocsCategory | undefined {
    return this.categoriesSubject.value.find((c) => c.id === id);
  }
}

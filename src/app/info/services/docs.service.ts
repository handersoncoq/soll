import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { baseUrls } from 'src/app/utils/constants/Urls';
import { catchError, map, tap } from 'rxjs/operators';
import { SollDoc } from 'src/app/interaces/SollDoc';
import { DocsCategory } from 'src/app/interaces/DocsCategory';
import { DocsStoreService } from './docs-store.service';

@Injectable({
  providedIn: 'root',
})
export class DocsService {
  private baseUrl = `${baseUrls.sollDocs}/wp-json/wp/v2/docs`;
  private categoriesUrl = `${baseUrls.sollDocs}/wp-json/wp/v2/categories?per_page=100`;

  constructor(private http: HttpClient, private docsStore: DocsStoreService) {}

  // Fetch all docs
  getAllDocs(): Observable<SollDoc[]> {
    const cachedDocs = this.docsStore.getDocsSnapshot();
    if (cachedDocs.length > 0) {
      return of(cachedDocs);
    }
    return this.http
      .get<SollDoc[]>(
        `${this.baseUrl}?orderby=menu_order&order=asc&per_page=100`
      )
      .pipe(
        tap((docs) => this.docsStore.setDocs(docs)),
        catchError((err) => {
          console.error('Error fetching all docs:', err);
          return of([]);
        })
      );
  }

  getAllCategories(): Observable<DocsCategory[]> {
    const cachedCats = this.docsStore.getCategoriesSnapshot();
    if (cachedCats.length > 0) {
      return of(cachedCats);
    }
    return this.http.get<DocsCategory[]>(this.categoriesUrl).pipe(
      tap((cats) => this.docsStore.setCategories(cats)),
      catchError((err) => {
        console.error('Error fetching categories:', err);
        return of([]);
      })
    );
  }

  getDocBySlug(slug: string): Observable<SollDoc | null> {
    // 1. Try cache first
    const cached = this.docsStore
      .getDocsSnapshot()
      .find((d) => d.slug === slug);
    if (cached) return of(cached);

    // 2. Fetch from API
    return this.http.get<SollDoc[]>(`${this.baseUrl}?slug=${slug}`).pipe(
      map((docs) => {
        if (docs.length > 0) {
          const doc = docs[0];

          const existing = this.docsStore.getDocsSnapshot();
          this.docsStore.setDocs([...existing, doc]);

          return doc; // return a single SollDoc
        }
        return null;
      }),
      catchError((err) => {
        console.error(`Error fetching doc "${slug}":`, err);
        return of(null);
      })
    );
  }

  // Fetch docs by category (also updates store)
  getDocsByCategory(categoryId: number): Observable<SollDoc[]> {
    const cachedDocs = this.docsStore
      .getDocsSnapshot()
      .filter((doc) => doc.categories && doc.categories.includes(categoryId));
    if (cachedDocs.length > 0) {
      return of(cachedDocs);
    }
    return this.http
      .get<SollDoc[]>(
        `${this.baseUrl}?categories=${categoryId}&per_page=100&orderby=menu_order&order=asc`
      )
      .pipe(
        tap((docs) => {
          const existing = this.docsStore.getDocsSnapshot();
          const merged = [...existing];

          docs.forEach((doc) => {
            if (!merged.some((m) => m.id === doc.id)) {
              merged.push(doc);
            }
          });

          this.docsStore.setDocs(merged);
        }),
        catchError((err) => {
          console.error(`Error fetching docs for category ${categoryId}:`, err);
          return of([]);
        })
      );
  }
}

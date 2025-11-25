import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrls } from 'src/app/utils/constants/Urls';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SollDoc } from 'src/app/interaces/SollDoc';
import { DocsCategory } from 'src/app/interaces/DocsCategory';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DocsService {
  private baseUrl = `${baseUrls.sollDocs}/wp-json/wp/v2/docs`;
  private categoriesUrl = `${baseUrls.sollDocs}/wp-json/wp/v2/categories?per_page=100`;

  constructor(private http: HttpClient) {}

  // Fetch all docs
  getAllDocs(): Observable<SollDoc[]> {
    return this.http
      .get<SollDoc[]>(
        `${this.baseUrl}?orderby=menu_order&order=asc&per_page=100`
      )
      .pipe(
        tap((response) => {
          if (Array.isArray(response)) {
            response.forEach((doc, i) => {
              console.log(
                `%cDoc ${i}: id=${doc.id}, slug=${doc.slug}, categories=`,
                'color: orange',
                doc.categories
              );
            });
          }
        }),

        catchError((err) => {
          console.error('Error fetching all docs:', err);
          return of([]);
        })
      );
  }

  // Fetch a single doc by slug (WordPress returns an array)
  getDocBySlug(slug: string): Observable<SollDoc[]> {
    return this.http.get<SollDoc[]>(`${this.baseUrl}?slug=${slug}`).pipe(
      catchError((err) => {
        console.error(`Error fetching doc with slug "${slug}":`, err);
        return of([]);
      })
    );
  }

  getAllCategories(): Observable<DocsCategory[]> {
    return this.http.get<DocsCategory[]>(this.categoriesUrl).pipe(
      catchError((err) => {
        console.error('Error fetching categories:', err);
        return of([]);
      })
    );
  }

  getDocsByCategory(categoryId: number): Observable<SollDoc[]> {
    return this.http
      .get<SollDoc[]>(
        `${this.baseUrl}?categories=${categoryId}&per_page=100&orderby=menu_order&order=asc`
      )
      .pipe(
        catchError((err) => {
          console.error(`Error fetching docs for category ${categoryId}:`, err);
          return of([]);
        })
      );
  }
}

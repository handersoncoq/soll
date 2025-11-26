import { Injectable } from '@angular/core';
import { firstValueFrom, forkJoin } from 'rxjs';
import { DocsService } from './docs.service';
import { DocsStoreService } from './docs-store.service';

@Injectable({ providedIn: 'root' })
export class DocsPreloadService {
  constructor(
    private docsService: DocsService,
    private docsStore: DocsStoreService
  ) {}

  async preloadAll(): Promise<void> {
    const { docs, categories } = await firstValueFrom(
      forkJoin({
        docs: this.docsService.getAllDocs(),
        categories: this.docsService.getAllCategories(),
      })
    );

    this.docsStore.setDocs(docs);
    this.docsStore.setCategories(categories);
  }
}

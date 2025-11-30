import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DocsService } from '../../services/docs.service';
import { SollDoc } from 'src/app/interaces/SollDoc';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.scss'],
})
export class DocViewerComponent implements OnInit {
  doc: SollDoc | null = null;
  safeContent: SafeHtml | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private docsService: DocsService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');

      this.isLoading = true;

      if (!slug) {
        this.doc = null;
        this.safeContent = null;
        this.isLoading = false;
        return;
      }

      this.docsService.getDocBySlug(slug).subscribe((doc) => {
        this.doc = doc;

        if (!doc) {
          this.router.navigate(['/info/what-is-soll']);
          return;
        }

        this.safeContent = this.sanitizer.bypassSecurityTrustHtml(
          doc.content.rendered
        );

        this.isLoading = false;
      });
    });
  }
}

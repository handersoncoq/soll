import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private docsService: DocsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.docsService.getDocBySlug(slug).subscribe((result) => {
          this.doc = result[0] || null;
          if (this.doc) {
            this.safeContent = this.sanitizer.bypassSecurityTrustHtml(
              this.doc.content.rendered
            );
          }
        });
      }
    });
  }
}

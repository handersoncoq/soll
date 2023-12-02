import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements AfterViewInit{
  
  @Input() lazyVideoSrc!: string;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  videoSrc: string;
  observer!: IntersectionObserver;

  constructor() {
    this.videoSrc = '';
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.videoSrc = this.lazyVideoSrc;
            this.observer.disconnect();
          }
        });
      });

      if(this.videoPlayer) {
        console.log('video: ', this.videoPlayer)
        this.observer.observe(this.videoPlayer.nativeElement);
      }
    });
  }

}

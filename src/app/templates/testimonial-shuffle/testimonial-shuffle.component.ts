import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Testimonial } from 'src/app/interaces/Testimonial';
import { ScreenLayoutService } from 'src/app/utils/screen-layout/screen-layout.service';

@Component({
  selector: 'app-testimonial-shuffle',
  templateUrl: './testimonial-shuffle.component.html',
  styleUrls: ['./testimonial-shuffle.component.scss'],
})
export class TestimonialShuffleComponent implements OnInit, OnDestroy {
  @Input() testimonials: Testimonial[] = [];

  isMobile = false;
  layoutSub!: Subscription;
  sequenceTimer: any;

  deck: Testimonial[] = [];
  visibleDeck: { item: Testimonial; state: string; order: number }[] = [];
  showEmptyMessage = false;

  isAnimating = false;
  phase: 'enter' | 'idle' | 'exit' = 'enter';
  cardInterval = 5000;
  idleDuration = 4000;
  currentEnterIndex = 0;
  currentExitIndex = 0;

  constructor(private screenLayout: ScreenLayoutService) {}

  ngOnInit(): void {
    this.layoutSub = this.screenLayout.isMobile$.subscribe((m) => {
      this.isMobile = m;
    });

    this.deck = [...this.testimonials];
    this.startSequence();
  }

  startSequence() {
    this.phase = 'enter';
    this.currentEnterIndex = 0;
    this.visibleDeck = [];
    this.runEnterPhase();
  }

  runEnterPhase() {
    if (this.currentEnterIndex >= this.deck.length) {
      this.phase = 'idle';
      setTimeout(() => this.startExitPhase(), this.idleDuration);
      return;
    }

    const item = this.deck[this.currentEnterIndex];
    this.showEmptyMessage = false;

    this.visibleDeck.unshift({
      item,
      state: 'enter',
      order: this.currentEnterIndex,
    });

    this.currentEnterIndex++;

    setTimeout(() => this.runEnterPhase(), this.cardInterval);
  }

  startExitPhase() {
    this.phase = 'exit';
    this.currentExitIndex = 0;
    this.runExitPhase();
  }

  runExitPhase() {
    if (this.currentExitIndex >= this.deck.length) {
      this.startSequence();
      return;
    }

    if (this.visibleDeck.length > 0) {
      this.visibleDeck[0].state = 'exit';

      setTimeout(() => {
        this.visibleDeck.shift();
        if (this.visibleDeck.length === 0) {
          this.showEmptyMessage = true;
        }
      }, this.cardInterval - 100);
    }

    this.currentExitIndex++;

    setTimeout(() => this.runExitPhase(), this.cardInterval);
  }

  ngOnDestroy(): void {
    this.layoutSub?.unsubscribe();
    clearTimeout(this.sequenceTimer);
  }
}

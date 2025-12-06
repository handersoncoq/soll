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
  isEmpty: boolean = true;

  isAnimating = false;
  phase: 'enter' | 'idle' | 'exit' = 'enter';
  cardInterval = 3000;
  idleDuration = 3000;
  currentEnterIndex = 0;
  currentExitIndex = 0;

  paused = false;
  activeCardIndex: number | null = null;

  constructor(private screenLayout: ScreenLayoutService) {}

  ngOnInit(): void {
    this.layoutSub = this.screenLayout.isMobile$.subscribe((m) => {
      this.isMobile = m;
    });

    this.deck = [...this.testimonials];
    this.startSequence();
  }

  startSequence() {
    if (this.paused) return;
    this.phase = 'enter';
    this.currentEnterIndex = 0;
    this.visibleDeck = [];
    this.runEnterPhase();
  }

  runEnterPhase() {
    if (this.paused) return;
    if (this.currentEnterIndex >= this.deck.length) {
      this.phase = 'idle';
      setTimeout(() => this.startExitPhase(), this.idleDuration);
      return;
    }

    const item = this.deck[this.currentEnterIndex];
    this.isEmpty = false;

    this.visibleDeck.unshift({
      item,
      state: 'enter',
      order: this.currentEnterIndex,
    });

    this.currentEnterIndex++;

    setTimeout(() => this.runEnterPhase(), this.cardInterval);
  }

  startExitPhase() {
    if (this.paused) return;
    this.phase = 'exit';
    this.currentExitIndex = 0;
    this.runExitPhase();
  }

  runExitPhase() {
    if (this.paused) return;
    if (this.currentExitIndex >= this.deck.length) {
      this.startSequence();
      return;
    }

    if (this.visibleDeck.length > 0) {
      this.visibleDeck[0].state = 'exit';

      setTimeout(() => {
        this.visibleDeck.shift();
        if (this.visibleDeck.length === 0) {
          this.isEmpty = true;
        }
      }, this.cardInterval - 3000);
    }

    this.currentExitIndex++;

    setTimeout(() => this.runExitPhase(), this.cardInterval);
  }

  pauseAnimation(cardIndex: number) {
    this.paused = true;
    this.activeCardIndex = cardIndex;
  }

  resumeAnimation() {
    this.paused = false;
    this.activeCardIndex = null;
    this.startSequence();
  }

  ngOnDestroy(): void {
    this.layoutSub?.unsubscribe();
    clearTimeout(this.sequenceTimer);
  }
}

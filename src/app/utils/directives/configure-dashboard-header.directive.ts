import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appConfigureDashboardHeader]',
})
export class ConfigureDashboardHeaderDirective {

  @Input() nextPayoutDate!: Date;
  @Input() fillColor: string = '#20a7db';
  @Input() nonFillColor: string = '#f5f5f5';
  @Input() reputationScore: number = 0;
  @Output() daysUntilPayoutChange = new EventEmitter<number>();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.calculateNextPayout();
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCircleFill();
        } else {
          this.resetCircleFill();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.el.nativeElement);
  }

  animateCircleFill(): void {
    const fillPercentage = this.reputationScore;
    let currentFill = 0;
    const increment = 0.5;
    const intervalTime = 10;

    const fillInterval = setInterval(() => {
      if (currentFill < fillPercentage) {
        currentFill += increment;
        this.updateCircleFill(currentFill);
      } else {
        clearInterval(fillInterval);
      }
    }, intervalTime);
  }

  updateCircleFill(currentFill: number): void {
    const darkShade = this.calculateDarkerShade(this.fillColor, currentFill);
  
    this.renderer.setStyle(
      this.el.nativeElement,
      'background',
      `conic-gradient(${darkShade} ${currentFill}%, ${this.nonFillColor} ${currentFill}%)`
    );
  }
  
  calculateDarkerShade(baseColor: string, currentFill: number): string {
    // Convert hex color to RGB
    const r = parseInt(baseColor.substring(1, 3), 16);
    const g = parseInt(baseColor.substring(3, 5), 16);
    const b = parseInt(baseColor.substring(5, 7), 16);
  
    // Adjust brightness based on currentFill (0% - lighter, 100% - original color)
    const factor = 1 - ((100 - currentFill) / 100);
    const newR = Math.min(255, Math.round(r + (255 - r) * (1 - factor)));
    const newG = Math.min(255, Math.round(g + (255 - g) * (1 - factor)));
    const newB = Math.min(255, Math.round(b + (255 - b) * (1 - factor)));
  
    // Convert back to hex and return
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  } 
  

  calculateNextPayout(){
    if(!this.nextPayoutDate){
      this.daysUntilPayoutChange.emit(0);
      return;
    }
    const currentTime = new Date().getTime();
    const payoutTime = this.nextPayoutDate.getTime();

    const timeDiff = payoutTime - currentTime;
    const daysUntilPayout = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    this.daysUntilPayoutChange.emit(daysUntilPayout);
  }

  resetCircleFill(): void {
    this.renderer.setStyle(this.el.nativeElement, 'background', 'transparent');
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-circle',
  templateUrl: './status-circle.component.html',
  styleUrl: './status-circle.component.scss'
})
export class StatusCircleComponent implements OnInit {
  @Input() statuses!: number;
  segments: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.createSegments();
  }

  createSegments(): void {
    this.segments = [];
    const totalDegrees = 360;
    const gapDegrees = 2; // Gap between segments
    const segmentDegrees = (totalDegrees - gapDegrees * this.statuses) / this.statuses;

    for (let i = 0; i < this.statuses; i++) {
      const startAngle = i * (segmentDegrees + gapDegrees);
      const endAngle = startAngle + segmentDegrees;
      this.segments.push({ startAngle, endAngle });
    }
  }

  // Add this method inside the StatusCircleComponent class

describeArc(x: any, y: any, radius: any, startAngle: any, endAngle: any): string {
  const start = this.polarToCartesian(x, y, radius, endAngle);
  const end = this.polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  const d = [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');

  return d;
}

polarToCartesian(centerX: any, centerY: any, radius: any, angleInDegrees: any): any {
  const angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}


}

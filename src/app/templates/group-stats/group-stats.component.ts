import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-group-stats',
  templateUrl: './group-stats.component.html',
  styleUrls: ['./group-stats.component.scss']
})
export class GroupStatsComponent implements OnInit, AfterViewInit{

  @ViewChild('barChart') barChart!: ElementRef;
  @Input() groupStats: any[] = [['Contribution Period', 'Late Members', 'Trend'],
  ['Jan', 0, 0],
  ['Feb', 0, 0],
  ['Mar', 0, 0], 
  ['Apr', 0, 0],
  ['May', 0, 0],
  ['June', 0, 0],
  ['July', 0, 0]];

  constructor() { }

  ngOnInit(): void {
    google.charts.load('current', {'packages':['corechart']});
  }

  ngAfterViewInit(): void {
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  drawChart() {
  var data = google.visualization.arrayToDataTable(this.groupStats);

  var options = {
    title: 'Timeliness of User Contributions',
    hAxis: { title: 'Contribution Period' },
    vAxis: { title: 'Late Members'},
    width: 370,
    seriesType: 'bars',
    series: {1: {type: 'line'}},
    legend: { position: 'none' },
    colors: ['#20a7db', 'darkred'],
  };

  if(this.barChart){
    const chart = new google.visualization.ComboChart(this.barChart.nativeElement);
    chart.draw(data, options);
  }
}


  // colors: ['#52688f', '#20a7db', '#35425b']


}

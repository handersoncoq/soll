import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-group-stats',
  templateUrl: './group-stats.component.html',
  styleUrls: ['./group-stats.component.scss']
})
export class GroupStatsComponent implements OnInit, AfterViewInit{

  @ViewChild('barChart') barChart!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    google.charts.load('current', {'packages':['corechart']});
  }

  ngAfterViewInit(): void {
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Contribution Period', 'Late Members', 'Trend'],
    ['Jan', 2, 2],
    ['Feb', 0, 0],
    ['Mar', 0, 0], 
    ['Apr', 3, 3],
    ['May', 3, 3],
    ['June', 1, 1],
    ['July', 0, 0],
  ]);

  var options = {
    title: 'Timeliness of User Contributions',
    hAxis: { title: 'Contribution Period' },
    vAxis: { title: 'Late Members'},
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

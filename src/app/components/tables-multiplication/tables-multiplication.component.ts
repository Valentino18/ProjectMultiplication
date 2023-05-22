import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tables-multiplication',
  templateUrl: './tables-multiplication.component.html',
  styleUrls: ['./tables-multiplication.component.css']
})
export class TablesMultiplicationComponent implements OnInit {
  @Input() nbChoose!: number;

  constructor() { }

  ngOnInit(): void {
  }

}

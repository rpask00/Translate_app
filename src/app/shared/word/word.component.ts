import { Component, OnInit, Input } from '@angular/core';
import { WordAPI } from 'src/app/models/word.model';

@Component({
  selector: 'word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
})
export class WordComponent implements OnInit {
  @Input('wordSupply') wordSupply: WordAPI;

  constructor() { }

  ngOnInit() {
   }

}

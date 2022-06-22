import { Component, OnInit, Output, EventEmitter, Input, AfterViewChecked, OnChanges } from '@angular/core';
import { WordAPI } from 'src/app/models/word.model';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'quiz-single-word',
  templateUrl: './quiz-single-word.component.html',
  styleUrls: ['./quiz-single-word.component.scss'],
})
export class QuizSingleWordComponent implements OnInit, OnChanges {

  @Output('placeGoodAnswerEmitter') placeGoodAnswerEmitter = new EventEmitter<boolean>();
  @Input('answer') answer: WordAPI;
  @Input('isThatEngWord') isThatEngWord: WordAPI;
  @Input('goodAnswerWasPlaced') goodAnswerWasPlaced: WordAPI;
  @Input('correctAnswer') correctAnswer: WordAPI;

  markedAsBad: boolean = null;
  dangerColor = 'danger'
  colorOfItem = isNullOrUndefined(this.markedAsBad) ? '' : (this.markedAsBad ? 'danger' : 'success');
  nullChecker = isNullOrUndefined

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.goodAnswerWasPlaced && this.goodAnswerWasPlaced) this.placeAnswerHandler()
  }

  placeAnswerHandler() {
    if (this.answer._id !== this.correctAnswer._id)
      this.markedAsBad = true;
    else {
      this.markedAsBad = false;
      this.placeGoodAnswerEmitter.emit(true)
    }

    this.colorOfItem = isNullOrUndefined(this.markedAsBad) ? '' : (this.markedAsBad ? 'danger' : 'success');

  }

}

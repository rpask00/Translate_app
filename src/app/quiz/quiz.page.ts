import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataBaseService } from '../services/data-base.service';
import { Word, WordAPI } from '../models/word.model';
import { Observable } from 'rxjs';
import { SegmentChangeEventDetail } from '@ionic/core';
import { take, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

  level: string = '';
  questions: Observable<WordAPI[]>
  pl: boolean;
  plFlag: string = 'https://media.istockphoto.com/photos/flag-of-the-republic-of-poland-picture-id516588509?k=6&m=516588509&s=612x612&w=0&h=Om2eV0wb5Ro4PzBKJ38lCXVbLPvRYEum7uQkkB7PIag=';
  engFlag: string = 'https://a.allegroimg.com/s512/014490/2e2cb6904859816462c379d9991a/OFICJALNA-FLAGA-USA-150x90';
  correctA: boolean;
  correctB: boolean;
  correctC: boolean;
  correctD: boolean;
  clear: boolean = true;
  correct: number = Math.floor(Math.random() * 4);
  stattrack = 0;

  constructor(
    private dbSrv: DataBaseService,
    private change:ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.pl = (Math.random() > 0.5);
    this.questions = this.dbSrv.getRandomWords(4, this.level)
  }
  segmentChange(event: CustomEvent<SegmentChangeEventDetail>) {
    this.level = event.detail.value
    this.questions = this.dbSrv.getRandomWords(4, this.level)
  }

  nextQuestion(lvl) {
    let corr: WordAPI;
    this.questions.pipe(
      take(1),
      switchMap(quests => {
        corr = quests[this.correct]
        return this.dbSrv.changeLevel(corr._id, lvl)
      })
    ).subscribe(res => {
      this.correctA = false;
      this.correctB = false;
      this.correctC = false;
      this.correctD = false;
      this.clear = true;
      this.questions = null;
      this.correct = Math.floor(Math.random() * 4);
      this.pl = (Math.random() > 0.5);
      this.questions = this.dbSrv.getRandomWords(4, this.level)
    })

  }

  placeAnswear(ans) {
    switch (this.correct) {
      case 0:
        this.correctA = true;
        break;
      case 1:
        this.correctB = true;
        break;
      case 2:
        this.correctC = true;
        break;
      case 3:
        this.correctD = true;
        break;
    }
    this.clear = false;
  }
}

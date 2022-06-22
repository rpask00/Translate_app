import {Component, OnInit, ChangeDetectorRef, Input, OnChanges} from '@angular/core';
import {DataBaseService} from '../services/data-base.service';
import {Word, WordAPI} from '../models/word.model';
import {Observable} from 'rxjs';
import {SegmentChangeEventDetail} from '@ionic/core';
import {take, switchMap, map} from 'rxjs/operators';

@Component({
    selector: 'app-quiz-interface',
    templateUrl: './quiz-interface.component.html',
    styleUrls: ['./quiz-interface.component.scss'],
})
export class QuizInterfaceComponent implements OnInit {

    @Input('lvl') lvl: 'easy' | 'hard' | 'medium';
    questions$: Observable<WordAPI[]>;
    questions: WordAPI[];
    answersCount: number = 6;
    correctAnswer: WordAPI;
    goodAnswerWasPlaced: boolean = false;
    isThatEngWord: boolean = Math.random() > 0.5;

    constructor(
        private dbSrv: DataBaseService,
    ) {
    }

    ngOnInit() {
        this.nextQuestion(this.lvl);

    }


    handleAnswerPlacing(ans: boolean) {
        this.goodAnswerWasPlaced = true;
    }

    nextQuestion(lvl) {
        this.questions$ = this.dbSrv.getRandomWords(this.answersCount, this.lvl).pipe(
            map(quests => {
                this.questions = quests;
                let indexOfCorrectAnswer = Math.floor(this.answersCount * Math.random());
                this.correctAnswer = this.questions[indexOfCorrectAnswer];

                this.goodAnswerWasPlaced = false;

                return quests;
            })
        );
    }

}

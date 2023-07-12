import {Component, Input, OnInit} from '@angular/core';
import {DataBaseService} from '../services/data-base.service';
import {WordAPI} from '../models/word.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
        if (this.correctAnswer) {
            this.dbSrv.changeLevel(this.correctAnswer._id, lvl).subscribe();
        }

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

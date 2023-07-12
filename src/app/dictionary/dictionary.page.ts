import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WordAPI} from '../models/word.model';
import {DataBaseService} from '../services/data-base.service';
import {Observable} from 'rxjs';
import {LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-dictionary',
    templateUrl: './dictionary.page.html',
    styleUrls: ['./dictionary.page.scss'],
})
export class DictionaryPage implements OnInit {

    @ViewChild('elementDisplay', {static: false}) elementDisplay: ElementRef<HTMLDivElement>;
    level: any = this.findPickedLevel();

    getWords: Observable<WordAPI[]>;
    isHidden = true;

    constructor(
        private dbSrv: DataBaseService,
        private loadingCtrl: LoadingController,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.loadingCtrl.create({
            message: 'loading'
        }).then(loadingEl => {
            loadingEl.present();

            setTimeout(() => {
                loadingEl.dismiss();
                this.elementDisplay.nativeElement.classList.add('visible');
            }, 1500);
        });
        // this.dbSrv.updateDictionary()
        this.getWords = this.dbSrv.getWords(this.level);
    }

    findPickedLevel() {
        return this.router.url.split('/').map(res => {
            if (res.includes('easy') || res.includes('hard') || res.includes('medium')) {
                return res;
            } else {
                return '';
            }
        }).join('');
    }

    move(level, slidingItem, word) {
        slidingItem.close();
        this.elementDisplay.nativeElement.classList.remove('visible');
        this.loadingCtrl.create({
            message: `moving to ${level}`
        }).then(loadEl => {
            loadEl.present();
            this.dbSrv.changeLevel(word._id, level).subscribe(res => {
                this.getWords = this.dbSrv.getWords(this.level);
                setTimeout(() => {
                    this.elementDisplay.nativeElement.classList.add('visible');
                    loadEl.dismiss();
                }, 1500);
            });
        });


    }


    remove(slidingItem, word) {
        slidingItem.close();
        this.dbSrv.removeWord(word._id);
    }

}

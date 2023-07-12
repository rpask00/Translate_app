import {Injectable} from '@angular/core';
import {Word, WordAPI} from '../models/word.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DataBaseService {
    readonly BASE_URL = 'http://localhost:3000/';

    constructor(
        private http: HttpClient,
    ) {
    }

    private _dictionary = new BehaviorSubject<Word[]>([]);

    getWords(level?: 'easy' | 'hard' | 'medium' | '') {
        return this.http.get(`${this.BASE_URL}words/${level ? level : ''}`) as Observable<WordAPI[]>;
    }

    getWord(key: string) {
        return this.http.get(`${this.BASE_URL}word/` + key);
    }

    changeLevel(_id: string, level: 'easy' | 'hard' | 'medium' | '') {
        return this.http.patch(`${this.BASE_URL}word/change-level`, {level, _id});
    }

    removeWord(_id: string) {
        return this.http.delete(`${this.BASE_URL}word/delete/` + _id);
    }

    getRandomWords(quantity: number, level: string) {
        if (level.length === 0) {
        }
        return this.http.get(`${this.BASE_URL}randomWords?q=${quantity}&level=${level}`) as Observable<WordAPI[]>;
    }


}

import {Component, Input, OnInit} from '@angular/core';
import {WordAPI} from 'src/app/models/word.model';
// import { DatabaseSnapshot, AngularFireAction } from '@angular/fire/database';
import {DataBaseService} from 'src/app/services/data-base.service';
import {IonItemSliding} from '@ionic/angular';

@Component({
  selector: 'word-options',
  templateUrl: './word-options.component.html',
  styleUrls: ['./word-options.component.scss'],
})
export class WordOptionsComponent implements OnInit {

  key: string;
  // @Input('wordSupply') wordSupply: AngularFireAction<DatabaseSnapshot<Word>>
  @Input('wordSupply') wordSupply: WordAPI;
  @Input('slidingItem') slidingItem: IonItemSliding
  constructor(
    private dbSrv: DataBaseService
  ) { }

  ngOnInit() {
    this.key = this.wordSupply._id;
  }

  move(level) {
    this.slidingItem.close()
  }


  remove() {
    this.slidingItem.close()
    this.dbSrv.removeWord(this.key)
  }

}

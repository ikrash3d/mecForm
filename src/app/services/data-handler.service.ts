import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { FormValueInterface } from '../interface/form-value-interface';

@Injectable({
  providedIn: 'root',
})
export class DataHandlerService {
  public formValue: FormValueInterface;

  constructor(private store: AngularFirestore) {
    this.formValue = {
      group: '',
      team: '',
      try: '',
      distance: NaN,
      oDep: NaN,
      pRt: NaN,
      oRec: NaN,
      S: '',
      tEs: NaN,
      x: '',
      z: '',
      y: '',
      mProt: NaN,
      mTran: NaN,
      e: '',
      tIns: NaN,
      penalty: '',
    };
  }

  public async addData(form: FormValueInterface): Promise<void> {
    await this.store.collection('data').add(form);
  }

  public getData(): Observable<MatTableDataSource<FormValueInterface[]>> {
    const snapshot = this.store
      .collection('data', (ref) => ref.orderBy('timeStamp', 'desc'))
      .valueChanges() as unknown as Observable<
      MatTableDataSource<FormValueInterface[]>
    >;

    return snapshot;
  }

  public async deleteData(rowId: string): Promise<void> {
    this.store
      .collection('data', (ref) => ref.where('id', '==', rowId))
      .get()
      .subscribe((data) => {
        const documentId = data.docs[0].id;
        this.store
          .collection('data')
          .doc(documentId)
          .delete()
          .catch((error) => {
            console.log(
              `An error with ${documentId} happened. Please try again`
            );
          });
      });
  }
}

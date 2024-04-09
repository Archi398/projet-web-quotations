import { Injectable, inject } from '@angular/core';
import { getFirestore, Firestore, collection, docData, query, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetRequestQuoteService {
  firestore: Firestore = inject(Firestore);

  constructor() {
    //this.firestore = getFirestore();
  }

  getRequestQuotes(): Observable<any[]> {
    const q = query(collection(this.firestore, 'requests-quotations'));
    return new Observable((observer) => {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        observer.next(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      });

      // the return function will be called when the observer unsubscribes
      return unsubscribe;
    });
  }
}
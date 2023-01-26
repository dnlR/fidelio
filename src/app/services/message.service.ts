import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
    private subject = new Subject<any>();

    sendTitleMsg(message: string) {
        this.subject.next({ title: message });
    }

    sendToolbarMsg(message: boolean) {
      this.subject.next({ toolbar: message});
    }

    // clearMessages() {
    //     this.subject.next();
    // }

    onMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
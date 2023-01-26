import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToolbarService {
    private subject = new Subject<any>();

    sendShowToolbar(message: boolean) {
        this.subject.next({ showToolbar: message });
    }

    // clearMessages() {
    //     this.subject.next();
    // }

    onMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
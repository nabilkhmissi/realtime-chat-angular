import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class loadingService {
    constructor() { }

    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();


    showLoading() {
        this.loadingSubject.next(true)
    }
    hideLoading() {
        this.loadingSubject.next(false)
    }

}
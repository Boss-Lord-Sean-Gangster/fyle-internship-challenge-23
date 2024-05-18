import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() searchEvent = new EventEmitter<string>();
  searchUsername: string = '';

  constructor() { }

  searchRepos(): void {
    if (this.searchUsername) {
      this.searchEvent.emit(this.searchUsername);
    }
  }
}

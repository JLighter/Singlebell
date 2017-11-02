import {Component, Input} from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {

  @Input() progress: number = 0;
  @Input() label: String = '0%';

  constructor() {
    this.progress = 0;
    this.label = this.progress + '%';
  }

}

import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NbThemeModule, NbLayoutModule, NbButtonModule } from '@nebular/theme';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NbLayoutModule, NbButtonModule, DragDropModule, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    NbThemeModule.forRoot({ name: 'default' }).providers!
  ]
})
export class AppComponent {
  items = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine','Seven', 'Eight', 'Nine','Seven', 'Eight', 'Nine'];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}

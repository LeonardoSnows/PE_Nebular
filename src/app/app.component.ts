(window as any).global = window;

import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NbButtonModule, NbLayoutModule, NbThemeModule } from '@nebular/theme';
import interact from 'interactjs';


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
  items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' }
  ];

  ngAfterViewInit() {
    interact('.draggable')
      .draggable({
        inertia: true,
        listeners: {
          move: (event) => {
            const target = event.target;
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // Atualiza a posição do elemento
            target.style.transform = `translate(${x}px, ${y}px)`;

            // Armazena a posição
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          },
          end: (event) => {
            const target = event.target;
            target.style.transform = 'none';
            target.removeAttribute('data-x');
            target.removeAttribute('data-y');
          }
        }
      });

    interact('.grid-item').dropzone({
      overlap: 0.5,
      ondrop: (event) => {
        const draggedElement = event.relatedTarget;
        const droppedElement = event.target;

        const draggedIndex = parseInt(draggedElement.getAttribute('data-index'), 10);
        const droppedIndex = parseInt(droppedElement.getAttribute('data-index'), 10);

        if (draggedIndex !== droppedIndex) {
          const draggedItem = this.items.find(item => item.id === draggedIndex);
          const droppedItem = this.items.find(item => item.id === droppedIndex);

          if (draggedItem && droppedItem) {
            const draggedPos = this.items.indexOf(draggedItem);
            const droppedPos = this.items.indexOf(droppedItem);

            // Troca os itens no array
            this.items[draggedPos] = droppedItem;
            this.items[droppedPos] = draggedItem;
          }
        }
      }
    });
  }
}

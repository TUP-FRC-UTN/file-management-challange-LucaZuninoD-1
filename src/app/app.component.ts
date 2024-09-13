import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileFolderListComponent } from './file-folder-list/file-folder-list.component';
import { NewItemFormComponent } from './new-item-form/new-item-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FileFolderListComponent, NewItemFormComponent],
  template: `
    <app-file-folder-list (newItemRequested)="showNewItemForm = true"></app-file-folder-list>
    <app-new-item-form *ngIf="showNewItemForm" (formClosed)="showNewItemForm = false"></app-new-item-form>
  `,
})
export class AppComponent {
  showNewItemForm = false;
}

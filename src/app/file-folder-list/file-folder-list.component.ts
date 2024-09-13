import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileFolderService } from '../services/file-folder.service';
import { FileFolder } from '../models/file-folder.model';
import { FormsModule } from '@angular/forms';
import { TooltipDirective } from '../directives/tooltip.directive';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-file-folder-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TooltipDirective, ConfirmDialogComponent],
  templateUrl: './file-folder-list.component.html',
  styleUrls: ['./file-folder-list.component.css']
})
export class FileFolderListComponent implements OnInit {
  items: FileFolder[] = [];
  selectedItems: string[] = [];
  showConfirmDialog = false;
  @Output() newItemRequested = new EventEmitter<void>();
  constructor(private fileFolderService: FileFolderService) {}

  ngOnInit(): void {
    this.fileFolderService.getItems().subscribe(items => {
      this.items = this.sortItems(items);
    });
  }

  sortItems(items: FileFolder[]): FileFolder[] {
    return [
      ...items.filter(item => item.type === 'folder').sort((a, b) => a.name.localeCompare(b.name)),
      ...items.filter(item => item.type === 'file').sort((a, b) => a.name.localeCompare(b.name))
    ];
  }

  toggleSelection(itemId: string): void {
    const index = this.selectedItems.indexOf(itemId);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(itemId);
    }
  }

  deleteSelected(): void {
    if (this.selectedItems.length === 1) {
      this.fileFolderService.deleteItems(this.selectedItems);
      this.selectedItems = [];
    } else if (this.selectedItems.length > 1) {
      this.showConfirmDialog = true;
    }
  }

  confirmDelete(): void {
    this.fileFolderService.deleteItems(this.selectedItems);
    this.selectedItems = [];
    this.showConfirmDialog = false;
  }

  cancelDelete(): void {
    this.showConfirmDialog = false;
  }

  truncateName(name: string): string {
    return name.length > 10 ? name.slice(0, 10) + '...' : name;
  }
  openNewItemForm(): void {
    this.newItemRequested.emit();
  }
}

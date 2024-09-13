import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FileFolder } from '../models/file-folder.model';

@Injectable({
  providedIn: 'root'
})
export class FileFolderService {
  private items: FileFolder[] = [];
  private itemsSubject = new BehaviorSubject<FileFolder[]>([]);

  getItems(): Observable<FileFolder[]> {
    return this.itemsSubject.asObservable();
  }

  addItem(item: FileFolder): void {
    item.id = this.generateId();
    this.items.push(item);
    this.updateItems();
  }

  deleteItems(itemIds: string[]): void {
    this.items = this.items.filter(item => !itemIds.includes(item.id));
    this.updateItems();
  }

  private updateItems(): void {
    this.itemsSubject.next([...this.items]);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileFolderService } from '../services/file-folder.service';
import { FileFolder } from '../models/file-folder.model';

@Component({
  selector: 'app-new-item-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.css']
})
export class NewItemFormComponent {
  @Output() formClosed = new EventEmitter<void>();

  itemForm: FormGroup;
  folders: FileFolder[] = [];

  constructor(private fb: FormBuilder, private fileFolderService: FileFolderService) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      type: ['', Validators.required],
      parentId: [''],
      owners: ['']
    });

    this.fileFolderService.getItems().subscribe(items => {
      this.folders = items.filter(item => item.type === 'folder');
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const formValue = this.itemForm.value;
      const newItem: FileFolder = {
        id: '',  // Será generado por el servicio
        name: formValue.name,
        type: formValue.type,
        date: new Date(formValue.date),
        owners: formValue.owners.split(',').map((owner: string) => owner.trim()),
        parentId: formValue.parentId || undefined
      };
      this.fileFolderService.addItem(newItem);
      this.itemForm.reset();
      this.formClosed.emit();
    }
  }

  closeForm(): void {
    this.formClosed.emit();
  }
}

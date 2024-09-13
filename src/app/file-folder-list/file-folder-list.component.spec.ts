import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileFolderListComponent } from './file-folder-list.component';

describe('FileFolderListComponent', () => {
  let component: FileFolderListComponent;
  let fixture: ComponentFixture<FileFolderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileFolderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileFolderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

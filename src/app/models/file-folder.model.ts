export interface FileFolder {
  id: string;
  name: string;
  type: 'file' | 'folder';
  owners: string[];
  date: Date;
  parentId?: string;
}

export type SectionId = 
  | 'overview'
  | 'architecture'
  | 'permissions'
  | 'limitations'
  | 'folder-structure'
  | 'user-flow'
  | 'metrics'
  | 'roadmap';

export interface Section {
  id: SectionId;
  title: string;
  icon: string;
  isOfflineAvailable?: boolean;
}

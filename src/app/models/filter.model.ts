export interface FilterConfig {
  id: string;
  label: string;
  parentId?: string;
  options?: string[];
}
export interface FilterState {
  value?: string;
  enabled: boolean;
}

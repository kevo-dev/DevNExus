
export enum AppRoute {
  DASHBOARD = 'dashboard',
  ARCHITECT = 'architect',
  METRICS = 'metrics',
  TRENDS = 'trends',
  SETTINGS = 'settings'
}

export interface ProjectArchitecture {
  projectName: string;
  description: string;
  folderStructure: string[];
  techStack: string[];
  keyComponents: {
    name: string;
    purpose: string;
  }[];
}

export interface TrendTopic {
  title: string;
  description: string;
  link: string;
  category: string;
}

export interface MetricData {
  name: string;
  value: number;
  benchmark: number;
}

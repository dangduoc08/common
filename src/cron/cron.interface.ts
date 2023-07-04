export interface ICronOption {
  active: boolean;
  expression: string;
  overlap?: number;
  runOnInit?: boolean;
  name?: string;
  description?: string;
}

export interface IStats {
  getNextExecuteAt: () => string;
  getLastExecutedAt: () => string;
  getLastExecutedIn: () => number;
  checkIsRunning: () => boolean;
  getCurrentOverlap: () => number;
  isRunOnInit: boolean;
  maxOverlap: number;
  cronTime: string;
  name: string;
  bindTo: string;
  description: string;
}

declare module 'node-cron' {
    import { CronJob } from 'cron';
  
    export type CronTask = CronJob;
  
    export function schedule(cronExpression: string, task: () => void): CronTask;
    export function schedule(cronExpression: string, onTick: () => void, onComplete?: () => void): CronTask;
    export function validate(cronExpression: string): boolean;
  }
  
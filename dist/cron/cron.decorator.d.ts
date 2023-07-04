import { ICronOption } from './cron.interface';
declare const Scheduler: () => <T extends new (...agrs: any[]) => object>(Constructor: T) => any;
declare const Cron: (cronOption: ICronOption) => (target: object, key: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
declare const Release: () => (target: object, key: string, index: number) => void;
export { Scheduler, Cron, Release };

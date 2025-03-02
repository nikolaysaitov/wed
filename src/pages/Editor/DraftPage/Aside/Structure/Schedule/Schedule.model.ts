import { v4 as uuid } from 'uuid';

export interface ScheduleEvent {
  id: string;
  time: string;
  eventName: string;
}

export const createScheduleEvent = (event?: Partial<ScheduleEvent>): ScheduleEvent => ({
  id: event?.id ?? uuid(),
  time: event?.time ?? '',
  eventName: event?.eventName ?? ''
});

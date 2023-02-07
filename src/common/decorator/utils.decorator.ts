import { Transform } from 'class-transformer';

export function ToBoolean(): (target: any, key: string) => void {
  return Transform((obj: any) => {
    if (typeof obj.value === 'boolean') {
      return obj.value;
    } else {
      return ['true', '1'].includes(obj.value.toLowerCase());
    }
  });
}

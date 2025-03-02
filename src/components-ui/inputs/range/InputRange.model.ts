export interface InputRangeMark {
  value: number;
  label: string;
}

export function fillArray(start: number, end: number, step: number): InputRangeMark[] {
  const result: InputRangeMark[] = [];
  for (let i = start; i <= end; i += step) {
    result.push({
      value: i,
      label: `${i}`
    });
  }
  return result;
}

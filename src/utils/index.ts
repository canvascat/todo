export * from './store';

type ClassNameItem = string | Record<string, boolean> | false | undefined | null;

export function normalizeClassName(...names: ClassNameItem[]): string {
  const result: string[] = [];
  for (let i = 0; i < names.length; i++) {
    const item = names[i];
    if (!item) continue;
    if (typeof item === 'string') result.push(item);
    else Object.entries(item).forEach(([k, v]) => v && result.push(k));
  }
  return result.join(' ');
  // return names.reduce<string[]>((result, item) => (item && (typeof item === 'string' ? result.push(item) : Object.entries(item).forEach(([k, v]) => v && result.push(k))), result), []).join(' ')
}

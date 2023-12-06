export function apiUrl(path: string): string {
  return `${process.env.BASE_URI}${path}`
}

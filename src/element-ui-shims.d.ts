declare module 'element-ui/lib/locale' {
  function use (lang: object): void
}
declare module 'element-ui/lib/locale/lang/*' {
  const el: {
    [key: string]: { [key: string]: string | string[] | { [key: string]: string } },
  }
}

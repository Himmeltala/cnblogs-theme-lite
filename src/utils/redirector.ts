export enum RouteType {
  ESSAY = "Essay",
  HOME = "HOME"
}

export function redirect(href: string): any {
  if (/\/p\/\d+/g.test(href)) {
    return {
      type: RouteType.ESSAY,
      text: String(href.match(/\/p\/\d+/g)).split("/")[2].split(",")[0]
    };
  }
}
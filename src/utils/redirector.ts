import config from "../config";

export enum RouteType {
  ESSAY = "Essay",
  HOME = "Home",
  CATEGORY = "Category"
}

export function redirect(href: string): any {
  if (/\/p\/\d+/g.test(href)) {
    return {
      type: RouteType.ESSAY,
      text: String(href.match(/\/p\/\d+/g)).split("/")[2].split(",")[0]
    };
  } else if (/\/category\/\d+/g.test(href)) {
    let page = String(href.match(/page=\d/g)).split("=")[1];
    return {
      type: RouteType.CATEGORY,
      page: page ? page : "1",
      id: String(href.match(/\/category\/\d+/g)).split("/")[2].split(",")[0]
    };
  }
}

export function reinstallUrl(redirection: any, config: any): string {
  return `${window.location.protocol}//${window.location.host}${config.router.space}/#/e/${redirection.text}`;
}
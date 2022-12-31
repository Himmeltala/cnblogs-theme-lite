import $ from "jquery";
import * as DataType from "../types/data-type";
import * as Parser from "./parser";

export function getEssayList(): { pages: string[]; list: Array<DataType.Essay> } {
  return Parser.parseEssayList($("#mainContent"), false);
}

export function getCategories(calc: boolean): { pages: string[]; list: Array<DataType.Essay>; label: string; } {
  return Parser.parseCategoryList($("#mainContent"), calc);
}
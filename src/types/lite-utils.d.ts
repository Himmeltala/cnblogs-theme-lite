/**
 * Lite 工具
 */
declare namespace LiteUtils {
  function endLoading(): void;
  function startLoading(): void;
  function openImageUploadWindow(el: string, onUploaded: (img: string) => void): void;
  function reloadObjProps(source: CustType.ILocalSetting, template: CustType.ILocalSetting): CustType.ILocalSetting;
  function setTitle(title?: string);
  function scrollIntoView(selector: string);
  function isPcDevice(): boolean;
  function getLocalSetting(): RemovableRef<CustType.ILocalSetting>;
  function useLite(dev: Function, pro: Function);

  namespace Random {
    function get(src: string[], max?: number): number[];
  }

  namespace Log {
    function primary(title: string, msg: string): void;
    function warning(title: string, msg: string): void;
  }

  namespace Parser {
    function unit(num: string): string;
  }

  namespace Text {
    function replace(source: string, regExps: RegExp[], replacement?: string[]): string;
    function split(str: string, regex: RegExp, keys: number[], values: string[]): string;
  }

  namespace Router {
    function go(params: { path: string; router?: Router }): void;
  }
}

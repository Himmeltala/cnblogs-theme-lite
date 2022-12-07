/**
 * 替换字符串，默认替换 ""。传递 regExps，一个正则表达式数组。
 *
 * @param source 被修剪的字符串
 * @param regExps 正则表达式，找到匹配的字符串，然后替换掉
 * @param replacement 不传递，默认被替换的字符串是 ""。传递的数组等于 regExps 的长度，就一一对应进行替换。如果传递的
 * 数组小于 regExps，就与前几个进行对应替换，其余的用默认 "" 替换。
 */
export function regTrim(source: string, regExps: RegExp[], replacement?: string[]) {
  let replaced = source;
  let substitute = "";
  for (let i = 0; i < regExps.length; i++) {
    if (!replacement) substitute = "";
    else {
      if (!replacement[i]) substitute = "";
      else substitute = replacement[i];
    }
    replaced = replaced.replace(regExps[i], substitute);
  }
  return replaced;
}
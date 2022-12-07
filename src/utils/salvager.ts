export function debounce(fn: Function, wait: number) {
  let timer: any = null;
  return function() {
    if (!timer) {
      timer = setTimeout(() => {
        // @ts-ignore
        fn.apply(this, arguments);
        timer = null;
      }, wait);
    }
  };
}
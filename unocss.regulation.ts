import { Rule } from "unocss";

const regulation = <Rule<any>[]>[
  // dynamic
  [/^fsz-p-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ "font-size": `${d}px` })],
  [/^fsz-r-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ "font-size": `${d}rem` })],
  [/^lts-p-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ "letter-spacing": `${d}px` })],
  [/^leh-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ "line-height": `${d}` })],
  [/^w-d-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ width: `${d}%` })],
  [/^w-p-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ width: `${d}px` })],
  [/^w-r-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ width: `${d}rem` })],
  [/^w-vh-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ width: `${d}vh` })],
  [/^w-vw-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ width: `${d}vw` })],
  [/^brd-p-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ "border-radius": `${d}px` })],
  [/^h-r-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ height: `${d}rem` })],
  [/^h-p-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ height: `${d}px` })],
  [/^h-vh-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ height: `${d}vh` })],
  [/^h-vw-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ height: `${d}vw` })],
  [/^top-p-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ top: `${d}px` })],
  [/^top-vh-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ top: `${d}vh` })],
  [/^left-p-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ left: `${d}px` })],
  [/^left-vw-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ left: `${d}vw` })],
  [/^right-p-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ right: `${d}px` })],
  [/^right-vw-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ right: `${d}vw` })],
  [/^ofw-(auto|hidden|inherit|initial|overlay|revert|scroll|unset|visible)$/, ([, d]) => ({ overflow: `${d}` })]
  // static
];

export { regulation };

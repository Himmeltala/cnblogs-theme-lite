import { Rule, UserShortcuts } from "unocss";

const rules = <Rule<any>[]>[
  // 字体
  [/^fsz-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ "font-size": `${d}rem` })],
  // 间距
  [/^lts-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ "letter-spacing": `${d}rem` })],
  // 行高
  [/^leh-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ "line-height": `${d}` })],
  // % width
  [/^wd-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ width: `${d}%` })],
  // vh width
  [/^wvh-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ width: `${d}vh` })],
  // vw width
  [/^wvw-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ width: `${d}vw` })],
  // % height
  [/^hd-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ height: `${d}%` })],
  // vh height
  [/^hvh-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ height: `${d}vh` })],
  // vw height
  [/^hvw-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ height: `${d}vw` })],
  // vh top
  [/^tpv-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ top: `${d}vh` })],
  // vw left
  [/^ltv-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ left: `${d}vw` })],
  // vw right
  [/^rtv-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ right: `${d}vw` })],
  // overflow
  [
    /^ofw-(auto|hidden|inherit|initial|overlay|revert|scroll|unset|visible)$/,
    ([, d]) => ({ overflow: `${d}` })
  ],
  // 文本颜色
  [/^(pri|sec|thr)-color$/, ([, d]) => ({ color: `var(--${d}-text-color)` })],
  // 背景颜色
  [/^bg-color$/, ([, d]) => ({ "background-color": `var(--bg-color)` })]
];

const shortcuts = <UserShortcuts>[
  [
    /^f-((c|s|e)(-(c|s|e|b))*)$/,
    ([, g1, g2, g3, g4]) => {
      const matches = [
        { prefix: "c", value: "center" },
        { prefix: "s", value: "start" },
        { prefix: "e", value: "end" },
        { prefix: "b", value: "between" }
      ];

      let style = ``;

      let corr = matches.find(ele => ele.prefix === g2);
      style += `flex items-${corr.value} content-${corr.value}`;

      if (g4) {
        corr = matches.find(ele => ele.prefix === g4);
        style += ` justify-${corr.value}`;
      }
      return style;
    }
  ]
];

export { rules, shortcuts };

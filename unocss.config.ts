import { Rule, UserShortcuts } from "unocss";

// 自定义规则
const rules = <Rule<any>[]>[
  // 字体
  [/^fsz-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ "font-size": `${d}rem` })],
  // 间距
  [/^lts-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ "letter-spacing": `${d}rem` })],
  // 行高
  [/^leh-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ "line-height": `${d}` })],
  // 百分比宽度
  [/^wd-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ width: `${d}%` })],
  // px 宽度
  [/^wp-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ width: `${d}px` })],
  // vh 宽度
  [/^wvh-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ width: `${d}vh` })],
  // vw 宽度
  [/^wvw-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ width: `${d}vw` })],
  // 百分比高度
  [/^hd-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ height: `${d}%` })],
  // px 高度
  [/^hp-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ height: `${d}px` })],
  // vh 高度
  [/^hvh-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ height: `${d}vh` })],
  // vw 高度
  [/^hvw-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ height: `${d}vw` })],
  // px top
  [/^tpp-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ top: `${d}px` })],
  // vh top
  [/^tpv-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ top: `${d}vh` })],
  // px left
  [/^ltp-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ left: `${d}px` })],
  // vw left
  [/^ltv-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ left: `${d}vw` })],
  // px right
  [/^rtp-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ right: `${d}px` })],
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

// 简化 unocss
const shortcuts = <UserShortcuts>[
  [
    /^f-((c|s|e)(-(c|s|e|b))*)$/,
    ([, group1, group2, group3, group4]) => {
      const matches = [
        { prefix: "c", value: "center" },
        { prefix: "s", value: "start" },
        { prefix: "e", value: "end" },
        { prefix: "b", value: "between" }
      ];

      if (group4) {
        let style = ``;

        for (let i = 0; i < matches.length; i++) {
          if (matches[i].prefix === group2) {
            style += `flex items-${matches[i].value} content-${matches[i].value}`;
          }
        }

        for (let i = 0; i < matches.length; i++) {
          if (matches[i].prefix === group4) {
            style += ` justify-${matches[i].value}`;
          }
        }

        return style;
      } else {
        for (let i = 0; i < matches.length; i++) {
          if (matches[i].prefix === group2) {
            return `flex items-${matches[i].value} content-${matches[i].value}`;
          }
        }
      }
    }
  ]
];

export { rules, shortcuts };

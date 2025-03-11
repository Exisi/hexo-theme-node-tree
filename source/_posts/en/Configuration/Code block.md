---
categories:
  - en
tags:
  - Configuration
date:
  - 2025-02-18 0:23:34
---

Through the code block configuration, you can specify the extended features of code blocks. Since Hexo's code rendering is not perfect, we have made compatibility and optimization based on the code highlighting configuration in Hexo's `_config.yml` file.

``` yml
#------------------------------------------------------
# Enhancements to code blocks
#------------------------------------------------------
code:
  # Code highlight
  highlight:
    highlightcss:
      # Select a style in the link
      # See: https://highlightjs.org/static/demo/
      style: "tokyo-night-dark"
    prismcss:
      # Select a style in the link
      # See: https://github.com/PrismJS/prism-themes?#available-themes
      style: "prism"
  # Code copy button
  copyBtn:
    # Enable copy code button
    enable: true
```

## Code highlighting style
You can specify the style for code rendering by using `code.highlight.highlightcss.style` and `code.highlight.prismcss.style`.

``` yml
code:
  highlight:
    highlightcss:
      style: "tokyo-night-dark"
    prismcss:
      style: "prism"
```

These two parameters are both used to specify the `CSS` file to be included for styling the code highlighting. You can find the style names on the main page of the code highlighting library.

- [highlightjs](https://highlightjs.org/static/demo/)
- [prismjs](https://github.com/PrismJS/prism-themes?#available-themes)

## Code copy button
You can control the display of the code copy button using the `code.copybtn.enable` property. By default, this feature is enabled and the button is located in the upper right corner of the code block.

``` yml
code:
  copyBtn:
    enable: true
```

## Code highlighting library
You can switch the code highlighter library in the global configuration `_config.yml` under the Hexo root directory. The `syntax_highlighter` parameter accepts `highlight.js` and `prismjs`.

``` yml
# Hexo > 7.0
syntax_highlighter: highlight.js

# Hexo < 7.0
highlight:
  enable: true
prismjs:
  enable: false
```

If you need to disable code highlighting styles, you can set `syntax_highlighter` to empty, or modify both `highlight.enable` and `prismjs.enable` to `false`.

## Line numbers display
When you enable one of the code highlighter libraries, the `highlight.line_number` and `prismjs.line_number` options in the `_config.yml` file under the Hexo root directory will be used. The default setting is `true`, which means line numbers are displayed in the code. If you need to turn off the line number display, simply set the `line_number` option for the corresponding code highlighter library to `false`

``` yml
highlight:
  line_number: true
prismjs:
  line_number: true
```

Because Hexo implements line number display by wrapping code blocks with `figure` and `table`, and the default configuration is enabled, we have made some style adjustments to ensure compatibility with the default settings. Although there may be some style loss, this will not affect the readability of the code blocks.

> The current compatibility of line number display in Hexo's code is not accurate, so the highlight styles from `highlight.js` are unable to recognize these unmarked codes.

But if you disable the line number display, the code highlighting under `highlight.js` will be normal, or you can directly switch to the `prism.js` code highlighting library.
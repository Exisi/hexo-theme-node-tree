---
categories:
  - en
tags:
  - Configuration
date:
  - 2025-02-17 16:23:34
---

To make the light-colored transparent icons adapt to the dark background of the header section, we divided the theme icons into browser icon (favicon.dark) and header icon (favicon.light).

``` yml _config.node-tree.yml
favicon:
  light: /favicon-white.ico
  dark: /favicon.ico
```

By default, the icon file is located at the root path `/themes/node-tree/source` of the theme. You can create icons in the `/source` directory of your Hexo project and specify the name of the icon. If the icon file name is the same as the icon under the theme path, the icon file in the `/source` directory will be used preferentially.

Of course, if your icons have good recognition, you can set the `favicon.dark` and `favicon.light` icons to be the same icon.

``` yml _config.node-tree.yml
favicon:
  light: /favicon.ico
  dark: /favicon.ico
```
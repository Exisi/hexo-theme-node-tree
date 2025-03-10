---
categories:
  - en
tags:
  - Guide
date:
  - 2025-02-18 17:21:32
---

You need to manually create the About page for the first time when using the theme.

``` bash
hexo new page about
```

After the creation is successful, modify `/source/about/index.md` and add the layout attribute.

The modified file example is as follows:

```
---
title: About
layout: about
---

//Content
```
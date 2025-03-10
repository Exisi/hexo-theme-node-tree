---
categories:
  - en
tags:
  - Guide
date:
  - 2025-02-18 22:10:01
---

You need to manually create the Category page for the first time when using the theme.

``` bash
hexo new page categories
```

After the creation is successful, modify `/source/categories/index.md` and add the layout attribute.

The modified file example is as follows:

```
---
title: Category
layout: categories
---

//Content
```
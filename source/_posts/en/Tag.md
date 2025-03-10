---
categories:
  - en
tags:
  - Guide
date:
  - 2025-02-18 19:37:31
---

You need to manually create the Tag page for the first time when using the theme.

``` bash
hexo new page tags
```

After the creation is successful, modify `/source/tags/index.md` and add the layout attribute.

The modified file example is as follows:

```
---
title: Tag
layout: tags
---

//Content
```
---
categories:
  - en
tags:
  - Configuration
date:
  - 2025-02-17 21:23:34
---

The top menu allows you to control the display of the menu as needed. By default, all menus are enabled.

``` yml _config.node-tree.yml
header:
  # Enable tag menu
  tag:
    enable: true
  # Enable category menu
  category:
    enable: true
  # Enable github menu
  github:
    enable: true
    url: ''
  # Enable about menu
  about:
    enable: true
  # Enable dark model menu
  darkMode:
    enable: true
```

## Tag page Menu
The entry for the tag page, set to `enable: true` by default.

``` yml _config.node-tree.yml
header:
  tag:
    enable: true
```

## Category page Menu
The entry for the category page, set to `enable: true` by default.

``` yml _config.node-tree.yml
header:
  category:
    enable: true
```

## Github icon menu
The entry for the Github page, which will redirect to the configured `header.github.url`, with the default being `enable: true`. If menu item enabled, please fill in the link to your GitHub homepage, for example `https://github.com/yourname`.

``` yml _config.node-tree.yml
header:
  github:
    enable: true
    url: ''
```

## About page menu
The entry for the about page, the default is `enable: true`.

``` yml _config.node-tree.yml
header:
  about:
    enable: true
```

## Dark mode icon menu
Icon menu for toggling between dark and light mode page themes, with the default set to `enable: true`.

``` yml _config.node-tree.yml
header:
  darkMode:
    enable: true
```
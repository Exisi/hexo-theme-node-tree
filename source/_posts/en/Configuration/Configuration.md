---
categories:
  - en
tags:
  - Configuration
date:
  - 2025-02-17 16:23:34
---

The Node Tree theme uses the `_config.yml` configuration file located under `theme/node-tree` by default.

``` yml
# ------------------------------------------------------
# Guide: https://github.com/Exisi/hexo-theme-node-tree
# You can get more detailed help from the guide
#------------------------------------------------------

#---------------------------
# Theme Configuration
#---------------------------

#------------------------------------------------------
# Icon for browser tab
#------------------------------------------------------
favicon:
  light: /favicon-white.ico
  dark: /favicon.ico

#------------------------------------------------------
# Custom CSS and JS
#------------------------------------------------------
custom:
  css:
    # List of css file
    path:
  js:
    # The script that will be loaded only once when the page is loaded.
    base:
      # Whether to load async
      async: false
      # List of js file
      path:
    # The script that will be reloaded when the page is change.
    reload:
      # Whether to load async
      async: true
      # List of js file
      path:

#------------------------------------------------------
# Header menu Settings
#------------------------------------------------------
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

#------------------------------------------------------
# sidebar Settings
#------------------------------------------------------
sidebar:
  # Post title use title or filename, If not defined, default is false (filename).
  usePostTitle: false
  search:
    # If not defined, default is google. Set engines as
    # https://www.baidu.com/s?wd=
    # https://www.google.com/search?q=
    engine: https://www.google.com/search?q=

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

#------------------------------------------------------
# Enable the post copyright
#------------------------------------------------------
post:
  # Copyright, will be displayed at the end of each post
  copyright:
    enable: true
    # CreativeCommons license
    # See: https://creativecommons.org/share-your-work/cclicenses/
    # Options: BY | BY-SA | BY-ND | BY-NC | BY-NC-SA | BY-NC-ND | ZERO
    license: 'BY'
    # Show author
    author:
      enable: true
    # Show post date
    postDate:
      enable: true
      format: "LL"
    # Show update date
    updateDate:
      enable: false
      format: "LL"

#------------------------------------------------------
# Footer Settings
#------------------------------------------------------
footer:
  # HTML of the first line of the footer, it is recommended to keep the link to promote this theme to more people
  content: '
    <div>
      Theme
      <a href="https://github.com/Exisi/hexo-theme-node-tree"	target="_blank">Node-Tree</a>
      Powered by
      <a href="https://hexo.io" target="_blank">Hexo</a>
    </div>
  '

  # Copyright, will be displayed at the end of each page
  copyright:
    enable: true
    url: ''
    baseYear: 2024
  # Display website PV and UV statistics
  statistics:
    # Vercount is an efficient website counter based on NextJS and Redis. Support self-deployment
    # see: https://vercount.one/
    vercount:
      enable: true
      src: https://cn.vercount.one/js

#------------------------------------------------------
# Post comment, support giscus
# see: https://giscus.app/
#------------------------------------------------------
comment:
  # Based on GitHub Discussions, similar to Utterances
  # See: https://giscus.app/
  giscus:
    enable: false
    repo:
    repo_id:
    category:
    category_id:
    mapping:
    strict:
    reactions_enabled:
    emit_metadata:
    input_position:
    theme:

#------------------------------------------------------
# Enable Website Analytics, Supporting Google and Baidu Analytics
#------------------------------------------------------
analytics:
  # Baidu analytics, get the string behind `hm.js?`
  # See: https://tongji.baidu.com/
  baidu:
    enable: false
    hm: ''
  # Google Analytics 4 MEASUREMENT_ID
  # See: https://support.google.com/analytics/answer/9744165#zippy=%2Cin-this-article
  google:
    enable: false
    id: ''
```

## Theme configuration override
If you need to override the default theme configuration, please create a `_config.node-tree.yml` configuration file in the root directory of your Hexo project.


``` bash
# Linux / Mac
touch _config.node-tree.yml

# Windows PowerShell
new-item _config.node-tree.yml

# Windows CMD
echo. > _config.node-tree.yml
```

Then, you can copy the `_config.yml` configuration to the `_config.node-tree.yml` file for modification. When the `_config.node-tree.yml` configuration file exists, the configurations within it will override those in the `_config.yml`.
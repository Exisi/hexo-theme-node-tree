<div align=center>
  <img style="text-align:center" src="https://raw.githubusercontent.com/Exisi/hexo-theme-node-tree/main/source/favicon.ico" width="15%" />
  <h1>Node-Tree</h1>

<p>Node-Tree is a simple node tree directory theme, focus on notes record</p>

Demo: [MagicBook](https://m.exi.ink)

Docs: English | [中文](https://github.com/Exisi/hexo-theme-node-tree/blob/main/README-CN.md)

</div>

Based on [tree](https://github.com/wujun234/hexo-theme-tree) theme.

### Installation

```
$ cd hexo
$ git clone https://github.com/Exisi/hexo-theme-node-tree themes/node-tree
```

Or you can download the [latest Release](https://github.com/Exisi/hexo-theme-node-tree/releases) manually, and then put it in theme directory

Set the `_config.yml` theme

```
theme: node-tree
```

### Update

You can update to latest master branch by the following command

```
$ cd themes/node-tree
$ git pull
```

### Configuration

By default, the theme is default configuration for some configurations. If you need to customize the configuration, it is recommended to use `_config.node-tree.yml` to cover theme configuration. See Hexo configration [Alternate Theme Config](https://hexo.io/docs/configuration.html#Alternate-Theme-Config)

#### Theme configuration

Create the `_config.node-tree.yml` file in Hexo root directory, and copy the follow configuration.

```
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
  # 是否启用关于菜单
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
    post_date:
      enable: true
      format: "LL"
    # Show update date
    update_date:
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
    busuanzi:
      enable: true

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
  # See: https://tongji.baidu.com/sc-web/10000033910/home/site/getjs?siteId=13751376
  baidu:
    enable: false
    hm: ''
  # Google Analytics 4 MEASUREMENT_ID
  # See: https://support.google.com/analytics/answer/9744165#zippy=%2Cin-this-article
  google:
    enable: false
    id: ''
```

#### Node Tree Rules

In order to link the contents of the directory, you need to create the Markdown file of the same name in the file directory.

```
_posts
└── foo/              # Create a new nested directory
    ├── bar.md
    └── foo.md        # the same name Markdown file inside the foo directory
```

In addition, the node of the directory will be sorted in order, so it is important to set a time for the post.

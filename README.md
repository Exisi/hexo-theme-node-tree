<div align=center>
  <img style="text-align:center" src=https://raw.githubusercontent.com/Exisi/MagicBook/main/favicon.ico width=15% />
  <h1>Node-Tree</h1>

<p>Node-Tree is a simple node tree directory theme, focus on notes record</p>

Demo: [MagicBook](https://m.exi.ink)

Docs: English | [Chinese](https://github.com/Exisi/hexo-theme-node-tree/blob/main/README-CN.md)

</div>

Based on [tree](https://github.com/wujun234/hexo-theme-tree) theme.

### Installation

```
$ cd hexo
$ git clone https://github.com/Exisi/hexo-theme-node-tree themes/node-tree
```

Or you can download the [latest Release]() manually, and then put it in theme directory

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
favicon: /favicon.ico

# Specify github user for header（username）
github:

menu:
  tag:
    enable: true
  category:
    enable: true

sidebar:
  # Post title use title or filename, If not defined, default is false (filename).
  usePostTitle: false
  search:
    # If not defined, default is google. Set engines as
    # https://www.baidu.com/s?wd=
    # https://www.google.com/search?q=
    engine: https://www.google.com/search?q=

footer:
  copyright:
    # If `author` from Hexo `_config.yml` not defined, will be used.
    author:
      name:
      url:
    baseYear: 2024

comment:
  giscus:
    enable: false
    enableComment: true
    repo:
    repoid:
    reactions:

analysis:
  baidu:
    enable: false
    src:
  google:
    enable: false
    src:
    config:

statistics:
  busuanzi:
    # Specify to open busuanzi statistics
    enable: true
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

<div align=center>
  <img style="text-align:center" src="https://raw.githubusercontent.com/Exisi/hexo-theme-node-tree/main/source/favicon.ico" width=15% />
  <h1>Node-Tree</h1>

<p>节点树是一个简单的节点树目录主题，专注于笔记记录</p>

Demo: [MagicBook](https://m.exi.ink)

Docs: [English](https://github.com/Exisi/hexo-theme-node-tree/blob/main/README.md) | Chinese

</div>

基于 [tree](https://github.com/wujun234/hexo-theme-tree) 主题.

### 安装

```
$ cd hexo
$ git clone https://github.com/Exisi/hexo-theme-node-tree themes/node-tree
```

或着您可以手动下载主题的[最新发行版]()，并将它放到主题目录

接着，设置 `_config.yml` 中的主题为 node-tree

```
theme: node-tree
```

### 更新

您可以通过以下命令将主题更新到最新的主分支

```
$ cd themes/node-tree
$ git pull
```

### 配置

默认情况下，主题对一些配置默认配置，如果需要自定义配置，建议使用`_config.node-tree.yml`覆盖主题配置。 参考 Hexo 配置中的[使用代替主题配置文件](https://hexo.io/zh-cn/docs/configuration.html#%E4%BD%BF%E7%94%A8%E4%BB%A3%E6%9B%BF%E4%B8%BB%E9%A2%98%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)

#### 主题配置

然后在 Hexo 根目录中创建 `_config.node-tree.yml` 文件，然后复制以下配置。

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

#### 节点树规则

为了链接目录的内容，您需要在文件目录中创建同名的 `Markdown` 文件

```
_posts
└── foo/              # 创建一个嵌套目录
    ├── bar.md
    └── foo.md        # 创建与父目录同名的 Markdown 放在其内部
```

此外，目录的节点将按时间顺序排序，因此为文章设置一个时间很重要

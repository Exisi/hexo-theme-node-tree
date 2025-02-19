<div align=center>
  <img style="text-align:center" src="https://raw.githubusercontent.com/Exisi/hexo-theme-node-tree/main/source/favicon.ico" width=15% />
  <h1>Node-Tree</h1>

<p>节点树是一个简单的节点树目录主题，专注于笔记记录</p>

Demo: [MagicBook](https://m.exi.ink)

Docs: [English](https://github.com/Exisi/hexo-theme-node-tree/blob/main/README.md) | 中文

</div>

基于 [tree](https://github.com/wujun234/hexo-theme-tree) 主题.

### 安装

```
$ cd hexo
$ git clone https://github.com/Exisi/hexo-theme-node-tree themes/node-tree
```

或着您可以手动下载主题的[最新发行版](https://github.com/Exisi/hexo-theme-node-tree/releases)，并将它放到主题目录

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
#---------------------------
# 主题配置
#---------------------------

#------------------------------------------------------
# 用于浏览器标签的图标
#------------------------------------------------------
favicon:
  light: /favicon-white.ico
  dark: /favicon.ico

#------------------------------------------------------
# 标题菜单配置
#------------------------------------------------------
header:
  # 是否启用标签菜单
  tag:
    enable: true
  # 是否启用分类菜单
  category:
    enable: true
  # 是否启用标签菜单
  github:
    enable: true
    url: ''
  # 是否启用关于菜单
  # Enable about menu
  about:
    enable: true
  # 是否启用黑暗模式
  darkMode:
    enable: true

#------------------------------------------------------
# 侧边栏配置
#------------------------------------------------------
sidebar:
  # 文章标题使用标题或文件名，如果未定义，默认为 false（使用文件名）
  usePostTitle: false
  search:
    # 如果未定义，默认为 google。设置引擎为
    # https://www.baidu.com/s?wd=
    # https://www.google.com/search?q=
    engine: https://www.google.com/search?q=

#------------------------------------------------------
# 是否启用文章版权
#------------------------------------------------------
post:
  # 版权声明，会显示在每篇文章的结尾
  copyright:
    enable: true
    # 知识共享许可协议
    # 协议相关: https://creativecommons.org/share-your-work/cclicenses/
    # 选项: BY | BY-SA | BY-ND | BY-NC | BY-NC-SA | BY-NC-ND | ZERO
    license: 'BY'
    # 显示作者
    author:
      enable: true
    # 显示发布日期
    post_date:
      enable: true
      format: "LL"
    # 显示更新日期
    update_date:
      enable: false
      format: "LL"

#------------------------------------------------------
# 页脚配置
#------------------------------------------------------
footer:
  # 页脚第二行文字的 HTML，建议保留链接，用于向更多人推广本主题
  content: '
    <div>
      Theme
      <a href="https://github.com/Exisi/hexo-theme-node-tree"	target="_blank">Node-Tree</a>
      Powered by
      <a href="https://hexo.io" target="_blank">Hexo</a>
    </div>
  '

  # 版权声明，会显示在每个界面的结尾
  copyright:
    enable: true
    url: ''
    baseYear: 2024
  # 展示网站的 PV、UV 统计数
  statistics:
    # Vercount 是一个基于 NextJS 和 Redis 的高效网站计数器。支持自部署
    # 相关配置: https://vercount.one/
    vercount:
      enable: true
      src: https://cn.vercount.one/js

#------------------------------------------------------
# 文章评论，支持 giscus
# 相关配置: https://giscus.app/
#------------------------------------------------------
comment:
  # 基于 GitHub Discussions
  # 相关配置: https://giscus.app/
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
# 是否启用网站分析，支持谷歌和百度分析
#------------------------------------------------------
analytics:
  # 百度统计的 Key，值需要获取下方链接中 `hm.js?` 后边的字符串
  # 相关配置: https://tongji.baidu.com/sc-web/10000033910/home/site/getjs?siteId=13751376
  baidu:
    enable: false
    hm: ''
  # Google Analytics 4 的媒体资源 ID
  # 相关配置: https://support.google.com/analytics/answer/9744165#zippy=%2Cin-this-article
  google:
    enable: false
    id: ''
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

---
categories:
  - en
tags:
  - Guide
date:
  - 2025-02-15 12:32:22
---

Welcome to the Node Tree theme! This document will help you get started quickly. After reviewing the document and still encountering issues during use, you can ask questions within the document or request assistance on GitHub issues.

## What is Node Tree?
Node Tree is a Hexo blog theme with a node tree directory, primarily designed for knowledge-base blogs. It allows you to display your note directory and content in a manner similar to knowledge-base applications through a sidebar catalog. Additionally, the theme supports seamless loading of note nodes.

## Project Initialization
Before proceeding, ensure you have installed the [Hexo](https://hexo.io/en/docs/). Execute the following commands to initialize a Hexo project and generate required files in the specified directory:

``` bash
hexo init <folder>
cd <folder>
npm install
```

After initialization, your project folder will look like this:
```
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

## Using the Theme
Open the root path of the project in the terminal, then execute the command to download the theme into the project.Alternatively, you can manually download the latest release of the theme and place it in the theme directory of the project.

``` bash
git clone https://github.com/Exisi/hexo-theme-node-tree themes/node-tree
```

Next, update the global configuration file of Hexo, which is `_config.yml`, and set the theme to `node-tree`.

``` yaml _config.yml
theme: node-tree
```

## Update the theme
You can update the theme to the latest main branch using the following command:

``` bash
cd themes/node-tree
git pull
```
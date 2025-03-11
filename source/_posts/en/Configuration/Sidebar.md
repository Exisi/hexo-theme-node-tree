---
categories:
  - en
tags:
  - Configuration
date:
  - 2025-02-17 23:23:34
---

The sidebar configuration is mainly used to control the title generation of the tree nodes and the search function.

``` yml
sidebar:
  # Post title use title or filename, If not defined, default is false (filename).
  usePostTitle: false
  search:
    # If not defined, default is google. Set engines as
    # https://www.baidu.com/s?wd=
    # https://www.google.com/search?q=
    engine: https://www.google.com/search?q=
```

## Node title
The sidebar.usePostTitle controls the source of character generation for each node, and by default, it uses the file names under the source/_post directory to generate. Due to the limitations of file system special characters, this may cause you to be unable to display titles with special characters.

``` yml
sidebar:
  usePostTitle: false
```

If you need to display a different title than the filename, you can specify that the directory name should be used to generate the article title by setting `sidebar.usePostTitle` to true. Then, the directory will use the title attribute value declared in the markdown file header.

``` yml
sidebar:
  usePostTitle: true
```

## Node search
The search feature currently only implements search based on the character of the node title. Full-text search requires the use of the search engine's in-site search. Therefore, when you press the Enter key, the interface will redirect you to the search engine interface.

By default, the in-site search feature in the sidebar uses Google search, but you can also use different search engines by specifying the search prefix for `sidebar.search.engine`, for example `https://www.google.com/search?q=`.

``` yml
sidebar:
  search:
    engine: https://www.google.com/search?q=
```
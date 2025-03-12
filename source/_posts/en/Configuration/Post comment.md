---
categories:
  - en
tags:
  - Configuration
date:
  - 2025-02-18 13:12:45
---

The `Node Tree` currently only supports the `giscus` comment system, and this feature is disabled by default. If you need to enable this feature, you can refer to the [giscus](https://giscus.app) configuration.

``` yml _config.node-tree.yml
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
```

> [giscus](https://giscus.app/) requires support from GitHub Discussions, so you will need to provide a public repository and enable the Discussions feature on your GitHub repository.

If you enable the giscus comment system, you must fill in all the required configurations. Otherwise, the comment system may fail to load.
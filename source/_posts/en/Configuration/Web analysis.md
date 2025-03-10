---
categories:
  - en
tags:
  - Configuration
date:
  - 2025-02-18 15:07:10
---

By default, the website analysis feature is disabled. If you need to enable the corresponding website analysis feature, please refer to the relevant configuration of the website.

``` yml
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

## Baidu Analytics
You can set the `analytics.baidu.enable` configuration to true to enable Baidu Analytics, and then you need to fill in the `hm` character corresponding to the site into the `analytics.baidu.hm` configuration.

``` yml
analytics:
  baidu:
    enable: false
    hm: ''
```

For related configurations, please refer to the [Baidu Analytics](https://tongji.baidu.com) documentation.

## Google analytics
You can set the `analytics.google.enable` configuration to true to enable Google Analytics, and then you need to fill in the `id` character corresponding to the site into the `analytics.google.id` configuration.

``` yml
analytics:
  google:
    enable: false
    id: ''
```

For related configurations, please refer to the [Google Analytics 4 documentation](https://support.google.com/analytics/answer/9744165#zippy=%2Cin-this-article)。

---
categories:
  - en
tags:
  - Configuration
date:
  - 2025-02-18 2:00:03
---

You can modify the copyright settings of the article to change the default display of the copyright. By default, `post.copyright.enable` is `true`, and the article copyright is located at the bottom of each article.

``` yml
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
```

## Creative Commons licenses
Creative Commons licenses give everyone from individual creators to large institutions a standardized way to grant the public permission to use their creative work under copyright law.

You can fill in the `post.copyright.license` configuration with the Creative Commons licenses used in your article. The default is the [CC BY](https://creativecommons.org/licenses/by/4.0/) Creative Commons licenses.

| 选项 | 协议 | 描述 | 解释 |
| :---: | :---: | --- | --- |
| BY | [CC BY](https://creativecommons.org/licenses/by/4.0/) | 此This license enables reusers to distribute, remix, adapt, and build upon the material in any medium or format, so long as attribution is given to the creator. The license allows for commercial use. | BY: credit must be given to the creator. |
| BY-SA | [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/) | This license enables reusers to distribute, remix, adapt, and build upon the material in any medium or format, so long as attribution is given to the creator. The license allows for commercial use. If you remix, adapt, or build upon the material, you must license the modified material under identical terms. |  BY: credit must be given to the creator.<br> SA: Adaptations must be shared under the same terms. |
| BY-ND | [CC BY-ND](https://creativecommons.org/licenses/by-nd/4.0/) | This license enables reusers to copy and distribute the material in any medium or format in unadapted form only, and only so long as attribution is given to the creator. | BY: credit must be given to the creator. <br> ND: No derivatives or adaptations of the work are permitted. |
| BY-NC | [CC BY-NC](https://creativecommons.org/licenses/by-nc/4.0/) | This license enables reusers to distribute, remix, adapt, and build upon the material in any medium or format for noncommercial purposes only, and only so long as attribution is given to the creator.  | BY: credit must be given to the creator. <br> NC: Only noncommercial uses of the work are permitted. |
| BY-NC-SA | [CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/) | This license enables reusers to distribute, remix, adapt, and build upon the material in any medium or format for noncommercial purposes only, and only so long as attribution is given to the creator. If you remix, adapt, or build upon the material, you must license the modified material under identical terms. | BY: credit must be given to the creator. <br> NC: Only noncommercial uses of the work are permitted. <br> SA: Adaptations must be shared under the same terms. |
| BY-NC-ND | [CC BY-ND](https://creativecommons.org/licenses/by-nd/4.0/) | This license enables reusers to copy and distribute the material in any medium or format in unadapted form only, and only so long as attribution is given to the creator. The license allows for commercial use. | BY: credit must be given to the creator. <br> ND: No derivatives or adaptations of the work are permitted. |
| ZERO | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | CC0 (aka CC Zero) is a public dedication tool, which enables creators to give up their copyright and put their works into the worldwide public domain. CC0 enables reusers to distribute, remix, adapt, and build upon the material in any medium or format, with no conditions. | Give up all copyrights |

## Copyright author
To reduce redundancy in configuration, the author character for article copyrights is taken from the global configuration in `_config.yml` under the `author` setting. If you need to disable the display of the author, you can set `post.copyright.author.enable`.

``` yml
post:
  copyright:
    author:
      enable: true
```

## Publish date
By default, the copyright date uses the article's publish time, which is the value of `post.copyright.post_date.enable` set to `true`, corresponding to the creation time of the markdown file. If you have filled in the `date` attribute in the `markdown` file's header configuration, that value will be used instead.

Additionally, you can also switch to `post.copyright.update_date.enable` set to `true`. Using the update time can make the displayed date more accurate, but this time is determined by the system based on the modification time of the `markdown` file.

``` yml
post:
  copyright:
    postDate:
      enable: true
      format: "LL"
    updateDate:
      enable: false
      format: "LL"
```

### Date Formatting
You can configure the format for displaying dates by using the `post.copyright.postDate.format` and `post.copyright.updateDate.format` settings.

| 选项 | 解释 | 样例 |
| :---- | :---- | :---- |
| LTS | 时间以秒为单位 | 8:30:00 PM |
| L | 月份数字、月份日期、年份 | 09/04/1986 |
| l | 月份数字、月份日期、年份 | 9/4/1986 |
| LL | 月份名称、日期、年份 | September 4, 1986 | V
| ll | 月份名称、日期、年份 | Sep 4, 1986 | V
| LLL | 月份名称、日期、年份、时间 | September 4, 1986 8:30 PM |
| lll | 月份名称、日期、年份、时间 | Sep 4, 1986 8:30 PM |
| LLLL | 月份名称、月份、星期、年份、时间 | Thursday, September 4, 1986 8:30 PM |
| llll | 月份名称、月份、星期、年份、时间 | Thurs, Sep 4, 1986 8:30 PM |

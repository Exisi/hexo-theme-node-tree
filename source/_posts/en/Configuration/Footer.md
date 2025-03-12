---
categories:
  - en
tags:
  - Configuration
date:
  - 2025-02-18 2:36:03
---

``` yml _config.node-tree.yml
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
```

## Footer statement
You can modify the footer.content configuration to change the HTML of the second line of text in the footer. The default display content is a citation for the theme, and if you do not have any special customization needs, you can keep the default setting, which is used to promote the Node Tree theme to more people.


``` yml _config.node-tree.yml
footer:
  content: '
    <div>
      Theme
      <a href="https://github.com/Exisi/hexo-theme-node-tree"	target="_blank">Node-Tree</a>
      Powered by
      <a href="https://hexo.io" target="_blank">Hexo</a>
    </div>
  '
```

## Copyright statement
The copyright statement is enabled by default, meaning `footer.copyright.enable` is set to true. You can modify the jump link for the copyright author at the bottom of the page by changing the `footer.copyright.url`. Additionally, you can update the `footer.copyright.baseYear` configuration to change the default site start-up running year.


``` yml _config.node-tree.yml
footer:
  copyright:
    enable: true
    url: ''
    baseYear: 2024
```

If you do not wish to display the copyright statement, you can set `footer.copyright.enable` to `false`.

## Website visit statistics
The theme uses [Vercount](https://vercount.one/) as the interface for visit statistics, and the interface visit statistics feature is enable by default.

``` yml _config.node-tree.yml
footer:
  statistics:
    vercount:
      enable: true
      src: https://cn.vercount.one/js
```

### Vercount self-host configuration
You can refer to the [Vercount Self-Hosted Guide](https://github.com/EvanNotFound/vercount?tab=readme-ov-file#vercount-%E8%87%AA%E6%89%98%E7%AE%A1%E6%8C%87%E5%8D%97) to deploy a private access statistics service.

``` yml _config.node-tree.yml
footer:
  statistics:
    vercount:
      enable: true
      src: https://domain.com/js
```

Then modify `footer.statistics.vercount.src` to the prefix of your self-hosted domain, for example, `https://domain.com/js`.
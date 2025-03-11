---
categories:
  - en
tags:
  - Configuration
date:
  - 2025-02-17 19:23:34
---

You can create your custom CSS or JS files in the `source` folder in the root directory of your Hexo project, and then introduce them to the interface by specifying the file path through `path`.

>To ensure that you can update the theme normally, we do not recommend creating custom CSS or JS files under the `source` file in the theme directory, as these may be lost when the theme is synchronized.

``` yml
#------------------------------------------------------
# Custom CSS and JS
#------------------------------------------------------
custom:
  css:
    # List of css file
    path:
  js:
    # The script that will be loaded only once when the page is loaded.
    base:
      # Whether to load async
      async: false
      # List of js file
      path:
    # The script that will be reloaded when the page is change.
    reload:
      # Whether to load async
      async: true
      # List of js file
      path:
```

## Custom style
You can write multiple style files and then import them by `custom.css.path`.

If you only need to introduce a single style file, you can directly specify a path for `custom.css.path`

``` yml
custom:
  css:
    path: /css/custom.css
```

If you have multiple style files, configure them as follows:

``` yml
custom:
  css:
    path:
      - /css/foo.css
      - /css/bar.css
```

## Custom script
The theme's script is divided into two types: basic script and reload script. The basic script is executed only when the interface is initially loaded. The reload script is re-executed after each article is seamless loading.

| Type | Execution timing | Execution times |
| :---: | :--- | :---: |
| basic script | Executed on initial interface load | Once |
| reload script | Re-execute after each article is seamless loading. | Many times |

### Basic script
Basic scripts have no restrictions, but you can control whether the script loads asynchronously. This setting is off by default. When a script loads asynchronously, it won't block the rendering of the interface, but it may finish executing before the interface is rendered.

If you only need to introduce a single basic script file, you can directly specify a path for `custom.js.base.path`.

``` yml
custom:
  js:
    base:
      async: false
      path: /js/custom.js
```

If you have multiple base scripts, configure them as follows:

``` yml
custom:
  js:
    base:
      async: false
      path:
        - /js/foo.js
        - /js/bar.js
```

### Reload script
If you use `let` or `const` in a reloading script, it will cause interface errors when the script reloads. We recommend that you only use `var` to declare your variables in reloading scripts. Alternatively, you can put the reloading script in a self-executing function to isolate the scope of the variables.

Meanwhile, you can also control whether the script is loaded asynchronously. This setting is off by default. When the script is loaded asynchronously, it will not block the rendering of the interface, but it may complete execution before the interface rendering.

If you only need to introduce a single reload script, you can specify the file path directly in `custom.js.reload.path`.

``` yml
custom:
  js:
    reload:
      async: true
      path:
        - /js/custom.js
```

If you have multiple reload scripts, configure them as follows:

``` yml
custom:
  js:
    reload:
      async: true
      path:
        - /js/custom.js
```
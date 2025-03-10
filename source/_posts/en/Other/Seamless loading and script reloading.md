---
categories:
  - en
tags:
  - Guide
date:
  - 2025-02-19 14:32:24
---

The Node Tree's seamless loading uses fetch to load and replace the HTML structure, but the already loaded scripts have been initialized. Therefore, we identify the scripts that need to be reloaded with the `<script reload>` tag. When a node is clicked, the existing scripts are removed and reloaded.

If you have introduced a custom script and it becomes ineffective after seamless loading, you may need to add the reload attribute to it.
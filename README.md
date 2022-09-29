# Adventure Time! Transcript

Deno-ready TypeScript library for searching through _AT_ transcript pages.
Fetches pages from _AT_ fandom website and parses it to be accessible from library.

> ⚠️ Alpha stage! TODO is to document the project!


## Use [![Test](https://github.com/shateq/adventure_time/actions/workflows/test.yml/badge.svg)](https://github.com/shateq/adventure_time/actions/workflows/test.yml)
[deno.land/x](https://deno.land/x/adventure_time)

```js
import { seasonTable, episodeList } from 'deno.land/x/adventure_time/mod.ts';

seasonTable(4).then(list => {
    const episode = list[0].transcribeListed();
    console.log(episode.name);
})

episodeList().then(list => {
    console.table(list);
})
```
---
### License
Project code is available under GNU GPL 3.0 license, check `LICENSE` file for details.

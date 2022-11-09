# Adventure Time! Transcript

[![deno.land](https://shield.deno.dev/x/adventure_time)](https://deno.land/x/adventure_time)

Deno-ready (+ node support) TypeScript library for searching through _AT_ transcript pages.
Fetches pages from _AT_ fandom website and parses it to be accessible from library.

> ⚠️ Alpha stage! Breaking the breaking changes!

## Use [![Test](https://github.com/shateq/adventure_time/actions/workflows/test.yml/badge.svg)](https://github.com/shateq/adventure_time/actions/workflows/test.yml)

```js
import {
    episodeList,
    seasonTable,
} from 'https://deno.land/x/adventure_time/mod.ts';

seasonTable(4).then((list) => {
    const episode = list[0].transcribeListed();
    console.log(episode.name);
});

episodeList().then((list) => {
    console.table(list);
});
```

---

### License ![License](https://img.shields.io/github/license/shateq/adventure_time)

Project code is available under GNU GPL 3.0. Check [LICENSE](LICENSE) file.

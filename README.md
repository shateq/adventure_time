# Adventure Time! Transcript

Deno-ready TypeScript library for searching through _AT_ transcript pages.
Fetches pages from _AT_ fandom website and parses it to be accessible from library.

> ⚠️ Alpha stage! TODO is to document the project!

## Use (ci)
[deno.land/x](https://deno.land/x/adventure_time)

```js
    import { seasonTable } from 'deno.land/x/adventure_time/mod.ts';

    seasonTable(4)
    .then(list => {
        list[0].transcribeListed();
    })
```
---
### License
Project code is available under GPU GPL 3.0 license, check `LICENSE` file for details.

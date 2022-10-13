// Version 1.0.0 - denocheerio
import { cheerio } from 'https://deno.land/x/denocheerio@1.0.0/mod.ts';
import { Category, Character, href } from './search.ts';
export * from 'https://deno.land/x/denocheerio@1.0.0/mod.ts';

export const load = (url: string | URL) =>
    fetch(url)
        .then((res) => res.text())
        .then((t) => cheerio.load(t));

// TODO: multiple pages, is not full
export async function characterIndex(toLoad: string, category: Category): Promise<Array<Character>> {
    const content = '.category-page__members';
    const list: Array<Character> = [];
    const _ex = '?from=¡';

    return await load(toLoad).then(($) => {
        $('ul', $(content))
            .each((_, e) => {
                $(e).children('li')
                    .each((_, el) => {
                        const ref = href($(el).children('a').attr('href'));

                        if ($(el).children('a').text().trim().startsWith('Category:')) return true;
                        list.push(
                            new Character($(el).children('a').text().trim(), ref, category),
                        );
                    });
            });

        return list;
    });
}

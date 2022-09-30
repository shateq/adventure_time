import { cheerio } from 'https://deno.land/x/denocheerio@1.0.0/mod.ts'; // Version 1.0.0
import { Episode, FANDOM, ListedEpisode } from './search.ts';

const LIST = `${FANDOM}/wiki/Category:Transcripts`;
const TALK = `${FANDOM}/wiki/Category_talk:Transcripts`;

const load = (url: string | URL) => fetch(url).then((res) => res.text()).then((t) => cheerio.load(t));

export const href = (href: string) => `${FANDOM}${href}`;

/**
 * Get episode object
 * @param episode The URL pointing to the episode transcript page
 * @returns Episode object
 */
export async function transcribeEpisode<T extends string | URL>(episode: T): Promise<Episode> {
    let data: Episode;

    return await load(episode).then(($) => {
        let transcript = '';

        $('dl').each((_, e) => {
            transcript += $(e).text().trim().concat(' \n');
        });

        data = new Episode(
            $('h1#firstHeading').text().replace('/(\/Transcript)/i', '').trim(),
            $('aside.portable-infobox>nav').text().trim(),
            transcript,
        );

        return (data);
    });
}
/**
 * List episodes
 * @returns Episode list
 */
export async function episodeList(): Promise<Array<ListedEpisode>> {
    const content = 'div#mw-content-text>.category-page__members';
    const list: Array<ListedEpisode> = [];

    return await load(LIST).then(($) => {
        $(content).children('div').children('ul')
            .each((_, e) => {
                // Every item of every list
                $(e).children('li')
                    .each((_, el) => {
                        const ref = href($(el).children('a').attr('href'));

                        list.push(new ListedEpisode($(el).text().trim(), ref));
                    });
            });

        return list;
    });
}

/**
 * Get list of this season's episodes
 * @param int Season numerical
 * @returns Episode list
 */
export async function seasonTable(int: number): Promise<Array<ListedEpisode>> {
    const list: Array<ListedEpisode> = [];

    return await load(TALK).then(($) => {
        $('h2').each((_, e) => {
            if ($(e).text().trim().includes(`Season ${int}`)) {
                $(e).next('table')
                    .children('tbody').children('tr')
                    .each((_, el) => {
                        const name = $(el).children('td').first().text();
                        const ref = href($(el).children('td').children('a').attr('href'));

                        if (name != '') {
                            list.push(new ListedEpisode(name, ref));
                        }
                    });

                return (false);
            }
        });

        return list;
    });
}

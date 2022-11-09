import { Episode, href, ListedEpisode, WIKI } from './deps.ts';
import { load } from './util.ts';

const LIST = `${WIKI}Category:Transcripts`;
const INCOMPLETE = `${WIKI}Category:Incomplete_transcripts`;
const TALK = `${WIKI}Category_talk:Transcripts`;

/**
 * TODO: URL verification
 * Get episode object
 * @param episode The URL pointing to the episode transcript page
 * @returns Episode object
 */
export async function transcribeEpisode(
    episode: string | URL,
): Promise<Episode> {
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
 * TODO: multiple pages, is not full
 * List episodes
 * @param incomplete List completion state
 * @returns Array of ListedEpisode
 */
export async function episodeList(
    incomplete = false,
): Promise<Array<ListedEpisode>> {
    const content = '.category-page__members';
    const list: Array<ListedEpisode> = [];

    return await load(incomplete ? INCOMPLETE : LIST).then(($) => {
        $('ul', $(content)).each((_, e) => { // Using cheerio context
            // Every item of every list
            $(e).children('li')
                .each((_, el) => {
                    const ref = href($(el).children('a').attr('href'));
                    // Possible categories
                    if ($(el).text().trim().startsWith('Category:')) {
                        return true;
                    }

                    list.push(
                        new ListedEpisode($(el).text().trim(), ref, incomplete),
                    );
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
                        const ref = href(
                            $(el).children('td').children('a').attr('href'),
                        );

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

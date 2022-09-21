// Some text
import { cheerio } from 'cheerio';
// const content = 'main.page__main>div#content';

export const FANDOM = 'https://adventuretime.fandom.com';

const _named = (name: string) => `${FANDOM}/wiki/${name}/Transcript`;
const _href = (href: string | undefined) => `${FANDOM}${href}`;

export const LIST = `${FANDOM}/wiki/Category:Transcripts`;

export async function episodeList(): Promise<string | void> {
    const content = 'div#mw-content-text>.category-page__members';

    return await fetch(LIST).then((res) => res.text())
        .then((text) => {
            const $ = cheerio.load(text);

            $(content).children('div').children('ul')
                .each((i, e) => {
                    // Every item of every list
                    $(e).children('li')
                        .each((_, el) => {
                            const a = $(el).children('a').attr('href');
                            console.log(`%s - %s`, $(el).text().trim(), _href(a));
                        });
                });

            //return 'somedataformat'; // TODO: think of data format
        }).catch((error) => console.error(error));
}

export const TALK = `${FANDOM}/wiki/Category_talk:Transcripts`;

export async function seasonTable(int: number /* Season ${int} */): Promise<string | void> {
    return await fetch(TALK).then((res) => res.text())
        .then((text) => {
            const $ = cheerio.load(text);
            let table = `Season ${int}`;

            $('h2')
                .each((_, e) => {
                    if ($(e).text() /* Header title */.includes(`Season ${int}`)) {
                        const html = $(e).next('table').html();
                        if (html != null) {
                            table = html;
                        }
                        return (false);
                    }
                });

            return (table);
        }).catch((error) => console.error(error));
}

import { bgBlue, bgGreen, bold, white } from 'https://deno.land/std@0.157.0/fmt/colors.ts';
import { assert, assertEquals, assertExists, assertInstanceOf } from 'https://deno.land/std@0.157.0/testing/asserts.ts';
import { LADY_RAINICORN, transcribeEpisode, wikiPage } from './mod.ts';
import { Category, Episode, ListedEpisode } from './mod.ts'; // Objects
import { episodeList, seasonTable, tableContents } from './mod.ts'; // Lists

const tag = (text: Deno.TestContext) => {
    const s = white(bold(` ${text.name.toUpperCase()} `));
    if (text.parent) return console.log(bgGreen(s));
    console.log(bgBlue(s));
};

Deno.test('Episode List promise', async (c) => {
    tag(c);
    const list = await episodeList().then((res) => {
        console.table(res);
        return res;
    });

    assertInstanceOf(list, Array<ListedEpisode>);
});

Deno.test('Incomplete Transcripts promise', async (c) => {
    tag(c);
    const episode = await episodeList(true).then((res) => {
        console.table(res);
        return res;
    });

    await c.step('Incomplete print', async (c) => {
        tag(c);
        const t = await episode[0].transcribeListed();
        console.log(t);

        assert(episode[0].incomplete);
    });

    assertInstanceOf(episode, Array<ListedEpisode>);
});

Deno.test('Season Table print', async (c) => {
    tag(c);
    const list = await seasonTable(2).then((res) => {
        console.table(res);
        return res;
    });

    assertInstanceOf(list, Array);

    await c.step('Transcribe from Listed', async (c) => {
        tag(c);
        const episode = await list[1].transcribeListed();

        assertInstanceOf(episode, Episode);
        console.table(episode);
        // console.table(episode);
    });
});

Deno.test('Search For boolean', async (c) => {
    tag(c);
    const boolean = await transcribeEpisode(wikiPage('It_Came_from_the_Nightosphere/Transcript'))
        .then((res) => {
            console.info(res);
            return res.search('Marceline');
        });

    assert(boolean);
});

Deno.test('Character Table of Contents', async (c) => {
    tag(c);
    assertEquals(LADY_RAINICORN.role, Category.MAIN);
    const contents = await tableContents(LADY_RAINICORN);
    console.table(contents[Math.floor(Math.random() * contents.length)]);

    assertExists(contents[4]);

    await c.step('TOC Section', async (c) => {
        tag(c);
        const section = await LADY_RAINICORN.secton(
            contents[1].id,
        );

        assertExists(section);
    });
});

const contents = await tableContents(LADY_RAINICORN);
console.log(
    await LADY_RAINICORN.secton(contents[2].id),
);

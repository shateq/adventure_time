import {
    bgBlue,
    bgGreen,
    bold,
    white,
} from 'https://deno.land/std@0.157.0/fmt/colors.ts';
import {
    assert,
    assertInstanceOf,
} from 'https://deno.land/std@0.157.0/testing/asserts.ts';
import { LADY_RAINICORN } from './mod.ts';
import { Episode, ListedEpisode } from './mod.ts'; // Objects
import { episodeList, seasonTable, tableOfContents } from './mod.ts'; // Lists

export const tag = (text: Deno.TestContext) => {
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

const contents = await tableOfContents(LADY_RAINICORN);
console.log(
    await LADY_RAINICORN.articleSection(contents[2].id),
);

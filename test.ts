import { assertEquals, assertInstanceOf } from 'https://deno.land/std@0.157.0/testing/asserts.ts';
import { Episode, episodeList, href, seasonTable, transcribeEpisode } from './mod.ts';

Deno.test('promise episode list', async () => {
    const list = await episodeList().then((res) => {
        console.table(res);

        return res;
    });

    assertInstanceOf(list, Array);
});

Deno.test('table list type', async () => {
    const transcribed = await seasonTable(2).then((res) => {
        console.table(res);
        assertInstanceOf(res, Array);

        return res[1].transcribeListed();
    });

    assertInstanceOf(transcribed, Episode);
    console.info(transcribed.transcript);
});

Deno.test('search boolean', async () => {
    const boolean = await transcribeEpisode(href('/wiki/It_Came_from_the_Nightosphere/Transcript'))
        .then((res) => {
            console.info(res);
            return res.search('Marceline');
        });

    assertEquals(boolean, true);
    console.info(boolean);
});

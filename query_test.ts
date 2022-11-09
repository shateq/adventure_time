import { assert } from 'https://deno.land/std@0.157.0/testing/asserts.ts';
import { tag } from './test.ts'
import { transcribeEpisode, wikiPage } from './mod.ts';

Deno.test('Search For boolean', async (c) => {
    tag(c);
    const boolean = await transcribeEpisode(
        wikiPage('It_Came_from_the_Nightosphere/Transcript'),
    )
        .then((res) => {
            console.info(res);
            return res.search('Marceline');
        });

    assert(boolean);
});
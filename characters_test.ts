import {
    assertEquals,
    assertExists,
} from 'https://deno.land/std@0.157.0/testing/asserts.ts';
import { tag } from './test.ts';
import { Category, LADY_RAINICORN, tableOfContents } from './mod.ts';

Deno.test('Character Table of Contents', async (c) => {
    tag(c);
    assertEquals(LADY_RAINICORN.role, Category.MAIN);
    const contents = await tableOfContents(LADY_RAINICORN);
    console.table(contents[Math.floor(Math.random() * contents.length)]);

    assertExists(contents[4]);

    await c.step('TOC Section', async (c) => {
        tag(c);
        const section = await LADY_RAINICORN.articleSection(
            contents[1].id,
        );

        assertExists(section);
    });
});

import { Category, Character, WIKI } from './deps.ts';
import { characterIndex, load } from './util.ts';

type SectionRow = {
    name: string;
    id: string;
    character: Character;
};

// INFO: gather information about character with ('aside.protable-infobox')

// TODO: search through sections
export async function section(ch: Character, id: string): Promise<string> {
    if (!id.startsWith('#')) id = `#${id}`;
    // deno-lint-ignore no-inferrable-types
    let data: string = '';

    return await load(ch.href).then(($) => {
        $(id)
            .parent()
            .nextUntil('h2')
            .each((_, e) => {
                data += `${$(e).text()}\n`;
            });
        return data;
    });
}

/**
 * Bring TOC
 * @param ch Character to get Contents from
 * @returns Array of ContentRow: id and name of the paragraph
 */
export async function tableOfContents(
    ch: Character,
): Promise<Array<SectionRow>> {
    const array: SectionRow[] = [];

    const TABLE = '#toc';
    return await load(ch.href).then(($) => {
        $('li', $(TABLE).children('ul').html()).each((_, e) => {
            // Uses cheerio context
            array.push({
                name: $(e).children('a').text(),
                id: $(e).children('a').attr('href'),
                character: ch,
            });
        });

        return array;
    });
}

// Characters category lists
const princessesList = async () => {
    const PRINCESSES = `${WIKI}Category:Princesses`;
    return await characterIndex(PRINCESSES, Category.PRINCESSES);
};

// TODO: multiple pages, is not full (cap at S)
const speciesList = async () => {
    const SPECIES = `${WIKI}Category:Species`;
    return await characterIndex(SPECIES, Category.SPECIES);
};

// TODO: multiple pages
// const minorCharacterList = async () => {
//     const MINOR = `${WIKI}Category:Minor_Characters`;
//     return await characterIndex(MINOR, Category.MINOR);
// };

export { /*minorCharacterList,*/ princessesList, speciesList };

// MAIN CHARACTERS
const character = (name: string, link: string) =>
    new Character(name, `${WIKI}${link}`, Category.MAIN);

export const FINN = character('Finn', 'Finn'),
    MARCELINE = character('Marceline', 'Marceline'),
    BUBBLEGUM = character('Bonnibel Bubblegum', 'Princess_Bubblegum'),
    ICE_KING = character('Simon Petrikov', 'Ice_King'),
    JAKE = character('Jake', 'Jake'),
    LADY_RAINICORN = character('Lady Rainicorn', 'Lady_Rainicorn'),
    BMO = character('BMO', 'BMO'),
    LSP = character('Lumpy Space Princess', 'Lumpy_Space_Princess');

export const MAIN_CHARACTERS = [
    BMO,
    BUBBLEGUM,
    FINN,
    ICE_KING,
    JAKE,
    LADY_RAINICORN,
    LSP,
    MARCELINE,
];

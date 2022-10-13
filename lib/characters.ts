import { Category, Character, WIKI } from './search.ts';
import { characterIndex, load } from './util.ts';

type SectionRow = {
    name: string;
    id: string;
    character: Character;
};

// INFO: gather information about character with ('aside.protable-infobox')

// TODO: search through sections
export async function section(ch: Character, id: string): Promise<string> {
    let data: string;

    return await load(ch.href).then(($) => {
        $(id).nextUntil('h2').each((_, e) => {
            console.log(
                $(e).html(),
            );
        });

        // .each((_, e) => {

        //     data += $(e).text();
        // });

        return data;
    });
}

/**
 * Bring TOC
 * @param ch Character to get Contents from
 * @returns Array of ContentRow: id and name of the paragraph
 */
export async function tableContents(ch: Character): Promise<Array<SectionRow>> {
    const array: SectionRow[] = [];

    const TABLE = '#toc';
    return await load(ch.href).then(($) => {
        $('li', $(TABLE).children('ul').html()).each((_, e) => { // Uses cheerio context
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

// Main characters, don't repeat yourself!
const character = (name: string, link: string) => new Character(name, `${WIKI}${link}`, Category.MAIN);

const FINN = character('Finn', 'Finn');
const MARCELINE = character('Marceline', 'Marceline');

const BUBBLEGUM = character('Bonnibel Bubblegum', 'Princess_Bubblegum');
const ICE_KING = character('Simon Petrikov', 'Ice_King');

const JAKE = character('Jake', 'Jake');
const LADY_RAINICORN = character('Lady Rainicorn', 'Lady_Rainicorn');

const BMO = character('BMO', 'BMO');
const LSP = character('Lumpy Space Princess', 'Lumpy_Space_Princess');

const MAIN_CHARACTERS = [BMO, BUBBLEGUM, FINN, ICE_KING, JAKE, LADY_RAINICORN, LSP, MARCELINE];
export { BMO, BUBBLEGUM, FINN, ICE_KING, JAKE, LADY_RAINICORN, LSP, MAIN_CHARACTERS, MARCELINE };

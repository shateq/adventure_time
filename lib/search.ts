/** Adventure Time Fandom link */
export const FANDOM = 'https://adventuretime.fandom.com';
export const WIKI = `${FANDOM}/wiki/`;

export const href = (href: string) => `${FANDOM}${href}`;
export const wikiPage = (page: string) => `${WIKI}${page}`;

/**
 * Episode object
 */
export class Episode {
    title: string;
    season: string;
    transcript: string;

    constructor(title: string, season: string, transcript: string) {
        this.title = title;
        this.season = season;
        this.transcript = transcript;
    }

    // TODO: IMPLEMENT
    search(phrase: string): boolean {
        return this.title.includes(phrase) || this.transcript.includes(phrase);
    }
}

/**
 * Episode in the list
 */
export class ListedEpisode {
    name: string;
    href: string;
    incomplete: boolean;

    constructor(name: string, href: string, incomplete = false) {
        this.name = name;
        this.href = href;
        this.incomplete = incomplete;
    }

    async transcribeListed() {
        const index = await import('./index.ts');
        return await index.transcribeEpisode(this.href);
    }
}

/**
 * Character appearance
 */
export class Character {
    name: string;
    href: string;
    role: Category;

    constructor(name: string, href: string, role: Category) {
        this.name = name;
        this.href = href;
        this.role = role;
    }

    async tableContents() {
        const characaters = await import('./characters.ts');
        return await characaters.tableContents(this);
    }

    async secton(section: string) {
        const characaters = await import('./characters.ts');
        return await characaters.section(this, section)
    }
}

/**
 * Character importance
 */
export enum Category {
    MAIN,
    PRINCESSES,
    MINOR,
    SPECIES,
}

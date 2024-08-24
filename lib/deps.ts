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

import { transcribeEpisode } from './index.ts';
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
        return await transcribeEpisode(this.href);
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

    async tableofContents() {
        const characters = await import('./characters.ts');
    return await characters.tableOfContents(this);
    }

    async articleSection(id: string) {
        const characters = await import('./characters.ts');
        return await characters.section(this, id)
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

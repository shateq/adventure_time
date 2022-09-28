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
        if (this.title.includes(phrase)) return true;
        if (this.transcript.includes(phrase)) return true;
        return false;
    }
}

/**
 * Episode in the list
 */
export class ListedEpisode {
    name: string;
    href: string;

    constructor(name: string, href: string) {
        this.name = name;
        this.href = href;
    }

    transcribeListed() {
        return import('./index.ts').then((res) => res.transcribeEpisode(this.href));
    }
}

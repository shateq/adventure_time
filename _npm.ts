/*
    Building into Node compatible package
*/
import { build, emptyDir } from 'https://deno.land/x/dnt@0.31.0/mod.ts';

async function start() {
    await emptyDir('./npm');
    await build({
        entryPoints: ['./mod.ts'],
        outDir: './npm',
        shims: {
            deno: true,
        },
        test: false, // To be true
        scriptModule: false,
        typeCheck: false,
        compilerOptions: {
            target: 'ES2021',
            lib: ['esnext'],
        },
        package: {
            name: 'at-transcript',
            version: Deno.args[0],
            description: 'A library to work with Adventure Time! Transcript',
            license: 'GPL 3.0',
            bugs: {
                url: 'https://github.com/shateq/adventure_time/issues',
            },
        },
    });

    Deno.copyFile('LICENSE', 'npm/LICENSE');
    Deno.copyFile('README.md', 'npm/README.md');
}

start();

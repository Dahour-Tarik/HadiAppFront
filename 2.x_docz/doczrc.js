import chonkyPackage from 'chonky/package.json';

export default {
    title: `Chonky v${chonkyPackage.version} Docs`,
    base: '/docs/2.x/',
    src: 'src/',
    dest: 'build/',
    public: 'static/',
    typescript: true,
    filterComponents: (files) =>
        files.filter((filepath) => /[w-]*.(js|jsx|ts|tsx)$/.test(filepath)),
    menu: [
        'Introduction',
        'Installation & usage',
        'File Browser demos',
        'Migrating from 1.x',
        'FAQ',
        {
            name: 'Basics',
            menu: [
                'Immutability',
                'Component hierarchy',
                'Displaying files',
                'Setting current folder',
                'File thumbnails',
                'File browser handle',
                'Default config',
                'Drag & drop',
            ],
        },
        {
            name: 'File actions',
            menu: [
                'File action basics',
                'Built-in actions',
                'Defining an action handler',
                'Triggering actions',
                'Defining custom actions',
                'Understanding effects',
            ],
        },
        {
            name: 'API Reference',
            menu: ['FileBrowser component'],
        },
    ],
    themeConfig: {
        showPlaygroundEditor: true,
        fontSizes: [14, 16, 16, 16, 20, 26, 34, 40],
        styles: {
            Container: {
                maxWidth: 960,
                margin: 0,
                'div[data-testid="live-preview"]': {
                    boxShadow: 'inset rgba(255, 255, 255, 0.5) 1000px 0 1000px',
                    background:
                        'linear-gradient(90deg, rgba(255,172,92,1) 0%,' +
                        ' rgba(220,214,122,1) 25%, rgba(174,244,152,1) 50%,' +
                        ' rgba(80,244,204,1) 75%, rgba(75,169,226,1) 100%)',
                },
                'div[data-testid="live-editor"]': {},
            },
            inlineCode: {
                fontFamily: 'Inconsolata, monospace !important',
                bg: 'rgba(127, 127, 127, 0.15)',
                borderRadius: '3px',
                fontSize: '0.8em',
                p: '2px 4px',
                m: '0px 2px',
            },
            pre: {
                margin: '10px 0 !important',
            },
        },
    },
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'React Native vElements' /* title for your website */,
  tagline: 'Cross Platform React Native UI Toolkit',
  url: 'https://react-native-velement.thevikalp.com/' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  projectName: 'react-native-elements',
  organizationName: 'react-native-elements',
  clientModules: [
    require.resolve('./plugins/snackPlayerInitializer.js'),
    require.resolve('./plugins/gtag.ts'),
  ],
  /* path to images for header/footer */
  favicon: '/img/website/logo.png',

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  scripts: [{ src: 'https://snack.expo.io/embed.js', defer: true }],
  themes: ['@docusaurus/theme-live-codeblock'],
  plugins: ['./plugins/react-native-elements-web.js', './plugins/react-native-vector-icon-fix.js'],
  presets: [
    [
      'classic',
      {
        gtag: {
          trackingID: 'G-RW24X04H53',
          anonymizeIP: true,
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['**/component_usage/**'],
        },
        docs: {
          exclude: ['**/component_usage/**'],
          path: 'docs',
          versions: {
            current: {
              label: 'Bleeding Edge 🚧',
            },
          },
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.ts'),
          rehypePlugins: [
            [require("rehype-raw"), { passThrough: ['mdxFlowExpression', 'mdxJsxFlowElement', 'mdxJsxTextElement', 'mdxTextExpression', 'mdxjsEsm'] }]
          ],
          remarkPlugins: [require('./plugins/remark-snackplayer')],
          editUrl:
            'https://github.com/react-native-elements/react-native-elements/edit/next/website/',
        },
        theme: {
          customCss: require.resolve('./static/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig: {
    image: '/img/website/seo.png',
    liveCodeBlock: {
      playgroundPosition: 'top',
    },
    announcementBar: {
      id: 'support_us',
      content:
        'If you like React Native vElements, give it a  <a target="_blank" rel="noopener noreferrer" href="https://github.com/deepktp/react-native-vikalp-elements">star on GitHub!</a> ⭐' +
        ' and join the <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/e9RBHjkKHa">Discord server</a>!',
      backgroundColor: 'var(--navbar-background-color)',
      textColor: 'var(--ifm-navbar-link-color)', // Defaults to `#000`.
      isCloseable: false,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
    },
    navbar: {
      title: 'React Native vElements',
      logo: {
        alt: 'React Native vElements Logo',
        src: '/img/website/logo.png',
      },
      // hideOnScroll: true,
      items: [
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownItemsAfter: [{ to: 'versions', label: 'All versions' }],
          // Do not add the link active class when browsing docs.
          dropdownActiveClassDisabled: true,

          docsPluginId: 'default',
        },
        // { to: 'docs/', label: 'Docs', position: 'right' },
        // { to: 'help', label: 'Help', position: 'right' },
        // { to: 'blog', label: 'Blog', position: 'right' },
        { type: 'search', position: 'left' },
        {
          href: 'https://github.com/sponsors/react-native-elements',
          html: '<span>Sponsor</span>',
          position: 'right',
          className: 'header-navbar-link header-github-sponsor-link',
          'aria-label': 'GitHub Sponsor',
        },
        {
          href: 'https://twitter.com/rn_elements',
          html: '<span>Twitter</span>',
          position: 'right',
          className: 'header-navbar-link header-twitter-link',
          'aria-label': 'Twitter',
        },
        {
          href: 'https://discord.gg/e9RBHjkKHa',
          html: '<span>Discord</span>',
          position: 'right',
          className: 'header-navbar-link header-discord-link',
          'aria-label': 'Discord server',
        },
        {
          href: 'https://github.com/deepktp/react-native-vikalp-elements',
          html: '<span>GitHub</span>',
          position: 'right',
          className: 'header-navbar-link header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/shadesOfPurple'),
      defaultLanguage: 'typescript',
    },
    algolia: {
      appId: 'RE3E65KUI0',
      apiKey: 'dbc0364e21346919060006f77fd462f1',
      indexName: 'react_native_elements',
    },
    footer: {
      style: 'dark',
      logo: {
        src: 'img/logo.png',
      },
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/',
            },
            {
              label: 'Components',
              to: 'docs/overview',
            },
            {
              label: 'Contribution Guide',
              to: 'docs/contributing',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Join discord server',
              to: 'https://discord.com/invite/e9RBHjkKHa',
            },
            {
              label: 'Discord Server',
              to: '/discord',
            },
            {
              label: 'Submit a bug or feature',
              to: 'https://github.com/react-native-elements/react-native-elements/issues/',
            },
            {
              label: 'Support us on Open Collective',
              to: 'https://opencollective.com/react-native-elements',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              to: 'https://github.com/react-native-elements/react-native-elements',
            },
            {
              label: 'StackOverflow',
              to: 'https://stackoverflow.com/questions/tagged/react-native-elements',
            },
            {
              label: 'VS Code Extension',
              to: 'https://marketplace.visualstudio.com/items?itemName=rne.snippets',
            },
          ],
        },
      ],
    },
  },
  baseUrlIssueBanner: false,
  trailingSlash: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
      },
    },
  },
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  onDuplicateRoutes: 'warn',
  staticDirectories: ['static'],
};

module.exports = config;

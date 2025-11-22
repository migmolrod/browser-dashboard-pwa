import {themes as prismThemes} from "prism-react-renderer";
import type {Config} from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
	title: "Browser Dashboard PWA",
	tagline: "A simple pet-project to showcase my full-stack design, architecture and development skills",
	favicon: "img/favicon.ico",

	// Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
	future: {
		v4: true, // Improve compatibility with the upcoming Docusaurus v4
	},

	// Set the production url of your site here
	url: "https://migmolrod.github.io",
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: "/browser-dashboard-pwa/",

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: "migmolrod", // Usually your GitHub org/user name.
	projectName: "browser-dashboard-pwa", // Usually your repo name.

	trailingSlash: false,
	onBrokenLinks: "throw",

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: "en",
		locales: ["en"],
	},

	presets: [
		[
			"classic",
			{
				docs: {
					sidebarPath: "./sidebars.ts",
					editUrl: "https://github.com/migmolrod/browser-dashboard-pwa/tree/master/docs",
				},
				blog: {
					showReadingTime: true,
					feedOptions: {
						type: ["rss", "atom"],
						xslt: true,
					},
					editUrl: "https://github.com/migmolrod/browser-dashboard-pwa/tree/master/docs",
					onInlineTags: "warn",
					onInlineAuthors: "warn",
					onUntruncatedBlogPosts: "warn",
				},
				theme: {
					customCss: "./src/css/custom.css",
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		// Replace this with your project's social card
		image: "img/docusaurus-social-card.jpg",
		colorMode: {
			respectPrefersColorScheme: true,
		},
		navbar: {
			title: "Home",
			logo: {
				alt: "Browser Dashboard PWA Logo",
				src: "img/logo.svg",
			},
			items: [
				{
					type: "docSidebar",
					sidebarId: "domain",
					position: "left",
					label: "BDL",
				},
				{
					type: "docSidebar",
					sidebarId: "requirements",
					position: "left",
					label: "SRS",
				},
				{
					type: "docSidebar",
					sidebarId: "architecture",
					position: "left",
					label: "SAD",
				},
				{to: "/blog", label: "Blog", position: "right"},
				{
					href: "https://github.com/migmolrod/browser-dashboard-pwa",
					label: "GitHub",
					position: "right",
				},
			],
		},
		footer: {
			style: "dark",
			links: [
				{
					title: "Docs",
					items: [
						{
							label: "Introduction",
							to: "/docs/intro",
						},
						{
							label: "BDL",
							to: "/docs/domain/overview",
						},
						{
							label: "SRS",
							to: "/docs/requirements/overview",
						},
						{
							label: "SAD",
							to: "/docs/architecture/overview",
						},
					],
				},
				/*{
					title: "Community",
					items: [
						{
							label: "Stack Overflow",
							href: "https://stackoverflow.com/questions/tagged/docusaurus",
						},
						{
							label: "Discord",
							href: "https://discordapp.com/invite/docusaurus",
						},
						{
							label: "X",
							href: "https://x.com/docusaurus",
						},
					],
				},*/
				{
					title: "More",
					items: [
						{
							label: "Blog",
							to: "/blog",
						},
						{
							label: "GitHub",
							href: "https://github.com/migmolrod/browser-dashboard-pwa",
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} Miguel Molinero Rodríguez. Built with Docusaurus.`,
		},
		prism: {
			theme: prismThemes.vsLight,
			darkTheme: prismThemes.vsDark,
		},
		mermaid: {
			theme: {light: "neutral", dark: "forest"},
		},
	} satisfies Preset.ThemeConfig,
	themes: ["@docusaurus/theme-mermaid"],
	markdown: {
		mermaid: true,
	},
};

export default config;

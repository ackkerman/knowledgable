// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	image: {
		service: passthroughImageService()
	},
	integrations: [
		starlight({
			title: 'Knowleadgable Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'Introduction',
					items: [
						{ slug: 'introduction' },
						{ slug: 'getting-started' },
					]
				},
				{
					label: 'Core Concepts',
					autogenerate: { directory: 'core-concepts' },
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
			customCss: [
				'./src/styles/global.css',
			]
		}),
	],
});

import {defineField} from 'sanity';

export const meta = defineField({
	title: 'Meta Information',
	name: 'metaFields',
	type: 'object',
	groups: [
		{
			name: 'opengraph',
			title: 'Open Graph Protocol'
		}
	],
	fields: [
		{
			name: 'metaTitle',
			title: 'Meta Title (Overrides to default title)',
			type: 'string'
		},
		{
			name: 'metaDescription',
			title: 'Meta Description',
			type: 'string'
		},
		{
			name: 'openGraphImage',
			title: 'Open Graph Image',
			type: 'image',
			description: 'Ideal size for open graph images is 1200 x 630',
			options: {
				hotspot: true
			},
			group: 'opengraph'
		},
	]
});

export default meta;

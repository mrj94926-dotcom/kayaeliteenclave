export const homepageSchema = {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    },
    {
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
    },
    {
      name: 'heroBackground',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}

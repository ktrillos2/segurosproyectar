import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'Página de Nosotros',
  type: 'document',
  fields: [
    defineField({
      name: 'heroSubtitle',
      title: 'Subtítulo Hero',
      type: 'string',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Título Hero',
      type: 'string',
    }),
    defineField({
      name: 'heroTitleHighlight',
      title: 'Palabra destacada Hero',
      type: 'string',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Descripción Hero',
      type: 'text',
    }),
    defineField({
      name: 'stats',
      title: 'Estadísticas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Valor', type: 'string' },
            { name: 'label', title: 'Etiqueta', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'mission',
      title: 'Misión',
      type: 'object',
      fields: [
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'description', title: 'Descripción', type: 'text' },
      ],
    }),
    defineField({
      name: 'vision',
      title: 'Visión',
      type: 'object',
      fields: [
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'description', title: 'Descripción', type: 'text' },
      ],
    }),
  ],
})

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'differentiators',
  title: 'Sección Diferenciadores',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Etiqueta (Badge)',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Título Principal',
      type: 'string',
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Palabra destacada',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Beneficios',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          type: 'object',
          fields: [
            defineField({ name: 'icon', title: 'Ícono (Iconify)', type: 'string' }),
            defineField({ name: 'title', title: 'Título', type: 'string' }),
            defineField({ name: 'description', title: 'Descripción', type: 'text' }),
          ]
        })
      ]
    })
  ],
})

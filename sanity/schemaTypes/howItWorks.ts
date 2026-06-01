import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'howItWorks',
  title: 'Sección Cómo Funciona',
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
      name: 'steps',
      title: 'Pasos',
      type: 'array',
      of: [
        defineField({
          name: 'step',
          type: 'object',
          fields: [
            defineField({ name: 'icon', title: 'Ícono (Iconify)', type: 'string' }),
            defineField({ name: 'title', title: 'Título', type: 'string' }),
            defineField({ name: 'description', title: 'Descripción', type: 'text' }),
            defineField({ name: 'visual', title: 'Imagen/GIF', type: 'image' }),
            defineField({ name: 'isGif', title: '¿Es GIF?', type: 'boolean', initialValue: false }),
            defineField({ name: 'isIconOnly', title: '¿Solo ícono (sin mix-blend-multiply)?', type: 'boolean', initialValue: false }),
          ]
        })
      ]
    })
  ],
})

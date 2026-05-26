import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Sección Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título Principal',
      type: 'string',
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Palabra destacada del título',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'buttonText',
      title: 'Texto del Botón',
      type: 'string',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Enlace del Botón',
      type: 'string',
    }),
    defineField({
      name: 'features',
      title: 'Características (Bullet points)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagen/GIF Principal',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'insurersTitle',
      title: 'Título sección aseguradoras',
      type: 'string',
    }),
    defineField({
      name: 'insurers',
      title: 'Aseguradoras Aliadas',
      type: 'array',
      of: [
        defineField({
          name: 'insurer',
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Nombre', type: 'string' }),
            defineField({ name: 'logo', title: 'Logo', type: 'image' })
          ]
        })
      ]
    })
  ],
})

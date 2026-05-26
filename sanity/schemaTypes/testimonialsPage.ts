import { defineField, defineType } from 'sanity'

export const testimonialsPage = defineType({
  name: 'testimonialsPage',
  title: 'Página de Testimonios',
  type: 'document',
  fields: [
    defineField({ name: 'heroSubtitle', title: 'Subtítulo del Hero', type: 'string' }),
    defineField({ name: 'heroTitle', title: 'Título Principal', type: 'string' }),
    defineField({ name: 'heroTitleHighlight', title: 'Palabra Destacada en Título', type: 'string' }),
    defineField({ name: 'heroDescription', title: 'Descripción del Hero', type: 'text' }),
    defineField({
      name: 'stats',
      title: 'Estadísticas (Cinta Negra)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Valor', type: 'string' },
            { name: 'label', title: 'Etiqueta', type: 'string' }
          ]
        }
      ]
    }),
    defineField({
      name: 'testimonialsList',
      title: 'Lista de Testimonios',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Nombre del Cliente', type: 'string' },
            { name: 'location', title: 'Ubicación', type: 'string' },
            { name: 'service', title: 'Servicio Contratado', type: 'string' },
            { name: 'quote', title: 'Testimonio', type: 'text' },
            { name: 'rating', title: 'Calificación (1 a 5)', type: 'number', validation: Rule => Rule.min(1).max(5) }
          ]
        }
      ]
    })
  ]
})

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'coveragesPage',
  title: 'Página de Coberturas',
  type: 'document',
  fields: [
    defineField({
      name: 'heroSubtitle',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Título Principal',
      type: 'string',
    }),
    defineField({
      name: 'heroTitleHighlight',
      title: 'Palabra destacada',
      type: 'string',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'mainCoverages',
      title: 'Coberturas Principales (Fila 1)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'desc', title: 'Descripción', type: 'text' },
            { name: 'icon', title: 'Icono', type: 'image' },
          ]
        }
      ]
    }),
    defineField({
      name: 'complementaryCoverages',
      title: 'Coberturas Complementarias (Fila 2)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'desc', title: 'Descripción', type: 'text' },
            { name: 'icon', title: 'Icono', type: 'image' },
          ]
        }
      ]
    }),
    defineField({
      name: 'additionalCoverages',
      title: 'Coberturas Adicionales (Fila 3)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'desc', title: 'Descripción', type: 'text' },
            { name: 'icon', title: 'Icono', type: 'image' },
          ]
        }
      ]
    }),
    defineField({
      name: 'faqTitle',
      title: 'Título de FAQ',
      type: 'string',
    }),
    defineField({
      name: 'faqSubtitle',
      title: 'Subtítulo de FAQ',
      type: 'string',
    }),
    defineField({
      name: 'faqs',
      title: 'Preguntas Frecuentes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'q', title: 'Pregunta', type: 'string' },
            { name: 'a', title: 'Respuesta', type: 'text' },
          ]
        }
      ]
    })
  ]
})

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'insurerLogo',
  title: 'Logos Aseguradoras',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la Aseguradora',
      type: 'string',
      validation: (rule) => rule.required().error('El nombre de la aseguradora es obligatorio'),
    }),
    defineField({
      name: 'logo',
      title: 'Logo de la Aseguradora',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required().error('El logo de la aseguradora es obligatorio'),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
          description: 'Importante para SEO y accesibilidad. (Ej: Logo de Seguros Sura)',
          validation: (rule) => rule.required().error('El texto alternativo es obligatorio para el SEO'),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
})

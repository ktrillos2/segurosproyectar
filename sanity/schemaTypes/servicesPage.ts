import { defineField, defineType } from 'sanity'

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Página de Servicios',
  type: 'document',
  fields: [
    defineField({ name: 'heroSubtitle', title: 'Subtítulo del Hero', type: 'string' }),
    defineField({ name: 'heroTitle', title: 'Título Principal', type: 'string' }),
    defineField({ name: 'heroTitleHighlight', title: 'Palabra Destacada en Título', type: 'string' }),
    defineField({ name: 'heroDescription', title: 'Descripción del Hero', type: 'text' }),
    defineField({
      name: 'personalServices',
      title: 'Seguros Personales',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'description', title: 'Descripción', type: 'text' },
            { name: 'iconName', title: 'Nombre del Icono de Lucide (ej. Car, Heart)', type: 'string' }
          ]
        }
      ]
    }),
    defineField({
      name: 'businessServices',
      title: 'Seguros Corporativos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'description', title: 'Descripción', type: 'text' },
            { name: 'iconName', title: 'Nombre del Icono de Lucide (ej. Building, Users)', type: 'string' }
          ]
        }
      ]
    }),
    defineField({
      name: 'additionalSpecialties',
      title: 'Especialidades Adicionales (Píldoras)',
      type: 'array',
      of: [{ type: 'string' }]
    })
  ]
})

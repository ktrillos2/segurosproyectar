import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'globalConfig',
  title: 'Configuración Global',
  type: 'document',
  fields: [
    defineField({
      name: 'instagramUrl',
      title: 'URL de Instagram',
      type: 'url',
    }),
    defineField({
      name: 'tiktokUrl',
      title: 'URL de TikTok',
      type: 'url',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'URL de Facebook',
      type: 'url',
    }),
    defineField({
      name: 'footerCtaTitle',
      title: 'Título CTA Footer',
      type: 'string',
    }),
    defineField({
      name: 'footerCtaTitleHighlight',
      title: 'Palabra destacada CTA Footer',
      type: 'string',
    }),
    defineField({
      name: 'footerCtaDescription',
      title: 'Descripción CTA Footer',
      type: 'text',
    }),
    defineField({
      name: 'footerCtaButtonText',
      title: 'Texto Botón CTA Footer',
      type: 'string',
    }),
    defineField({
      name: 'footerCtaButtonLink',
      title: 'Enlace Botón CTA Footer',
      type: 'string',
    }),
    defineField({
      name: 'companyName',
      title: 'Nombre Legal de la Empresa',
      type: 'string',
    }),
    defineField({
      name: 'nit',
      title: 'NIT',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Correo Electrónico de Contacto',
      type: 'string',
    }),
    defineField({
      name: 'contactAddress',
      title: 'Dirección de Oficina',
      type: 'string',
    }),
    defineField({
      name: 'contactSchedules',
      title: 'Horario de Atención',
      type: 'text',
    })
  ],
})

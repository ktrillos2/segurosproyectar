import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'termAcceptance',
  title: 'Aceptación de Términos',
  type: 'document',
  fields: [
    defineField({
      name: 'ip',
      title: 'Dirección IP',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'date',
      title: 'Fecha y Hora',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'userAgent',
      title: 'Navegador/Dispositivo',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      initialValue: 'Aceptado',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'ip',
      subtitle: 'date',
    },
  },
})

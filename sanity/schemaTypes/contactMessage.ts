import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactMessage',
  title: 'Mensajes de Contacto',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'message',
      title: 'Mensaje',
      type: 'text',
      readOnly: true,
    }),
  ],
})

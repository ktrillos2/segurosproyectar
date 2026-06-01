import { defineField, defineType } from 'sanity'

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Páginas Legales',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título Principal (ej. TÉRMINOS Y CONDICIONES)', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug / Identificador', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'subtitle', title: 'Subtítulo', type: 'string' }),
    defineField({ name: 'locationDate', title: 'Lugar y Fecha', type: 'string' }),
    defineField({ 
      name: 'content', 
      title: 'Contenido Completo', 
      type: 'array', 
      of: [{ type: 'block' }] 
    })
  ]
})

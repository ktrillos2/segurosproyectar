import { defineField, defineType } from 'sanity'

export const pqrsPage = defineType({
  name: 'pqrsPage',
  title: 'Página de PQRS',
  type: 'document',
  fields: [
    defineField({ name: 'pageTitle', title: 'Título de la Página', type: 'string' }),
    defineField({ name: 'introText', title: 'Texto Introductorio', type: 'text' }),
    defineField({
      name: 'pqrsTypes',
      title: 'Tipos de Solicitud (Tabla)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'type', title: 'Tipo', type: 'string' },
            { name: 'definition', title: 'Definición', type: 'text' },
            { name: 'example', title: 'Ejemplo', type: 'text' }
          ]
        }
      ]
    }),
    defineField({ name: 'responseTimesText', title: 'Texto de Plazos de Respuesta', type: 'text' }),
    defineField({ name: 'formIntroText', title: 'Texto Previo al Formulario', type: 'text' }),
    defineField({ name: 'afterSubmitText', title: 'Texto de Qué ocurre después de radicar', type: 'text' }),
    defineField({ name: 'validityText', title: 'Texto de Vigencia e Info Adicional', type: 'text' }),
  ]
})

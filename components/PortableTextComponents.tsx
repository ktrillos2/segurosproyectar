import { PortableTextReactComponents } from '@portabletext/react'

export const legalPortableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => <p className="mb-4 text-slate-600 text-justify leading-relaxed">{children}</p>,
    h1: ({ children }) => (
      <h1 className="text-2xl font-extrabold mt-10 mb-4 pb-2 border-b-2 border-primary/20" style={{ color: '#0d4a7a' }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-bold mt-8 mb-3" style={{ color: '#0d6fa8' }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-bold mt-6 mb-2" style={{ color: '#1a7bbf' }}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-bold mt-4 mb-2" style={{ color: '#1a7bbf' }}>
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/40 pl-4 my-4 italic text-slate-500">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 space-y-1 mb-4 text-slate-600">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 space-y-1 mb-4 text-slate-600">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a 
          href={value?.href} 
          className="text-primary hover:underline font-bold" 
          target={target} 
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    },
  },
}

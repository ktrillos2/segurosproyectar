import { Icon } from "@iconify/react"

export function Differentiators({ data }: { data?: any }) {
  if (!data) return null;

  const renderTitle = () => {
    if (!data.title || !data.titleHighlight) return data.title;
    const parts = data.title.split(data.titleHighlight);
    if (parts.length < 2) return data.title;
    return (
      <>
        {parts[0]}<span className="text-primary">{data.titleHighlight}</span>{parts[1]}
      </>
    );
  };

  return (
    <section className="bg-slate-50 py-20 lg:py-28 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-sm bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border border-primary/20">
            {data.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 leading-[1.15] text-balance">
            {renderTitle()}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items?.map((item: any) => (
            <div 
              key={item._key} 
              className="relative group bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100%] -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110" />
              <div className="relative z-10 flex flex-col items-start text-left">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <Icon icon={item.icon} className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-xl tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 font-medium text-[15px] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

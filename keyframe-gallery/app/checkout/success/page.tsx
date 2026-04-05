<section className="py-40 px-6 border-t border-text-primary/5 bg-text-primary/[0.01]">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
    <div className="relative aspect-[4/5] overflow-hidden group">
      <img 
        src="https://images.unsplash.com/photo-1618384881928-df6043924376?q=80&w=1000&auto=format&fit=crop" 
        alt="Manufacturing process"
        className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
      />
      <div className="absolute inset-0 bg-bg-primary/20 mix-blend-overlay" />
    </div>

    <div className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-5xl font-light tracking-tighter uppercase italic">
          Mechanical <span className="not-italic font-bold">Poetry</span>
        </h2>
        <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">The Engineering Process</p>
      </div>

      <div className="space-y-8">
        {[
          { title: "Material", desc: "Sourced from high-grade 6063 aerospace aluminum blocks." },
          { title: "Precision", desc: "CNC milled with a tolerance of 0.01mm for absolute fit." },
          { title: "Acoustics", desc: "Internal chambers tuned specifically for lower-frequency thocks." }
        ].map((item, idx) => (
          <div key={idx} className="space-y-2 border-l-2 border-text-primary/10 pl-6 hover:border-text-primary transition-colors">
            <h4 className="text-xs font-bold uppercase tracking-widest">{item.title}</h4>
            <p className="text-sm opacity-50 font-light leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="pt-8">
        <button className="text-[10px] uppercase tracking-[0.5em] font-bold border-b border-text-primary pb-2 hover:opacity-50 transition-opacity">
          Learn about our Philosophy
        </button>
      </div>
    </div>
  </div>
</section>
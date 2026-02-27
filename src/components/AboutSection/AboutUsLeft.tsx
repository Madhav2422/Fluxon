const AboutLeft: React.FC = () => {
    return (
      <div className="flex flex-col gap-6">
        {/* Section label */}
        <div className="flex items-center gap-3">
          <div className="w-1 h-7 bg-[#1a9e83] rounded-full" />
          <h2 className="text-3xl font-bold text-[#0d2340] font-[family-name:var(--font-plus-jakarta)]">
            Our Story
          </h2>
        </div>
  
        {/* Paragraphs */}
        <div className="flex flex-col gap-5 text-gray-500 text-base leading-relaxed font-[family-name:var(--font-dm-sans)]">
          <p>
            Fluxon Infotech was founded with a simple yet powerful vision — to
            empower businesses through technology. Starting as a small team of
            passionate developers, we've grown into a full-service IT company
            serving clients across industries.
          </p>
          <p>
            We believe technology should be an enabler, not a barrier. Our team
            combines deep technical expertise with a genuine understanding of
            business challenges to deliver solutions that make a real impact.
          </p>
          <p>
            From startups to enterprises, we've helped organizations modernize
            their operations, build digital products, and scale with confidence.
          </p>
        </div>
  
        {/* Values chips */}
        <div className="flex flex-wrap gap-2 mt-2">
          {["Innovation", "Transparency", "Reliability", "Client-First"].map((v) => (
            <span
              key={v}
              className="text-xs font-semibold text-[#1a9e83] bg-[#f0fffc] border border-[#1a9e83]/20 px-3 py-1.5 rounded-full font-[family-name:var(--font-dm-sans)]"
            >
              {v}
            </span>
          ))}
        </div>
      </div>
    );
  };
  
  export default AboutLeft;
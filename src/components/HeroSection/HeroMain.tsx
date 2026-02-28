import HeroSectionLeft from "./HeroSectionLeft";

const HeroMain: React.FC = () => {
    return (
        <section
            id="home"
            className="min-h-screen w-full flex items-center justify-center relative overflow-hidden -mt-[90px] pt-[90px]"
            style={{
                background:
                    "linear-gradient(135deg, #e8f4fd 0%, #e0f7f3 50%, #f0fffc 100%)",
            }}
        >
            {/* Dot grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, #1a9e8328 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                }}
            />

            {/* Blue orb top-left */}
            <div className="absolute top-8 left-[-100px] w-80 h-80 rounded-full bg-[#1e5fa8]/08 blur-3xl pointer-events-none" />

            {/* Teal orb bottom-right */}
            <div className="absolute bottom-0 right-[-80px] w-[420px] h-[420px] rounded-full bg-[#1a9e83]/10 blur-3xl pointer-events-none" />

            {/* Content:
                - Mobile: pt-6 gives breathing room below navbar, no negative margin
                - Desktop: md:-mt-16 pulls content above center for visual balance */}
            <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 pt-6 pb-16 w-full md:-mt-16">
                <HeroSectionLeft />
            </div>
        </section>
    );
};

export default HeroMain;
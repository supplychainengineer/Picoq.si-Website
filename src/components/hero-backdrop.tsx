export function HeroBackdrop({ children }: {
  children: React.ReactNode;
}) {
  return (
    <div className="hero-backdrop">
      <div className="hero-backdrop-scene" aria-hidden="true">
        {children}
        <div className="hero-halftone" />
        <div className="hero-backdrop-wash" />
      </div>
    </div>
  );
}

import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, MoveUpRight, Sprout } from "lucide-react";
import { site } from "@/content/site";
import { Navigation } from "@/components/navigation";
import { BrandMark, SparkMark, Wordmark } from "@/components/brand";
import { LocalDemo, SellerDemo, StreetIllustration, VisionDiagram } from "@/components/illustrations";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { HandArtwork } from "@/components/hand-artwork";
import { MotionControl } from "@/components/motion-control";
import { EditorialMotion } from "@/components/editorial-motion";
import { DiscoveryExperience } from "@/components/discovery-experience";

function ExternalLink({ href, children, className = "", arrow = true }: { href: string; children: React.ReactNode; className?: string; arrow?: boolean }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}{arrow && <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />}</a>;
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow section-label ${light ? "label-light" : ""}`}><span className="label-line" />{children}</p>;
}

export default function Home() {
  return (
    <>
      <Navigation />
      <MotionControl labels={site.hero.background} />
      <EditorialMotion />
      <main id="main" tabIndex={-1}>
        <section className="cinematic-hero" aria-labelledby="hero-title">
          <HeroBackdrop><HandArtwork /></HeroBackdrop>
          <div className="hero-center section-shell">
            <p className="eyebrow cinematic-eyebrow">{site.hero.eyebrow}</p>
            <h1 id="hero-title" aria-label={site.hero.heading}>{site.hero.lines.map(line => <span key={line} className="hero-line" aria-hidden="true">{line}</span>)}</h1>
            <p className="hero-description">{site.hero.description}</p>
            <div className="hero-actions"><ExternalLink href={site.links.agent} className="button button-dark">{site.actions.live}</ExternalLink><ExternalLink href={site.links.merchant} className="button button-outline">{site.actions.business}</ExternalLink></div>
            <p className="hero-supporting"><span className="status-dot" />{site.hero.supporting}</p>
          </div>
          <div className="hero-edge section-shell">
            <div className="hero-index"><span className="mono">01 / {site.name.toUpperCase()}</span><span>{site.hero.index}</span></div>
            <div className="hero-typewriter"><span>{site.hero.typingPrefix}</span><span className="word-cycle" aria-hidden="true">{site.hero.typingWords.map(word => <span className="motion-loop" key={word}>{word}</span>)}</span><span className="sr-only">{site.hero.typingWords.join(" ")}</span></div>
            <a href="#what-is-live" className="hero-scroll" aria-label={site.hero.scrollLabel}><span>{site.hero.scrollLabel}</span><ArrowDown size={20} strokeWidth={1} aria-hidden="true" /></a>
          </div>
        </section>

        <div className="mission-ticker" aria-label={site.ticker.label}>
          <div className="ticker-track motion-loop">{[0, 1].map(copy => <div className="ticker-group" key={copy} aria-hidden={copy === 1}>{site.ticker.words.map(word => <span className="ticker-item" key={word}><span>{word}</span><SparkMark /></span>)}</div>)}</div>
        </div>

        <section id="what-is-live" className="stages section-shell" aria-label={site.accessibility.stages}>
          {site.stages.map((stage, i) => <div className={`stage stage-${stage.type}`} key={stage.label}><p className="eyebrow"><span className={i === 0 ? "status-dot" : "outline-dot"} />{stage.label}</p><h2>{stage.title}</h2><p>{stage.description}</p></div>)}
        </section>

        <section className="evidence section-shell section-space" aria-labelledby="evidence-title">
          <SectionLabel>{site.evidence.eyebrow}</SectionLabel>
          <div className="section-heading-row"><h2 id="evidence-title" className="display-heading preserve-lines">{site.evidence.heading}</h2><div className="evidence-intro"><p>{site.evidence.description}</p><ExternalLink href={site.links.agent} className="text-link">{site.actions.live}</ExternalLink></div></div>
          <div className="metrics">{site.evidence.metrics.map(metric => <div className="metric" key={metric.label}><span className="metric-number">{metric.value}<span className="metric-period">.</span></span><span className="metric-label">{metric.label}</span></div>)}</div>
          <div className="evidence-support"><p><ArrowDownRight size={20} aria-hidden="true" />{site.evidence.detail}</p><div className="api-metric"><span className="api-number">{site.evidence.apiValue}</span><div><strong>{site.evidence.apiUnit}</strong></div><p>{site.evidence.apiNote}</p></div></div>
          <p className="footnote">{site.evidence.footnote}</p>
        </section>

        <section id="how-it-works" className="discovery section-space" aria-labelledby="discovery-title">
          <div className="section-shell">
            <div className="discovery-heading"><div><SectionLabel>{site.discovery.eyebrow}</SectionLabel><h2 id="discovery-title" className="display-heading preserve-lines">{site.discovery.heading}</h2></div><div><p className="section-description">{site.discovery.description}</p><span className="status-pill"><span className="outline-dot" />{site.discovery.status}</span></div></div>
            <DiscoveryExperience steps={site.discovery.steps}><LocalDemo /></DiscoveryExperience>
          </div>
        </section>

        <section id="for-businesses" className="business section-shell section-space" aria-labelledby="business-title">
          <SectionLabel>{site.business.eyebrow}</SectionLabel>
          <div className="business-grid"><div className="business-copy"><h2 id="business-title" className="display-heading">{site.business.heading}</h2><p className="section-description">{site.business.description}</p><ul className="business-benefits">{site.business.benefits.map(benefit => <li key={benefit}><Check size={17} strokeWidth={1.7} aria-hidden="true" /><span>{benefit}</span></li>)}</ul><ExternalLink href={site.links.merchant} className="button button-dark">{site.actions.pilot}</ExternalLink><p className="business-note">{site.business.note}</p></div><SellerDemo /></div>
        </section>

        <section id="pilots" className="pilots section-shell section-space" aria-labelledby="pilots-title">
          <SectionLabel>{site.pilots.eyebrow}</SectionLabel><div className="pilots-heading"><h2 id="pilots-title" className="display-heading">{site.pilots.heading}</h2><span className="pilot-heading-art" aria-hidden="true"><Sprout size={52} strokeWidth={1} /></span></div>
          <div className="pilot-panels">{site.pilots.places.map(place => <article key={place.name} className={`pilot-panel pilot-${place.illustration}`}><div className="pilot-panel-top"><span className="mono">{place.marker} / {place.country}</span><span className="status-pill"><span className="outline-dot" />{place.status}</span></div><h3>{place.name}<span>{place.country}</span></h3><p>{place.description}</p><span className="pilot-detail">{place.detail}</span><StreetIllustration variant={place.illustration} /></article>)}</div>
          <div className="shared-learning"><span className="eyebrow">{site.pilots.learningLabel}</span><p>{site.pilots.learning}</p><ArrowUpRight size={28} strokeWidth={1.2} aria-hidden="true" /></div>
        </section>

        <section id="our-story" className="story section-space" aria-labelledby="story-title"><div className="section-shell"><SectionLabel>{site.story.eyebrow}</SectionLabel><div className="story-grid"><div className="story-intro"><h2 id="story-title" className="display-heading preserve-lines">{site.story.heading}</h2><p className="section-description">{site.story.intro}</p></div><ol className="story-chapters">{site.story.chapters.map((chapter, i) => <li key={chapter.title}><span className="chapter-number mono">0{i + 1}</span><div><span className="eyebrow">{chapter.stage}</span><h3>{chapter.title}</h3><p>{chapter.description}</p></div></li>)}</ol></div></div></section>

        <section className="agent-flow section-shell section-space" aria-labelledby="flow-title"><div><SectionLabel>{site.visionDiagram.label}</SectionLabel><h2 id="flow-title" className="display-heading preserve-lines">{site.visionDiagram.heading}</h2><p className="section-description">{site.visionDiagram.description}</p></div><VisionDiagram /></section>

        <section className="vision-section section-space manifesto" aria-labelledby="vision-title"><div className="section-shell"><SectionLabel>{site.vision.eyebrow}</SectionLabel><BrandMark className="vision-brand" /><h2 id="vision-title" aria-label={site.vision.statement}>{site.vision.statement.split(" ").map((word, i) => <span key={i} className="manifesto-word" aria-hidden="true">{word}{" "}</span>)}</h2><div className="vision-footer"><span className="eyebrow">{site.vision.signature}</span><p>{site.vision.description}</p></div></div></section>

        <section className="faq section-shell section-space" aria-labelledby="faq-title"><div className="faq-intro"><SectionLabel>{site.faq.eyebrow}</SectionLabel><h2 id="faq-title" className="display-heading">{site.faq.heading}</h2><p className="section-description">{site.faq.intro}</p></div><div className="faq-items">{site.faq.items.map((item, i) => <details className="faq-item" key={item.question} name="faq"><summary><span className="mono">0{i + 1}</span><h3>{item.question}</h3><span className="faq-toggle"><ChevronDown size={20} strokeWidth={1.5} aria-hidden="true" /></span></summary><p>{item.answer}</p></details>)}</div></section>

        <section className="final-cta section-shell" aria-labelledby="final-title"><div className="final-top"><span className="eyebrow">{site.final.label}</span><span className="final-spark" aria-hidden="true"><SparkMark /></span></div><h2 id="final-title">{site.final.heading}</h2><div className="final-bottom"><div className="final-actions"><ExternalLink href={site.links.merchant} className="button button-dark">{site.actions.business}</ExternalLink><ExternalLink href={site.links.agent} className="text-link">{site.actions.live}</ExternalLink></div><p>{site.final.note}</p></div></section>
      </main>
      <footer className="footer section-shell"><div className="footer-main"><div><a href="#" aria-label={site.accessibility.home}><Wordmark large /></a><p className="footer-mission">{site.footer.mission}</p></div><nav aria-label={site.accessibility.footerNavigation}><ExternalLink href={site.links.existing} className="footer-link">{site.actions.existing}</ExternalLink><ExternalLink href={site.links.agent} className="footer-link">{site.footer.contact}</ExternalLink><a className="footer-link" href="#privacy">{site.footer.privacy}<ArrowRight size={16} aria-hidden="true" /></a></nav><a href="#" className="back-top" aria-label={site.accessibility.backToTop}><MoveUpRight size={24} strokeWidth={1.3} aria-hidden="true" /></a></div><details id="privacy" className="privacy-details"><summary>{site.footer.privacy}<ChevronDown size={16} aria-hidden="true" /></summary><p>{site.footer.privacyText}</p></details><a href="#" className="footer-billboard" aria-label={site.accessibility.backToTop}>{site.name.toUpperCase()}<span><SparkMark /></span></a><div className="footer-bottom"><span>{site.footer.copyright}</span><span>{site.footer.madeFor}</span><span className="footer-mini-mark" aria-hidden="true"><BrandMark /></span></div></footer>
    </>
  );
}

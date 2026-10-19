import { ArrowUp, ArrowUpRight, Check, MessageCircle, ShoppingBag, Sparkles, Store, UserRound } from "lucide-react";
import { site } from "@/content/site";
import { BrandMark, SparkMark } from "./brand";

export function VisionDiagram() {
  const c = site.visionDiagram;
  return (
    <figure className="vision-diagram">
      <figcaption className="diagram-caption"><span className="eyebrow"><span className="small-spark"><SparkMark /></span>{c.label}</span><span className="diagram-status">{c.status}</span></figcaption>
      <div className="diagram-canvas" role="img" aria-label={`${c.note}. ${c.flow}. ${c.question}`}>
        <div className="diagram-grid" />
        <div className="diagram-orbit orbit-one" /><div className="diagram-orbit orbit-two" />
        <svg className="diagram-lines" viewBox="0 0 500 460" fill="none" aria-hidden="true">
          <path className="connector" d="M95 104V180Q95 219 135 219H250M250 219V140Q250 105 290 105H396M250 219V303Q250 347 294 347H406" />
          <path className="signal" d="M95 104V180Q95 219 135 219H250M250 219V303Q250 347 294 347H406" />
          <circle cx="95" cy="104" r="5" fill="#65744f" /><circle cx="396" cy="105" r="5" fill="#65744f" /><circle cx="406" cy="347" r="5" fill="#65744f" />
        </svg>
        <div className="diagram-person"><span className="node-icon"><UserRound size={22} strokeWidth={1.5} /></span><span>{c.customer}</span></div>
        <div className="diagram-assistant"><span className="node-icon"><Sparkles size={23} strokeWidth={1.5} /></span><span>{c.assistant}</span></div>
        <div className="diagram-core"><BrandMark /><span>{c.picoq.toLowerCase()}</span></div>
        <div className="diagram-question"><MessageCircle size={16} strokeWidth={1.5} /><span>{c.question}</span></div>
        <div className="diagram-shop"><span className="shop-icon"><Store size={27} strokeWidth={1.3} /></span><div><strong>{c.shopName}</strong><span>{c.shopNote}</span></div><ArrowUpRight size={16} /></div>
        <span className="diagram-shop-label">{c.shop}</span>
        <span className="diagram-plus plus-one">+</span><span className="diagram-plus plus-two">+</span>
      </div>
      <div className="diagram-bottom"><span>{c.footer}</span><span className="mono">01 — 04</span></div>
    </figure>
  );
}

export function LocalDemo() {
  const c = site.discovery.demo;
  return (
    <figure className="local-demo">
      <figcaption><span className="eyebrow">{c.label}</span><span className="sample-badge">{c.badge}</span></figcaption>
      <div className="chat-window">
        <div className="chat-top"><span className="chat-avatar"><BrandMark /></span><div><strong>{site.name}</strong><span>{c.platform}</span></div><span className="chat-top-spark"><SparkMark /></span></div>
        <div className="chat-body">
          <p className="chat-question">{c.question}<ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" /></p>
          <div className="chat-answer"><span className="mini-brand"><BrandMark /></span><p>{c.answer}</p></div>
          <div className="product-comparison">
            <div className="product-title"><div className="product-can" aria-hidden="true"><span>Diet<br /><b>Coke</b></span></div><div><strong>{c.product}</strong><span>{c.size}</span></div><ShoppingBag size={19} strokeWidth={1.5} aria-hidden="true" /></div>
            {c.listings.map(item => <div className="listing" key={item.name}><div className="listing-top"><strong>{item.name}</strong><strong>{item.price}</strong></div><div className="listing-info"><span>{item.distance}</span><span className={item.available ? "in-stock" : "unconfirmed"}><span className="status-dot" />{item.stock}</span></div><p>{c.confirmedLabel}: {item.confirmed}</p></div>)}
          </div>
          <p className="chat-takeaway"><Check size={14} aria-hidden="true" />{c.takeaway}</p>
          <div className="chat-input" aria-hidden="true"><span>{c.input}</span><span><ArrowUp size={14} strokeWidth={1.5} /></span></div>
        </div>
      </div>
      <p className="demo-disclaimer">{c.disclaimer}</p>
    </figure>
  );
}

export function SellerDemo() {
  const c = site.business.demo;
  return (
    <figure className="seller-demo">
      <figcaption><span className="eyebrow">{c.label}</span><span className="planned-dot" /></figcaption>
      <div className="seller-illustration" aria-hidden="true"><Store size={70} strokeWidth={0.9} /><span className="seller-star"><SparkMark /></span><span className="seller-sun" /></div>
      <span className="seller-time">{c.time}</span>
      <div className="seller-message"><BrandMark /><p>{c.question}</p></div>
      <ul className="seller-replies">{c.responses.map((response, i) => <li key={response}><span>{response}</span>{i === 0 ? <Check size={16} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}</li>)}</ul>
      <p className="seller-caption">{c.footer}</p>
      <p className="seller-note">{c.note}</p>
    </figure>
  );
}

/** Original lightweight line illustrations; no external assets or map coverage claims. */
export function StreetIllustration({ variant }: { variant: "india" | "new-york" }) {
  return (
    <svg className={`street-illustration ${variant}`} viewBox="0 0 560 235" fill="none" aria-hidden="true">
      {variant === "india" ? <>
        <circle cx="430" cy="65" r="36" fill="currentColor" fillOpacity=".08" stroke="none" />
        <path d="M0 217H560M20 217V147L61 135V217M61 147H117V217M95 135V113H119M122 217V112H313V217M112 112L129 79H296L322 112H112ZM131 113V130Q146 146 161 130Q177 146 192 130Q208 146 223 130Q239 146 254 130Q270 146 285 130Q301 146 313 130V113M137 217V155H195V217M211 155H296V196H211V155ZM217 161H290V189H217V161ZM153 155V215M163 183H170M327 217V137H389V217M337 146H377M337 155H377M337 164H377M353 135V109H393V217M400 217V157H439V217M443 217V128H505V217M451 140H467V166H451V140ZM482 140H497V166H482V140ZM451 177H467V204H451V177ZM482 177H497V204H482V177ZM514 216V185M508 195L514 185L520 195M23 115V82M22 97C-2 90 11 67 23 81C34 60 50 87 23 97M71 217V193H104V217M70 193L86 183L106 193M153 93H277" />
        <path d="M27 217V161M28 166C5 157 6 137 20 142C12 122 39 116 40 137C57 131 63 155 28 166M528 217V163M529 177C500 165 509 137 528 151C538 133 557 162 529 177" />
        <path d="M211 174H296M238 155V195M269 155V195M122 208H313M129 87H298M157 89V106M185 89V106M213 89V106M241 89V106M269 89V106" opacity=".45" />
      </> : <>
        <circle cx="108" cy="60" r="34" fill="currentColor" fillOpacity=".06" stroke="none" />
        <path d="M0 217H560M18 217V136H83V217M12 135H90M27 150H40V173H27V150ZM57 150H70V173H57V150ZM30 186H69V217M94 217V81H155V217M88 81H163M109 64H146V81M110 95H121V112H110V95ZM132 95H143V112H132V95ZM110 125H121V142H110V125ZM132 125H143V142H132V125ZM110 155H121V172H110V155ZM132 155H143V172H132V155ZM111 186H142V217M171 217V43H257V217M164 43H264M183 29H243V43M193 15H233V29M213 2V15M183 57H196V75H183V57ZM211 57H224V75H211V57ZM238 57H249V75H238V57ZM183 88H196V106H183V88ZM211 88H224V106H211V88ZM238 88H249V106H238V88ZM183 120H196V138H183V120ZM211 120H224V138H211V120ZM238 120H249V138H238V120ZM183 152H196V170H183V152ZM211 152H224V170H211V152ZM238 152H249V170H238V152ZM198 186H232V217M271 217V116H348V217M265 116H355M280 104H338V116M285 131H301V151H285V131ZM318 131H334V151H318V131ZM285 165H334V198H285V165ZM364 217V79H422V217M357 79H430M378 64H409V79M376 94H389V114H376V94ZM400 94H412V114H400V94ZM376 130H389V150H376V130ZM400 130H412V150H400V130ZM375 166H412V217M438 217V141H510V217M431 140H518M450 155H467V180H450V155ZM481 155H498V180H481V155ZM462 193H489V217M533 216V160M522 162H544M522 162V148Q533 135 544 148V162" />
        <path d="M214 186V217M302 165V198M317 165V198M33 186V217M48 186V217M64 186V217M270 205H347M365 205H420M440 205H509" opacity=".45" />
      </>}
    </svg>
  );
}

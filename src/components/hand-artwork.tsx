/** Original local artwork: a monochrome hand study, not a missing video asset. */
export function HandArtwork() {
  const silhouette = "M420 1020C438 900 440 835 396 772L288 621C263 586 239 555 208 525C177 493 165 459 184 441C204 420 235 435 262 459L351 540C363 550 376 548 375 524L321 283C311 238 317 210 342 205C370 199 385 223 393 258L442 446C446 463 459 463 458 443L433 180C429 140 442 118 467 118C495 118 507 145 510 179L536 429C537 445 551 444 553 425L568 220C571 185 587 167 611 171C637 175 647 196 643 235L629 451C628 472 641 476 648 456L699 310C709 278 730 265 750 276C774 287 776 311 765 345L704 560C691 603 691 647 674 700C656 754 630 785 622 846L611 1020Z";

  return <svg className="hero-hand" viewBox="0 0 1000 1000" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="hand-metal" x1="230" y1="380" x2="690" y2="580" gradientUnits="userSpaceOnUse">
        <stop stopColor="#77796e" /><stop offset=".2" stopColor="#d5d4cb" /><stop offset=".4" stopColor="#ecece4" /><stop offset=".62" stopColor="#b9b9ae" /><stop offset=".82" stopColor="#edede5" /><stop offset="1" stopColor="#919489" />
      </linearGradient>
      <linearGradient id="hand-edge" x1="325" y1="270" x2="640" y2="930" gradientUnits="userSpaceOnUse"><stop stopColor="#f5f3ef" /><stop offset=".5" stopColor="#777b6f" /><stop offset="1" stopColor="#deded3" /></linearGradient>
      <radialGradient id="hand-palm"><stop stopColor="#f9f8f2" /><stop offset=".8" stopColor="#c7c8ba" /><stop offset="1" stopColor="#969b8a" /></radialGradient>
      <clipPath id="hand-clip"><path d={silhouette} /></clipPath>
    </defs>
    <g className="hero-hand-form">
      <path d={silhouette} fill="url(#hand-metal)" stroke="url(#hand-edge)" strokeWidth="2" />
      <g clipPath="url(#hand-clip)">
        <ellipse cx="535" cy="635" rx="145" ry="185" fill="url(#hand-palm)" opacity=".72" transform="rotate(17 535 635)" />
        <path d="M348 235L414 498M467 146L498 474M606 198L587 474M739 300L675 509" stroke="#f8f8ef" strokeWidth="12" strokeLinecap="round" opacity=".62" />
        <path d="M368 263L426 468M493 172L520 454M630 220L613 462M757 318L695 526" stroke="#7b8073" strokeWidth="4" strokeLinecap="round" opacity=".3" />
        <path d="M351 540C407 560 449 591 455 651C460 707 421 744 409 764M414 539C475 577 570 591 655 547M428 581C493 607 566 640 627 701M484 677C529 712 548 754 548 816M448 817C499 831 562 838 622 818" stroke="#7b8070" strokeWidth="2.5" strokeLinecap="round" opacity=".48" />
        <path d="M351 540C408 569 439 611 438 656M435 550C499 581 574 591 643 566M458 844C503 859 556 859 611 843" stroke="#f8f8ef" strokeWidth="5" strokeLinecap="round" opacity=".7" />
        <path d="M331 298L382 287M342 351L393 340M438 230L510 226M444 298L519 292M565 276L639 280M561 337L635 340M693 364L751 381M674 418L731 437" stroke="#747b6b" strokeWidth="1.5" opacity=".28" />
        <path d="M465 892C492 859 541 859 588 890L577 1030H457L465 892Z" fill="#f1f0e7" opacity=".38" />
      </g>
    </g>
  </svg>;
}

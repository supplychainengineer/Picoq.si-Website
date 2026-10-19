"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { Wordmark } from "./brand";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const destination = useRef<string | null>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 900px)");
    const closeOnDesktop = () => { if (desktop.matches) dialog.current?.close(); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  function openMenu() {
    dialog.current?.showModal();
    setOpen(true);
  }

  function afterClose() {
    setOpen(false);
    if (destination.current) {
      const hash = destination.current;
      destination.current = null;
      const section = document.querySelector<HTMLElement>(hash);
      history.pushState(null, "", hash);
      section?.setAttribute("tabindex", "-1");
      section?.focus({ preventScroll: true });
      section?.scrollIntoView({ block: "start" });
    } else {
      trigger.current?.focus();
    }
  }

  function navigateToSection(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    destination.current = href;
    dialog.current?.close();
  }

  function keepFocusInMenu(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const items = dialog.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    if (!items?.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">{site.accessibility.skip}</a>
      <header className={`navigation ${scrolled ? "is-scrolled" : ""}`}>
        <a href="#" aria-label={site.accessibility.home} className="brand-link"><Wordmark /></a>
        <nav aria-label={site.accessibility.navigation} className="desktop-nav">
          {site.navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="button button-dark nav-cta" href={site.links.agent} target="_blank" rel="noopener noreferrer">{site.actions.try}<ArrowUpRight size={16} aria-hidden="true" /></a>
        <button ref={trigger} type="button" className="menu-trigger" aria-label={site.accessibility.openMenu} aria-expanded={open} aria-controls="mobile-menu" onClick={openMenu}><Menu size={24} aria-hidden="true" /></button>
      </header>
      <dialog ref={dialog} id="mobile-menu" className="mobile-dialog" aria-label={site.accessibility.mobileMenu} onClose={afterClose} onKeyDown={keepFocusInMenu} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="mobile-dialog-content">
          <div className="mobile-menu-top"><Wordmark /><button type="button" className="menu-trigger" aria-label={site.accessibility.closeMenu} onClick={() => dialog.current?.close()}><X size={24} aria-hidden="true" /></button></div>
          <nav aria-label={site.accessibility.navigation}>
            {site.navigation.map((item, i) => <a key={item.href} href={item.href} onClick={event => navigateToSection(event, item.href)}><span className="mono">0{i + 1}</span>{item.label}<ArrowUpRight aria-hidden="true" /></a>)}
          </nav>
          <a className="button button-dark" href={site.links.agent} target="_blank" rel="noopener noreferrer" onClick={() => dialog.current?.close()}>{site.actions.live}<ArrowUpRight size={18} aria-hidden="true" /></a>
          <p>{site.hero.supporting}</p>
        </div>
      </dialog>
    </>
  );
}

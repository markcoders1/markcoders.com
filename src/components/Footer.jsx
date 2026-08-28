import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MarkcodersText from "./MarkcodersText";

import "../App.css";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

const EXPLORE_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact Us", to: "/contact" },
];

const SOCIAL_LINKS = [
  { label: "Behance", href: "https://www.behance.net/markcoders" },
  { label: "Instagram", href: "https://www.instagram.com/markcoders" },
  { label: "Linkedin", href: "https://www.linkedin.com/company/markcoders" },
  { label: "The X", href: "https://x.com/markcoders" },
];

const HEADING_LINES = [
  "Design for those who want to",
  "become a better version of",
  "themselves.",
];

const Footer = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 85%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        });

        tl.fromTo(
          ".js-line",
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.09 }
        )
          .fromTo(
            ".js-cta",
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.55"
          )
          .fromTo(
            ".js-col",
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.1 },
            "-=0.5"
          )
          .fromTo(
            ".js-brand",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            "-=0.35"
          );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={rootRef} className="footer footer-bg">
      <div className="footer__inner mx-auto w-full max-w-[1440px] px-6 pt-16 sm:px-10 sm:pt-20 lg:px-20 lg:pt-24">
        <div className="footer__top flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="footer__intro max-w-md">
            <h2 className="footer__heading text-3xl font-semibold leading-tight sm:text-4xl">
              {HEADING_LINES.map((line) => (
                <span className="footer__line-mask" key={line}>
                  <span className="js-line footer__line">{line}</span>
                </span>
              ))}
            </h2>

            <Link to="/contact" className="js-cta footer__cta mt-8">
              <span className="footer__cta-icon" aria-hidden="true">
                ↗
              </span>
              Get in Touch
            </Link>
          </div>

          <nav
            className="footer__columns grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-x-14 lg:gap-x-20"
            aria-label="Footer"
          >
            <div className="js-col footer__col col-span-2 sm:col-span-1">
              <h3 className="footer__col-title">Explore</h3>
              <ul>
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="js-col footer__col">
              <h3 className="footer__col-title">Socials</h3>
              <ul>
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="footer__link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="js-col footer__col">
              <h3 className="footer__col-title">Contact</h3>
              <ul>
                <li>
                  <a href="tel:+923341218085" className="footer__link">
                    0334 1218085
                  </a>
                </li>
                <li>
                  <a href="mailto:info@markcoders.com" className="footer__link">
                    info@markcoders.com
                  </a>
                </li>
                <li className="footer__address">
                  E15, Street No. 2, Block A,
                  <br />
                  Gulshan-e-Jamal, Karachi
                </li>
              </ul>
            </div>
          </nav>
        </div>

      </div>

      <div className="js-brand footer__brand-wrap">
        <MarkcodersText />
      </div>
    </footer>
  );
};

export default Footer;

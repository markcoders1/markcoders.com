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
      <div className="footer__inner mx-auto w-full max-w-[1440px] px-6 pt-16 sm:px-10 sm:pt-20 lg:px-20 lg:pt-24 pb-40">
        <div className="footer__top flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="footer__intro max-w-md">
            <h2
              className="footer__heading font-medium text-white"
              style={{
                fontFamily: 'Switzer, sans-serif',
                fontSize: 'clamp(22px, 3.5vw, 35px)',
                lineHeight: 'clamp(26px, 4vw, 39px)',
                letterSpacing: '-1px',
              }}
            >
              {HEADING_LINES.map((line) => (
                <span className="footer__line-mask" key={line}>
                  <span className="js-line footer__line">{line}</span>
                </span>
              ))}
            </h2>

            <Link
              to="/contact"
              className="js-cta inline-flex items-center justify-center gap-2.5 px-7 text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-xl mt-20 group"
              style={{
                height: '52.88px',
                borderRadius: '15px',
                background: '#25A9E0',
                boxShadow: '0 4px 20px rgba(37, 169, 224, 0.3)',
                fontFamily: 'Switzer, sans-serif',
                fontWeight: 500,
                fontSize: '18px',
                lineHeight: '30px',
                letterSpacing: '-0.5px',
                textDecoration: 'none'
              }}
            >
              <svg
                width="19.08"
                height="19.08"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Get in Touch</span>
            </Link>
          </div>

          <nav
            className="footer__columns flex flex-col sm:flex-row flex-wrap gap-10 sm:gap-16 lg:gap-24"
            aria-label="Footer"
          >
            <div className="js-col footer__col">
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

            <div className="js-col footer__col max-w-[280px]">
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

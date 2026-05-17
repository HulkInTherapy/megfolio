"use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-signature">
          <p className="handwritten tilt-left-subtle" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
            {personalInfo.name}
          </p>
          <p className="margin-note">
            {personalInfo.role}
          </p>
        </div>

        <div className="footer-social">
          {Object.entries(personalInfo.socialLinks).map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span>{name}</span>
              <ArrowUpRight size={12} />
            </a>
          ))}
        </div>

        <div className="footer-close">
          <p className="handwritten" style={{ fontSize: '1rem', color: 'var(--pencil)' }}>
            ~ {currentYear} ~
          </p>
          <p className="margin-note" style={{ marginTop: '8px', fontSize: '0.85rem' }}>
            this diary was written with code
          </p>
        </div>
      </div>

      <style>{`
        .footer-social {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .footer-signature {
          flex: 1;
          min-width: 200px;
        }

        .footer-close {
          text-align: right;
        }

        @media (max-width: 768px) {
          .footer-close {
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="site-container">
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

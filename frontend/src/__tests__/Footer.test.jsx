// frontend/src/__tests__/Footer.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../components/Footer';

describe('Footer Component', () => {
  test('renders the copyright text and links', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const dynamicExpectedText = `© ${currentYear} E‑SIGN PRO`;

    expect(screen.getByText(dynamicExpectedText, { exact: false })).toBeInTheDocument();

    // Vérifie la présence du lien "Textes légaux"
    const textesLegauxLink = screen.getByRole('link', { name: 'Textes légaux' });
    expect(textesLegauxLink).toBeInTheDocument();
    expect(textesLegauxLink).toHaveAttribute('href', '/textes-legaux');

    // Vérifie la présence du lien "RGPD"
    const rgpdLink = screen.getByRole('link', { name: 'RGPD' });
    expect(rgpdLink).toBeInTheDocument();
    expect(rgpdLink).toHaveAttribute('href', '/rgpd');
  });

  test('renders the footer with correct ARIA role', () => {
    render(<Footer />);
    // Le rôle ARIA 'contentinfo' est le rôle sémantique standard pour un footer
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
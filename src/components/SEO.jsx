import { useEffect } from 'react';

/**
 * Reusable SEO Engine with Programmatic Meta Tag Update & Schema.org JSON-LD Injection.
 * Optimized for Organic Discovery: "Cinematic Video Editor", "Premium Portfolio Photography", "Creative Production Studio".
 */
export default function SEO({
  title = "FOCUS PHOTO FILMS | Premium Photography & Cinematic Editing Studio",
  description = "Focus Photo Films is a luxury creative production studio specializing in fine art photography, professional color grading, and cinematic video editing. Based in London & New York.",
  keywords = "Cinematic Video Editor, Premium Portfolio Photography, Creative Production Studio, Focus Photo Films, Luxury Video Grading, Editorial Fashion Photographer, Fine Art Photography Studio",
  ogImage = "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200",
  canonicalUrl = window.location.href,
  schemaData = null
}) {
  useEffect(() => {
    // 1. Programmatically update document title
    document.title = title;

    // Helper to get or create meta tag
    const updateMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to get or create link tag
    const updateLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Inject standard meta tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag('name', 'robots', 'index, follow');

    // 3. Inject Open Graph (Facebook / Social Sharing)
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:site_name', 'Focus Photo Films');

    // 4. Inject Twitter Cards
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImage);

    // 5. Inject Canonical Link
    updateLinkTag('canonical', canonicalUrl);

    // 6. Programmatically inject Schema.org JSON-LD Structured Data
    // Strict usage for search crawler processing
    const defaultSchema = {
      "@context": "https://schema.org",
      "@type": "PhotographyBusiness",
      "@id": "https://focusphotofilms.com/#business",
      "name": "Focus Photo Films",
      "alternateName": "Focus Photo Films Production Studio",
      "url": "https://focusphotofilms.com",
      "logo": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=200",
      "image": ogImage,
      "description": description,
      "telephone": "+44 20 7946 0958",
      "priceRange": "$$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "32 Glasshouse Street, Soho",
        "addressLocality": "London",
        "postalCode": "W1B 5DG",
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.510091,
        "longitude": -0.136848
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "19:00"
      },
      "sameAs": [
        "https://instagram.com/focusphotofilms",
        "https://vimeo.com/focusphotofilms",
        "https://youtube.com/focusphotofilms"
      ]
    };

    const finalSchema = schemaData || defaultSchema;
    
    // Check if script tag already exists
    let scriptTag = document.getElementById('seo-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'seo-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(finalSchema, null, 2);

    // Cleanup: Remove custom injected meta tags or scripts on unmount to keep DOM clean
    return () => {
      // We keep standard tags but we can clean up custom JSON-LD schema
      const scriptToRemove = document.getElementById('seo-jsonld');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [title, description, keywords, ogImage, canonicalUrl, schemaData]);

  return null; // SEO wrapper performs updates imperatively, renders nothing
}

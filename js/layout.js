
(function (global) {
  'use strict';

  var SITE = {
    name: 'Katakana Converter',
    tagline: 'Free Katakana Conversion Tool',
    url: 'https://www.katakanaconverter.com',
    description: 'Convert English words to Katakana instantly with our free, zero-API phoneme-based Katakana Converter. Accurate browser-based transliteration for names, scripts, and form-friendly Japanese text.',
    email: 'contact@katakanaconverter.com',
    phone: '+1 (555) 240-9087',
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect rx='18' width='100' height='100' fill='%236366f1'/%3E%3Ctext x='50' y='68' font-size='52' text-anchor='middle' fill='white' font-family='sans-serif' font-weight='bold'%3E%E3%82%AB%3C/text%3E%3C/svg%3E",
    social: {
      twitter: 'https://twitter.com/katakanaconvert',
      facebook: 'https://facebook.com/katakanaconverter',
      linkedin: 'https://linkedin.com/company/katakana-converter',
      pinterest: 'https://pinterest.com/katakanaconverter'
    }
  };

  var NAV_LINKS = [
    { label: 'Home', href: '/' },
    {
      label: 'Our Tools ▼',
      isDropdown: true,
      href: '#',
      groups: [
        {
          title: '🔤 NAME TOOLS',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
          items: [
            { label: 'Katakana Name Converter', href: '/name-to-katakana/' },
            { label: 'English Name → Katakana', href: '/english-name/' },
            { label: 'Japanese Name → Katakana', href: '/japanese-name/' },
            { label: 'Full-Width Katakana Name', href: '/full-width-name/' }
          ]
        },
        {
          title: 'SCRIPT CONVERSION',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 3 4 4-4 4"></path><path d="M20 7H4"></path><path d="m8 21-4-4 4-4"></path><path d="M4 17h16"></path></svg>',
          items: [
            { label: 'Hiragana → Katakana', href: '/hiragana-to-katakana/' },
            { label: 'Katakana → Hiragana', href: '/katakana-to-hiragana/' },
            { label: 'Romaji → Katakana', href: '/romaji-to-katakana/' },
            { label: 'Full-Width Katakana Converter', href: '/full-width-katakana/' }
          ]
        },
        {
          title: '🈶 KANJI TOOLS',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"></path><path d="M5 8h14"></path><path d="M15 15H9"></path></svg>',
          items: [
            { label: 'Kanji → Katakana', href: '/kanji-to-katakana/' },
            { label: 'Kanji → Hiragana', href: '/kanji-to-hiragana/' }
          ]
        },
        {
          title: '🌏 OTHER CONVERSIONS',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
          items: [
            { label: 'Chinese → Katakana', href: '/chinese-to-katakana/' },
            { label: 'Latin → Katakana', href: '/latin-to-katakana/' }
          ]
        }
      ]
    },
    { label: 'Blog', href: '/blog/' },
    { label: 'About', href: '/about-us/' },
    { label: 'Contact', href: '/contact-us/' }
  ];

  var FOOTER_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'About Us', href: '/about-us/' },
    { label: 'Contact Us', href: '/contact-us/' },
    { label: 'Terms', href: '/terms/' },
    { label: 'Privacy', href: '/privacy/' },
    { label: 'Sitemap', href: '/sitemap/' }
  ];

  var TOOL_LINKS = [
    { label: 'Katakana Name Converter', href: '/name-to-katakana/' },
    { label: 'English Name to Katakana', href: '/english-name/' },
    { label: 'Katakana to Hiragana', href: '/katakana-to-hiragana/' },
    { label: 'Hiragana to Katakana', href: '/hiragana-to-katakana/' },
    { label: 'Romaji to Katakana', href: '/romaji-to-katakana/' },
    { label: 'Japanese Name to Katakana', href: '/japanese-name/' },
    { label: 'Full-Width Katakana', href: '/full-width-katakana/' },
    { label: 'Full-Width Katakana Name', href: '/full-width-name/' },
    { label: 'Kanji to Katakana', href: '/kanji-to-katakana/' }
  ];

  function renderHeader(activePage) {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var navHTML = NAV_LINKS.map(function (link) {
      if (link.isDropdown && link.groups) {
        var groupsHTML = link.groups.map(function(group) {
          var itemsHTML = group.items.map(function(sub) {
            var cls = activePage === sub.href ? ' class="active"' : '';
            return '<li>' +
                     '<a href="' + sub.href + '"' + cls + '>' +
                       '<span class="dropdown-bullet"></span>' + sub.label +
                     '</a>' +
                   '</li>';
          }).join('');
          
          return '<div class="dropdown-group">' +
                   '<div class="group-header">' +
                     '<span class="group-icon">' + group.icon + '</span>' +
                     '<span class="group-title">' + group.title + '</span>' +
                   '</div>' +
                   '<ul class="group-items">' + itemsHTML + '</ul>' +
                 '</div>';
        }).join('');
        
        return '<li class="nav-dropdown mega-menu">' +
                 '<a href="#" aria-haspopup="true">' + link.label + '</a>' +
                 '<div class="dropdown-content mega-dropdown">' + groupsHTML + '</div>' +
               '</li>';
      } else {
        var cls = activePage === link.href ? ' class="active"' : '';
        return '<li><a href="' + link.href + '"' + cls + '>' + link.label + '</a></li>';
      }
    }).join('');

    header.innerHTML =
      '<div class="container header-inner">' +
      '<a href="/" class="logo" aria-label="Katakana Converter Home">' +
      '<span class="logo-icon" aria-hidden="true">カ</span>' +
      '<span class="logo-text">' +
      '<span class="logo-title">Katakana Converter</span>' +
      '<span class="logo-tagline">' + SITE.tagline + '</span>' +
      '</span>' +
      '</a>' +
      '<nav class="header-nav-shell" aria-label="Main Navigation">' +
      '<ul class="desktop-nav">' + navHTML + '</ul>' +
      '</nav>' +
      '<button id="mobile-nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="mobile-menu">' +
      '<span class="hamburger-icon">☰</span><span class="close-icon" style="display:none">✕</span>' +
      '</button>' +
      '</div>' +
      '<nav id="mobile-menu" aria-hidden="true" aria-label="Mobile Navigation">' +
      NAV_LINKS.map(function (l) {
        if (l.isDropdown && l.groups) {
          return l.groups.map(function(g) {
            var header = '<div class="mobile-group-header">' + g.title + '</div>';
            var links = g.items.map(function (sub) {
              return '<a href="' + sub.href + '" class="mobile-sub-link">' + sub.label + '</a>';
            }).join('');
            return header + links;
          }).join('');
        }
        return '<a href="' + l.href + '">' + l.label + '</a>';
      }).join('') +
      '</nav>';

    // Mobile toggle
    var toggle = document.getElementById('mobile-nav-toggle');
    var menu = document.getElementById('mobile-menu');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        var expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
        menu.setAttribute('aria-hidden', expanded);
        menu.classList.toggle('open');
        document.body.classList.toggle('menu-open');
        this.querySelector('.hamburger-icon').style.display = expanded ? '' : 'none';
        this.querySelector('.close-icon').style.display = expanded ? 'none' : '';
      });
      menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          toggle.setAttribute('aria-expanded', 'false');
          menu.setAttribute('aria-hidden', 'true');
          menu.classList.remove('open');
          document.body.classList.remove('menu-open');
          toggle.querySelector('.hamburger-icon').style.display = '';
          toggle.querySelector('.close-icon').style.display = 'none';
        });
      });
    }

    // Desktop dropdown click to open
    document.querySelectorAll('.nav-dropdown > a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var parent = this.parentElement;
        var isOpen = parent.classList.contains('open');
        // Close all others
        document.querySelectorAll('.nav-dropdown').forEach(function (d) { d.classList.remove('open'); });
        if (!isOpen) parent.classList.add('open');
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown').forEach(function (d) { d.classList.remove('open'); });
      }
    });

  }

  function socialIcon(type) {
    var icons = {
      facebook: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>',
      twitter: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>',
      linkedin: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z"/></svg>',
      pinterest: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>'
    };
    return icons[type] || '';
  }

  function renderFooter() {
    var footer = document.querySelector('.site-footer');
    if (!footer) return;

    var linksHTML = FOOTER_LINKS.map(function (l) {
      return '<li><a href="' + l.href + '">' + l.label + '</a></li>';
    }).join('');

    var toolsHTML = TOOL_LINKS.map(function (l) {
      return '<li><a href="' + l.href + '">' + l.label + '</a></li>';
    }).join('');

    var socialHTML = '';
    var socials = SITE.social;
    ['facebook', 'twitter', 'linkedin', 'pinterest'].forEach(function (key) {
      if (socials[key]) {
        socialHTML += '<a href="' + socials[key] + '" target="_blank" rel="noopener noreferrer" aria-label="' + key + '" class="social-icon">' + socialIcon(key) + '</a>';
      }
    });

    var contactHTML =
      '<div class="footer-contact-list">' +
      '<a href="tel:+15552409087" class="footer-contact-item">' +
      '<span class="footer-contact-label">Phone</span>' +
      '<span>' + SITE.phone + '</span>' +
      '</a>' +
      '<a href="mailto:' + SITE.email + '" class="footer-contact-item">' +
      '<span class="footer-contact-label">Email</span>' +
      '<span>' + SITE.email + '</span>' +
      '</a>' +
      '</div>';

    footer.innerHTML =
      '<div class="container footer-inner">' +
      '<div class="footer-brand">' +
      '<a href="/" class="logo" aria-label="Home">' +
      '<span class="logo-icon" aria-hidden="true">カ</span>' +
      '<span>Katakana Converter</span>' +
      '</a>' +
      '<p class="footer-desc">' + SITE.description + '</p>' +
      '</div>' +
      '<div class="footer-nav-col">' +
      '<h3>Navigation</h3>' +
      '<ul class="footer-links">' + linksHTML + '</ul>' +
      '</div>' +
      '<div class="footer-nav-col">' +
      '<h3>Our Tools</h3>' +
      '<ul class="footer-links" style="font-size:0.8rem;">' + toolsHTML + '</ul>' +
      '</div>' +
      '<div class="footer-social-col">' +
      '<h3>Connect</h3>' +
      contactHTML +
      '<div class="social-icons">' + socialHTML + '</div>' +
      '</div>' +
      '</div>' +
      '<div class="container footer-bottom">' +
      '<p>&copy; ' + new Date().getFullYear() + ' ' + SITE.name + '. All rights reserved.</p>' +
      '</div>' +
      '<button class="back-to-top" type="button" aria-label="Back to top">↑</button>';
  }

  function initLayout(activePage) {
    document.addEventListener('DOMContentLoaded', function () {
      renderHeader(activePage || '/');
      renderFooter();

      // Smooth scroll for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
          var target = document.querySelector(this.getAttribute('href'));
          if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
      });

      var backToTop = document.querySelector('.back-to-top');
      function syncBackToTop() {
        if (!backToTop) return;
        backToTop.classList.toggle('visible', window.scrollY > 360);
      }
      if (backToTop) {
        backToTop.addEventListener('click', function () {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        syncBackToTop();
        window.addEventListener('scroll', syncBackToTop, { passive: true });
      }
    });
  }

  global.SiteLayout = { init: initLayout, SITE: SITE, NAV_LINKS: NAV_LINKS, FOOTER_LINKS: FOOTER_LINKS };
})(typeof window !== 'undefined' ? window : this);

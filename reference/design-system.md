# Inspected design system

Source: public DOM and computed CSS of https://tradekaro.com, inspected 2026-09-29. Raw measurements are in `inspection/` (all 21 pages) and `details/home-{width}.json` (four widths). Public brand assets are isolated in `assets/`.

## Typography

Plus Jakarta Sans, locally catalogued WOFF2. Headings use 800–900 weight (font max 800, browser synthesizes the source's 900). Body 400; buttons 600; navigation 600. Desktop homepage hero: 62px / 79px; mobile 40px / 52px. Main desktop section headings 50px / 60–73px; mobile 30px / 36–45px. Cards 20px / 24px, body 16px / 24px; homepage hero body 19px / 28.5px, mobile 16px. Navigation 17px; footer links 13px. Predominantly normal letter spacing.

## Color

Primary #FEB600; highlighted text #FFB000. Text #000, secondary #333, body muted #7A7A7A. White #FFF, market surface #F8F8F8, features #F0F0F0. Testimonials/footer black. FAQ pale yellow with the supplied BG-2-2 image. Header gradient 301deg yellow at 0%, white at 76%. Perks/counters gradient 236deg yellow to white. Inner hero white-to-yellow gradient. Hero top decoration uses a diagonal clipped yellow gradient.

## Layout

Desktop content max 1250px: x=95 at 1440, x=335 at 1920. Most children add 10px. Header 86px, mobile 70px plus a 44px black account bar. Homepage desktop hero ends at y=978; perks start y=1008 and have 210px height. Mobile hero is stacked, starts y=114, ends y=918. Desktop alternating market rows retain substantial whitespace: 200px pills, about 290px row pitch. Mobile pills 115px, 175px pitch, circles 115px. Desktop 3-column feature grid; mobile single column, cards inside 30px side padding. Common sections use 50–80px spacing. Shared contact strip is a 50/50 yellow/cream split, stacked on mobile. Footer uses 5 desktop columns, two mobile columns with contact full width.

## Controls

Buttons: 5px radius, typical 15px 30px padding; hero 157x52 desktop and 137x42 mobile. Header login black/white, registration white/black. Feature cards white, small radius, gray soft shadow. Market title circles white, offset gray shadow. FAQ rows approximately 60px, fine pale divider and right-aligned circular plus icon. Accordion answers expand below the triggering row. Tables have thin gray borders, cream alternating cells and yellow active tabs.

## Responsive rules

Source Elementor breakpoints at 1024 and 767. Mobile navigation is a white drawer entering from right, approximately 300px wide at 390; dimmed backdrop, nested navigation, login/register and social icons. Fixed mobile bottom bar has Android, WhatsApp, Apple columns. Desktop platform rail fixed at right y=180. Desktop homepage pills alternate alignment; mobile retains the alternating image/title ordering, rather than turning into generic cards. Influencers show 4 desktop / 1 mobile, testimonials 3 / 1, guides 4 / 1. Tablet follows separate column and text sizing rules visible in screenshots.

## Motion and states

Source buttons and containers mostly transition 0.3s; transforms 0.4s. Mobile drawer source entrance duration 1s. Carousels loop and have previous/next buttons. Counters animate after entering viewport. Video play opens a lightbox. FAQs are individually toggled. Dropdowns open on hover and are also keyboard operable. Reproduce meaningful transitions and respect reduced-motion preferences.

## Capture normalization and source defects

The reference auto-opens a third-party Zoho support panel. It intermittently stays loading and can cover the entire mobile hero. Raw captures preserve this. Clean state/comparison captures suppress only the third-party overlay to inspect the actual page. The recreation uses configurable frontend account destinations and a local contact interaction; it does not connect to private portals or the live support service. Market price widgets are externally hosted; the recreation labels their public static reference data rather than suggesting live prices.

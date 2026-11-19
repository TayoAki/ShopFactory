import {journalGuides} from './journal-guides';
import type {JournalPost} from './journal-types';
export const journal:JournalPost[] = [
  ...journalGuides,
  {
    slug: 'find-your-golf-hat-fit',
    title: 'How Should a Golf Hat Fit? A Practical Measuring Guide',
    category: 'Fit notes',
    date: '2026-11-18',
    image: '/images/journal/find-your-golf-hat-fit-photo-v2.webp',
    alt: "AI-edited stock photograph of hands holding a baseball cap",
    excerpt: 'Roomy crown? Slipping brim? Here is how to narrow down your next golf hat.',
    sections: [
      { title: 'Start with how your current cap feels', text: 'Before choosing a color, think about the hat you already reach for. Does it sit comfortably above your ears, or do you keep pulling it back into place? A closure can adjust the circumference, but it cannot change the entire shape of the crown. If most adjustable caps still feel roomy, start with a style designed for a smaller head.' },
      { title: 'Measure where the hat will sit', text: 'Use a soft measuring tape around your head, just above your eyebrows and ears. Keep it level and comfortable rather than pulling it tight. Read the fit notes on the product page before ordering. If you need an exact circumference range that is not listed, ask us before choosing a size. Our Small Fit Performance Cap is the place to start if standard caps tend to feel too large; the other adjustable styles have their own fit notes.' },
      { title: 'Think about your hair, too', text: 'A low ponytail, high bun, short cut and loose curls each ask something different of a hat. Look for a ponytail opening if you wear your hair up. A visor leaves the crown open. Check the photographs and feature list for the exact style you are considering, because not every cap has the same opening.' },
      { title: 'Try it on before your first round', text: 'With the tags attached, adjust the closure and gently turn your head. The cap should feel secure without squeezing. Check how the brim sits with your sunglasses and whether the crown feels comfortable. Keep the hat unused while you decide, and read our Shipping & Returns page if you need another option.' },
    ],
    collection: '/pages/fit-quiz',
    cta: 'Find your hat with the fit quiz',
    imageCredit: {"label": "Original photo: Pexels", "source": "https://www.pexels.com/photo/man-holding-black-baseball-cap-in-hands-18670550/", "license": "https://www.pexels.com/license/"},
  },
  {
    slug: 'ponytail-caps-for-your-round',
    title: 'Ponytail Golf Hats: Concealed Openings vs Open Backs',
    category: 'On the course',
    date: '2026-11-18',
    image: '/images/journal/ponytail-caps-for-your-round-photo-v2.webp',
    alt: "AI-edited stock photograph of a ponytail through the back of a cap",
    excerpt: 'A closer look at concealed openings, open backs, and finding a cap that works with your hair.',
    sections: [
      { title: 'Choose the opening for your usual hairstyle', text: 'When you wear your hair up for a round, the opening in your cap matters as much as the front. A concealed ponytail opening gives you a way to pull your hair through while keeping a classic cap silhouette. An open-back design offers a different shape around your ponytail or bun. Check the back view and the feature details rather than choosing on color alone.' },
      { title: 'Meet the ponytail lineup', text: 'The Front Nine Ponytail Cap, Range Day Mesh Cap, Cart Path Trucker and Turn Cord Cap have concealed ponytail openings. The Back Nine Ponytail Cap uses an open-back construction. These styles differ in material, decoration and features, so the right one depends on what you want from your everyday golf hat.' },
      { title: 'Separate sun coverage from sun ratings', text: 'A brim can shade your eyes, but a UPF rating is a separate product feature. If rated fabric is important to you, look for the UPF 50+ designation on the individual product. The Back Nine Ponytail Cap has that rating; do not assume every ponytail cap does. A hat is one part of how you plan for a sunny day outdoors.' },
      { title: 'Make the adjustment before you tee off', text: 'Put your hair in its usual playing style before adjusting the closure. Feed it gently through the opening, then adjust the cap to sit comfortably above your ears. If you change from a ponytail to a bun halfway through the day, take a moment to readjust. A comfortable setup means one less thing to think about over the ball.' },
    ],
    collection: '/collections/ponytail-caps',
    cta: 'Explore ponytail caps',
    imageCredit: {"label": "Original photo: Pexels", "source": "https://www.pexels.com/photo/black-and-white-back-view-of-woman-in-ponytail-26836883/", "license": "https://www.pexels.com/license/"},
  },
];

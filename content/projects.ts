import type { Media, Project } from "./types";

// DUMMY CONTENT — replace with real projects. Leave `src` empty to show a placeholder,
// or set it to a path in /public (e.g. "/projects/oak-kitchen/1.jpg") or a remote URL.

const ph = (en: string, gu: string): Media => ({ alt: { en, gu } });

const gallery = (en: string, gu: string, count = 4): Media[] =>
  Array.from({ length: count }, (_, i) => ph(`${en} — photo ${i + 1}`, `${gu} — ફોટો ${i + 1}`));

export const projects: Project[] = [
  {
    slug: "white-oak-kitchen-brampton",
    category: "kitchens",
    featured: true,
    title: { en: "White Oak Family Kitchen", gu: "વ્હાઇટ ઓક ફેમિલી કિચન" },
    summary: {
      en: "A dated 1990s kitchen reworked with rift-sawn white oak cabinets, a 9-foot island and a walk-in pantry.",
      gu: "1990ના દાયકાનું જૂનું કિચન રિફ્ટ-સૉન વ્હાઇટ ઓક કેબિનેટ, 9 ફૂટના આઇલેન્ડ અને વૉક-ઇન પેન્ટ્રી સાથે નવું બનાવ્યું.",
    },
    location: "Brampton",
    year: 2025,
    duration: { en: "6 weeks", gu: "6 અઠવાડિયા" },
    materials: { en: "White oak, quartz, brass hardware", gu: "વ્હાઇટ ઓક, ક્વાર્ટ્ઝ, પિત્તળનું હાર્ડવેર" },
    cover: ph("White oak kitchen with large island", "મોટા આઇલેન્ડ સાથે વ્હાઇટ ઓક કિચન"),
    gallery: gallery("White oak kitchen", "વ્હાઇટ ઓક કિચન", 5),
    beforeAfter: {
      before: ph("Kitchen before renovation", "રિનોવેશન પહેલાંનું કિચન"),
      after: ph("Kitchen after renovation", "રિનોવેશન પછીનું કિચન"),
    },
  },
  {
    slug: "cedar-deck-caledon",
    category: "decks",
    featured: true,
    title: { en: "Two-Level Cedar Deck", gu: "બે-માળનું સીડર ડેક" },
    summary: {
      en: "A 600 sq ft two-tier cedar deck with built-in benches, glass railings and step lighting.",
      gu: "બિલ્ટ-ઇન બેન્ચ, કાચની રેલિંગ અને સ્ટેપ લાઇટિંગ સાથે 600 ચો. ફૂટનું બે-સ્તરનું સીડર ડેક.",
    },
    location: "Caledon",
    year: 2025,
    duration: { en: "3 weeks", gu: "3 અઠવાડિયા" },
    materials: { en: "Western red cedar, aluminium & glass rail", gu: "વેસ્ટર્ન રેડ સીડર, એલ્યુમિનિયમ અને કાચની રેલિંગ" },
    cover: ph("Two-level cedar deck at dusk", "સાંજે બે-સ્તરનું સીડર ડેક"),
    gallery: gallery("Cedar deck", "સીડર ડેક"),
    beforeAfter: {
      before: ph("Backyard before the deck", "ડેક પહેલાંનું બેકયાર્ડ"),
      after: ph("Backyard with new cedar deck", "નવા સીડર ડેક સાથે બેકયાર્ડ"),
    },
  },
  {
    slug: "living-room-built-ins-mississauga",
    category: "built-ins",
    featured: true,
    title: { en: "Fireplace Built-ins", gu: "ફાયરપ્લેસ બિલ્ટ-ઇન્સ" },
    summary: {
      en: "Floor-to-ceiling painted bookcases flanking the fireplace, with hidden media storage and LED lighting.",
      gu: "ફાયરપ્લેસની બંને બાજુ છત સુધીના પેઇન્ટેડ બુકકેસ, છુપાયેલા મીડિયા સ્ટોરેજ અને LED લાઇટિંગ સાથે.",
    },
    location: "Mississauga",
    year: 2024,
    duration: { en: "2 weeks", gu: "2 અઠવાડિયા" },
    materials: { en: "Maple ply, painted MDF, LED strips", gu: "મેપલ પ્લાય, પેઇન્ટેડ MDF, LED સ્ટ્રિપ" },
    cover: ph("Painted built-in bookcases around fireplace", "ફાયરપ્લેસની આસપાસ પેઇન્ટેડ બિલ્ટ-ઇન બુકકેસ"),
    gallery: gallery("Fireplace built-ins", "ફાયરપ્લેસ બિલ્ટ-ઇન્સ"),
  },
  {
    slug: "walnut-dining-table",
    category: "furniture",
    featured: true,
    title: { en: "Live-Edge Walnut Dining Table", gu: "લાઇવ-એજ વૉલનટ ડાઇનિંગ ટેબલ" },
    summary: {
      en: "An 8-seat live-edge black walnut table on a blackened steel base, finished with hardwax oil.",
      gu: "કાળા સ્ટીલના બેઝ પર 8 જણ માટેનું લાઇવ-એજ બ્લેક વૉલનટ ટેબલ, હાર્ડવેક્સ ઓઇલ ફિનિશ સાથે.",
    },
    location: "Vaughan",
    year: 2024,
    duration: { en: "4 weeks", gu: "4 અઠવાડિયા" },
    materials: { en: "Black walnut, steel", gu: "બ્લેક વૉલનટ, સ્ટીલ" },
    cover: ph("Live-edge walnut dining table", "લાઇવ-એજ વૉલનટ ડાઇનિંગ ટેબલ"),
    gallery: gallery("Walnut dining table", "વૉલનટ ડાઇનિંગ ટેબલ", 3),
  },
  {
    slug: "wainscoting-hallway-oakville",
    category: "trim",
    featured: false,
    title: { en: "Hallway Wainscoting & Trim", gu: "હૉલવે વેઇન્સકોટિંગ અને ટ્રિમ" },
    summary: {
      en: "Board-and-batten wainscoting, new casings and 5-inch baseboards throughout the main floor.",
      gu: "મુખ્ય માળ પર બોર્ડ-એન્ડ-બેટન વેઇન્સકોટિંગ, નવા કેસિંગ અને 5 ઇંચના બેઝબોર્ડ.",
    },
    location: "Oakville",
    year: 2024,
    duration: { en: "5 days", gu: "5 દિવસ" },
    materials: { en: "Poplar, MDF, semi-gloss paint", gu: "પોપ્લર, MDF, સેમી-ગ્લોસ પેઇન્ટ" },
    cover: ph("Hallway with board-and-batten wainscoting", "બોર્ડ-એન્ડ-બેટન વેઇન્સકોટિંગ સાથે હૉલવે"),
    gallery: gallery("Hallway wainscoting", "હૉલવે વેઇન્સકોટિંગ", 3),
    beforeAfter: {
      before: ph("Hallway before trim work", "ટ્રિમ કામ પહેલાંનો હૉલવે"),
      after: ph("Hallway after trim work", "ટ્રિમ કામ પછીનો હૉલવે"),
    },
  },
  {
    slug: "walk-in-closet-etobicoke",
    category: "built-ins",
    featured: false,
    title: { en: "Walk-in Closet System", gu: "વૉક-ઇન કબાટ સિસ્ટમ" },
    summary: {
      en: "His-and-hers walk-in closet with a centre island, shoe wall and soft-close drawers.",
      gu: "સેન્ટર આઇલેન્ડ, શૂ વૉલ અને સોફ્ટ-ક્લોઝ ડ્રોઅર સાથે પતિ-પત્ની માટેનો વૉક-ઇન કબાટ.",
    },
    location: "Etobicoke",
    year: 2023,
    duration: { en: "10 days", gu: "10 દિવસ" },
    materials: { en: "Melamine, oak veneer, LED", gu: "મેલામાઇન, ઓક વિનીર, LED" },
    cover: ph("Walk-in closet with centre island", "સેન્ટર આઇલેન્ડ સાથે વૉક-ઇન કબાટ"),
    gallery: gallery("Walk-in closet", "વૉક-ઇન કબાટ", 3),
  },
  {
    slug: "shaker-kitchen-caledon",
    category: "kitchens",
    featured: false,
    title: { en: "Sage Green Shaker Kitchen", gu: "સેજ ગ્રીન શેકર કિચન" },
    summary: {
      en: "Painted shaker cabinets in sage green with a butcher-block island and open oak shelving.",
      gu: "બુચર-બ્લૉક આઇલેન્ડ અને ખુલ્લા ઓક શેલ્ફ સાથે સેજ ગ્રીન પેઇન્ટેડ શેકર કેબિનેટ.",
    },
    location: "Caledon",
    year: 2023,
    duration: { en: "5 weeks", gu: "5 અઠવાડિયા" },
    materials: { en: "Maple, painted MDF, butcher block", gu: "મેપલ, પેઇન્ટેડ MDF, બુચર બ્લૉક" },
    cover: ph("Sage green shaker kitchen", "સેજ ગ્રીન શેકર કિચન"),
    gallery: gallery("Shaker kitchen", "શેકર કિચન"),
  },
  {
    slug: "privacy-fence-brampton",
    category: "decks",
    featured: false,
    title: { en: "Horizontal Privacy Fence", gu: "આડી પ્રાઇવસી વાડ" },
    summary: {
      en: "120 ft of modern horizontal cedar fencing with a matching gate and post caps.",
      gu: "મેચિંગ ગેટ અને પોસ્ટ કેપ્સ સાથે 120 ફૂટની આધુનિક આડી સીડર વાડ.",
    },
    location: "Brampton",
    year: 2023,
    duration: { en: "4 days", gu: "4 દિવસ" },
    materials: { en: "Cedar, galvanized posts", gu: "સીડર, ગેલ્વેનાઇઝ્ડ પોસ્ટ" },
    cover: ph("Horizontal cedar privacy fence", "આડી સીડર પ્રાઇવસી વાડ"),
    gallery: gallery("Privacy fence", "પ્રાઇવસી વાડ", 3),
  },
];

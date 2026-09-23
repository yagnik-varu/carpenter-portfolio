import type { Category, Service } from "./types";

// DUMMY CONTENT — replace text, prices and images before launch.
// Gujarati strings are auto-generated and should be reviewed by a native speaker.

export const categories: Category[] = [
  { id: "kitchens", label: { en: "Kitchens", gu: "કિચન" } },
  { id: "built-ins", label: { en: "Built-ins", gu: "બિલ્ટ-ઇન્સ" } },
  { id: "decks", label: { en: "Decks & Fences", gu: "ડેક અને વાડ" } },
  { id: "furniture", label: { en: "Furniture", gu: "ફર્નિચર" } },
  { id: "trim", label: { en: "Trim & Doors", gu: "ટ્રિમ અને દરવાજા" } },
];

export const services: Service[] = [
  {
    slug: "kitchen-cabinets",
    category: "kitchens",
    icon: "kitchen",
    title: { en: "Custom Kitchen Cabinets", gu: "કસ્ટમ કિચન કેબિનેટ" },
    summary: {
      en: "Made-to-measure cabinets, islands and pantries in solid wood or painted finishes.",
      gu: "સોલિડ લાકડા અથવા પેઇન્ટેડ ફિનિશમાં માપ પ્રમાણે બનાવેલા કેબિનેટ, આઇલેન્ડ અને પેન્ટ્રી.",
    },
    intro: {
      en: "Your kitchen is the hardest-working room in the house. We design and build cabinetry around how you actually cook and live — every drawer, shelf and filler panel sized to your space, not a catalogue.",
      gu: "તમારું કિચન ઘરનો સૌથી વધુ વપરાતો રૂમ છે. તમે ખરેખર કેવી રીતે રસોઈ કરો છો અને જીવો છો તે પ્રમાણે અમે કેબિનેટ ડિઝાઇન કરીને બનાવીએ છીએ — દરેક ડ્રોઅર, શેલ્ફ અને પેનલ કેટલોગ નહીં, તમારી જગ્યા પ્રમાણે.",
    },
    included: [
      { en: "In-home measure and 3D layout", gu: "ઘરે માપ અને 3D લેઆઉટ" },
      { en: "Solid wood or painted MDF doors", gu: "સોલિડ લાકડા અથવા પેઇન્ટેડ MDF દરવાજા" },
      { en: "Soft-close hinges and drawer slides", gu: "સોફ્ટ-ક્લોઝ હિન્જ અને ડ્રોઅર સ્લાઇડ" },
      { en: "Islands, pantries and appliance panels", gu: "આઇલેન્ડ, પેન્ટ્રી અને એપ્લાયન્સ પેનલ" },
      { en: "Removal of old cabinets and clean-up", gu: "જૂના કેબિનેટ દૂર કરવા અને સફાઈ" },
    ],
    priceRange: { en: "$12,000 – $45,000", gu: "$12,000 – $45,000" },
    image: { alt: { en: "Custom white oak kitchen", gu: "કસ્ટમ વ્હાઇટ ઓક કિચન" } },
    faq: [
      {
        q: { en: "Can you work with my existing layout?", gu: "શું તમે મારા હાલના લેઆઉટ સાથે કામ કરી શકો?" },
        a: {
          en: "Yes. Keeping plumbing and appliances in place is often the most cost-effective option.",
          gu: "હા. પ્લમ્બિંગ અને એપ્લાયન્સ એ જ જગ્યાએ રાખવું ઘણીવાર સૌથી સસ્તો વિકલ્પ હોય છે.",
        },
      },
      {
        q: { en: "Do you install countertops?", gu: "શું તમે કાઉન્ટરટોપ લગાવો છો?" },
        a: {
          en: "We coordinate with trusted stone fabricators and manage the whole schedule for you.",
          gu: "અમે વિશ્વસનીય સ્ટોન ફેબ્રિકેટર્સ સાથે સંકલન કરીએ છીએ અને આખું શેડ્યૂલ સંભાળીએ છીએ.",
        },
      },
    ],
  },
  {
    slug: "built-ins",
    category: "built-ins",
    icon: "shelves",
    title: { en: "Built-ins & Closets", gu: "બિલ્ટ-ઇન્સ અને કબાટ" },
    summary: {
      en: "Bookshelves, wall units, closets, mudroom benches and window seats.",
      gu: "બુકશેલ્ફ, વૉલ યુનિટ, કબાટ, મડરૂમ બેન્ચ અને વિન્ડો સીટ.",
    },
    intro: {
      en: "Built-ins turn awkward corners into the best storage in your home. We scribe every piece to your walls so it looks like it was always there.",
      gu: "બિલ્ટ-ઇન્સ અણઘડ ખૂણાઓને તમારા ઘરની શ્રેષ્ઠ સ્ટોરેજ જગ્યામાં ફેરવે છે. દરેક વસ્તુ તમારી દીવાલો સાથે એવી રીતે ફિટ કરીએ છીએ કે તે હંમેશાથી ત્યાં જ હોય તેવું લાગે.",
    },
    included: [
      { en: "Design to fit alcoves and sloped ceilings", gu: "ખાંચા અને ઢાળવાળી છત માટે ડિઝાઇન" },
      { en: "Integrated lighting and outlets", gu: "અંદર લાઇટિંગ અને આઉટલેટ" },
      { en: "Painted or stained finishes on site", gu: "સાઇટ પર પેઇન્ટ અથવા સ્ટેન ફિનિશ" },
    ],
    priceRange: { en: "$2,500 – $15,000", gu: "$2,500 – $15,000" },
    image: { alt: { en: "Built-in living room bookshelves", gu: "લિવિંગ રૂમમાં બિલ્ટ-ઇન બુકશેલ્ફ" } },
    faq: [
      {
        q: { en: "How long does a built-in take?", gu: "બિલ્ટ-ઇન બનાવવામાં કેટલો સમય લાગે?" },
        a: {
          en: "Most built-ins take 1–3 weeks from approved design to install.",
          gu: "મોટાભાગના બિલ્ટ-ઇન્સમાં મંજૂર ડિઝાઇનથી ઇન્સ્ટોલેશન સુધી 1–3 અઠવાડિયા લાગે છે.",
        },
      },
    ],
  },
  {
    slug: "decks-fences",
    category: "decks",
    icon: "deck",
    title: { en: "Decks & Fences", gu: "ડેક અને વાડ" },
    summary: {
      en: "Cedar, pressure-treated and composite decks, pergolas and privacy fences.",
      gu: "સીડર, પ્રેશર-ટ્રીટેડ અને કમ્પોઝિટ ડેક, પર્ગોલા અને પ્રાઇવસી વાડ.",
    },
    intro: {
      en: "Outdoor space that survives our winters. We handle permits, footings and framing, and build decks that stay solid and safe for decades.",
      gu: "અહીંના શિયાળામાં પણ ટકી રહે તેવી બહારની જગ્યા. અમે પરમિટ, પાયા અને ફ્રેમિંગ સંભાળીએ છીએ અને દાયકાઓ સુધી મજબૂત અને સુરક્ષિત રહે તેવા ડેક બનાવીએ છીએ.",
    },
    included: [
      { en: "Permit drawings and applications", gu: "પરમિટ ડ્રોઇંગ અને અરજી" },
      { en: "Helical piles or concrete footings", gu: "હેલિકલ પાઇલ અથવા કોંક્રિટ પાયા" },
      { en: "Railings, stairs and lighting", gu: "રેલિંગ, સીડી અને લાઇટિંગ" },
    ],
    priceRange: { en: "$6,000 – $30,000", gu: "$6,000 – $30,000" },
    image: { alt: { en: "Cedar backyard deck", gu: "બેકયાર્ડમાં સીડર ડેક" } },
    faq: [
      {
        q: { en: "Do I need a permit for my deck?", gu: "શું મારા ડેક માટે પરમિટ જોઈએ?" },
        a: {
          en: "Usually yes if it's attached to the house or higher than 24 inches. We handle the application.",
          gu: "સામાન્ય રીતે હા, જો તે ઘર સાથે જોડાયેલું હોય અથવા 24 ઇંચથી ઊંચું હોય. અરજી અમે સંભાળીએ છીએ.",
        },
      },
    ],
  },
  {
    slug: "custom-furniture",
    category: "furniture",
    icon: "chair",
    title: { en: "Custom Furniture", gu: "કસ્ટમ ફર્નિચર" },
    summary: {
      en: "Dining tables, beds, vanities and heirloom pieces in hardwood.",
      gu: "હાર્ડવુડમાં ડાઇનિંગ ટેબલ, બેડ, વેનિટી અને પેઢીઓ સુધી ચાલે તેવું ફર્નિચર.",
    },
    intro: {
      en: "One-of-a-kind furniture built with traditional joinery and finished by hand. Pick the wood, the size and the details — we'll build it once, properly.",
      gu: "પરંપરાગત જોડાણથી બનાવેલું અને હાથથી ફિનિશ કરેલું અનોખું ફર્નિચર. લાકડું, માપ અને વિગતો તમે પસંદ કરો — અમે તેને એક જ વાર, યોગ્ય રીતે બનાવીશું.",
    },
    included: [
      { en: "Sketches and wood samples", gu: "સ્કેચ અને લાકડાના નમૂના" },
      { en: "Mortise-and-tenon and dovetail joinery", gu: "મોર્ટિસ-એન્ડ-ટેનન અને ડવટેલ જોડાણ" },
      { en: "Hand-rubbed oil or lacquer finish", gu: "હાથથી ઘસેલું ઓઇલ અથવા લેકર ફિનિશ" },
    ],
    priceRange: { en: "$800 – $8,000", gu: "$800 – $8,000" },
    image: { alt: { en: "Walnut dining table", gu: "વૉલનટ ડાઇનિંગ ટેબલ" } },
    faq: [
      {
        q: { en: "Can you match existing furniture?", gu: "શું તમે હાલના ફર્નિચર જેવું બનાવી શકો?" },
        a: {
          en: "Yes — send us photos and we'll match the wood species, stain and style.",
          gu: "હા — અમને ફોટા મોકલો અને અમે લાકડાનો પ્રકાર, સ્ટેન અને સ્ટાઇલ મેળવીશું.",
        },
      },
    ],
  },
  {
    slug: "trim-doors",
    category: "trim",
    icon: "door",
    title: { en: "Trim, Doors & Stairs", gu: "ટ્રિમ, દરવાજા અને સીડી" },
    summary: {
      en: "Baseboards, crown moulding, wainscoting, interior doors and stair railings.",
      gu: "બેઝબોર્ડ, ક્રાઉન મોલ્ડિંગ, વેઇન્સકોટિંગ, અંદરના દરવાજા અને સીડીની રેલિંગ.",
    },
    intro: {
      en: "Finish carpentry is what makes a house feel complete. Tight mitres, clean caulk lines and doors that close perfectly.",
      gu: "ફિનિશ સુથારીકામથી ઘર પૂર્ણ લાગે છે. ચુસ્ત ખૂણા, સ્વચ્છ કૉક લાઇન અને બરાબર બંધ થતા દરવાજા.",
    },
    included: [
      { en: "Baseboard, casing and crown moulding", gu: "બેઝબોર્ડ, કેસિંગ અને ક્રાઉન મોલ્ડિંગ" },
      { en: "Wainscoting and accent walls", gu: "વેઇન્સકોટિંગ અને એક્સેન્ટ વૉલ" },
      { en: "Interior door supply and install", gu: "અંદરના દરવાજા લાવવા અને લગાવવા" },
    ],
    priceRange: { en: "$1,500 – $12,000", gu: "$1,500 – $12,000" },
    image: { alt: { en: "Wainscoting accent wall", gu: "વેઇન્સકોટિંગ એક્સેન્ટ વૉલ" } },
    faq: [
      {
        q: { en: "Do you paint the trim too?", gu: "શું તમે ટ્રિમ પેઇન્ટ પણ કરો છો?" },
        a: {
          en: "We can deliver primed-and-caulked or fully painted — your choice.",
          gu: "અમે પ્રાઇમ-અને-કૉક કરેલું અથવા સંપૂર્ણ પેઇન્ટ કરેલું આપી શકીએ — તમારી પસંદગી.",
        },
      },
    ],
  },
];

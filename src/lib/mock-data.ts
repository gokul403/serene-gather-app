import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import avatar from "@/assets/avatar.jpg";

export type Status = "Confirmed" | "In Progress" | "Scheduled" | "Pending" | "Completed";

export const customer = {
  name: "Ananya Kapoor",
  firstName: "Ananya",
  phone: "+91 98765 43420",
  maskedPhone: "+91 98••• •420",
  email: "ananya.kapoor@gmail.com",
  address: "12 Lake Palace Road, Udaipur, Rajasthan 313001",
  memberSince: "March 2025",
  avatar,
  altPhone: "+91 98200 71144",
};

export const eventDetails = {
  name: "The Kapoor Wedding",
  type: "Wedding",
  tagline: "Sangeet · Receptions & Baraats — The Grandeur Ballroom, Udaipur",
  date: "2026-12-14T18:00:00+05:30",
  dateLabel: "Mon, 14 · Dec 2026",
  longDate: "Monday, 14 December 2026",
  time: "6:00 PM onwards",
  status: "On Track",
  venue: "The Grandeur Ballroom",
  venueCity: "Udaipur, Rajasthan",
  venueAddress: "The Grandeur Ballroom, Fateh Sagar Road, Udaipur, Rajasthan 313004",
  venueNote: "Valet parking · 3 halls · Poolside lawn for the baraat",
  guestCount: 350,
  confirmedGuests: 268,
  tasksDone: 12,
  tasksTotal: 16,
  bookingId: "EVR-2026-0148",
  manager: {
    name: "Priya Nair",
    role: "Senior Event Manager",
    phone: "+91 90045 12280",
    email: "priya.nair@evora.events",
    hours: "Mon–Sat, 10:00 AM – 8:00 PM IST",
  },
};

export const upcomingActivities = [
  { title: "Catering final menu tasting", when: "Thu 06 Nov · 11:00 AM", tone: "cyan" as const },
  { title: "Décor layout walkthrough", when: "Sun 09 Nov · 04:00 PM", tone: "violet" as const },
  { title: "Dress rehearsal & sound check", when: "Wed 11 Nov · 06:00 PM", tone: "muted" as const },
];

export const schedule = [
  {
    day: "Day 1 · Fri 11 Dec 2026",
    items: [
      { time: "10:00 AM", title: "Guest arrivals & check-in", place: "Grandeur Lobby", status: "Scheduled" as Status },
      { time: "05:00 PM", title: "Mehndi ceremony", place: "Poolside Lawn", status: "Confirmed" as Status },
      { time: "08:30 PM", title: "Welcome dinner", place: "Courtyard Terrace", status: "Confirmed" as Status },
    ],
  },
  {
    day: "Day 2 · Sat 12 Dec 2026",
    items: [
      { time: "11:00 AM", title: "Haldi ceremony", place: "Garden Pavilion", status: "Confirmed" as Status },
      { time: "07:00 PM", title: "Sangeet night & performances", place: "Ballroom A", status: "In Progress" as Status },
      { time: "11:00 PM", title: "Late-night dessert bar", place: "Ballroom Foyer", status: "Scheduled" as Status },
    ],
  },
  {
    day: "Day 3 · Mon 14 Dec 2026",
    items: [
      { time: "04:30 PM", title: "Baraat procession", place: "Main Driveway", status: "Confirmed" as Status },
      { time: "06:00 PM", title: "Wedding ceremony (Pheras)", place: "Mandap, Ballroom B", status: "Confirmed" as Status },
      { time: "08:30 PM", title: "Reception & dinner", place: "The Grandeur Ballroom", status: "Confirmed" as Status },
      { time: "11:30 PM", title: "Vidaai", place: "Main Driveway", status: "Scheduled" as Status },
    ],
  },
];

export const services = [
  {
    name: "Live Catering",
    vendor: "Saffron Table Co.",
    detail: "350 guests · 4-course menu · live counters",
    price: 165000,
    status: "Confirmed" as Status,
  },
  {
    name: "Photography & Film",
    vendor: "Studio Lumen",
    detail: "2 shooters · cinematic edits · 48h teaser",
    price: 85000,
    status: "In Progress" as Status,
  },
  {
    name: "Floral Décor",
    vendor: "Bloomhaus Design",
    detail: "Stage, mandap & entrance installations",
    price: 120000,
    status: "Confirmed" as Status,
  },
  {
    name: "Makeup & Bridal",
    vendor: "Atelier Meher",
    detail: "Bride + 6 attendants · 3 day coverage",
    price: 55000,
    status: "Scheduled" as Status,
  },
  {
    name: "Sound & Lighting",
    vendor: "Pulse AV",
    detail: "Line array · intelligent wash · DJ console",
    price: 42000,
    status: "Confirmed" as Status,
  },
  {
    name: "Guest Transport",
    vendor: "Regal Fleet",
    detail: "4 coaches · 2 luxury sedans · airport runs",
    price: 18000,
    status: "Pending" as Status,
  },
];

export const payments = {
  total: 485000,
  paid: 310000,
  pending: 175000,
  nextDue: "28 Nov 2026",
  history: [
    { id: "TXN-4821", label: "Booking advance", date: "12 Mar 2026", method: "UPI · HDFC", amount: 120000, status: "Completed" as Status },
    { id: "TXN-5190", label: "Catering deposit", date: "04 Jun 2026", method: "NEFT · ICICI", amount: 90000, status: "Completed" as Status },
    { id: "TXN-5644", label: "Décor milestone 1", date: "19 Aug 2026", method: "Credit Card", amount: 60000, status: "Completed" as Status },
    { id: "TXN-6003", label: "Photography retainer", date: "02 Oct 2026", method: "UPI · HDFC", amount: 40000, status: "Completed" as Status },
    { id: "TXN-6288", label: "Final settlement", date: "Due 28 Nov 2026", method: "Bank transfer", amount: 175000, status: "Pending" as Status },
  ],
};

export const documents = [
  { name: "Master Event Agreement", type: "Agreement", size: "412 KB", date: "12 Mar 2026", ref: "AGR-0148" },
  { name: "Invoice — Booking Advance", type: "Invoice", size: "128 KB", date: "12 Mar 2026", ref: "INV-4821" },
  { name: "Receipt — Catering Deposit", type: "Receipt", size: "96 KB", date: "04 Jun 2026", ref: "RCP-5190" },
  { name: "Décor Scope & Moodboard", type: "Agreement", size: "3.1 MB", date: "22 Jul 2026", ref: "AGR-0163" },
  { name: "Invoice — Décor Milestone 1", type: "Invoice", size: "134 KB", date: "19 Aug 2026", ref: "INV-5644" },
  { name: "Receipt — Photography Retainer", type: "Receipt", size: "88 KB", date: "02 Oct 2026", ref: "RCP-6003" },
];

export const gallery = [
  { src: gallery1, caption: "Mandap stage — marigold & candlelight", tag: "Décor" },
  { src: gallery6, caption: "Courtyard venue at dusk", tag: "Venue" },
  { src: gallery5, caption: "Sangeet garland exchange", tag: "Ceremony" },
  { src: gallery3, caption: "Reception table setting", tag: "Catering" },
  { src: gallery4, caption: "Ballroom lighting rehearsal", tag: "Production" },
  { src: gallery2, caption: "Bridal jewellery details", tag: "Styling" },
];

export const formatINR = (value: number) =>
  `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

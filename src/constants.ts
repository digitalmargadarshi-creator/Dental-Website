import { 
  Stethoscope, 
  Smile, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Star,
  ChevronRight,
  Menu,
  X,
  MessageCircle
} from 'lucide-react';

export const SERVICES = [
  {
    id: 'general',
    title: 'General Dentistry',
    description: 'Routine checkups, cleanings, and fillings to keep your teeth healthy.',
    icon: Stethoscope,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczNHok4drTXJYdcozXcdRr3Lo4jVjmAS7Lg4tJD-G0CRKCGWoUjgsev9ukMUgSok-c8x2LhRkIjIaWbJel71g2kDnCr0rgY547_BNxfccjTkj8NhJpMezuDMRl3SiNv-UJ0kTxV--pLDGFIOQvT2_H4L=w598-h398-s-no-gm?authuser=0'
  },
  {
    id: 'ortho',
    title: 'Orthodontics',
    description: 'Braces and aligners for a perfectly straight and beautiful smile.',
    icon: ShieldCheck,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPN97w7ojYdY7SyFSYNh7QanwUtF5lzRAm0ZYsBXcVpNyS9nVgP1vWhIT2dNCILs96tXNTDZ8ayTR4CWJbeoJ8to1yciX_JlTBYFks43euuUASnZajbC4hHu8B6bAhTTieW2w9b668ja-iyPUHHKgqj=w598-h398-s-no-gm?authuser=0'
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    description: 'Veneers, whitening, and smile makeovers for ultimate confidence.',
    icon: Smile,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczP4ZEHssYVhUWrj5RJxElpFnBGcI3HXIUqTd8ayDVPkJHbee5X48-jOXYbqmZQT_Yvv3eyvCt9Jpj57ia70nGZXCSeyKB7GzTm3Ub-sjW1bCfM15MmBo-Dzf3B_DovvgQ8PwYIt85YlNxlXNIDrgKoY=w598-h399-s-no-gm?authuser=0'
  },
  {
    id: 'emergency',
    title: 'Emergency Care',
    description: 'Immediate assistance for dental pain, broken teeth, or accidents.',
    icon: Clock,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczM5P7cHRpGJT1iR2lItkvpAevLpS9kamNCEp1f-FisYkqqd_1UulC5pJNlfXoVkl_q9WAeOf_Oway-qLGuuSBDrJe2kNU-GzQ183E64rtmAS1hOBGek4KUTWeRgIrjhORcwGUqMX6IUlbnX0vOtjM6E=w598-h398-s-no-gm?authuser=0'
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: "Suresh Kumar",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content: "Excellent experience! The staff is very friendly and the treatment was completely painless. Highly recommended.",
    link: "https://maps.app.goo.gl/BtQ92mZ1zJWHDmESA"
  },
  {
    id: 2,
    name: "Anitha Reddy",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content: "Very affordable prices for high-quality dental work. Dr. Kiran is very professional and caring.",
    link: "https://maps.app.goo.gl/DCXcic1c3ob1AtUM6"
  },
  {
    id: 3,
    name: "Ravi Teja",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    content: "Best dental clinic in Punjagutta. Modern equipment and very clean environment. 5 stars!",
    link: "https://maps.app.goo.gl/XUtCXikLSDbWesqq9"
  },
  {
    id: 4,
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    content: "I was afraid of dentists, but my visit here was so smooth. Painless root canal treatment.",
    link: "https://maps.app.goo.gl/i3armQCzoryPCZjy8"
  },
  {
    id: 5,
    name: "Mohan Rao",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    content: "Professional doctors and great service. They explained everything clearly before starting.",
    link: "https://maps.app.goo.gl/86xruQF522ywu9Vm9"
  },
  {
    id: 6,
    name: "Kavya S.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    content: "Great experience with my braces treatment. Seeing results faster than expected!",
    link: "https://maps.app.goo.gl/wnd6pTmD4CFz7fQx6"
  },
  {
    id: 7,
    name: "Venkatesh P.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    content: "Very patient-centric approach. They really care about the patient's comfort and well-being.",
    link: "https://maps.app.goo.gl/pXUkYBAGPEpY4omd7"
  },
  {
    id: 8,
    name: "Deepika G.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    content: "Modern clinic with expert care. The hygiene standards are top-notch. Best in Hyderabad.",
    link: "https://maps.app.goo.gl/cPc8jncbhhwLRTY88"
  },
  {
    id: 9,
    name: "Arjun V.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
    content: "Quick response and effective treatment for my toothache. Very satisfied with the care.",
    link: "https://maps.app.goo.gl/jzkiK9gupQuZSv437"
  },
  {
    id: 10,
    name: "Sneha L.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
    content: "Best smile makeover experience. My veneers look so natural. Thank you Dr. Kiran!",
    link: "https://maps.app.goo.gl/AjEFojdP36mffkpw8"
  }
];

export const INSTAGRAM_REELS = [
  {
    id: 1,
    title: "Had an excellent experience with veneers treatment",
    url: "https://www.instagram.com/reel/DUZvL-GEYme/",
    thumbnail: "https://www.instagram.com/reel/DUZvL-GEYme/media/?size=l"
  },
  {
    id: 2,
    title: "Excellent experience and I’m truly satisfied with the care",
    url: "https://www.instagram.com/reel/DUWIy9zjZXo/",
    thumbnail: "https://www.instagram.com/reel/DUWIy9zjZXo/media/?size=l"
  },
  {
    id: 3,
    title: "Trusted Dentist Healthy Smiles Dental Clinic",
    url: "https://www.instagram.com/reel/DUIC13xk4Av/",
    thumbnail: "https://www.instagram.com/reel/DUIC13xk4Av/media/?size=l"
  },
  {
    id: 4,
    title: "Great experience with Advanced Dentistry",
    url: "https://www.instagram.com/reel/DRZDBcQkVWX/",
    thumbnail: "https://www.instagram.com/reel/DRZDBcQkVWX/media/?size=l"
  }
];

export const CONTACT_INFO = {
  phone: "+91 6305879 507",
  whatsapp: "916305879507",
  email: "kiran.tuni@gmail.com",
  address: "Himalaya Bookstore & Petrol Bunk Street, Plat No C4, 4th Floor, Surya Teja Apartment, Dwarakapuri, Punjagutta, Hyderabad, Telangana 500082",
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.716885161514!2d78.4518294!3d17.425369299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa854eecb89a5b4a1%3A0x38602ec548ca0f43!2sKiran%20The%20Marketer!5e0!3m2!1sen!2sin!4v1772710148655!5m2!1sen!2sin"
};

export const PAGE_FAQS = {
  home: [
    { q: "What services do you offer?", a: "We offer a full range of dental services including General Dentistry, Orthodontics, Cosmetic Dentistry, and Emergency Care." },
    { q: "Are you open on weekends?", a: "Yes, we are open on Saturdays from 10:00 AM to 6:00 PM. We are closed on Sundays except for pre-booked emergencies." },
    { q: "How can I book an appointment?", a: "You can book an appointment by calling us at +91 6305879 507, messaging us on WhatsApp, or using the 'Book Appointment' button on our website." },
    { q: "Do you offer painless dentistry?", a: "Absolutely! We specialize in painless treatments using modern techniques and advanced anesthesia to ensure your comfort." },
    { q: "Where is the hospital located?", a: "We are located in Punjagutta, Hyderabad, near Himalaya Bookstore & Petrol Bunk Street." },
    { q: "Is there parking available?", a: "Yes, we have dedicated parking space for our patients in the building premises." },
    { q: "Do you accept insurance?", a: "We work with several major dental insurance providers. Please contact our front desk to verify your specific plan." }
  ],
  about: [
    { q: "Who is Dr. Kiran?", a: "Dr. Kiran is our lead dentist with over 15 years of experience in advanced dentistry and a passion for patient care." },
    { q: "How long has the hospital been operating?", a: "Kiran Kumar Dental Hospital has been serving the Hyderabad community for over a decade with excellence." },
    { q: "What is your mission?", a: "Our mission is to provide high-quality, accessible, and painless dental care to every patient who walks through our doors." },
    { q: "Are your doctors certified?", a: "Yes, all our specialists are highly qualified, board-certified, and regularly updated with the latest dental advancements." },
    { q: "What technology do you use?", a: "We use state-of-the-art technology including digital X-rays, intraoral cameras, and laser dentistry tools." },
    { q: "Do you handle international patients?", a: "Yes, we have a dedicated protocol for international patients, including virtual consultations and travel assistance." },
    { q: "What makes you different?", a: "Our commitment to 'Painless Dentistry' and our patient-first approach sets us apart as the most trusted clinic in the region." }
  ],
  services: [
    { q: "What is general dentistry?", a: "General dentistry covers routine checkups, cleanings, fillings, and preventive care to maintain your overall oral health." },
    { q: "How long does a root canal take?", a: "A typical root canal treatment can be completed in 1-2 sittings, depending on the complexity of the case." },
    { q: "Are dental implants permanent?", a: "Yes, with proper care and hygiene, dental implants are designed to be a lifelong solution for missing teeth." },
    { q: "How often should I get a cleaning?", a: "We recommend a professional dental cleaning every 6 months to prevent plaque buildup and gum disease." },
    { q: "Do you offer teeth whitening?", a: "Yes, we offer both in-office professional whitening and take-home kits for a brighter smile." },
    { q: "What are dental veneers?", a: "Veneers are thin, custom-made shells crafted of tooth-colored materials designed to cover the front surface of teeth." },
    { q: "Can you fix crooked teeth without braces?", a: "Yes, we offer clear aligners (Invisalign) and cosmetic bonding as alternatives to traditional metal braces." }
  ],
  testimonials: [
    { q: "Are these real patient reviews?", a: "Yes, all testimonials on our site are from real patients who have undergone treatment at our hospital." },
    { q: "Can I share my experience?", a: "We would love that! You can leave a review on our Google Business page or share your video testimonial with us." },
    { q: "Where can I see more video reviews?", a: "You can follow our Instagram page or check our YouTube channel for more patient journey videos." },
    { q: "Do you have a high success rate?", a: "We pride ourselves on a 99% patient satisfaction rate and successful treatment outcomes across all specialties." },
    { q: "How do you handle patient feedback?", a: "We take all feedback seriously and use it to constantly improve our services and patient experience." },
    { q: "Can I talk to a previous patient?", a: "Due to privacy laws, we cannot share contact details, but you can read detailed case studies on our blog." },
    { q: "Are your results guaranteed?", a: "We guarantee the quality of our materials and workmanship. Specific clinical outcomes depend on individual health factors." }
  ],
  contact: [
    { q: "What are your working hours?", a: "We are open Monday to Friday from 9:00 AM to 8:00 PM, and Saturdays from 10:00 AM to 6:00 PM." },
    { q: "How do I reach you via public transport?", a: "The Punjagutta Metro Station is just a 5-minute walk from our clinic. Several bus lines also stop nearby." },
    { q: "Can I book via WhatsApp?", a: "Yes! You can message us at +91 6305879 507 for quick bookings and queries." },
    { q: "What is your response time for emails?", a: "We typically respond to all email inquiries within 2-4 business hours." },
    { q: "Do I need an appointment for emergencies?", a: "While we prefer appointments, we prioritize walk-in emergencies to provide immediate relief." },
    { q: "What is your cancellation policy?", a: "We request at least 24 hours notice for cancellations so we can offer the slot to another patient." },
    { q: "Is there a consultation fee?", a: "We offer a nominal consultation fee which is often waived if you proceed with the suggested treatment." }
  ]
};

export const MASTER_FAQS = [
  {
    category: "About the Business",
    items: [
      { q: "What is the history of Kiran Kumar Dental Hospital?", a: "Founded by Dr. Kiran, the hospital started as a small clinic and has grown into a multi-specialty dental hub in Hyderabad, known for its expertise and patient-centric care." },
      { q: "Is the hospital government-recognized?", a: "Yes, we are a fully licensed and registered dental hospital under the Telangana State Health Department." },
      { q: "Do you have multiple branches?", a: "Currently, we operate from our main state-of-the-art facility in Punjagutta to ensure the highest quality control and direct supervision by Dr. Kiran." }
    ]
  },
  {
    category: "Services A-Z",
    items: [
      { q: "Do you offer pediatric (kids) dentistry?", a: "Yes, we have specialized pediatric dentists who are experts in making dental visits fun and stress-free for children." },
      { q: "Can you handle complex oral surgeries?", a: "Absolutely. We have in-house oral and maxillofacial surgeons for wisdom tooth extractions, jaw surgeries, and trauma care." },
      { q: "What about geriatric (senior) dental care?", a: "We offer specialized care for seniors, including comfortable dentures, implant-supported bridges, and gum health management." }
    ]
  },
  {
    category: "Timings & Appointments",
    items: [
      { q: "What are the exact timings?", a: "Mon-Fri: 9 AM - 8 PM | Sat: 10 AM - 6 PM | Sun: Closed (Emergency only)." },
      { q: "How early should I arrive?", a: "We recommend arriving 10-15 minutes before your scheduled time to complete any necessary paperwork." },
      { q: "Do you offer virtual consultations?", a: "Yes, for patients living outside Hyderabad or those needing a second opinion, we offer video consultations." }
    ]
  },
  {
    category: "Pricing & Payments",
    items: [
      { q: "What is the price range for common treatments?", a: "Consultation: ₹300-500 | Cleanings: ₹1000-2500 | Fillings: ₹800-2000 | Root Canal: ₹4000-8000 | Implants: ₹25,000+. Prices vary based on material choice." },
      { q: "What payment methods do you accept?", a: "We accept Cash, Credit/Debit Cards, UPI (GPay, PhonePe), and Bank Transfers." },
      { q: "Do you offer EMI options?", a: "Yes, for major treatments like Orthodontics or Full Mouth Rehabilitation, we offer 0% interest EMI plans." }
    ]
  },
  {
    category: "Facilities & Hygiene",
    items: [
      { q: "How do you ensure sterilization?", a: "We follow a strict 7-step sterilization protocol using Class B Autoclaves, ensuring 100% safety from cross-contamination." },
      { q: "Is the clinic wheelchair accessible?", a: "Yes, we have elevator access and our clinic layout is designed to be wheelchair friendly." },
      { q: "Do you have a waiting lounge?", a: "Yes, we have a comfortable, air-conditioned waiting area with free Wi-Fi and refreshments for our guests." }
    ]
  }
];

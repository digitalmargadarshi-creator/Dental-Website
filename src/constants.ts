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
    id: 'whitening',
    title: 'Teeth Whitening',
    description: 'Professional teeth bleaching for a brighter, more confident smile. Price: ₹7,500.00',
    icon: Smile,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczP4ZEHssYVhUWrj5RJxElpFnBGcI3HXIUqTd8ayDVPkJHbee5X48-jOXYbqmZQT_Yvv3eyvCt9Jpj57ia70nGZXCSeyKB7GzTm3Ub-sjW1bCfM15MmBo-Dzf3B_DovvgQ8PwYIt85YlNxlXNIDrgKoY=w598-h399-s-no-gm?authuser=0'
  },
  {
    id: 'cleaning',
    title: 'Teeth Cleaning',
    description: 'Deep cleaning and scaling to maintain optimal oral hygiene. Price: ₹1,000.00 – ₹2,500.00',
    icon: Stethoscope,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczNHok4drTXJYdcozXcdRr3Lo4jVjmAS7Lg4tJD-G0CRKCGWoUjgsev9ukMUgSok-c8x2LhRkIjIaWbJel71g2kDnCr0rgY547_BNxfccjTkj8NhJpMezuDMRl3SiNv-UJ0kTxV--pLDGFIOQvT2_H4L=w598-h398-s-no-gm?authuser=0'
  },
  {
    id: 'zirconia',
    title: 'Zirconia Cap',
    description: 'High-quality Zirconia/All ceramic crowns for durability and aesthetics. Price: ₹7,500.00',
    icon: ShieldCheck,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPN97w7ojYdY7SyFSYNh7QanwUtF5lzRAm0ZYsBXcVpNyS9nVgP1vWhIT2dNCILs96tXNTDZ8ayTR4CWJbeoJ8to1yciX_JlTBYFks43euuUASnZajbC4hHu8B6bAhTTieW2w9b668ja-iyPUHHKgqj=w598-h398-s-no-gm?authuser=0'
  },
  {
    id: 'dmls',
    title: 'DMLS Crown/Cap',
    description: 'Advanced DMLS Caps for precise fit and long-lasting strength. Price: ₹5,500.00 – ₹6,500.00',
    icon: ShieldCheck,
    image: 'https://lh3.googleusercontent.com/pw/AP1GczM5P7cHRpGJT1iR2lItkvpAevLpS9kamNCEp1f-FisYkqqd_1UulC5pJNlfXoVkl_q9WAeOf_Oway-qLGuuSBDrJe2kNU-GzQ183E64rtmAS1hOBGek4KUTWeRgIrjhORcwGUqMX6IUlbnX0vOtjM6E=w598-h398-s-no-gm?authuser=0'
  },
  {
    id: 'rct',
    title: 'Root Canal Treatment',
    description: 'Painless root canal treatment to save your natural teeth. Price: ₹2,500.00 – ₹4,500.00',
    icon: Clock,
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop'
  },
  {
    id: 'implant',
    title: 'Dental Implant',
    description: 'Permanent and natural-looking tooth replacement solution. Price: ₹20,000.00 – ₹25,000.00',
    icon: Stethoscope,
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=400&fit=crop'
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: "CLIFFORD SHUTTLEWORTH",
    avatar: "https://ui-avatars.com/api/?name=Clifford+Shuttleworth&background=db2777&color=fff",
    content: "Very happy with service and attention. The whole process went smoothly in a happy atmosphere, and Dr. Sharath was very professional throughout. I would highly recommend this clinic for anyone looking for painless dental care. The staff is also very supportive.",
    date: "4 days ago",
    rating: 5,
    link: "https://maps.app.goo.gl/BtQ92mZ1zJWHDmESA",
    ownerReply: "Thank you Clifford for your kind words! We are glad you had a smooth experience with us at Best Dentist in Vishakapatnam. Our team always strives to provide a comfortable environment for our patients."
  },
  {
    id: 2,
    name: "Gerard Ainsworth",
    avatar: "https://ui-avatars.com/api/?name=Gerard+Ainsworth&background=7c3aed&color=fff",
    content: "Absolutely brilliant! Great friendly service. Took the time to explain things and go through all the options. The treatment was painless and the results are fantastic. Best dentist in Vishakapatnam. I've visited many clinics but this clinic stands out for its hygiene and expertise.",
    date: "1 month ago",
    rating: 5,
    link: "https://maps.app.goo.gl/DCXcic1c3ob1AtUM6",
    ownerReply: "Hello Gerard, thank you for taking the time to write this positive review for Best Dentist in Vishakapatnam. We are always pleased to receive good feedback and are happy you liked our hygienic standards."
  },
  {
    id: 3,
    name: "Sandra",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    content: "Lovely staff make visiting the Dentist enjoyable. Great reception/waiting areas and dedicated car spaces. Dr. Sharath is very gentle and explains everything clearly. Highly recommended for anyone who has dental anxiety!",
    date: "1 month ago",
    rating: 5,
    link: "https://maps.app.goo.gl/XUtCXikLSDbWesqq9",
    ownerReply: "Hello Sandra, thank you for the wonderful feedback. We understand dental anxiety and try our best to make every visit as comfortable as possible."
  },
  {
    id: 4,
    name: "Suresh Kumar",
    avatar: "https://ui-avatars.com/api/?name=Suresh+Kumar&background=0284c7&color=fff",
    content: "Excellent experience! The staff is very friendly and the treatment was completely painless. Highly recommended for root canal treatment. I was worried about the pain but Dr. Sharath made it so easy.",
    date: "2 months ago",
    rating: 5,
    link: "https://maps.app.goo.gl/BtQ92mZ1zJWHDmESA",
    ownerReply: "Thank you Suresh! We specialize in painless root canals and are glad we could help you overcome your worry."
  },
  {
    id: 5,
    name: "Anitha Reddy",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    content: "Very affordable prices for high-quality dental work. Dr. Sharath is very professional and caring. The clinic is very clean and modern. I got my smile makeover done here and I couldn't be happier with the results.",
    date: "3 months ago",
    rating: 5,
    link: "https://maps.app.goo.gl/DCXcic1c3ob1AtUM6",
    ownerReply: "Glad you liked our services, Anitha! Your new smile looks amazing. Quality care at affordable prices is what we stand for."
  },
  {
    id: 6,
    name: "Ravi Teja",
    avatar: "https://ui-avatars.com/api/?name=Ravi+Teja&background=059669&color=fff",
    content: "Best dental clinic in Vishakapatnam. Modern equipment and very clean environment. 5 stars for the amazing smile makeover! The digital X-rays and intraoral cameras really helped me understand my dental health better.",
    date: "4 months ago",
    rating: 5,
    link: "https://maps.app.goo.gl/XUtCXikLSDbWesqq9",
    ownerReply: "Thank you Ravi! We believe in using the latest technology to provide the best care. Happy to have you as our patient."
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
  phone: "+91 81794 17894",
  whatsapp: "918179417894",
  email: "kiran.tuni@gmail.com",
  address: "D.No. 10-50-14/1, Main Road, Siripuram, Vishakapatnam, Andhra Pradesh 530003",
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.234567890123!2d83.3123456!3d17.7123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39432109876543%3A0x1234567890abcdef!2sSiripuram%2C%20Visakhapatnam!5e0!3m2!1sen!2sin!4v1772710148655!5m2!1sen!2sin"
};

export const PAGE_FAQS = {
  home: [
    { q: "What services do you offer?", a: "Best Dentist in Vishakapatnam is one of the best rated dental clinic in Vishakapatnam. Provides all kind of dental treatments painless root canal, laser gum surgery, dental implants, invisalign provider, smile makeover, teeth whitening, teeth braces, zirconium crowns, DMLS, wisdom tooth removal and many more." },
    { q: "Are you open on weekends?", a: "Yes, we are open on Saturdays from 10:00 AM to 6:00 PM. We are closed on Sundays except for pre-booked emergencies." },
    { q: "How can I book an appointment?", a: "You can book an appointment by calling us at +91 81794 17894, messaging us on WhatsApp, or using the 'Book Appointment' button on our website." },
    { q: "Do you offer painless dentistry?", a: "Absolutely! We specialize in painless treatments using modern techniques and advanced anesthesia to ensure your comfort." },
    { q: "Where is the hospital located?", a: "We are located at Siripuram, Vishakapatnam." },
    { q: "Is there parking available?", a: "Yes, we have dedicated parking space for our patients in the building premises." },
    { q: "Do you accept insurance?", a: "We work with several major dental insurance providers. Please contact our front desk to verify your specific plan." }
  ],
  about: [
    { q: "Who is the lead dentist?", a: "Our lead dentist at Best Dentist in Vishakapatnam has over 15 years of experience in advanced dentistry and a passion for patient care." },
    { q: "How long has the hospital been operating?", a: "Best Dentist in Vishakapatnam has been serving the Vishakapatnam community for over a decade with excellence." },
    { q: "What is your mission?", a: "Our mission is to provide high-quality, accessible, and painless dental care to every patient who walks through our doors." },
    { q: "Are your doctors certified?", a: "Yes, all our specialists are highly qualified, board-certified, and regularly updated with the latest dental advancements." },
    { q: "What technology do you use?", a: "We use state-of-the-art technology including digital X-rays, intraoral cameras, and laser dentistry tools." },
    { q: "Do you handle international patients?", a: "Yes, we have a dedicated protocol for international patients, including virtual consultations and travel assistance." },
    { q: "What makes you different?", a: "Best Dentist in Vishakapatnam is one of the best rated dental clinic in Vishakapatnam. Our commitment to 'Painless Dentistry' and our patient-first approach sets us apart." }
  ],
  services: [
    { q: "What is general dentistry?", a: "General dentistry covers routine checkups, cleanings, fillings, and preventive care to maintain your overall oral health." },
    { q: "How long does a root canal take?", a: "A typical root canal treatment can be completed in 1-2 sittings, depending on the complexity of the case. Price: ₹2,500.00 – ₹4,500.00" },
    { q: "Are dental implants permanent?", a: "Yes, with proper care and hygiene, dental implants are designed to be a lifelong solution for missing teeth. Price: ₹20,000.00 – ₹25,000.00" },
    { q: "How often should I get a cleaning?", a: "We recommend a professional dental cleaning every 6 months. Price: ₹1,000.00 – ₹2,500.00" },
    { q: "Do you offer teeth whitening?", a: "Yes, we offer professional teeth bleaching for a brighter smile. Price: ₹7,500.00" },
    { q: "What are dental caps?", a: "We offer Zirconia caps (₹7,500.00) and DMLS caps (₹5,500.00 – ₹6,500.00) for superior strength and aesthetics." },
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
    { q: "How do I reach you via public transport?", a: "Several bus lines stop nearby our clinic in Siripuram." },
    { q: "Can I book via WhatsApp?", a: "Yes! You can message us at +91 81794 17894 for quick bookings and queries." },
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
      { q: "What is the history of Best Dentist in Vishakapatnam?", a: "Best Dentist in Vishakapatnam is one of the best rated dental clinic in Vishakapatnam. Provides all kind of dental treatments painless root canal, laser gum surgery, dental implants, invisalign provider, smile makeover, teeth whitening, teeth braces, zirconium crowns, DMLS, wisdom tooth removal and many more." },
      { q: "Is the hospital government-recognized?", a: "Yes, we are a fully licensed and registered dental hospital under the Andhra Pradesh State Health Department." },
      { q: "Do you have multiple branches?", a: "Currently, we operate from our main state-of-the-art facility in Siripuram to ensure the highest quality control and direct supervision." }
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
      { q: "Do you offer virtual consultations?", a: "Yes, for patients living outside Vishakapatnam or those needing a second opinion, we offer video consultations." }
    ]
  },
  {
    category: "Pricing & Payments",
    items: [
      { q: "What is the price range for common treatments?", a: "Whitening: ₹7,500 | Cleaning: ₹1,000-2,500 | Zirconia Cap: ₹7,500 | DMLS Cap: ₹5,500-6,500 | Root Canal: ₹2,500-4,500 | Implants: ₹20,000-25,000." },
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

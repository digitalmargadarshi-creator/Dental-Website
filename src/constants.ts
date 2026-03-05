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

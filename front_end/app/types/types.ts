export type servicesType = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  icon?: string;
  is_active?: boolean;
  display_order?: number;
};

export type testimonialsType = {
  id: string;
  author_name: string;
  author_location: string;
  content: string;
  rating: number;
  photo_url: string;
  is_published: boolean;
  flag?: string;
  service_used?: string;
};

export type teamType = {
  id: string;
  name: string;
  role: string;
  photo_url: string;
};
export type faqType = {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
};

export type newsletterType = { id: string; email: string };

export type quotesType = {
  id: string;
  service_slug: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type authType = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  role: string;
  is_verified: boolean;
};

export type site_contentType = {
  hero_title: string;
  hero_subtitle: string;
  hero_video: string;
  stats: { label: string; value: number }[];
  why_choose_us: string[];
  contact_phone: string[];
  contact_email: string;
  contact_whatsapp: string[];
  social_links: {
    facebook: string;
    instagram: string;
    tiktok: string;
    linkdin: string;
  };
};

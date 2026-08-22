import type { NavigationMenuItem } from '@nuxt/ui';

export interface AppMenuItem {
  label: string;
  to: string;
  name?: string;
  icon?: string;
  children?: any[];
}

export const appMenus: AppMenuItem[] = [
  { label: 'Accueil', to: '/', name: 'index' },
  { label: 'Nos Services', to: '/services', name: 'services', children: [
      {
        label: 'Démarches Administratives',
        icon: 'i-lucide-file-check',
        description: 'Légalisation, actes, formalités officielles à distance.',
        to: '/services#administratif',
      },
      {
        label: 'Immobilier & Foncier',
        icon: 'i-lucide-land-plot',
        description: 'Vérification de terrains, suivi de chantiers et gestion.',
        to: '/services#immobilier',
      },
      {
        label: 'Projets & Événements',
        icon: 'i-lucide-calendar-heart',
        description: 'Organisation d’événements familiaux, mariages, achats.',
        to: '/services#evenements',
      },
      {
        label: 'Tous nos services',
        icon: 'i-lucide-arrow-right',
        description: 'Découvrez l’ensemble de nos solutions sur-mesure.',
        to: '/services',
      }
    ] },
  { label: 'Pourquoi Súna', to: '/why-us', name: 'why-us' },
  { label: 'À Propos', to: '/about', name: 'about' },
  { label: 'Témoignages', to: '/testimonials', name: 'testimonials' },
  { label: 'Devis', to: '/quote', name: 'quote' },
  { label: 'Contact', to: '/contact', name: 'contact' },
];

export const menus = ref<NavigationMenuItem[]>([
  {
    label: 'Accueil',
    icon: 'i-lucide-home',
    to: '/',
  },
  {
    label: 'Services',
    icon: 'i-lucide-briefcase',
    to: '/services',
    children: [
      {
        label: 'Démarches Administratives',
        icon: 'i-lucide-file-check',
        description: 'Légalisation, actes, formalités officielles à distance.',
        to: '/services#administratif',
      },
      {
        label: 'Immobilier & Foncier',
        icon: 'i-lucide-land-plot',
        description: 'Vérification de terrains, suivi de chantiers et gestion.',
        to: '/services#immobilier',
      },
      {
        label: 'Projets & Événements',
        icon: 'i-lucide-calendar-heart',
        description: 'Organisation d’événements familiaux, mariages, achats.',
        to: '/services#evenements',
      },
      {
        label: 'Tous nos services',
        icon: 'i-lucide-arrow-right',
        description: 'Découvrez l’ensemble de nos solutions sur-mesure.',
        to: '/services',
      }
    ]
  },
  {
    label: 'Pourquoi Súna',
    icon: 'i-lucide-shield-check',
    to: '/why-us',
  },
  {
    label: 'À Propos',
    icon: 'i-lucide-users',
    to: '/about',
  },
  {
    label: 'Témoignages',
    icon: 'i-lucide-star',
    to: '/testimonials',
  },
  {
    label: 'Devis Express',
    icon: 'i-lucide-calculator',
    to: '/quote',
  },
  {
    label: 'Contact',
    icon: 'i-lucide-mail',
    to: '/contact',
  },
]);

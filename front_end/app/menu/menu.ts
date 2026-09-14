import type { NavigationMenuItem } from "@nuxt/ui";

export interface AppMenuItem {
  label: string;
  to?: string;
  name?: string;
  icon?: string;
  children?: any[];
}

const serviceStore = useServiceStore();
const services = computed(() => {
  const serviceItems = serviceStore.services
    .filter((service: any) => Number(service.display_order) === 1)
    .map((service: any) => ({
      label: service.title,
      to: `/services/${service.id}`,
      description: service.description,
    }));
  return [
    ...serviceItems,
    {
      label: "Tous nos services",
      icon: "i-lucide-arrow-right",
      description: "Découvrez l’ensemble de nos solutions sur-mesure.",
      to: "/services",
    },
  ];
});

export const appMenus: AppMenuItem[] = [
  { label: "Accueil", to: "/", name: "index" },
  {
    label: "Nos Services",
    name: "services",
    children: services.value,
  },
  { label: "Pourquoi Súna", to: "/why-us", name: "why-us" },
  { label: "À Propos", to: "/about", name: "about" },
  { label: "Témoignages", to: "/testimonials", name: "testimonials" },
  { label: "Devis", to: "/quote", name: "quote" },
  { label: "Contact", to: "/contact", name: "contact" },
];

export const menus = ref<NavigationMenuItem[]>([
  {
    label: "Tableau de bord",
    icon: "i-tabler-layout-dashboard",
    to: "/admin",
  },

  {
    label: "Gestion du site",
    icon: "i-tabler-world",
    children: [
      {
        label: "Médiathèque",
        icon: "i-tabler-photo-video",
        to: "/admin/pageContent/media",
      },
      {
        label: "Services",
        icon: "i-tabler-briefcase",
        to: "/admin/pageContent/services",
      },
      // {
      //   label: "Pourquoi Súna",
      //   icon: "i-tabler-shield-check",
      //   to: "/admin/pageContent/why-us",
      // },
      // {
      //   label: "À propos",
      //   icon: "i-tabler-info-circle",
      //   to: "/admin/pageContent/about",
      // },
      {
        label: "Témoignages",
        icon: "i-tabler-message-star",
        to: "/admin/pageContent/testimonials",
      },
    ],
  },

  {
    label: "Demandes",
    icon: "i-tabler-inbox",
    children: [
      {
        label: "Commandes",
        icon: "i-tabler-file-invoice",
        to: "/admin/quotes",
      },
      {
        label: "Messages",
        icon: "i-tabler-mail",
        to: "/admin/messages",
      },
    ],
  },

  {
    label: "Utilisateurs",
    icon: "i-tabler-users",
    children: [
      {
        label: "Administrateurs",
        icon: "i-tabler-user-shield",
        to: "/admin/users",
      },
      {
        label: "Profils",
        icon: "i-tabler-user-circle",
        to: "/admin/profiles",
      },
    ],
  },

  {
    label: "Paramètres",
    icon: "i-tabler-settings",
    children: [
      {
        label: "Général",
        icon: "i-tabler-adjustments",
        to: "/admin/settings",
      },
      {
        label: "Sécurité",
        icon: "i-tabler-lock",
        to: "/admin/settings/security",
      },
    ],
  },
]);

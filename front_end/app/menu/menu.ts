import type { NavigationMenuItem } from "@nuxt/ui";

export interface AppMenuItem {
  label: string;
  to?: string;
  name?: string;
  icon?: string;
  children?: NavigationMenuItem[];
}

export const useAppMenus = () => {
  const serviceStore = useServiceStore();
  const { t } = useI18n();

  const services = computed<NavigationMenuItem[]>(() => {
    const serviceItems = serviceStore.services
      .filter((service: any) => Number(service.display_order) === 1 && service.is_active)
      .map((service: any) => ({
        label: service.title,
        to: `/services/${service.slug}`,
        description: service.description,
      }));

    return [
      ...serviceItems,
      {
        label: t("common.allServices"),
        icon: "i-lucide-arrow-right",
        description:
          t("services.menuDescription"),
        to: "/services",
      },
    ];
  });

  const appMenus = computed<AppMenuItem[]>(() => [
    {
      label: t("nav.home"),
      to: "/",
      name: "index",
    },

    {
      label: t("nav.services"),
      name: "services",
      children: services.value,
    },

    {
      label: t("nav.whyUs"),
      to: "/why-us",
      name: "why-us",
    },

    {
      label: t("nav.about"),
      to: "/about",
      name: "about",
    },

    {
      label: t("nav.testimonials"),
      to: "/testimonials",
      name: "testimonials",
    },

    {
      label: t("nav.quote"),
      to: "/quote",
      name: "quote",
    },

    {
      label: t("nav.contact"),
      to: "/contact",
      name: "contact",
    },
  ]);

  return {
    appMenus,
    services,
  };
};

export const menus = ref<NavigationMenuItem[]>([
  {
    label: "Tableau de bord",
    icon: "i-tabler-layout-dashboard",
    to: "/admin",
  },

  {
    label: "Gestion du site",
    icon: "i-tabler-world",
    defaultOpen: true,

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
    defaultOpen: true,

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
    defaultOpen: true,

    children: [
      {
        label: "Administrateurs",
        icon: "i-tabler-user-shield",
        to: "/admin/users/admins",
      },
       {
        label: "Clients",
        icon: "i-tabler-user-shield",
        to: "/admin/users/clients",
      },
    ],
  },

  {
    label: "Paramètres",
    icon: "i-tabler-settings",
    defaultOpen: true,

    children: [
      {
        label: "Général",
        icon: "i-tabler-adjustments",
        to: "/admin/settings",
      },
    ],
  },
]);
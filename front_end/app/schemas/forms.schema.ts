import { z } from "zod";

const nonEmptyText = (message: string) => z.string().trim().min(1, message);

export const loginSchema = z.object({
  email: nonEmptyText("L'adresse e-mail est requise").email(
    "Format d'e-mail invalide",
  ),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export const registerSchema = z
  .object({
    full_name: z.string().trim().min(1, "Le nom complet est requis"),

    email: z
      .string()
      .trim()
      .min(1, "L'adresse e-mail est requise")
      .email("Format d'e-mail invalide"),

    phone: z.string().trim().min(1, "Le numéro de téléphone est requis"),
    country: z.string().min(1, "Le pays est requis"),
    city: z.string().min(1, "La ville est requis"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirm_password: z
      .string()
      .min(1, "La confirmation du mot de passe est requise"),
    avatar: z.any().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirm_password"],
  });

export const quoteSchema = z.object({
  name: nonEmptyText("Le nom est requis"),
  email: nonEmptyText("L'adresse e-mail est requise").email(
    "Format d'e-mail invalide",
  ),
  phone: nonEmptyText("Le numéro de téléphone est requis").min(
    6,
    "Numéro de téléphone invalide",
  ),
  // residence_country: nonEmptyText("Le pays de résidence est requis"),
  residence_country: z.string().optional(),
  service_slug: nonEmptyText("Le service est requis"),
  urgency: nonEmptyText("L'urgence est requise"),
  details: nonEmptyText("Veuillez décrire votre besoin").min(
    10,
    "Votre description doit contenir au moins 10 caractères",
  ),
});

export const newsletterSchema = z.object({
  email: nonEmptyText("L'adresse e-mail est requise").email(
    "Format d'e-mail invalide",
  ),
});

export const serviceFormSchema = z.object({
  title: nonEmptyText("Le titre du service est requis"),
  slug:nonEmptyText("Le slug du service est requis"),
  description: nonEmptyText('La description du service est requise'),
  is_active:z.boolean(),
  display_order: z.number().min(1, "L'ordre d'affichage doit être un nombre positif")
});

export const adminQuoteSchema = z.object({
  title: nonEmptyText("Le titre est requis"),
  email: z
    .string()
    .trim()
    .refine(
      (value) => !value || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value),
      "Email invalide",
    ),
  body: z.string().trim(),
});

export const createUserSchema = z
  .object({
    firstName: nonEmptyText("Le prénom est requis"),
    lastName: nonEmptyText("Le nom est requis"),
    userName: nonEmptyText("Le nom utilisateur est requis"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: nonEmptyText(
      "La confirmation du mot de passe est requise",
    ),
    role: nonEmptyText("Le rôle est requis"),
    email: nonEmptyText("L'email est requis").email("Format d'email invalide"),
    phone: nonEmptyText("Le numéro de téléphone est requis"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export const testimonialFormSchema = z.object({
  author_name: z.string().min(2, "Veuillez renseigner votre nom complet."),

  author_location: z
    .string()
    .min(2, "Veuillez renseigner votre ville ou votre pays."),

  service_used: z.string().min(2, "Veuillez indiquer le service utilisé."),
 flag: z.string(),
  rating: z
    .number()
    .min(1, "Veuillez attribuer une note.")
    .max(5, "La note maximale est de 5."),

  content: z
    .string()
    .min(10, "Votre témoignage doit contenir au moins 10 caractères.")
    .max(1000, "Votre témoignage ne peut pas dépasser 1000 caractères."),

  // photo_url: z
  //   .string()
  //   .url("L'URL de la photo est invalide.")
  //   .optional()
  //   .or(z.literal("")),
  is_published: z.boolean(),
});



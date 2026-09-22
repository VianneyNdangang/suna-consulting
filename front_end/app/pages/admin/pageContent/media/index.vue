div
<template>
  <div class="flex flex-col gap-3">
    <PageHeader
      title="Médiathèque"
      subtitle="Gérez tous les contenus du site"
      :loading="store.loading"
      :refresh="() => store.fetchsite_content()"
    />
    <div
      v-if="store.loading && !content"
      class="grid grid-cols-1 gap-4 lg:grid-cols-2"
    >
      <USkeleton v-for="i in 6" :key="i" class="h-40 rounded-xl" />
    </div>
    <!-- Content -->
    <div v-else-if="content" class="space-y-6">
      <CardDesign>
        <template #header>
          <div class="flex items-start gap-2">
            <Icon
              name="i-tabler-photo"
              class="mt-0.5 size-5 shrink-0 text-(--text-muted)"
            />
            <div>
              <h2 class="font-bold">Contenu du Hero</h2>
              <p class="text-sm font-normal text-(--text-muted)">
                Contenu principal affiché sur la page d'accueil
              </p>
            </div>
          </div>
        </template>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div class="space-y-5">
            <UFormField label="Titre principal">
              <UInput v-model="content.hero_title" class="w-full" />
            </UFormField>
            <UFormField label="Sous-titre">
              <UTextarea
                v-model="content.hero_subtitle"
                :rows="3"
                class="w-full"
              />
            </UFormField>
            <UFormField label="Vidéo">
              <UInput
                v-model="content.hero_video"
                icon="i-lucide-video"
                class="w-full"
              />
            </UFormField>
          </div>
          <div class="space-y-2">
            <p class="text-sm font-medium">Aperçu de la vidéo</p>
            <div
              v-if="content.hero_video"
              class="overflow-hidden rounded-xl border border-(--border) bg-black"
            >
              <video
                :src="content.hero_video"
                controls
                class="aspect-video w-full object-cover"
              />
            </div>
            <p v-else class="text-sm text-(--text-muted)">
              Aucune vidéo configurée.
            </p>
          </div>
        </div>
      </CardDesign>
      <!-- ================= STATS ================= -->
      <CardDesign>
        <template #header>
          <div class="flex w-full items-start justify-between gap-4">
            <div class="flex items-start gap-2">
              <Icon
                name="i-tabler-chart-bar"
                class="mt-0.5 size-5 shrink-0 text-(--text-muted)"
              />
              <div>
                <h2 class="font-bold">Statistiques</h2>
                <p class="text-sm font-normal text-(--text-muted)">
                  Chiffres clés affichés sur le site
                </p>
              </div>
            </div>

            <Button
              variant="secondary"
              type="button"
              icon="i-tabler-plus"
              @click="addStat()"
              label="Ajouter"
            />
          </div>
        </template>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <UCard
            v-for="(stat, index) in content.stats"
            :key="index"
            variant="subtle"
          >
            <div class="space-y-3">
              <div class="flex justify-end">
                <Button
                  variant="ghost"
                  color="error"
                  type="button"
                  icon="i-tabler-trash"
                  @click="removeStat(Number(index))"
                />
              </div>
              <Input
                label="Libellé"
                v-model="stat.label"
                name="label"
                label-class="text-(--text-secondary)"
              />
              <Input
                label="Valeur"
                v-model.number="stat.value"
                type="number"
                name="value"
                :min="0"
                label-class="text-(--text-secondary)"
              />
            </div>
          </UCard>
        </div>
      </CardDesign>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <CardDesign>
          <template #header>
            <div class="flex items-start gap-2">
              <Icon
                name="i-tabler-target-arrow"
                class="mt-0.5 size-5 shrink-0 text-(--text-muted)"
              />
              <div>
                <h2 class="font-bold">Notre objectif</h2>
                <p class="text-sm font-normal text-(--text-muted)">
                  Présentation de la mission de l'entreprise
                </p>
              </div>
            </div>
          </template>
          <UFormField label="Description">
            <UTextarea v-model="content.our_goals" :rows="6" class="w-full" />
          </UFormField>
        </CardDesign>
        <div class="md:col-span-2">
          <CardDesign>
            <template #header>
              <div class="flex w-full items-start justify-between gap-4">
                <div class="flex items-start gap-2">
                  <Icon
                    name="i-tabler-heart"
                    class="mt-0.5 size-5 shrink-0 text-(--text-muted)"
                  />
                  <div>
                    <h2 class="font-bold">Nos valeurs</h2>
                    <p class="text-sm font-normal text-(--text-muted)">
                      Principes fondamentaux de Súna Consulting
                    </p>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  type="button"
                  icon="i-tabler-plus"
                  @click="addValue()"
                  label="Ajouter"
                />
              </div>
            </template>
            <div class="space-y-5">
              <Input
                v-model="content.our_values.title"
                :name="`our_values`"
                label="Titre"
                label-class="text-(--text-secondary)"
              />
              <div class="space-y-3">
                <div
                  v-for="(_, index) in content.our_values.items"
                  :key="index"
                  class="flex gap-2"
                >
                  <Input
                    v-model="content.our_values.items[index]"
                    :name="`our_values${index}`"
                  />
                  <Button
                    variant="ghost"
                    color="error"
                    type="button"
                    icon="i-tabler-trash"
                    @click="removeValue(Number(index))"
                  />
                </div>
              </div>
            </div>
          </CardDesign>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="md:col-span-2">
          <CardDesign>
            <template #header>
              <div class="flex w-full items-start justify-between gap-4">
                <div class="flex items-start gap-2">
                  <Icon
                    name="i-tabler-heart-handshake"
                    class="size-5 text-(--text-muted)"
                  />
                  <div>
                    <h2 class="font-bold">Notre engagement</h2>
                    <p class="text-sm font-normal text-(--text-muted)">
                      Engagements sociaux et actions de l'entreprise
                    </p>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  type="button"
                  icon="i-tabler-plus"
                  @click="addEngagement()"
                  label="Ajouter"
                />
              </div>
            </template>
            <div class="space-y-6">
              <UCard
                v-for="(engagement, index) in content.our_engagement"
                :key="index"
                variant="subtle"
              >
                <div class="space-y-4">
                  <div class="flex justify-between">
                    <span class="text-sm font-medium">
                      Engagement {{ Number(index) + 1 }}
                    </span>
                    <Button
                      variant="ghost"
                      type="button"
                      color="error"
                      icon="i-tabler-trash"
                      @click="removeEngagement(Number(index))"
                    />
                  </div>
                  <Textarea
                    label="Titre"
                    v-model="engagement.title"
                    name="title"
                    label-class="text-(--text-secondary)"
                  />
                  <div class="space-y-3">
                    <div class="flex items-center justify-between">
                      <p class="text-sm font-medium">Actions</p>
                      <Button
                        variant="secondary"
                        type="button"
                        icon="i-tabler-plus"
                        @click="() => addEngagementItem(Number(index))"
                        label="Ajouter"
                      />
                    </div>
                    <div
                      v-for="(_, itemIndex) in engagement.content"
                      :key="itemIndex"
                      class="flex gap-2"
                    >
                      <UInput
                        v-model="engagement.content[itemIndex]"
                        class="flex-1"
                      />
                      <Button
                        variant="ghost"
                        color="error"
                        type="button"
                        icon="i-tabler-trash"
                        @click="
                          removeEngagementItem(Number(index), Number(itemIndex))
                        "
                      />
                    </div>
                  </div>
                </div>
              </UCard>
            </div>
          </CardDesign>
        </div>
        <div class="flex flex-col gap-3">
          <CardDesign>
            <template #header>
              <div class="flex w-full items-start justify-between gap-4">
                <div class="flex items-start gap-2">
                  <Icon
                    name="i-tabler-circle-check"
                    class="mt-0.5 size-5 shrink-0 text-(--text-muted)"
                  />
                  <div>
                    <h2 class="font-bold">Pourquoi nous choisir ?</h2>
                    <p class="text-sm font-normal text-(--text-muted)">
                      Arguments présentés aux visiteurs
                    </p>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  type="button"
                  icon="i-tabler-plus"
                  @click="addWhyChooseUs()"
                  label="Ajouter"
                />
              </div>
            </template>
            <div class="space-y-3">
              <div
                v-for="(_, index) in content.why_choose_us"
                :key="index"
                class="flex gap-2"
              >
                <UInput v-model="content.why_choose_us[index]" class="flex-1" />
                <Button
                  variant="ghost"
                  color="error"
                  type="button"
                  icon="i-tabler-trash"
                  @click="removeWhyChooseUs(Number(index))"
                />
              </div>
            </div>
          </CardDesign>
          <CardDesign>
            <template #header>
              <div class="flex items-start gap-2">
                <Icon
                  name="i-tabler-address-book"
                  class="mt-0.5 size-5 shrink-0 text-(--text-muted)"
                />
                <div>
                  <h2 class="font-bold">Informations de contact</h2>
                  <p class="text-sm font-normal text-(--text-muted)">
                    Coordonnées utilisées sur le site
                  </p>
                </div>
              </div>
            </template>
            <div class="flex flex-col gap-4">
              <!-- Téléphones -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-(--text-secondary)">
                    Téléphones
                  </p>
                  <Button
                    variant="secondary"
                    type="button"
                    icon="i-tabler-plus"
                    @click="() => addPhone()"
                    label="Ajouter"
                  />
                </div>
                <div
                  v-for="(_, index) in content.contact_phone"
                  :key="index"
                  class="flex gap-2"
                >
                  <Input
                    :name="`contact_phone${index}`"
                    v-model="content.contact_phone[index]"
                    icon="i-tabler-phone"
                  />
                  <Button
                    variant="ghost"
                    color="error"
                    type="button"
                    icon="i-tabler-trash"
                    @click="removePhone(Number(index))"
                  />
                </div>
              </div>
              <USeparator class="border-t border-(--muted)" />
              <!-- WhatsApp -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-(--text-secondary)">
                    WhatsApp
                  </p>
                  <Button
                    variant="secondary"
                    type="button"
                    icon="i-tabler-plus"
                    @click="() => addWhatsapp()"
                    label="Ajouter"
                  />
                </div>
                <div
                  v-for="(_, index) in content.contact_whatsapp"
                  :key="index"
                  class="flex gap-2"
                >
                  <Input
                    :name="`whatsapp${index}`"
                    v-model="content.contact_whatsapp[index]"
                    icon="i-tabler-brand-whatsapp"
                  />
                  <Button
                    variant="ghost"
                    color="error"
                    type="button"
                    icon="i-tabler-trash"
                    @click="removeWhatsapp(index)"
                  />
                </div>
              </div>
              <!-- Email -->
              <Input
                label="Email"
                name="contact_email"
                type="email"
                v-model="content.contact_email"
                icon="i-tabler-mail"
                label-class="text-(--text-secondary)"
              />
              <!-- Facebook -->
              <Input
                label="Facebook"
                name="facebook"
                v-model="content.social_links.facebook"
                icon="i-tabler-brand-facebook"
                label-class="text-(--text-secondary)"
              />
              <!-- Instagram -->
              <Input
                label="Instagram"
                name="instagram"
                v-model="content.social_links.instagram"
                icon="i-tabler-brand-instagram"
                label-class="text-(--text-secondary)"
              />
            </div>
          </CardDesign>
        </div>
      </div>
      <!-- ================= ACTIONS ================= -->
      <div
        class="sticky bottom-0 z-10 flex justify-end gap-3 border-t border-(--border) bg-(--background)/95 py-4 backdrop-blur"
      >
        <Button
          variant="secondary"
          type="button"
          icon="i-lucide-refresh-cw"
          :loading="store.loading"
          @click="store.fetchsite_content()"
          label="Réinitialiser"
        />
        <Button
          variant="primary"
          type="button"
          icon="i-tabler-device-floppy"
          @click="() => (showConfirmModal = true)"
          label="Enregistrer les modifications"
        />
      </div>
    </div>
    <!-- Empty -->
    <UEmpty
      v-else
      icon="i-lucide-images"
      title="Aucun contenu"
      description="Le contenu du site n'a pas encore été chargé."
    />
    <ConfirmContentModal
    v-model="showConfirmModal"
    :loading="saving"
    @confirm="saveContent"
  />
  </div>
</template>
<script setup lang="ts">
import ConfirmContentModal from "~/components/admin/forms/ConfirmContentModal.vue";
import PageHeader from "~/components/admin/pageHeader/PageHeader.vue";
import Button from "~/components/buttons/Button.vue";
import CardDesign from "~/components/cardDesign/CardDesign.vue";
import Input from "~/components/input/Input.vue";

definePageMeta({
  layout: "admin",
});

const store = usesite_contentStore();
const toast = useToast();
const saving = ref(false);

onMounted(async () => {
  await store.fetchsite_content();
});

const content = computed(() => store.site_content);
const showConfirmModal = ref(false);

const addStat = () => {
  content.value?.stats.push({
    label: "",
    value: 0,
  });
};

const removeStat = (index: number) => {
  content.value?.stats.splice(index, 1);
};

const addValue = () => {
  content.value?.our_values.items.push("");
};

const removeValue = (index: number) => {
  content.value?.our_values.items.splice(index, 1);
};

const addEngagement = () => {
  content.value?.our_engagement.push({
    title: "",
    content: [],
  });
};

const removeEngagement = (index: number) => {
  content.value?.our_engagement.splice(index, 1);
};

const addEngagementItem = (engagementIndex: number) => {
  content.value?.our_engagement[engagementIndex].content.push("");
};

const removeEngagementItem = (engagementIndex: number, itemIndex: number) => {
  content.value?.our_engagement[engagementIndex].content.splice(itemIndex, 1);
};

const addWhyChooseUs = () => {
  content.value?.why_choose_us.push("");
};

const removeWhyChooseUs = (index: number) => {
  content.value?.why_choose_us.splice(index, 1);
};

const addPhone = () => {
  content.value?.contact_phone.push("");
};
const removePhone = (index: number) => {
  content.value?.contact_phone.splice(index, 1);
};
const addWhatsapp = () => {
  content.value?.contact_whatsapp.push("");
};
const removeWhatsapp = (index: any) => {
  content.value?.contact_whatsapp.splice(index, 1);
};

const saveContent = async (data: { password: string }) => {
  if (!content.value) return;

  try {
    saving.value = true;
    const requestData = { ...content.value, password: data.password };
    await store.updatesite_content(requestData);
    showConfirmModal.value = false;
    toast.add({
      title: "Contenu du site mis a jour.",
      color: "success",
    });
  } catch (error) {
    console.error("Erreur lors de la sauvegarde :", error);
  } finally {
    saving.value = false;
  }
};
</script>

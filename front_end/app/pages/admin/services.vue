<template>
  <div class="admin-services">
    <h1>Services</h1>
    <div class="controls">
      <button @click="refresh" :disabled="loading">Rafraîchir</button>
      <button @click="openCreate">Créer un service</button>
    </div>

    <div v-if="loading" class="space-y-3" aria-busy="true" aria-label="Chargement des services">
      <USkeleton v-for="index in 5" :key="index" class="h-10 w-full" />
    </div>
    <table v-else-if="services.length">
      <thead><tr><th>id</th><th>title</th><th>price</th><th></th></tr></thead>
      <tbody>
        <tr v-for="s in services" :key="s.id">
          <td>{{ s.id }}</td>
          <td>{{ s.title  }}</td>
          <td>{{ }}</td>
          <td>
            <button @click="openEdit(s)">Éditer</button>
            <button @click="remove(s.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="creating || editingId">
      <h3 v-if="creating">Créer</h3>
      <h3 v-else>Éditer</h3>
      <div class="form">
        <label>Titre</label>
        <input v-model="activeForm.title" placeholder="Titre" />

        <label>Prix</label>
        <input v-model="activeForm.price" placeholder="Prix" />

        <label>Description</label>
        <textarea v-model="activeForm.description" placeholder="Description"></textarea>

        <p v-if="error" class="error">{{ error }}</p>

        <div class="actions">
          <button @click="submit" :disabled="loading">{{ creating ? 'Créer' : 'Enregistrer' }}</button>
          <button @click="cancel">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useServiceStore } from '~/stores/servicesStore';

definePageMeta({ 
  // middleware: 'auth' 
  layout: 'admin'
});

const store = useServiceStore();
const services = store.services;
const loading = computed(() => store.loading);

const creating = ref(false);
const editingId = ref<string | null>(null);
const form = reactive({ title: '', price: '', description: '' });
const editForm = reactive({ title: '', price: '', description: '' });
const error = ref<string | null>(null);

const activeForm = computed(() => (creating.value ? form : editForm));

const refresh = async () => { await store.fetchServices(); };
const openCreate = () => { creating.value = true; editingId.value = null; error.value = null; };
const closeCreate = () => { creating.value = false; error.value = null; };

const openEdit = (s: any) => {
  editingId.value = String(s.id);
  editForm.title = s.title ?? s.name ?? '';
  editForm.price = s.price ?? '';
  editForm.description = s.description ?? '';
  creating.value = false;
  error.value = null;
};

const cancel = () => { creating.value = false; editingId.value = null; error.value = null; };

const validate = (data: any) => {
  if (!data.title || String(data.title).trim().length === 0) return 'Le titre est requis.';
  if (data.price && isNaN(Number(data.price))) return 'Le prix doit être un nombre.';
  return null;
};

const submit = async () => {
  error.value = null;
  const data = { title: activeForm.value.title, price: activeForm.value.price, description: activeForm.value.description };
  const v = validate(data);
  if (v) { error.value = v; return; }

  if (creating.value) {
    await store.createServices(data as any);
    form.title = form.price = form.description = '';
    creating.value = false;
    await refresh();
    return;
  }

  if (editingId.value) {
    await store.updateServices(editingId.value, data);
    editingId.value = null;
    await refresh();
    return;
  }
};

const remove = async (id: string) => {
  if (!confirm('Supprimer ce service ?')) return;
  // mark deleted via patch
  await store.updateServices(id, { deleted: true });
  await refresh();
};

onMounted(async () => { await refresh(); });
</script>

<style scoped>
.admin-services { max-width: 1000px; margin: 2rem auto; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 6px 8px; border: 1px solid #ddd; }
.form { margin-top: 1rem; display:flex; flex-direction:column; gap:8px; }
.actions { display:flex; gap:8px; }
.error { color: #c00; }
</style>

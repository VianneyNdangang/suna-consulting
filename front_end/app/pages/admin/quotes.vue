<template>
  <div class="admin-quotes">
    <h1>Devis</h1>
    <div class="controls">
      <button @click="refresh" :disabled="loading">Rafraîchir</button>
      <button @click="openCreate">Créer un devis</button>
    </div>

    <table v-if="quotes.length">
      <thead><tr><th>id</th><th>title</th><th>user</th><th></th></tr></thead>
      <tbody>
        <tr v-for="q in quotes" :key="q.id">
          <!-- <td>{{ q.id }}</td>
          <td>{{ q.title ?? q.subject }}</td>
          <td>{{ q.user?.email ?? q.email ?? '-' }}</td> -->
          <td>
            <button @click="openEdit(q)">Éditer</button>
            <button @click="remove(q.id)">Supprimer</button>
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

        <label>Email utilisateur</label>
        <input v-model="activeForm.email" placeholder="Email" />

        <label>Contenu</label>
        <textarea v-model="activeForm.body" placeholder="Contenu"></textarea>

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
import { usequotestore } from '~/stores/quotesStore';

definePageMeta({ 
  // middleware: 'auth',
  layout: 'admin'
 });

const store = usequotestore();
const quotes = store.quotes;
const loading = computed(() => store.loading);

const creating = ref(false);
const editingId = ref<string | null>(null);
const form = reactive({ title: '', email: '', body: '' });
const editForm = reactive({ title: '', email: '', body: '' });
const error = ref<string | null>(null);

const activeForm = computed(() => (creating.value ? form : editForm));

const refresh = async () => { await store.fetchquotes(); };
const openCreate = () => { creating.value = true; editingId.value = null; error.value = null; };
const closeCreate = () => { creating.value = false; error.value = null; };

const openEdit = (q: any) => {
  editingId.value = String(q.id);
  editForm.title = q.title ?? q.subject ?? '';
  editForm.email = q.email ?? q.user?.email ?? '';
  editForm.body = q.body ?? q.content ?? '';
  creating.value = false;
  error.value = null;
};

const cancel = () => { creating.value = false; editingId.value = null; error.value = null; };

const validate = (data: any) => {
  if (!data.title || String(data.title).trim().length === 0) return 'Le titre est requis.';
  if (data.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) return 'Email invalide.';
  return null;
};

const submit = async () => {
  error.value = null;
  const data = { title: activeForm.value.title, email: activeForm.value.email, body: activeForm.value.body };
  const v = validate(data);
  if (v) { error.value = v; return; }

  if (creating.value) {
    await store.createquotes(data as any);
    form.title = form.email = form.body = '';
    creating.value = false;
    await refresh();
    return;
  }

  if (editingId.value) {
    await store.updatequotes(editingId.value, data);
    editingId.value = null;
    await refresh();
    return;
  }
};

const remove = async (id: string) => {
  if (!confirm('Supprimer ce devis ?')) return;
  await store.updatequotes(id, { deleted: true });
  await refresh();
};

onMounted(async () => { await refresh(); });
</script>

<style scoped>
.admin-quotes { max-width: 1000px; margin: 2rem auto; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 6px 8px; border: 1px solid #ddd; }
.form { margin-top: 1rem; display:flex; flex-direction:column; gap:8px; }
.actions { display:flex; gap:8px; }
.error { color: #c00; }
</style>

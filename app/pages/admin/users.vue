<template>
  <div class="admin-users">
    <h1>Utilisateurs</h1>
    <div class="controls">
      <button @click="refresh" :disabled="loading">Rafraîchir</button>
      <button @click="openCreate">Créer un utilisateur</button>
    </div>

    <table v-if="users.length">
      <thead>
        <tr><th>id</th><th>nom</th><th>email</th><th></th></tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td>{{ u.id }}</td>
          <td>{{ u.name ?? u.fullName ?? '-' }}</td>
          <td>{{ u.email }}</td>
          <td>
            <button @click="openEdit(u)">Éditer</button>
            <button @click="remove(u.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="creating || editingId">
      <h3 v-if="creating">Créer</h3>
      <h3 v-else>Éditer</h3>

      <div class="form">
        <label>Nom</label>
        <input v-model="activeForm.name" placeholder="Nom" />

        <label>Email</label>
        <input v-model="activeForm.email" placeholder="Email" />

        <label>Mot de passe</label>
        <input v-model="activeForm.password" placeholder="Mot de passe (laisser vide pour garder)" />

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
import { useUserStore } from '~/stores/userStore';

definePageMeta({ middleware: 'auth' });

const store = useUserStore();
const users = store.users;
const loading = computed(() => store.loading);

const creating = ref(false);
const editingId = ref<string | null>(null);
const form = reactive({ name: '', email: '', password: '' });
const editForm = reactive({ name: '', email: '', password: '' });
const error = ref<string | null>(null);

const activeForm = computed(() => (creating.value ? form : editForm));

const refresh = async () => { await store.fetchUsers(); };
const openCreate = () => { creating.value = true; editingId.value = null; error.value = null; };
const closeCreate = () => { creating.value = false; error.value = null; };

const openEdit = (u: any) => {
  editingId.value = String(u.id);
  editForm.name = u.name ?? u.fullName ?? '';
  editForm.email = u.email ?? '';
  editForm.password = '';
  creating.value = false;
  error.value = null;
};

const cancel = () => { creating.value = false; editingId.value = null; error.value = null; };

const validate = (data: any) => {
  if (!data.name || String(data.name).trim().length === 0) return 'Le nom est requis.';
  if (!data.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) return 'Email invalide.';
  if (data.password && data.password.length > 0 && data.password.length < 6) return 'Le mot de passe doit contenir au moins 6 caractères.';
  return null;
};

const submit = async () => {
  error.value = null;
  const payload: any = { name: activeForm.value.name, email: activeForm.value.email };
  if (activeForm.value.password && activeForm.value.password.length > 0) payload.password = activeForm.value.password;

  const v = validate({ ...payload, password: activeForm.value.password });
  if (v) { error.value = v; return; }

  if (creating.value) {
    await store.createUser(payload);
    form.name = form.email = form.password = '';
    creating.value = false;
    await refresh();
    return;
  }

  if (editingId.value) {
    await store.updateUser(editingId.value, payload);
    editingId.value = null;
    await refresh();
    return;
  }
};

const remove = async (id: string) => {
  if (!confirm('Supprimer cet utilisateur ?')) return;
  await store.deleteUser(id);
  await refresh();
};

onMounted(async () => { await refresh(); });
</script>

<style scoped>
.admin-users { max-width: 1000px; margin: 2rem auto; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 6px 8px; border: 1px solid #ddd; }
.form { margin-top: 1rem; display:flex; flex-direction:column; gap:8px; }
.actions { display:flex; gap:8px; }
.error { color: #c00; }
</style>

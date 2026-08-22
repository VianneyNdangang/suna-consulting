<template>
  <div class="flex flex-col gap-2">
    <PageHeader
      title="Users"
      subtitle="Manage user accounts, permissions, and access le"
      :refresh="async() => {await userStore.fetchUsers()}"
      :new="newUser"
    />
    <div class="flex justify-center items-center flex-col md:flex-row gap-2">
      <DataSommary title="Total Utilisateurs" :value="users.length" state="primary" description="Nombre total d'utilisateurs" />
      <DataSommary title="Total Administrators" :value="users.filter((u: any)=>u.role === 'admin').length" state="warning" description="Nombre total d'administrateurs" />
      <DataSommary title="Total Utilisateurs Actifs" :value="users.filter((u: any)=>u.is_active).length" state="success" description="Nombre total d'utilisateurs actifs" />
      <DataSommary title="Total Utilisateurs Inactifs" :value="users.filter((u: any)=>!u.is_active).length" state="danger" description="Nombre total d'utilisateurs inactifs" />
    </div>
    <Button variant="secondary" label="Sidebare" :click="rSidebarStore.handleOpen" type="button" />
    <div>
      <!-- <LoadingView v-if="" /> -->
      <div class="flex">
        <DataTable
          title="Users"
          :records="users"
          :headers="header"
          :loading="loading"
        />
        <!-- <CategoriesSidebarView
        :record="['Admin', 'Category Manager', 'Food Workers']"
      /> -->
      </div>
    </div>
  </div>
  <RightSidebar @close="rSidebarStore.handleClose" >
    Hello World
  </RightSidebar>
  <CreateUser
    v-if="isCreateUser"
    :user = "selectedUser"
    :isOpen="isCreateUser"
    @close="()=>{isCreateUser = false; selectedUser = null}"
  />
  <DeleteData
  :action="()=>handleDelete"
    :id="selectedUser?.id"
    :name="selectedUser?.userNme"
    message="Cette action supprimera définitivement cet utilisateur ainsi que les données qui lui sont associées. Cette opération est irréversible. Voulez-vous continuer ?"
    title="Supprimer l'utilisateur"
    :isOpen="isDeleteData"
    @close="()=>{isDeleteData = false; selectedUser = null}"
  />
</template>
<script setup lang="ts">
definePageMeta({ layout: 'admin' });
import { ref, onMounted, h } from "vue";
import { IconEdit, IconTrash } from "@tabler/icons-vue";
// import LoadingView from "@/components/molecules/LoadingView.vue";
// import CategoriesSidebarView from "@/components/CategoriesSidebarView.vue";

import Badge from "@/components/badge/Badge.vue";
import { storeToRefs } from "pinia";
import CreateUser from "~/components/userComponents/CreateUser.vue";
import DeleteData from "~/components/deletedata/DeleteData.vue";
import Button from "~/components/buttons/Button.vue";
import type { TTableheaders } from "~/components/admin/dataTable/DataTable.vue";

const rSidebarStore = useRSidebarStore();
const isCreateUser = ref(false);
const isDeleteData = ref(false)
const newUser = {
  label: "New User",
  action: () => (isCreateUser.value = true),
};

const header: TTableheaders[] = [
  // {
  //   textAlign: "left",
  //   accessor: "",
  //   name: "",
  //   render: (record: any) => h("div", { class: "flex justify-end gap-2" }, [
  //       h(Profile, {
  //         src: record.profileUrl,
  //         h: '10'
  //       }),
  //     ]),
  //   width: "28",
  // },
  {
    textAlign: "left",
    accessor: "userName",
    name: "User Name",
    render: (record: any) => (record?.userName ? record?.userName : "-"),
    width: "28",
  },
  {
    textAlign: "left",
    accessor: "lastName",
    name: "Last Name",
    render: (record: any) => (record?.lastName ? record?.lastName : "-"),
    width: "28",
  },
  {
    textAlign: "left",
    accessor: "email",
    name: "E-mail",
    render: (record: any) => (record?.email ? record?.email : "-"),
    width: "auto",
  },
  {
    textAlign: "center",
    accessor: "role",
    name: "Role",
    render: (record: any) =>
      // record?.role
        h(Badge, {
          color: "info",
          variant: "subtle",
            message: record.role || "-"
          }),
    width: "28",
  },
  {
    textAlign: "left",
    accessor: "phone",
    name: "Phone",
    render: (record: any) => (record?.phone ? record?.phone : "-"),
    width: "auto",
  },
  {
    textAlign: "right",
    accessor: "actions",
    name: "Actions",
    render: (record: any) =>
      h("div", { class: "flex justify-end gap-2" }, [
        h(IconEdit, {
          size: 18,
          class: "cursor-pointer text-slate-900 hover:text-blue-700",
          onClick: ()=>{
            selectedUser.value = record;
            isCreateUser.value = true;
          }
         
        }),
        h(IconTrash, {
          size: 18,
          class: "cursor-pointer text-red-500 hover:text-red-700",
          onClick: ()=>{
            selectedUser.value = record;
            isDeleteData.value = true;
          }
        }),
      ]),
    width: "28",
  },
];
const selectedUser = ref();
const userStore = useUserStore();
const { users } = storeToRefs(userStore);
const {loading} = storeToRefs(userStore)

const handleDelete = async () => {
  await userStore.deleteUser(selectedUser.value.id);
};
onMounted(async () => {
  await userStore.fetchUsers();
});

</script>

<template>
    <Card >
        <div class="flex items-center justify-start gap-3 whitespace-nowrap">
            <div
                class="flex size-11 shrink-0 items-center justify-center rounded-md border p-1.5 md:p-3"
                :class="stateClasses"
            >
                <UIcon :name="icon" class=" size-4 md:size-5" :stroke-width="1.5" />
            </div>
            <div class="flex flex-col justify-start">
                <p class="truncate text-xs md:text-sm font-semibold text-(--text-primary)">
                    {{ title }}
                </p>
                <p class=" text-xl md:text-3xl font-semibold text-(--text-muted)">
                    {{ value }}
                </p>
            </div>
        </div>
        <p v-if="description" class=" text-xs mt-1.5 md:mt-3 text-(--text-secondary)">
            {{ description }}
        </p>
    </Card>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    icon?: string;
    title: string;
    value: string | number;
    description?: string;
    state?: "danger" | "success" | "primary" | "warning";
}>(), {
    icon: "i-lucide-chart-no-axes-column",
    state: "warning",
});

const stateClasses = computed(() => ({
    "text-(--danger) bg-(--danger)/10 border-(--danger)/40": props.state === "danger",
    "text-(--success) bg-(--success)/10 border-(--success)/40": props.state === "success",
    "text-(--primary) bg-(--primary)/10 border-(--primary)/40": props.state === "primary",
    "text-(--warning) bg-(--warning)/10 border-(--warning)/40": props.state === "warning",
}));
</script>
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AxiosInstance } from 'axios'
import { useNuxtApp } from '#imports'
import type { site_contentType } from '~/types/types'

export const usesite_contentStore = defineStore('site_content', () => {
  const Url = '/site-content'

  const site_content = ref<any>(null)
  const loading = ref(false)

  const { $axios } = useNuxtApp()
  const api = $axios as AxiosInstance

  const fetchsite_content = async () => {
    try {
      loading.value = true
      const response = await api.get(Url)
      site_content.value = (
        Array.isArray(response.data)
          ? response.data
          : response.data ?? {}
      ) as site_contentType
      return site_content.value
    } catch (error) {
      console.error(
        'Erreur lors du chargement du contenu du site :',
        error,
      )
      throw error
    } finally {
      loading.value = false
    }
  }

  const updatesite_content = async (data: site_contentType) => {
    const response = await api.patch(Url, data)
    site_content.value = (
      Array.isArray(response.data)
        ? response.data
        : response.data ?? data
    ) as site_contentType
    return response.data
  }

  return {
    site_content,
    loading,
    fetchsite_content,
    updatesite_content,
  }
})
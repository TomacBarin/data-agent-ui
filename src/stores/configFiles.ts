import {defineStore} from "pinia"
import {ref, computed} from "vue"

export type ConfigFile = {
    id: string
    name: string
    enabled: boolean
    content: string
}

export const useConfigFilesStore = defineStore('configFiles', () => {
    const files = ref<ConfigFile[]>([
    { id: 'agent', name: 'agent.conf', enabled: false, content: 'interval = "10s"\n' },
    { id: 'output', name: 'output.conf', enabled: true, content: '[[outputs.file]]\n' },
    ])

    const selectedId = ref<string | null>(null)

    const selectedFile = computed(() => {
        if (selectedId.value === null) return null
        return files.value.find((f) => f.id === selectedId.value) ?? null
    })

    const enabledCount = computed(() => {
        return files.value.filter((f) => f.enabled).length
    })

    function selectedFile(id: string) {
        selectedId.value = id
    }

    function toggleFile(id: string) {
        const file = files.value.find((f) => f.id === id)
        if (!file) return
        file.enabled = !file.enabled
    }

    function updateContent(content: string) {
        if (!selectedFile.value) return
        selectedFile.value.content = content
    }

    return {
        files, 
        selectedId,
        selectedFile,
        enabledCount,
        toggleFile,
        updateContent,
    }
})

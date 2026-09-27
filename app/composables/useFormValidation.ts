import { ref } from 'vue'
import type { ZodType } from 'zod'

type FormValues = Record<string, unknown>

export function useFormValidation(schema: ZodType, values: FormValues) {
  const errors = ref<Record<string, string>>({})

  const validate = (onlyFilled = false) => {
    const result = schema.safeParse(values)
    if (result.success) {
      errors.value = {}
      return true
    }

    errors.value = Object.fromEntries(
      result.error.issues
        .filter(issue => {
          if (!onlyFilled) return true
          const value = values[String(issue.path[0])]
          return value !== undefined && value !== null && String(value).trim().length > 0
        })
        .map(issue => [String(issue.path[0]), issue.message])
    )
    return false
  }

  return { errors, validate }
}

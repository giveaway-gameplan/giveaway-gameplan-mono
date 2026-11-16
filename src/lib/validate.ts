import type { TextFieldSingleValidation } from 'payload'

export const validateUrl: TextFieldSingleValidation = (value) => {
  if (!value) return true
  try {
    const { protocol } = new URL(value)
    if (protocol === 'https:' || protocol === 'http:') return true
  } catch {
    // fall through to the message below
  }
  return 'Enter a full web address starting with https://'
}

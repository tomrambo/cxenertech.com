import { translate, type LocaleCode } from '~/utils/i18n'

function normalizeLocale(value: unknown): LocaleCode {
  return value === 'en' ? 'en' : 'th'
}

export function useLocale() {
  const cookie = useCookie<LocaleCode>('cx-lang', {
    default: () => 'th',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  })

  const locale = useState<LocaleCode>('cx-locale', () => normalizeLocale(cookie.value))

  const t = (key: string) => translate(locale.value, key)

  function setLocale(next: LocaleCode) {
    const value = normalizeLocale(next)
    locale.value = value
    cookie.value = value
  }

  return {
    locale,
    setLocale,
    t,
  }
}

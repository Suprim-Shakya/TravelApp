import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en, np, in as hindi} from "./translations";
const resources = {
    en: {translation: en,},
    gb: {translation: en,},
    np: {translation: np,},
    in: {translation: hindi}
}

i18next.use(initReactI18next).init({
    debug: true,
    lng:'en',
    compatibilityJSON:'v2',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
})

export default i18next;
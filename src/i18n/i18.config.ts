import i18next from "i18next";
import { initReactI18next } from "react-i18next";
// import { en, fr,gb,de,np,ru } from "./translations";
import { en, fr} from "./translations";
const resources = {
    en: {
        translation: en,
    },
    fr: {
        translation: fr,
},
}

i18next.use(initReactI18next).init({
    debug: true,
    lng:'en',
    compatibilityJSON:'v3',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
})

export default i18next;
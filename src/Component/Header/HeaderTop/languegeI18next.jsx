import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import English from "./en.json";
import Vietnamese from "./vn.json";
const resources = {
    vn: {
        translation: Vietnamese,
    },
    en: {
        translation: English,
    },
    
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "vn",
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
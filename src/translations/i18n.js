import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { TRANSLATIONS_EN } from "./en/translations";
import { TRANSLATIONS_RU } from "./ru/translations";
import { TRANSLATIONS_DE } from "./de/translations";
import { TRANSLATIONS_ES } from "./es/translations";
import { TRANSLATIONS_FR } from "./fr/translations";
import { TRANSLATIONS_ZH } from "./zh/translations";
import { TRANSLATIONS_CH } from "./ch/translations";
import { TRANSLATIONS_KO } from "./ko/translations";
import { TRANSLATIONS_JP } from "./jp/translations";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: TRANSLATIONS_EN
            },
            ru: {
                translation: TRANSLATIONS_RU
            },
            de: {
                translation: TRANSLATIONS_DE
            },
            es: {
                translation: TRANSLATIONS_ES
            },
            fr: {
                translation: TRANSLATIONS_FR
            },
            zh: {
                translation: TRANSLATIONS_ZH
            },
            ch: {
                translation: TRANSLATIONS_CH
            },
            ko: {
                translation: TRANSLATIONS_KO
            },
            jp: {
                translation: TRANSLATIONS_JP
            }
        }
    });

i18n.changeLanguage("en");

import { createI18n } from 'vue-i18n';

import en from './locales/en.json';
import ua from './locales/ua.json';

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        ua,
    },
});

export default i18n;

/* =====================================================
LANG.JS
Language switcher for Atlantis H2O
===================================================== */

/*
ПРИНЦИП:
— В HTML каждый переводимый элемент имеет:
  data-i18n="home.hero.title"
— Тексты хранятся здесь
— Выбранный язык сохраняется в localStorage
*/

/* =====================================================
TRANSLATIONS
===================================================== */
const translations = {
    et: {
        "nav.attractions": "Atraktsioonid",
        "nav.pricing": "Hinnad",
        "nav.saunas": "Saunad",
        "nav.gallery": "Galerii",
        "nav.contact": "Kontakt",

        "hero.title": "Viimsi SPA Aquapark",
        "hero.subtitle": "Suurim ja põnevam veekeskus Eestis",
        "hero.buy": "Osta pilet",
        "hero.more": "Vaata atraktsioone",

        "section.attractions": "Atraktsioonid",
        "section.pricing": "Hinnad",
        "section.saunas": "Saunad",
        "section.gallery": "Galerii",
        "section.contact": "Kontakt",

        "footer.rights": "Kõik õigused kaitstud"
    },

    ru: {
        "nav.attractions": "Аттракционы",
        "nav.pricing": "Цены",
        "nav.saunas": "Сауны",
        "nav.gallery": "Галерея",
        "nav.contact": "Контакты",

        "hero.title": "Аквапарк Viimsi SPA",
        "hero.subtitle": "Самый большой и захватывающий аквапарк в Эстонии",
        "hero.buy": "Купить билет",
        "hero.more": "Смотреть аттракционы",

        "section.attractions": "Аттракционы",
        "section.pricing": "Цены",
        "section.saunas": "Сауны",
        "section.gallery": "Галерея",
        "section.contact": "Контакты",

        "footer.rights": "Все права защищены"
    },

    en: {
        "nav.attractions": "Attractions",
        "nav.pricing": "Pricing",
        "nav.saunas": "Saunas",
        "nav.gallery": "Gallery",
        "nav.contact": "Contact",

        "hero.title": "Viimsi SPA Aquapark",
        "hero.subtitle": "The largest and most exciting water park in Estonia",
        "hero.buy": "Buy ticket",
        "hero.more": "View attractions",

        "section.attractions": "Attractions",
        "section.pricing": "Pricing",
        "section.saunas": "Saunas",
        "section.gallery": "Gallery",
        "section.contact": "Contact",

        "footer.rights": "All rights reserved"
    },

    fi: {
        "nav.attractions": "Vesilaitteet",
        "nav.pricing": "Hinnat",
        "nav.saunas": "Saunat",
        "nav.gallery": "Galleria",
        "nav.contact": "Yhteystiedot",

        "hero.title": "Viimsi SPA Vesipuisto",
        "hero.subtitle": "Viron suurin ja jännittävin vesipuisto",
        "hero.buy": "Osta lippu",
        "hero.more": "Katso vesilaitteet",

        "section.attractions": "Vesilaitteet",
        "section.pricing": "Hinnat",
        "section.saunas": "Saunat",
        "section.gallery": "Galleria",
        "section.contact": "Yhteystiedot",

        "footer.rights": "Kaikki oikeudet pidätetään"
    },

    lv: {
        "nav.attractions": "Atrakcijas",
        "nav.pricing": "Cenas",
        "nav.saunas": "Pirtis",
        "nav.gallery": "Galerija",
        "nav.contact": "Kontakti",

        "hero.title": "Viimsi SPA Ūdens parks",
        "hero.subtitle": "Lielākais un aizraujošākais ūdens parks Igaunijā",
        "hero.buy": "Pirkt biļeti",
        "hero.more": "Skatīt atrakcijas",

        "section.attractions": "Atrakcijas",
        "section.pricing": "Cenas",
        "section.saunas": "Pirtis",
        "section.gallery": "Galerija",
        "section.contact": "Kontakti",

        "footer.rights": "Visas tiesības aizsargātas"
    }
};

/* =====================================================
LANG SWITCH LOGIC
===================================================== */
const langButtons = document.querySelectorAll("[data-lang]");
const defaultLang = "et";

function setLanguage(lang) {
    if (!translations[lang]) return;

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    localStorage.setItem("siteLang", lang);

    langButtons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
    });
}

/* =====================================================
INIT
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("siteLang") || defaultLang;

    setLanguage(savedLang);

    langButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            setLanguage(btn.dataset.lang);
        });
    });
});

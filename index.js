// Mock the $t function
const i18nMock = (language) => (key) => {
  const translations = {
    en: {
      basketLine: "{0} items on {1} are of {2}.",
      yourBasket: "your basket",
      blue: "blue",
    },
    dk: {
      basketLine: "{0} varer på {1} er {2}.",
      yourBasket: "din kurv",
      blue: "blå",
    },
  };
  const selectedTranslations = translations[language];
  return selectedTranslations[key];
};

// You can use i18nMock("dk") to switch to Danish
const $t = i18nMock("en");


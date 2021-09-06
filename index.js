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

// Do the heavy lifting
const regex = new RegExp("\\{\\d+\\}", "g");

const replaceValuesInTemplate = (template, values) => {
  // Look for the first substring in template that looks like {SOME_NUMBER}
  const firstMatch = [...template.matchAll(regex)][0];
  // If there is no such substring, we're done
  if (!firstMatch) {
    return template;
  }
  if (firstMatch) {
    // Get the substring that matches the RegExp's pattern, e.g. '{1}'
    const matchString = firstMatch[0];
    // Remove the first and last character and convert to number,
    // e.g. '{1}' -> 1
    const matchIndex = Number(matchString.slice(1).slice(0, -1));
    // Get the string from values {SOME_NUMBER} is to replaced with by the above index
    const replacement = values[matchIndex];
    // If the values array doesn't have this many strings to replace,
    // let's call it quits and return the template unchanged
    if (!replacement) {
      return template;
    }
    // Split the template to two parts, the start before {SOME_NUMBER}
    // which is from the beginning until the starting index of the first match
    const templateStart = template.substring(0, firstMatch.index);
    // ...and the end after {SOME_NUMBER} which is from the starting index of the first match
    // offset by length of the first match, and until the end of the template
    const templateEnd = template.substring(
      firstMatch.index + matchString.length
    );
    // Concatenate the start, the replacement, and the end
    const updatedTemplate = `${templateStart}${replacement}${templateEnd}`;
    // Look for the next match to replace
    return replaceValuesInTemplate(updatedTemplate, values);
  }
};

const resolvedTemplate = replaceValuesInTemplate($t("basketLine"), [
  2,
  $t("yourBasket"),
  $t("blue"),
]);

console.log(resolvedTemplate);

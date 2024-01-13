import { useEffect, useState } from "react";

interface Options {
  languageCodeOnly?: boolean;
}

const useBrowserLocales = (options: Options = {}): string[] | undefined => {
  const defaultOptions: Options = {
    languageCodeOnly: false,
  };

  const opt: Options = {
    ...defaultOptions,
    ...options,
  };

  const [browserLocales, setBrowserLocales] = useState<string[] | undefined>(
    undefined
  );

  useEffect(() => {
    const getBrowserLocales = (): void => {
      const navigatorLanguages: readonly string[] | undefined =
        navigator.languages || [navigator.language];

      if (!navigatorLanguages) {
        setBrowserLocales(undefined);
        return;
      }

      const locales = navigatorLanguages.map((locale) => {
        const trimmedLocale = locale.trim();
        return opt.languageCodeOnly
          ? trimmedLocale.split(/-|_/)[0]
          : trimmedLocale;
      });

      setBrowserLocales(locales);
    };

    getBrowserLocales();
  }, [opt.languageCodeOnly]);

  return browserLocales;
};

export default useBrowserLocales;

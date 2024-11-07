"use client";

import { ChildrenType } from "@/types/component";
import type {
  DialogControlType,
  LayoutOffcanvasStatesType,
  LayoutState,
  LayoutType,
  ThemeType,
} from "@/types/context";
import { toggleDocumentAttribute } from "@/utils/layout";
import { createContext, use, useMemo, useState } from "react";

const LayoutContext = createContext<LayoutType | undefined>(undefined);

function useLayoutContext() {
  const context = use(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayoutContext must be used within an LayoutProvider");
  }
  return context;
}

const storageThemeKey = "SOCIAL_NEXTJS_THEME_KEY";

const themeAttributeKey = "data-bs-theme";

const LayoutProvider = ({ children }: ChildrenType) => {
  const getSavedTheme = (): LayoutState["theme"] => {
    const foundTheme = localStorage.getItem(storageThemeKey);

    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    if (foundTheme) {
      if (foundTheme === "auto") {
        toggleDocumentAttribute(themeAttributeKey, preferredTheme);
        return preferredTheme;
      }
      toggleDocumentAttribute(themeAttributeKey, foundTheme);
      return foundTheme as ThemeType;
    }
    if (!foundTheme) localStorage.setItem(storageThemeKey, preferredTheme);
    return preferredTheme;
  };

  const INIT_STATE: LayoutState = {
    theme: getSavedTheme(),
  };

  const [settings, setSettings] = useState<LayoutState>(INIT_STATE);

  const [offcanvasStates, setOffcanvasStates] =
    useState<LayoutOffcanvasStatesType>({
      showMobileMenu: false,
      showMessagingOffcanvas: false,
      showStartOffcanvas: false,
    });

  const updateSettings = (_newSettings: Partial<LayoutState>) =>
    setSettings({ ...settings, ..._newSettings });

  const updateTheme = (newTheme: LayoutState["theme"]) => {
    const foundTheme = localStorage.getItem(themeAttributeKey);
    if (foundTheme !== newTheme) {
      toggleDocumentAttribute(themeAttributeKey, newTheme);
      localStorage.setItem(storageThemeKey, newTheme);
      updateSettings({ ...settings, theme: newTheme });
    }
  };

  const toggleMessagingOffcanvas: DialogControlType["toggle"] = () => {
    setOffcanvasStates({
      ...offcanvasStates,
      showMessagingOffcanvas: !offcanvasStates.showMessagingOffcanvas,
    });
  };

  const toggleMobileMenu: DialogControlType["toggle"] = () => {
    setOffcanvasStates({
      ...offcanvasStates,
      showMobileMenu: !offcanvasStates.showMobileMenu,
    });
  };
  const toggleStartOffcanvas: DialogControlType["toggle"] = () => {
    setOffcanvasStates({
      ...offcanvasStates,
      showStartOffcanvas: !offcanvasStates.showStartOffcanvas,
    });
  };

  const messagingOffcanvas: LayoutType["messagingOffcanvas"] = {
    open: offcanvasStates.showMessagingOffcanvas,
    toggle: toggleMessagingOffcanvas,
  };

  const mobileMenu: LayoutType["mobileMenu"] = {
    open: offcanvasStates.showMobileMenu,
    toggle: toggleMobileMenu,
  };
  const startOffcanvas: LayoutType["messagingOffcanvas"] = {
    open: offcanvasStates.showStartOffcanvas,
    toggle: toggleStartOffcanvas,
  };

  return (
    <LayoutContext.Provider
      value={useMemo(
        () => ({
          ...settings,
          updateTheme,
          messagingOffcanvas,
          mobileMenu,
          startOffcanvas,
        }),
        [settings, offcanvasStates]
      )}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export { LayoutProvider, useLayoutContext };

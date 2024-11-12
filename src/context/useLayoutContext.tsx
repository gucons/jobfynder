"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ChildrenType } from "@/types/component";
import { toggleDocumentAttribute } from "@/utils/layout";
import type {
  DialogControlType,
  LayoutOffcanvasStatesType,
  LayoutState,
  LayoutType,
  ThemeType,
} from "@/types/context";

const LayoutContext = createContext<LayoutType | undefined>(undefined);

function useLayoutContext() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within a LayoutProvider");
  }
  return context;
}

const storageThemeKey = "SOCIAL_NEXTJS_THEME_KEY";
const themeAttributeKey = "data-bs-theme";

const LayoutProvider = ({ children }: ChildrenType) => {
  const getSavedTheme = (): LayoutState["theme"] => {
    if (typeof window === "undefined") return "light";

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

    localStorage.setItem(storageThemeKey, preferredTheme);
    toggleDocumentAttribute(themeAttributeKey, preferredTheme);
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
    setSettings((prev) => ({ ...prev, ..._newSettings }));

  const updateTheme = (newTheme: LayoutState["theme"]) => {
    if (newTheme !== settings.theme) {
      toggleDocumentAttribute(themeAttributeKey, newTheme);
      localStorage.setItem(storageThemeKey, newTheme);
      updateSettings({ theme: newTheme });
    }
  };

  const toggleMessagingOffcanvas: DialogControlType["toggle"] = () =>
    setOffcanvasStates((prev) => ({
      ...prev,
      showMessagingOffcanvas: !prev.showMessagingOffcanvas,
    }));

  const toggleMobileMenu: DialogControlType["toggle"] = () =>
    setOffcanvasStates((prev) => ({
      ...prev,
      showMobileMenu: !prev.showMobileMenu,
    }));

  const toggleStartOffcanvas: DialogControlType["toggle"] = () =>
    setOffcanvasStates((prev) => ({
      ...prev,
      showStartOffcanvas: !prev.showStartOffcanvas,
    }));

  const messagingOffcanvas = useMemo(
    () => ({
      open: offcanvasStates.showMessagingOffcanvas,
      toggle: toggleMessagingOffcanvas,
    }),
    [offcanvasStates.showMessagingOffcanvas]
  );

  const mobileMenu = useMemo(
    () => ({ open: offcanvasStates.showMobileMenu, toggle: toggleMobileMenu }),
    [offcanvasStates.showMobileMenu]
  );

  const startOffcanvas = useMemo(
    () => ({
      open: offcanvasStates.showStartOffcanvas,
      toggle: toggleStartOffcanvas,
    }),
    [offcanvasStates.showStartOffcanvas]
  );

  const contextValue = useMemo(
    () => ({
      ...settings,
      updateTheme,
      messagingOffcanvas,
      mobileMenu,
      startOffcanvas,
    }),
    [settings, messagingOffcanvas, mobileMenu, startOffcanvas]
  );

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
};

export { LayoutProvider, useLayoutContext };

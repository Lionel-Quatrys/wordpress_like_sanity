export type ModuleKey =
  | "testimonials"
  | "team"
  | "pricing"
  | "gallery"
  | "video"
  | "faq"
  | "contact"
  | "blog"
  | "header"
  | "footer"
  | "theme"
  | "siteSettings";

interface ModuleCacheState {
  settings: Partial<Record<ModuleKey, boolean>>;
  loaded: boolean;
}

export const moduleCache: ModuleCacheState = {
  settings: {},
  loaded: false,
};

export function isModuleEnabled(module: ModuleKey): boolean {
  if (!moduleCache.loaded) return true;
  return moduleCache.settings[module] !== false;
}

export const themeStorageKey = "theme";

/**
 * Inlined in <head> (app/layout.tsx) so it runs before first paint: applies
 * the stored theme, or the system preference if none is stored, so the page
 * never flashes the wrong theme before React hydrates.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem("${themeStorageKey}");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light"}catch(e){}})()`;

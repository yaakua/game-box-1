import defaultTheme from './default.json';
import darkTheme from './dark.json';
import forestTheme from './forest-theme.json';
import purpleTechTheme from './purple-tech.json';
import cyberpunkTheme from './cyberpunk-neon.json';
import deepSeaTheme from './deep-sea.json';
import deepRedTheme from './deep-red.json';

const themes: Record<string, any> = {
  default: defaultTheme,
  dark: darkTheme,
  forest: forestTheme,
  'purple-tech': purpleTechTheme,
  'cyberpunk-neon': cyberpunkTheme,
  'deep-sea': deepSeaTheme,
  'deep-red': deepRedTheme
};

export function getTheme(name: string) {
  return themes[name] || defaultTheme;
}

export { themes, defaultTheme };

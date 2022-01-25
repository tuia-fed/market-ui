const mkConfig = require('../../mkui.config');

export interface NavItemType {
  path?: string;
  title: string;
  items?: NavItemType[];
}

export const nav = mkConfig.site.nav.filter(it => it.title !== '引导') as NavItemType[];

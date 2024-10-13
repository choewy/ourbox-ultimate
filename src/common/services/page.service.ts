import { PagePath } from '@/common/enums';

export class PageService {
  public is(pagePath: PagePath, pathname = location.pathname) {
    return pathname.startsWith(pagePath);
  }

  public isIn(pagePaths: PagePath[], pathname = location.pathname) {
    return pagePaths.some((pagePath) => pathname.startsWith(pagePath));
  }
}

export const pageService = new PageService();

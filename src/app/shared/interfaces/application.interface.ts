import { IRole } from './role.interface';
import { IStaticPage } from './static-page.interface';
import { ISocialNetwork } from './social-network.interface';

export interface IApplication {
  id?: string;

  page: {
    isEnabled: boolean;
    title: string;
    description?: string;
    email?: string;
  };

  urlShortening: {
    isEnabled?: boolean;
    provider?: string;
  };

  registration: {
    isAllowed: boolean;
    defaultRole?: string | IRole;
  };

  downtime: {
    isEnabled: boolean;
    message?: string;
  };

  staticPages: IStaticPage[];
  social: ISocialNetwork[];
}

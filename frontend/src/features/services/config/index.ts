import { serviceCategories } from './categories';
import { hardServices } from './hard-services';
import { softServices } from './soft-services';

export const allServices = {
  ...hardServices,
  ...softServices,
};

export { serviceCategories, hardServices, softServices };

/** The Services listing page — the page_path admins scope `service-card` media to. */
export const SERVICES_PAGE_PATH = '/services';

import { Recruiter } from './recruiter';
import { Company } from './company';

export interface Job {
  id?: number | string;
  title?: string;
  location?: string;
  datePosted?: Date;
  salary?: number;
  image?: string;
  description?: string;
  recruiter?: Recruiter;
  recruiterId?: number;
  company?: Company;
  companyId?: number;
}

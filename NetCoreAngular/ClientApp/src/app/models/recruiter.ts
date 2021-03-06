import { FileUpload } from "./file-upload";

export interface Recruiter {
  id?: number | string;
  name?: string;
  role?: string;
  location?: string;
  dateJoined?: Date;
  description?: string;
  tel?: number;
  email?: string;
  imageId?: number;
  image?: FileUpload;
}

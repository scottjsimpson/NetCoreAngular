import { FileUpload } from "./file-upload";

export interface Company {
  id?: number | string;
  name?: string;
  tel?: string;
  email?: string;
  imageId?: number;
  image?: FileUpload;
}

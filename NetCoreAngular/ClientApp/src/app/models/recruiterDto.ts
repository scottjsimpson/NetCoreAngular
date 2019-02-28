export interface RecruiterDto {
  id?: number | string;
  name?: string;
  role?: string;
  location?: string;
  dateJoined?: Date;
  description?: string;
  tel?: number;
  email?: string;
  imageId?: number;
  image?: File;
}

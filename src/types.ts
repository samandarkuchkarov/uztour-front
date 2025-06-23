export interface UserType {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface ExcursionType {
  name: string;
  image: string;
  rating: number;
  ratingCount: number;
  isIndividual: boolean;
  from: string;
  languages: string;
  price: number;
  forPerson: boolean;
  priceWithoutDiscount: number;
  id: number;
}

export interface GuideSubmitData {
  name: string;
  lastName: string;
  phone: string;
  isCompany: boolean;
  companyName: string;
}

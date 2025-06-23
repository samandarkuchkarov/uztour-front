import { API } from "./http-client";

export const authUser = async ({
  email,
  isGuide,
}: {
  email: string;
  isGuide: number;
}) => {
  const response = await API.post<{ data: { message: string } }>(
    `/auth/request-code`,
    { email, type: isGuide ? "partner" : "customer" }
  );
  return response.data;
};

export const verifyCode = async ({
  email,
  code,
  isGuide,
}: {
  email: string;
  code: string;
  isGuide: number;
}) => {
  const response = await API.post<{ data: { message: string } }>(
    `/auth/verify-code`,
    { email, code, type: isGuide ? "partner" : "customer" }
  );
  return response.data;
};

export const completeGuideData = async ({
  phone,
  name,
  lastName,
  isCompany,
  companyName,
  email,
}: {
  phone: string;
  name: string;
  lastName: string;
  isCompany: boolean;
  companyName: string;
  email: string;
}) => {
  const response = await API.post<{ data: { message: string } }>(
    "/auth/complete-profile",
    {
      phone,
      firstName: name,
      lastName,
      partnerType: isCompany ? "company" : "person",
      companyName,
      email,
    }
  );
  console.log(response);
  return response.data;
};

export const verifyPhone = async ({
  phone,
  email,
  smsCode,
}: {
  phone: string;
  email: string;
  smsCode: string;
}) => {
  const response = await API.post<{ data: { message: string } }>(
    `/auth/verify-phone`,
    { phone, email, smsCode }
  );
  return response.data;
};

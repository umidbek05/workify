import axios from "axios";

const API_URL = "https://workifybackend-production.up.railway.app/api";

const api = axios.create({
  baseURL: API_URL,
});

// REQUEST INTERCEPTOR: Har bir so'rovga tokenni qo'shish
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR: 401 (Unauthorized) xatosini tutib olish
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token yaroqsiz bo'lsa, uni o'chirish va foydalanuvchini yo'naltirish mumkin
      console.warn("Avtorizatsiya muddati tugagan yoki xato!");
      localStorage.removeItem("token");
      // window.location.href = "/login"; // Ixtiyoriy: Login sahifasiga haydash
    }
    return Promise.reject(error);
  }
);

// --- TALENT API ---
export const talentApi = {
  registerTalent: (formData) => api.post("/talent/register", formData),
  
  sendVerifyCode: (email) => api.post("/talent/send-verify-code", { email }),
  checkVerifyCode: (email, code) =>
    api.post("/talent/check-verify-code", { email, code }),
  confirmVerifyEmail: (data) => api.post("/talent/confirm-verify-email", data),

  sendResetCode: (email) => api.post("/talent/send-reset-code", { email }),
  checkResetCode: (email, code) =>
    api.post("/talent/check-reset-code", {
      email: email.trim(),
      code: String(code),
    }),
  confirmResetPassword: (email, code, newPassword) =>
    api.post("/talent/confirm-reset-password", { email, code, newPassword }),

  login: (data) => api.post("/talent/login", data),
  getAll: () => api.get("/talent"),
  getById: (id) => api.get(`/talent/${id}`),
  search: (query) => api.get(`/talent/search?query=${query}`),
  update: (id, formData) => api.put(`/talent/${id}`, formData),
  delete: (id) => api.delete(`/talent/${id}`),
};

// --- COMPANY API ---
export const companyApi = {
  register: (formData) =>
    api.post("/company/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  login: (data) => api.post("/company/login", data),
  getProfile: () => api.get("/company/profile"),
  getAll: () => api.get("/company"),
  getById: (id) => api.get(`/company/${id}`),
  search: (query) => api.get(`/company/search?query=${query}`),
  update: (id, data) => api.put(`/company/${id}`, data),
  delete: (id) => api.delete(`/company/${id}`),
};

// --- JOB API ---
export const jobApi = {
  create: (data) => api.post("/jobs", data),
  getAll: () => api.get("/jobs"),
  getById: (id) => api.get(`/jobs/${id}`),
  getByCompany: (companyId) => api.get(`/jobs/company/${companyId}`),
  search: (query) => api.get(`/jobs/search?query=${query}`),
  getMatchingJobs: (companyId = "") =>
    api.get(`/jobs/my-skills${companyId ? `?company_id=${companyId}` : ""}`),
  update: (id, data) => api.put(`/jobs/${id}`, data),
  delete: (id) => api.delete(`/jobs/${id}`),
};

// --- APPLICATION API ---
export const applicationApi = {
  apply: (formData) =>
    api.post("/job-applications", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getAll: () => api.get("/job-applications"),
  getById: (id) => api.get(`/job-applications/${id}`),
  updateStatus: (id, data) => api.put(`/job-applications/${id}`, data),
  delete: (id) => api.delete(`/job-applications/${id}`),
};

// --- CONTACT API ---
export const contactApi = {
  sendMessage: (data) => api.post("/contacts", data),
  getAll: () => api.get("/contacts"),
  getById: (id) => api.get(`/contacts/${id}`),
};

export default api;
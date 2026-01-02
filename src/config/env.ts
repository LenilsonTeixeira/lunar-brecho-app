export const ENV = {
  WHATSAPP_PHONE: import.meta.env.VITE_PHONE_NUMBER,
  API_URL: import.meta.env.VITE_API_URL,
  STORE_ID: import.meta.env.VITE_STORE_ID || 'a45753ef-7953-4851-8045-92fb36f7cb55',
  //STORE_ID: import.meta.env.VITE_STORE_ID || 'e848632f-5aaa-454f-b836-7f929aa478fd', //PRD
  PIX_KEY: import.meta.env.VITE_PIX_KEY || '34996962488',

  // Credenciais do public_client para autenticação automática do frontend
  PUBLIC_CLIENT_EMAIL: import.meta.env.VITE_PUBLIC_CLIENT_EMAIL || 'app@frontend.com',
  PUBLIC_CLIENT_PASSWORD: import.meta.env.VITE_PUBLIC_CLIENT_PASSWORD || '5pDX72ZNKHTuLwOz',

  // Emails de super admin (separados por vírgula) - login sem headers x-store-id
  SUPER_ADMIN_EMAILS: import.meta.env.VITE_SUPER_ADMIN_EMAILS || 'admin@admin.com',
};

/**
 * Verifica se um email pertence a um super admin.
 * Super admins fazem login sem o header x-store-id.
 */
export const isSuperAdminEmail = (email: string): boolean => {
  const superAdminEmails = ENV.SUPER_ADMIN_EMAILS.split(',').map((e: string) =>
    e.trim().toLowerCase(),
  );
  return superAdminEmails.includes(email.toLowerCase());
};

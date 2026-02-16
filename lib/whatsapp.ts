// lib/whatsapp.ts - Updated with iOS-compatible WhatsApp URL
export function formatWhatsAppMessage(formData: {
  name: string;
  address: string;
  service: string;
  area: string;
  budget: string;
  details: string;
  images?: string[]; // Array of image URLs
}): string {
  const serviceLabel = formData.service === 'renovation' ? 'Renovasi' : 'Bangun Baru';
  
  // Format budget with proper Rupiah formatting
  const formatBudget = (budget: string): string => {
    if (!budget) return 'Belum disebutkan';
    
    // Remove non-numeric characters
    const numericValue = budget.replace(/[^\d]/g, '');
    if (!numericValue) return 'Belum disebutkan';
    
    // Format as Rupiah with thousand separators
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(numericValue));
  };

  // Build message sections
  const sections = [];

  // Header
  sections.push(`*PENGAJUAN ${serviceLabel.toUpperCase()}*`);
  sections.push('━━━━━━━━━━━━━━━━━━━━');

  // Client Information
  sections.push('*Informasi Klien*');
  sections.push(`Nama: ${formData.name}`);
  sections.push('');

  // Project Details
  sections.push('*Detail Proyek*');
  sections.push(`Layanan: ${serviceLabel}`);
  sections.push(`Lokasi: ${formData.address}`);
  
  if (formData.area) {
    sections.push(`Luas Area: ${formData.area}`);
  }
  
  if (formData.budget) {
    sections.push(`Budget: ${formatBudget(formData.budget)}`);
  }
  
  if (formData.details) {
    sections.push('');
    sections.push('*Keterangan Tambahan*');
    sections.push(formData.details);
  }

  // Images section (if any)
  if (formData.images && formData.images.length > 0) {
    sections.push('');
    sections.push(`*Foto Terlampir* (${formData.images.length})`);
    formData.images.forEach((url, index) => {
      sections.push(`${index + 1}. ${url}`);
    });
  }

  // Footer
  sections.push('');
  sections.push('━━━━━━━━━━━━━━━━━━━━');
  sections.push(`⏰ ${new Date().toLocaleString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}`);
  sections.push('');
  sections.push('_Mohon segera ditindaklanjuti_');

  const message = sections.join('\n');
  return encodeURIComponent(message);
}

export function generateWhatsAppUrl(phoneNumber: string, message: string): string {
  // Remove any non-digit characters from the phone number
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  // Ensure the phone number has country code
  const formattedPhone = cleanPhone.startsWith('62') 
    ? cleanPhone 
    : cleanPhone.startsWith('0') 
      ? `62${cleanPhone.substring(1)}` 
      : `62${cleanPhone}`;
  
  // Use api.whatsapp.com instead of wa.me for better iOS compatibility
  // This format works more reliably across all devices and browsers
  return `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${message}`;
}
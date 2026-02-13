export const formatWhatsApp = (num: string) => {
    return num.replace(/[\s+]/g, '').replace(/^0/, '94').replace(/^(\d)/, (m) => m === '9' ? m : '94' + m);
};

export const getWhatsAppUrl = (phone: string, message: string = '') => {
    const formatted = phone.replace(/[\s+]/g, '').replace(/^0/, '94');
    return `https://wa.me/${formatted}?text=${encodeURIComponent(message)}`;
};

import axiosClient from './axiosClient';

const bookingAPI = {
  // Complete booking after QR scan
  completeBooking: async (orderId) => {
    const response = await axiosClient.post(`/bookings/complete/${orderId}`);
    return response.data;
  },

  // Get purchase history
  getPurchaseHistory: async () => {
    const response = await axiosClient.get(`/bookings/history`);
    return response.data;
  },

  // Get purchase detail
  getPurchaseDetail: async (purchaseId) => {
    const response = await axiosClient.get(`/bookings/history/${purchaseId}`);
    return response.data;
  },

  // Get all user bookings (pending + completed)
  getAllUserBookings: async () => {
    const response = await axiosClient.get(`/bookings/all`);
    return response.data;
  },

  // Verify booking (public)
  verifyBooking: async (orderId) => {
    const response = await axiosClient.get(`/bookings/verify/${orderId}`);
    return response.data;
  },

  // Admin: Get all bookings
  getAllBookings: async (params = {}) => {
    const response = await axiosClient.get(`/admin/bookings`, {
      params,
    });
    return response.data;
  },

  // Admin: Get bookings by item (tour/hotel)
  getBookingsByItem: async (itemType, itemId) => {
    const response = await axiosClient.get(`/admin/bookings/item/${itemType}/${itemId}`);
    return response.data;
  },

  // Admin: Get statistics
  getStats: async () => {
    const response = await axiosClient.get(`/admin/bookings/stats`);
    return response.data;
  },

  // Admin: Export CSV
  exportBookings: async (dateFrom = '', dateTo = '') => {
    const params = new URLSearchParams();
    if (dateFrom) params.append('date_from', dateFrom);
    if (dateTo) params.append('date_to', dateTo);

    const response = await axiosClient.get(`/admin/bookings/export?${params}`, {
      responseType: 'blob',
    });
    
    // Download CSV
    const url = window.URL.createObjectURL(response.data as Blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `bookings-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.parentElement?.removeChild(link);
    window.URL.revokeObjectURL(url);
  },
};

export default bookingAPI;

@@ .. @@
 export { contactService, notificationService, bookingService };
+
+// Partner-specific API services
+const partnerVenueService = {
+  listMyVenues: async () => {
+    try {
+      const token = localStorage.getItem('jwtToken');
+      const response = await api.get("/partner/venues", {
+        headers: {
+          Authorization: `Bearer ${token}`
+        }
+      });
+      return response.data;
+    } catch (error) {
+      throw error;
+    }
+  },
+
+  addVenue: async (venueData) => {
+    try {
+      const token = localStorage.getItem('jwtToken');
+      const response = await api.post("/partner/venues/new", venueData, {
+        headers: {
+          Authorization: `Bearer ${token}`
+        }
+      });
+      return response.data;
+    } catch (error) {
+      throw error;
+    }
+  },
+
+  getVenue: async (id) => {
+    try {
+      const token = localStorage.getItem('jwtToken');
+      const response = await api.get(`/partner/venues/${id}`, {
+        headers: {
+          Authorization: `Bearer ${token}`
+        }
+      });
+      return response.data;
+    } catch (error) {
+      throw error;
+    }
+  },
+
+  updateVenue: async (id, venueData) => {
+    try {
+      const token = localStorage.getItem('jwtToken');
+      const response = await api.put(`/partner/venues/update/${id}`, venueData, {
+        headers: {
+          Authorization: `Bearer ${token}`
+        }
+      });
+      return response.data;
+    } catch (error) {
+      throw error;
+    }
+  },
+
+  deleteVenue: async (id) => {
+    try {
+      const token = localStorage.getItem('jwtToken');
+      const response = await api.delete(`/partner/venues/delete/${id}`, {
+        headers: {
+          Authorization: `Bearer ${token}`
+        }
+      });
+      return response.data;
+    } catch (error) {
+      throw error;
+    }
+  },
+
+  updateVenueStatus: async (id, status) => {
+    try {
+      const token = localStorage.getItem('jwtToken');
+      const response = await api.patch(`/partner/venues/status/${id}`, { status }, {
+        headers: {
+          Authorization: `Bearer ${token}`
+        }
+      });
+      return response.data;
+    } catch (error) {
+      throw error;
+    }
+  },
+};
+
+const partnerBookingService = {
+  listMyBookings: async () => {
+    try {
+      const token = localStorage.getItem('jwtToken');
+      const response = await api.get("/partner/bookings", {
+        headers: {
+          Authorization: `Bearer ${token}`
+        }
+      });
+      return response.data;
+    } catch (error) {
+      throw error;
+    }
+  },
+
+  updateBookingStatus: async (bookingId, status) => {
+    try {
+      const token = localStorage.getItem('jwtToken');
+      const response = await api.patch(`/partner/bookings/${bookingId}/status`, { status }, {
+        headers: {
+          Authorization: `Bearer ${token}`
+        }
+      });
+      return response.data;
+    } catch (error) {
+      throw error;
+    }
+  },
+
+  getBookingDetails: async (bookingId) => {
+    try {
+      const token = localStorage.getItem('jwtToken');
+      const response = await api.get(`/partner/bookings/${bookingId}`, {
+        headers: {
+          Authorization: `Bearer ${token}`
+        }
+      });
+      return response.data;
+    } catch (error) {
+      throw error;
+    }
+  },
+};
+
+const partnerStatsService = {
+  getPartnerStats: async () => {
+    try {
+      const token = localStorage.getItem('jwtToken');
+      const response = await api.get("/partner/stats", {
+        headers: {
+          Authorization: `Bearer ${token}`
+        }
+      });
+      return response.data;
+    } catch (error) {
+      throw error;
+    }
+  },
+};
+
+export { 
+  api, 
+  authService, 
+  venueService, 
+  userService, 
+  partnerService, 
+  profileService,
+  contactService, 
+  notificationService, 
+  bookingService,
+  partnerVenueService,
+  partnerBookingService,
+  partnerStatsService
+};
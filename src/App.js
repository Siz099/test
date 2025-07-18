@@ .. @@
 import EditPartner from "./components/admin/EditPartner";
 import EditVenue from "./components/admin/EditVenue";
+import ProtectedRoute from "./components/auth/ProtectedRoute";
+
+// Partner Components
+import PartnerPanel from "./components/partner/PartnerPanel";
+import PartnerDashboard from "./components/partner/Dashboard";
+import PartnerManageVenue from "./components/partner/ManageVenue";
+import PartnerAddVenue from "./components/partner/AddVenue";
+import PartnerEditVenue from "./components/partner/EditVenue";
+import PartnerViewBookings from "./components/partner/ViewBookings";
+import PartnerProfile from "./components/partner/Profile";
+import PartnerNotifications from "./components/partner/Notifications";
 
 
 import "./styles/auth.css";
@@ .. @@
           />

-          <Route path="/" element={<Navigate to="/home" replace />} />
+          <Route path="/" element={<Navigate to="/home" replace />} />
+
+          {/* Partner Routes */}
+          <Route path="/partner/*" element={
+            <ProtectedRoute allowedRoles={['partner']}>
+              <PartnerPanel />
+            </ProtectedRoute>
+          }>
+            <Route path="dashboard" element={<PartnerDashboard />} />
+            <Route path="venues" element={<PartnerManageVenue />} />
+            <Route path="venues/new" element={<PartnerAddVenue />} />
+            <Route path="venues/edit/:id" element={<PartnerEditVenue />} />
+            <Route path="bookings" element={<PartnerViewBookings />} />
+            <Route path="notifications" element={<PartnerNotifications />} />
+            <Route path="profile" element={<PartnerProfile />} />
+          </Route>

-          <Route path="/admin/*" element={<AdminPanel />}>
+          <Route path="/admin/*" element={
+            <ProtectedRoute allowedRoles={['admin']}>
+              <AdminPanel />
+            </ProtectedRoute>
+          }>
             <Route path="dashboard" element={<Dashboard />} />
             <Route path="venues" element={<VenueManagement />} />
             <Route path="users" element={<UserManagement />} />
@@ .. @@
       <Route path="/admin/venues/:id" element={<ViewVenue/>} />
       <Route path="/admin/bookings/new" element={<AddBook/>} />

-{/*User routing */}
+      {/*User routing */}
       <Route path="/user/home" element={<HomePage/>} />

-
-
           <Route
             path="/home"
             element={
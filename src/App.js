@@ .. @@
import ContactPage from "./components/users/ContactPage";
import AboutUs from "./components/users/about-us";
import Booking from "./components/admin/Booking";
import Notification from "./components/admin/Notification";
import Profile from "./components/admin/Profile";
import PartnerAddTest from "./components/admin/PartnerAddTest";
import EditPartner from "./components/admin/EditPartner";
import EditVenue from "./components/admin/EditVenue";
import UserViewVenue from "./components/users/UserViewVenue";
+import UserViewVenue from "./components/venues/UserViewVenue";

import "./styles/auth.css";
import "./App.css";
@@ .. @@
          <Route
            path="/venues"
            element={
              <>
                <Header isLoggedIn={isUserLoggedIn} user={user} onLogout={logout} hasNotifications={true} />
                <div className="page-content">
                  <VenuePage />
                </div>
              </>
            }
          />

+          <Route
+            path="/venues/:id"
+            element={
+              <>
+                <UserViewVenue />
+              </>
+            }
+          />
+
          <Route
            path="/venue-booking"
            element={
              <>
                <Header isLoggedIn={isUserLoggedIn} user={user} onLogout={logout} hasNotifications={true} />
                <div className="page-content">
                  <VenueBooking />
                </div>
              </>
            }
          />
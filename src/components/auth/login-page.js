@@ .. @@
     console.log("Login successful:", data);
       console.log('Saved JWT token:', localStorage.getItem('jwtToken'));
     
-    if (data.redirect) {
-      navigate(data.redirect);
-    } else {
-      navigate("/login"); 
+    // Handle role-based redirection
+    const userData = JSON.parse(localStorage.getItem('user'));
+    const userRole = userData?.role?.toLowerCase();
+    
+    if (userRole === 'admin') {
+      navigate("/admin/dashboard");
+    } else if (userRole === 'partner') {
+      navigate("/partner/dashboard");
+    } else if (data.redirect) {
+      navigate(data.redirect);
+    } else {
+      navigate("/home");
     }
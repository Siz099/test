import React, { useState } from 'react';
import { userService } from '../../services/api'; // Import your API service
import '../../styles/admin/AddUsers.css';
import { useNavigate } from 'react-router-dom';

const AddUsers = () => {
   const navigate = useNavigate();
  const [userType, setUserType] = useState('Regular User');
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sendEmail, setSendEmail] = useState(false);
  const [accountActive, setAccountActive] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Partner-specific state
  const [company, setBusinessName] = useState('');
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [panCardImage, setPanCardImage] = useState(null);
  const [businessDocument, setBusinessDocument] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!fullname.trim()) newErrors.fullname = 'Full name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    if (userType === 'Partner') {
      if (!company.trim()) newErrors.company = 'Business name is required';
      if (!businessRegistrationNumber.trim()) newErrors.businessRegistrationNumber = 'Business registration number is required';
      if (!businessAddress.trim()) newErrors.businessAddress = 'Business address is required';
      if (!panCardImage) newErrors.panCardImage = 'PAN card image is required';
      if (!businessDocument) newErrors.businessDocument = 'Business document is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setApiError('');
    setSuccessMessage('');
   
    
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('password', password);
    const role = userType.toLowerCase();
    formData.append(
      'role',
      userType.toUpperCase() === 'ADMIN' ? 'Admin' :
      userType.toUpperCase() === 'PARTNER' ? 'Partner' :
      userType.toUpperCase() === 'ATTENDEE' ? 'Attendee' : 
      'Attendee'
    );
    formData.append('status', accountActive ? 'Active' : 'Inactive');
    formData.append('sendWelcomeEmail', sendEmail);

    if (userType === 'Partner') {
      formData.append('company', company);
      formData.append('businessRegistrationNumber', businessRegistrationNumber);
      formData.append('businessAddress', businessAddress);
      formData.append('panCardImage', panCardImage);
      formData.append('businessDocument', businessDocument);
    }
    
    try {
      const response = await userService.addUser(formData);

      
      setSuccessMessage('User created successfully!');
      // Reset form
      setFullName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
      setUserType('Attendee');
      setBusinessName('');
      setBusinessRegistrationNumber('');
      setBusinessAddress('');
      setPanCardImage(null);
      setBusinessDocument(null);
      const panCardInput = document.getElementById('panCardImage');
      const businessDocInput = document.getElementById('businessDocument');
      if (panCardInput) panCardInput.value = null;
      if (businessDocInput) businessDocInput.value = null;

      
      console.log('User created:', response);
      
    } catch (error) {
      console.error('Error creating user:', error);
      setApiError(error.response?.data?.message || 'Failed to create user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-user-container">
      <div className="add-user-header">
        <h1>Add New User</h1>
        <p>Create a new user account in the system</p>
      </div>
      
      {apiError && <div className="alert alert-error">{apiError}</div>}
      
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      
      
      <div className="add-user-form-card">
        <div className="form-header">
          <h2>User Information</h2>
          <p>Enter the details for the new user account</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userType">User Type</label>
            <select 
              id="userType" 
              value={userType} 
              onChange={(e) => setUserType(e.target.value)}
            >
              <option>Attendee</option>
              <option>Admin</option>
              <option>Partner</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter full name"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              className={errors.fullname ? 'error' : ''}
            />
            {errors.fullname && <span className="error-message">{errors.fullname}</span>}
            
          </div>
         
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
            
          </div>
         
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhone(e.target.value)}
              className={errors.phoneNumber ? 'error' : ''}
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
            
          </div>
         
          {userType === 'Partner' && (
            <div className="partner-info-section">
                <div className="form-header">
                    <h2>Partner Information</h2>
                    <p>Enter the details for the new partner account</p>
                </div>
                <div className="form-group">
                    <label htmlFor="businessName">Business Name</label>
                    <input
                        type="text"
                        id="businessName"
                        placeholder="Enter business name"
                        value={company}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className={errors.company ? 'error' : ''}
                    />
                    {errors.company && <span className="error-message">{errors.company}</span>}
                    
                </div>
                <div className="form-group">
                    <label htmlFor="businessRegistrationNumber">Business Registration Number</label>
                    <input
                        type="text"
                        id="businessRegistrationNumber"
                        placeholder="Enter business registration number"
                        value={businessRegistrationNumber}
                        onChange={(e) => setBusinessRegistrationNumber(e.target.value)}
                        className={errors.businessRegistrationNumber ? 'error' : ''}
                    />
                    {errors.businessRegistrationNumber && <span className="error-message">{errors.businessRegistrationNumber}</span>}
                    
                </div>
                <div className="form-group">
                    <label htmlFor="businessAddress">Business Address</label>
                    <input
                        type="text"
                        id="businessAddress"
                        placeholder="Enter business address"
                        value={businessAddress}
                        onChange={(e) => setBusinessAddress(e.target.value)}
                        className={errors.businessAddress ? 'error' : ''}
                    />
                    {errors.businessAddress && <span className="error-message">{errors.businessAddress}</span>}
                    
                </div>
                <div className="form-group">
                    <label htmlFor="panCardImage">PAN Card Image</label>
                    <input
                        type="file"
                        id="panCardImage"
                        onChange={(e) => setPanCardImage(e.target.files[0])}
                        className={errors.panCardImage ? 'error' : ''}
                    />
                    {errors.panCardImage && <span className="error-message">{errors.panCardImage}</span>}
                    
                </div>
                <div className="form-group">
                    <label htmlFor="businessDocument">Document of Business</label>
                    <input
                        type="file"
                        id="businessDocument"
                        onChange={(e) => setBusinessDocument(e.target.files[0])}
                        className={errors.businessDocument ? 'error' : ''}
                    />
                    {errors.businessDocument && <span className="error-message">{errors.businessDocument}</span>}
                    
                </div>
            </div>
          )}
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Create password (min 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
              
            </div>

            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              
            </div>

          </div>
          
          <div className="form-group-checkbox">
            <input
              type="checkbox"
              id="sendEmail"
              checked={sendEmail}
              onChange={(e) => setSendEmail(e.target.checked)}
            />
            <label htmlFor="sendEmail">Send welcome email with login details</label>
          </div>
          
          <div className="form-group-checkbox">
            <input
              type="checkbox"
              id="accountActive"
              checked={accountActive}
              onChange={(e) => setAccountActive(e.target.checked)}
            />
            <label htmlFor="accountActive">Account active</label>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-create"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUsers;
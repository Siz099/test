import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '../../services/api';
const EditUser = () => {

  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    role: '',
    phoneNumber:'',
    company: '',
    panCard: '',
    businessTranscripts: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1️⃣ Load user (including potential partner fields)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const dto = await userService.getUser(userId);
        setFormData({
          fullname: dto.fullname || '',
          email: dto.email || '',
          role: dto.role || '',
          phoneNumber: dto.phoneNumber || '',
          company: dto.company || '',
          panCard: dto.panCard || '',
          businessTranscripts: dto.businessTranscripts || ''
        });
      } catch {
        setApiError('Failed to load user data');
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullname.trim()) errs.fullname = 'Required';
     if (!formData.phoneNumber.trim()) errs.phoneNumber = 'Required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = 'Valid email required';
    if (!formData.role.trim()) errs.role = 'Required';
    if (formData.role === 'PARTNER') {
      if (!formData.company.trim()) errs.company = 'Required';
      if (!formData.panCard.trim()) errs.panCard = 'Required';
      if (!formData.businessTranscripts.trim())
        errs.businessTranscripts = 'Required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError('');

    try {
      // Trimmed payload
      const payload = {
        fullname: formData.fullname,
        email: formData.email,
         phoneNumber: formData.phoneNumber,
        role: formData.role,
        ...(formData.role === 'PARTNER' && {
          company: formData.company,
          panCard: formData.panCard,
          businessTranscripts: formData.businessTranscripts
        })
      };

      await userService.editUser(userId, payload);
      navigate('/admin/users');
    } catch {
      setApiError('Failed to update user');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (apiError) return <div style={{ color: 'red' }}>{apiError}</div>;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: 'auto' }}>
      <h2>Edit User</h2>

      {/* fullname, email, role */}
      {['fullname', 'email','phoneNumber'].map(field => (
        <div key={field}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            name={field}
            value={formData[field]}
            onChange={handleChange}
          />
          {errors[field] && <span style={{ color: 'red' }}>{errors[field]}</span>}
        </div>
      ))}

      {/* <div>
        <label>Role</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="">Select role</option>
          <option value="ADMIN">Admin</option>
          <option value="ATTENDEE">Attendee</option>
          <option value="PARTNER">Partner</option>
        </select>
        {errors.role && <span style={{ color: 'red' }}>{errors.role}</span>}
      </div> */}

      {/* Show partner-specific fields */}
      {formData.role === 'PARTNER' && (
        <>
          {['company', 'panCard', 'businessTranscripts'].map(field => (
            <div key={field}>
              <label>
                {field
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase())}
              </label>
              <input
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
              {errors[field] && (
                <span style={{ color: 'red' }}>{errors[field]}</span>
              )}
            </div>
          ))}
        </>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Updates'}
      </button>
    </form>
  );
};

export default EditUser;


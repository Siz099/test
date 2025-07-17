import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { partnerService } from '../../services/api';

const PartnerAddTest = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    fullname: '',
    email: '',
    contact:'',
    venue:'',
    status: '',
    fullname:'',
   
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (validate()) {
    setIsSubmitting(true);
    setApiError("");

    try {
      
      const response = await partnerService.addPartner(formData);

      console.log("Partner added successfully:", response);

      // Optional small delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      alert("Partner added successfully!");

      // Reset form fields
      setFormData({
        Company: '',
        Owner: '',
        Email: '',
        Contact:'',
        Venue:'',
        status: '',

      });

      // Redirect after success
      navigate('/admin/partners');
    } catch (error) {
      console.error("Partner add failed:", error);

      if (error.response) {
        if (error.response.status === 409) {
          setApiError("Partner with this name already exists.");
        } else if (error.response.data && error.response.data.message) {
          setApiError(error.response.data.message);
        } else {
          setApiError("Partner add failed. Please try again later.");
        }
      } else {
        setApiError("Unable to connect to the server. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }
 };

  return (
  <form onSubmit={handleSubmit}>
    <h2>Add New Partner</h2>

    {apiError && (
      <div style={{ color: 'red', marginBottom: '10px' }}>
        {apiError}
      </div>
    )}

    {Object.keys(formData).map((field) => (
      <div key={field}>
        <label htmlFor={field}>
          {field.replace(/([A-Z])/g, ' $1').toUpperCase()}:
        </label>
        <input
          type="text"
          id={field}
          name={field}
          value={formData[field]}
          onChange={handleChange}
        />
        {errors[field] && (
          <span style={{ color: 'red' }}>{errors[field]}</span>
        )}
      </div>
    ))}

    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? 'Adding...' : 'Add Partner'}
    </button>
  </form>
);

}
export default PartnerAddTest;
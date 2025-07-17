import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { partnerService } from '../../services/api';


const EditPartner = () => {
  const { partnerId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    company: "",
    panCard: "",
    businessTranscripts: "",
    status: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const data = await partnerService.getPartner(partnerId);
        setFormData({
          fullname: data.fullname || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          company: data.company || "",
          panCard: data.panCard || "",
          businessTranscripts: data.businessTranscripts || "",
          status: data.status || "",
        });
      } catch {
        setApiError("Failed to load partner data");
      }
    };
    fetchPartner();
  }, [partnerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullname.trim()) errs.fullname = "Full name is required";
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      errs.email = "Valid email is required";
    if (!formData.phoneNumber.trim()) errs.phoneNumber = "Phone number is required";
    if (!formData.company.trim()) errs.company = "Company is required";
    if (!formData.panCard.trim()) errs.panCard = "PAN Card is required";
    if (!formData.businessTranscripts.trim())
      errs.businessTranscripts = "Business transcripts are required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError("");

    try {
      await partnerService.editPartner(partnerId, formData);
      navigate("/admin/partners");
    } catch {
      setApiError("Failed to update partner");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (apiError)
    return <div style={{ color: "red", maxWidth: 600, margin: "auto" }}>{apiError}</div>;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Edit Partner</h2>

      <label>Full Name</label>
      <input name="fullname" value={formData.fullname} onChange={handleChange} />
      {errors.fullname && <span style={{ color: "red" }}>{errors.fullname}</span>}

      <label>Email</label>
      <input name="email" value={formData.email} onChange={handleChange} />
      {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}

      <label>Phone Number</label>
      <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      {errors.phoneNumber && <span style={{ color: "red" }}>{errors.phoneNumber}</span>}

      <label>Company</label>
      <input name="company" value={formData.company} onChange={handleChange} />
      {errors.company && <span style={{ color: "red" }}>{errors.company}</span>}

      <label>PAN Card</label>
      <input name="panCard" value={formData.panCard} onChange={handleChange} />
      {errors.panCard && <span style={{ color: "red" }}>{errors.panCard}</span>}

      <label>Business Transcripts</label>
      <input
        name="businessTranscripts"
        value={formData.businessTranscripts}
        onChange={handleChange}
      />
      {errors.businessTranscripts && (
        <span style={{ color: "red" }}>{errors.businessTranscripts}</span>
      )}

      <label>Status</label>
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="">Select Status</option>
        <option value="Pending">Pending</option>
        <option value="Verified">Verified</option>
        <option value="Inactive">Inactive</option>
        <option value="Rejected">Rejected</option>
      </select>

      <button type="submit" disabled={isSubmitting} style={{ marginTop: 12 }}>
        {isSubmitting ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditPartner;

import React, { useState, useEffect } from 'react';
import { profileService } from '../../services/api';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(profile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await profileService.getProfile();
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setForm(data);
        }
      } catch (error) {
        // handle error
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
    setForm(profile);
  };
  const handleCancel = () => setEditMode(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    setProfile(form);
    setEditMode(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 800, margin: '32px auto', padding: 24 }}>
      <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>
        <span>Partner</span> <span style={{ margin: '0 8px' }}>/</span> <span style={{ color: '#222', fontWeight: 500 }}>Profile</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <h1 style={{ fontSize: 2.2 + 'rem', fontWeight: 800, margin: 0 }}>Partner Profile</h1>
          <div style={{ color: '#888', fontSize: 18, marginTop: 4 }}>Manage your personal and business information</div>
        </div>
        <button
          style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 600, fontSize: 17, cursor: 'pointer', display: editMode ? 'none' : 'block' }}
          onClick={handleEdit}
        >
          <span style={{ marginRight: 8, fontSize: 18 }}>✏️</span> Edit Profile
        </button>
      </div>
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #eee', padding: 36 }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Personal Information</div>
        <div style={{ color: '#888', fontSize: 16, marginBottom: 24 }}>Update your personal and business details</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>Full Name</div>
            {editMode ? <input name="fullname" value={form.fullname || ''} onChange={handleChange} style={inputStyle} /> : <div style={infoStyle}>{profile.fullname}</div>}
            <div style={{ fontWeight: 600, marginBottom: 2, marginTop: 18 }}>Phone Number</div>
            {editMode ? <input name="phoneNumber" value={form.phoneNumber || ''} onChange={handleChange} style={inputStyle} /> : <div style={infoStyle}>{profile.phoneNumber}</div>}
            <div style={{ fontWeight: 600, marginBottom: 2, marginTop: 18 }}>Company</div>
            {editMode ? <input name="company" value={form.company || ''} onChange={handleChange} style={inputStyle} /> : <div style={infoStyle}>{profile.company}</div>}
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>Email Address</div>
            {editMode ? <input name="email" value={form.email || ''} onChange={handleChange} style={inputStyle} /> : <div style={infoStyle}>{profile.email}</div>}
            <div style={{ fontWeight: 600, marginBottom: 2, marginTop: 18 }}>Business Registration Number</div>
            {editMode ? <input name="businessRegistrationNumber" value={form.businessRegistrationNumber || ''} onChange={handleChange} style={inputStyle} /> : <div style={infoStyle}>{profile.businessRegistrationNumber}</div>}
            <div style={{ fontWeight: 600, marginBottom: 2, marginTop: 18 }}>Business Address</div>
            {editMode ? <input name="businessAddress" value={form.businessAddress || ''} onChange={handleChange} style={inputStyle} /> : <div style={infoStyle}>{profile.businessAddress}</div>}
          </div>
        </div>
        {editMode && (
          <div style={{ marginTop: 32, display: 'flex', gap: 16 }}>
            <button onClick={handleSave} style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 32px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Save</button>
            <button onClick={handleCancel} style={{ background: '#fff', color: '#111', border: '1px solid #bbb', borderRadius: 8, padding: '10px 32px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  fontSize: 15,
  border: '1px solid #ddd',
  borderRadius: 6,
  marginBottom: 2,
  marginTop: 2,
  background: '#fafbfc',
  fontFamily: 'inherit',
};
const infoStyle = {
  fontSize: 16,
  color: '#222',
  marginBottom: 2,
  marginTop: 2,
  fontWeight: 500,
};

export default Profile; 
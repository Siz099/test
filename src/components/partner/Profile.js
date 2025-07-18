import React, { useState, useEffect } from 'react';
import { profileService } from '../../services/api';

const Profile = () => {
  const [profile, setProfile] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    company: '',
    panCard: '',
    businessTranscripts: '',
    joinDate: '',
    status: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(profile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        
        // Get user data from localStorage first
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          const profileData = {
            fullname: user.fullname || user.name || '',
            email: user.email || '',
            phoneNumber: user.phoneNumber || user.phone || '',
            company: user.company || '',
            panCard: user.panCard || '',
            businessTranscripts: user.businessTranscripts || '',
            joinDate: user.joinDate || 'N/A',
            status: user.status || 'Active'
          };
          setProfile(profileData);
          setForm(profileData);
        }

        // Try to fetch additional details from API
        try {
          const response = await profileService.getProfile();
          if (response.ok) {
            const data = await response.json();
            const updatedProfile = {
              fullname: data.fullname || profile.fullname,
              email: data.email || profile.email,
              phoneNumber: data.phoneNumber || profile.phoneNumber,
              company: data.company || profile.company,
              panCard: data.panCard || profile.panCard,
              businessTranscripts: data.businessTranscripts || profile.businessTranscripts,
              joinDate: data.joinDate || profile.joinDate,
              status: data.status || profile.status
            };
            setProfile(updatedProfile);
            setForm(updatedProfile);
          }
        } catch (apiError) {
          console.log("Could not fetch additional profile details:", apiError);
        }

        setError(null);
      } catch (error) {
        console.error("Error loading profile:", error);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
    setForm(profile);
  };

  const handleCancel = () => {
    setEditMode(false);
    setForm(profile);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      // Here you would typically call an API to update the profile
      // await profileService.updateProfile(form);
      
      setProfile(form);
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '300px',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '300px',
        fontSize: '18px',
        color: '#e74c3c',
        textAlign: 'center'
      }}>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#111',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '32px auto', padding: 24 }}>
      {/* Breadcrumb */}
      <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>
        <span>Partner</span> <span style={{ margin: '0 8px' }}>/</span> 
        <span style={{ color: '#222', fontWeight: 500 }}>Profile</span>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0 }}>Partner Profile</h1>
          <div style={{ color: '#888', fontSize: 18, marginTop: 4 }}>
            Manage your business information and account settings
          </div>
        </div>
        {!editMode && (
          <button
            style={{ 
              background: '#111', 
              color: '#fff', 
              border: 'none', 
              borderRadius: 8, 
              padding: '12px 28px', 
              fontWeight: 600, 
              fontSize: 17, 
              cursor: 'pointer' 
            }}
            onClick={handleEdit}
          >
            <span style={{ marginRight: 8, fontSize: 18 }}>✏️</span> Edit Profile
          </button>
        )}
      </div>

      {/* Main Cards */}
      <div style={{ display: 'flex', gap: 32, marginBottom: 32, flexWrap: 'wrap' }}>
        {/* Left Card - Profile Image & Basic Info */}
        <div style={{ 
          flex: 1, 
          minWidth: 320, 
          background: '#fff', 
          borderRadius: 12, 
          border: '1px solid #eee', 
          padding: 36, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}>
          <div style={{ 
            width: 110, 
            height: 110, 
            borderRadius: '50%', 
            background: '#f3f3f3', 
            marginBottom: 18, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: 48, 
            color: '#bbb' 
          }}>
            <span role="img" aria-label="avatar">🏢</span>
          </div>
          <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 6 }}>{profile.fullname}</div>
          <div style={{ 
            background: '#e3f2fd', 
            color: '#1976d2', 
            fontWeight: 600, 
            fontSize: 13, 
            borderRadius: 16, 
            padding: '4px 16px', 
            marginBottom: 18, 
            display: 'inline-block' 
          }}>
            Partner
          </div>
          <div style={{ color: '#555', fontSize: 16, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>✉️</span> {profile.email}
          </div>
          <div style={{ color: '#555', fontSize: 16, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>📞</span> {profile.phoneNumber}
          </div>
          <div style={{ color: '#555', fontSize: 16, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>🏢</span> {profile.company}
          </div>
          <div style={{ color: '#555', fontSize: 16, marginBottom: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>📅</span> Joined {profile.joinDate}
          </div>
        </div>

        {/* Right Card - Detailed Information */}
        <div style={{ 
          flex: 2, 
          minWidth: 340, 
          background: '#fff', 
          borderRadius: 12, 
          border: '1px solid #eee', 
          padding: 36 
        }}>
          <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Business Information</div>
          <div style={{ color: '#888', fontSize: 16, marginBottom: 24 }}>
            Update your business details and contact information
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontWeight: 600, marginBottom: 2 }}>Full Name</div>
              {editMode ? (
                <input 
                  name="fullname" 
                  value={form.fullname} 
                  onChange={handleChange} 
                  style={inputStyle} 
                />
              ) : (
                <div style={infoStyle}>{profile.fullname}</div>
              )}

              <div style={{ fontWeight: 600, marginBottom: 2, marginTop: 18 }}>Phone Number</div>
              {editMode ? (
                <input 
                  name="phoneNumber" 
                  value={form.phoneNumber} 
                  onChange={handleChange} 
                  style={inputStyle} 
                />
              ) : (
                <div style={infoStyle}>{profile.phoneNumber}</div>
              )}

              <div style={{ fontWeight: 600, marginBottom: 2, marginTop: 18 }}>Company Name</div>
              {editMode ? (
                <input 
                  name="company" 
                  value={form.company} 
                  onChange={handleChange} 
                  style={inputStyle} 
                />
              ) : (
                <div style={infoStyle}>{profile.company}</div>
              )}
            </div>

            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontWeight: 600, marginBottom: 2 }}>Email Address</div>
              {editMode ? (
                <input 
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  style={inputStyle} 
                />
              ) : (
                <div style={infoStyle}>{profile.email}</div>
              )}

              <div style={{ fontWeight: 600, marginBottom: 2, marginTop: 18 }}>PAN Card</div>
              {editMode ? (
                <input 
                  name="panCard" 
                  value={form.panCard} 
                  onChange={handleChange} 
                  style={inputStyle} 
                />
              ) : (
                <div style={infoStyle}>{profile.panCard}</div>
              )}

              <div style={{ fontWeight: 600, marginBottom: 2, marginTop: 18 }}>Business Registration</div>
              {editMode ? (
                <input 
                  name="businessTranscripts" 
                  value={form.businessTranscripts} 
                  onChange={handleChange} 
                  style={inputStyle} 
                />
              ) : (
                <div style={infoStyle}>{profile.businessTranscripts}</div>
              )}
            </div>
          </div>

          {editMode && (
            <div style={{ marginTop: 32, display: 'flex', gap: 16 }}>
              <button 
                onClick={handleSave} 
                disabled={isSubmitting}
                style={{ 
                  background: isSubmitting ? '#ccc' : '#111', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: 8, 
                  padding: '10px 32px', 
                  fontWeight: 600, 
                  fontSize: 16, 
                  cursor: isSubmitting ? 'not-allowed' : 'pointer' 
                }}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
              <button 
                onClick={handleCancel} 
                style={{ 
                  background: '#fff', 
                  color: '#111', 
                  border: '1px solid #bbb', 
                  borderRadius: 8, 
                  padding: '10px 32px', 
                  fontWeight: 600, 
                  fontSize: 16, 
                  cursor: 'pointer' 
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Status Card */}
      <div style={{ 
        background: '#fff', 
        borderRadius: 12, 
        border: '1px solid #eee', 
        padding: 32, 
        marginTop: 8 
      }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Account Status</div>
        <div style={{ color: '#888', fontSize: 16, marginBottom: 24 }}>
          Your current partnership status and verification details
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            background: profile.status === 'Verified' ? '#e6ffe6' : '#fff7b2',
            color: profile.status === 'Verified' ? '#22bb33' : '#b29a1a',
            padding: '8px 16px',
            borderRadius: 20,
            fontWeight: 600,
            fontSize: 14
          }}>
            {profile.status || 'Pending Verification'}
          </div>
          
          {profile.status !== 'Verified' && (
            <div style={{ color: '#888', fontSize: 14 }}>
              Your account is under review. You'll be notified once verification is complete.
            </div>
          )}
        </div>
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
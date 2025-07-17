import React, { useState, useEffect } from 'react';
import '../../styles/admin/PartnerManagement.css';
import { partnerService } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const PartnerManagement = () => {
    const [partnersData, setPartnersData] = useState([]);
    const [activeTab, setActiveTab] = useState('All Partners');
    const [searchTerm, setSearchTerm] = useState('');
    const [actionMenu, setActionMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [menuOpenId, setMenuOpenId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
    const fetchPartners = async () => {
    setLoading(true);
    try {
      const response = await partnerService.listPartners();
      setPartnersData(response);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch partners.");
      setPartnersData([]);
    } finally {
      setLoading(false);
    }
  };
  fetchPartners();
}, []);

    const handleActionClick = (partnerId) => {
        setActionMenu(actionMenu === partnerId ? null : partnerId);
    };

    const pendingCount = partnersData.filter(p => p.status === 'Pending').length;

    const filteredPartners = partnersData.filter(partner => {
        const term = searchTerm?.toLowerCase() || '';

        const status = partner.status || '';
        const business = partner.company || '';
        const owner = partner.fullname || '';
        const email = partner.email || '';

        const statusMatch = activeTab === 'All Partners' || status === activeTab;
        const searchMatch =
            business.toLowerCase().includes(term) ||
            owner.toLowerCase().includes(term) ||
            email.toLowerCase().includes(term);

        return statusMatch && searchMatch;
        });


    const handleApprove = async (id) => {
        try {
            await partnerService.updatePartnerStatus(id, 'Verified');
            setPartnersData(partnersData.map(p => p.id === id ? { ...p, status: 'Verified' } : p));
        } catch (error) {
            console.error("Failed to approve partner:", error);
        }
    };

    const handleReject = async (id) => {
        try {
         
            await partnerService.updatePartnerStatus(id, 'Rejected');
            setPartnersData(partnersData.filter(p => p.id !== id)); // Or update status
        } catch (error) {
            console.error("Failed to reject partner:", error);
        }
    };

    const handleSuspend = async (id) => {
        try {
            await partnerService.updatePartnerStatus(id, 'Inactive');
            setPartnersData(partnersData.map(p => p.id === id ? { ...p, status: 'Inactive' } : p));
            setActionMenu(null); // Close menu
        } catch (error) {
            console.error("Failed to suspend partner:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this partner?')) {
            try {
                await partnerService.deletePartner(id);
               setPartnersData(partnersData.filter(p => p.user_id !== id));
            } catch (error) {
                console.error("Failed to delete partner:", error);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleAdd = (id) => {
     navigate('/admin/partners/new');
    setMenuOpenId(null); 
  };

  const handleEditPartner = (partner) => {
  if (!partner?.user_id) {
    console.error("Invalid partner ID:", partner?.user_id);
    return;
  }
  console.log("Navigating to edit partner with ID:", partner.user_id);
  navigate(`/admin/partners/edit/${partner.user_id}`);
};

  const handleViewPartner = (partner) => {
  if (!partner?.user_id) {
    console.error("Invalid partner ID:", partner?.user_id);
    return;
  }
  console.log("Navigating to view partner with ID:", partner.user_id);
  navigate(`/admin/partners/${partner.user_id}`);
};

    return (
        <div className="partner-management">
            <div className="header">
                <div>
                    <h1>Partner Management</h1>
                    <p>Manage venue partner and verification requests</p>
                </div>
                       <button onClick={handleAdd} style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 22px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>+ Add New Partner</button>
            </div>

            <div className="user-list-container">
                <div className="user-list-header">
                    <h2>All Partners</h2>
                    <p>A list of all Partners registered on the platform</p>
                </div>
                <div className="search-bar-container">
                    <span className="search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search user by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="tabs">
                    <button className={activeTab === 'All Partners' ? 'active' : ''} onClick={() => setActiveTab('All Partners')}>All Partners</button>
                    <button className={activeTab === 'Verified' ? 'active' : ''} onClick={() => setActiveTab('Verified')}>Verified</button>
                    <button className={activeTab === 'Pending' ? 'active' : ''} onClick={() => setActiveTab('Pending')}>
                        Pending 
                        {pendingCount > 0 && <span className="pending-count">{pendingCount}</span>}
                    </button>
                </div>
                {activeTab === 'Pending' ? (
                    <div className="pending-requests-container">
                        <div className="pending-requests-header">
                            <h2>Pending verification requests</h2>
                            <p>Review and approve new partner application</p>
                        </div>
                        <div className="pending-requests-list">
                            {filteredPartners.map(partner => (
                                <div key={partner.user_id} className="pending-request-card">
                                    <div className="partner-info">
                                        <h3>{partner.businessName}</h3>
                                        <p>Owner: {partner.owner}</p>
                                        <p>Email: {partner.email}</p>
                                        <p>Reg#: {partner.regNumber}</p>
                                        <p>Submitted: {partner.submitted}</p>
                                    </div>
                                    <div className="partner-actions">
                                        <div className="document-actions">
                                            <button className="view-doc-btn">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.816 1.097-2.074 2.157-3.668 2.843C9.879 11.832 8.12 12.5 8 12.5s-1.879-.668-3.168-1.457A13.133 13.133 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg>
                                                View Document
                                            </button>
                                            <button className="download-btn">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/></svg>
                                                Download
                                            </button>
                                        </div>
                                        <div className="approval-actions">
                                            <button className="reject-btn" onClick={() => handleReject(partner.user_id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
                                                Reject
                                            </button>
                                            <button className="approve-btn" onClick={() => handleApprove(partner.user_id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022z"/></svg>
                                                Approve
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="partner-table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Business Name</th>
                                    <th>Owner</th>
                                    <th>Contact</th>
                                    <th>Venues</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPartners.map(partner => (
                                    <tr key={partner.user_id}>
                                        <td>{partner.user_id}</td>
                                        <td>{partner.company}</td>
                                        <td>{partner.fullname}</td>
                                        <td className="contact-info">
                                            <div>{partner.email}</div>
                                            <div>{partner.phone}</div>
                                        </td>
                                        <td>{partner.venues}</td>
                                        <td>
                                           <span className={`status ${partner.status?.toLowerCase() || ''}`}>{partner.status || ''}
                                            </span>
                                        </td>
                                        <td className="action-cell">
                                            <button className="action-btn" onClick={() => handleActionClick(partner.user_id)}>
                                            &#x22EE;
                                            </button>
                                            {actionMenu === partner.user_id && (
                                                <div className="action-menu">
                                                    <button 
                                                        onClick={() => {
                                                    
                                                            handleViewPartner(partner);
                                                            console.log("clicked:",partner)
                                                        }} 
                                                        className="actions-menu-item"
                                                        >
                                                        View Partner
                                                    </button>
                                                     <button 
                                                        onClick={() => {
                                                    
                                                            handleEditPartner(partner);
                                                            console.log("clicked:",partner)
                                                        }} 
                                                        className="actions-menu-item"
                                                        >
                                                        Edit Partner
                                                    </button>
                                                    <button onClick={() => handleSuspend(partner.user_id)}>Suspend partner</button>
                                                    <button className="delete-action" onClick={() => handleDelete(partner.user_id)}>Delete partner</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PartnerManagement;
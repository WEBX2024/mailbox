import React, { useState } from 'react';
import { FiSearch, FiMail, FiPhone, FiStar, FiPlus } from 'react-icons/fi';
import { mockContacts } from '../../data/mockOther';
import './People.css';

const People = () => {
  const [contacts, setContacts] = useState(mockContacts);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  const selected = contacts.find(c => c.id === selectedId);

  const getInitials = (name) => {
    const parts = name.split(' ').filter(Boolean);
    return parts.length >= 2 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0][0].toUpperCase();
  };

  const toggleFavorite = (id) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, favorite: !c.favorite } : c));
  };

  return (
    <div className="people-page">
      {/* Contact list */}
      <div className="people-list">
        <div className="people-list-header">
          <h2>People</h2>
          <button className="people-add-btn">
            <FiPlus size={16} />
            <span>New contact</span>
          </button>
        </div>

        <div className="people-search-bar">
          <FiSearch size={14} />
          <input
            type="text"
            placeholder="Search contacts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="people-list-scroll">
          {filtered.map(contact => (
            <button
              key={contact.id}
              className={`people-item ${selectedId === contact.id ? 'active' : ''}`}
              onClick={() => setSelectedId(contact.id)}
            >
              <div className="people-item-avatar" style={{ backgroundColor: contact.color }}>
                {getInitials(contact.name)}
              </div>
              <div className="people-item-info">
                <span className="people-item-name">{contact.name}</span>
                <span className="people-item-role">{contact.role} · {contact.company}</span>
              </div>
              {contact.favorite && <FiStar size={14} className="people-item-star" fill="currentColor" />}
            </button>
          ))}
        </div>
      </div>

      {/* Contact detail */}
      <div className="people-detail">
        {selected ? (
          <>
            <div className="people-detail-header">
              <div className="people-detail-avatar" style={{ backgroundColor: selected.color }}>
                {getInitials(selected.name)}
              </div>
              <h2>{selected.name}</h2>
              <p className="people-detail-role">{selected.role} at {selected.company}</p>
              <div className="people-detail-actions">
                <button className="people-action-btn"><FiMail size={16} /> Email</button>
                <button className="people-action-btn"><FiPhone size={16} /> Call</button>
                <button className="people-action-btn" onClick={() => toggleFavorite(selected.id)}>
                  <FiStar size={16} fill={selected.favorite ? 'currentColor' : 'none'} />
                  {selected.favorite ? 'Unfavorite' : 'Favorite'}
                </button>
              </div>
            </div>
            <div className="people-detail-body">
              <div className="people-detail-section">
                <h4>Contact Info</h4>
                <div className="people-detail-field">
                  <span className="field-label-sm">Email</span>
                  <span className="field-value">{selected.email}</span>
                </div>
                <div className="people-detail-field">
                  <span className="field-label-sm">Phone</span>
                  <span className="field-value">{selected.phone}</span>
                </div>
                <div className="people-detail-field">
                  <span className="field-label-sm">Company</span>
                  <span className="field-value">{selected.company}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="people-detail-empty">
            <FiMail size={48} />
            <h3>Select a contact</h3>
            <p>Choose a person to view their details.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default People;

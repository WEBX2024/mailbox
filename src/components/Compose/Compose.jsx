import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FiX, FiMinus, FiMaximize2, FiMinimize2, FiPaperclip, FiImage, FiMoreHorizontal, FiTrash2, FiBold, FiItalic, FiUnderline, FiList, FiLink, FiAlignLeft } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import './Compose.css';

const Compose = ({ onClose, replyTo, forwardEmail }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [to, setTo] = useState(replyTo?.sender?.email || '');
  const [cc, setCc] = useState('');
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [bcc, setBcc] = useState('');
  const [subject, setSubject] = useState(() => {
    if (replyTo) return `Re: ${replyTo.subject}`;
    if (forwardEmail) return `Fw: ${forwardEmail.subject}`;
    return '';
  });
  const [body, setBody] = useState(() => {
    if (forwardEmail) return `\n\n--- Forwarded message ---\n${forwardEmail.preview}`;
    return '';
  });
  const bodyRef = useRef(null);

  const handleSend = () => {
    if (!to.trim()) {
      toast.error('Please add at least one recipient');
      return;
    }
    toast.success('Message sent successfully');
    onClose();
  };

  const handleDiscard = useCallback(() => {
    if (to || subject || body) {
      if (window.confirm('Discard this draft?')) {
        toast('Draft discarded', { icon: '🗑️' });
        onClose();
      }
    } else {
      onClose();
    }
  }, [to, subject, body, onClose]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleDiscard();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleDiscard]);

  // handleSaveDraft could be used, or removed. Removing it since it's unused.
  
  if (isMinimized) {
    return (
      <div className="compose-minimized" onClick={() => setIsMinimized(false)}>
        <span className="compose-minimized-title truncate">{subject || 'New Message'}</span>
        <div className="compose-minimized-actions">
          <button onClick={(e) => { e.stopPropagation(); setIsMinimized(false); }}>
            <FiMaximize2 size={14} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleDiscard(); }}>
            <FiX size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`compose-window ${isMaximized ? 'maximized' : ''}`}
      >
        {/* Header */}
        <div className="compose-header">
          <span className="compose-header-title">New Message</span>
          <div className="compose-header-controls">
            <button className="compose-ctrl-btn" onClick={() => setIsMinimized(true)} title="Minimize">
              <FiMinus size={14} />
            </button>
            <button className="compose-ctrl-btn" onClick={() => setIsMaximized(!isMaximized)} title={isMaximized ? 'Restore' : 'Maximize'}>
              {isMaximized ? <FiMinimize2 size={14} /> : <FiMaximize2 size={14} />}
            </button>
            <button className="compose-ctrl-btn" onClick={handleDiscard} title="Close">
              <FiX size={14} />
            </button>
          </div>
        </div>

        {/* Fields */}
        <div className="compose-fields">
          <div className="compose-field-row">
            <label className="compose-field-label">To</label>
            <input
              type="text"
              className="compose-field-input"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Recipients"
            />
            {!showCcBcc && (
              <button className="compose-ccbcc-toggle" onClick={() => setShowCcBcc(true)}>
                Cc/Bcc
              </button>
            )}
          </div>

          {showCcBcc && (
            <>
              <div className="compose-field-row">
                <label className="compose-field-label">Cc</label>
                <input type="text" className="compose-field-input" value={cc} onChange={(e) => setCc(e.target.value)} />
              </div>
              <div className="compose-field-row">
                <label className="compose-field-label">Bcc</label>
                <input type="text" className="compose-field-input" value={bcc} onChange={(e) => setBcc(e.target.value)} />
              </div>
            </>
          )}

          <div className="compose-field-row">
            <input
              type="text"
              className="compose-field-input subject-input"
              placeholder="Add a subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>

        {/* Formatting toolbar */}
        <div className="compose-format-bar">
          <button className="format-btn" title="Bold"><FiBold size={14} /></button>
          <button className="format-btn" title="Italic"><FiItalic size={14} /></button>
          <button className="format-btn" title="Underline"><FiUnderline size={14} /></button>
          <div className="format-divider" />
          <button className="format-btn" title="Bullet list"><FiList size={14} /></button>
          <button className="format-btn" title="Alignment"><FiAlignLeft size={14} /></button>
          <button className="format-btn" title="Insert link"><FiLink size={14} /></button>
        </div>

        {/* Body */}
        <textarea
          ref={bodyRef}
          className="compose-body-editor"
          placeholder="Type your message here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        {/* Footer */}
        <div className="compose-footer">
          <div className="compose-footer-left">
            <button className="compose-send-btn" onClick={handleSend}>Send</button>
            <button className="compose-icon-btn" title="Attach file"><FiPaperclip size={16} /></button>
            <button className="compose-icon-btn" title="Insert picture"><FiImage size={16} /></button>
            <button className="compose-icon-btn" title="More options"><FiMoreHorizontal size={16} /></button>
          </div>
          <div className="compose-footer-right">
            <button className="compose-icon-btn" onClick={handleDiscard} title="Discard"><FiTrash2 size={16} /></button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Compose;

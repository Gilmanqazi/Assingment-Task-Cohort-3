import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [responseModal, setResponseModal] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      const fakeTicketId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
      
      setResponseModal({
        ticketId: fakeTicketId,
        userName: formData.name,
        userEmail: formData.email,
        subject: formData.subject || 'General Inquiry',
        aiReply: `Hello ${formData.name}, thank you for reaching out! We have received your query regarding "${formData.subject || 'your request'}". Our support team has assigned ticket #${fakeTicketId} to your request and sent a confirmation email to ${formData.email}. We usually respond within 2-4 business hours.`,
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen bg-white text-zinc-900">
      
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
          Help & Support
        </p>
        <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-zinc-900">
          We’d love to hear from you.
        </h1>
        <p className="text-sm text-zinc-500 max-w-md mx-auto">
          Have a question about an order, shipping, or returns? Send us a message and we'll reply shortly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Left Side: Direct Info */}
        <div className="space-y-6 md:border-r md:border-zinc-100 md:pr-8">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">Customer Service</h4>
            <p className="text-sm text-zinc-800 font-medium">support@gilmanstore.com</p>
            <p className="text-xs text-zinc-500 mt-1">Mon - Sat: 9:00 AM - 7:00 PM IST</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">Headquarters</h4>
            <p className="text-sm text-zinc-700 leading-relaxed">
              102 Minimal Avenue, Tech Park<br />
              Mumbai, MH 400001
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">Quick Assistance</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              For urgent order updates, mention your Order ID in the subject field.
            </p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5">Your Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Gilman"
                  className="w-full px-4 py-2.5 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Name@Gmail.com"
                  className="w-full px-4 py-2.5 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">Subject</label>
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Order Tracking / Product Inquiry"
                className="w-full px-4 py-2.5 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">Your Message *</label>
              <textarea 
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your query here..."
                className="w-full px-4 py-2.5 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors resize-none"
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-base"></i>
                  Sending Query...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>

      </div>

    
      {responseModal && (
        <div className="fixed inset-0 bg-zinc-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-100 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <span className="text-xs font-mono font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                ✓ Response Generated
              </span>
              <span className="text-xs text-zinc-400 font-mono">{responseModal.ticketId}</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-zinc-900">Query Received Successfully!</h3>
              <p className="text-xs text-zinc-600 leading-relaxed bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                "{responseModal.aiReply}"
              </p>
            </div>

            <div className="pt-2 text-right">
              <button 
                onClick={() => setResponseModal(null)}
                className="px-5 py-2 bg-zinc-900 text-white text-xs font-medium rounded-lg hover:bg-zinc-800 transition-all"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Contact;
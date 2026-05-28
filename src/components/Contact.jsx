import { useState } from 'react';
import { Send, MessageSquare, Check } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brief: ''
  });

  const [selectedServices, setSelectedServices] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const serviceOptions = [
    'Premium Portfolio Photography',
    'Cinematic Video Editing',
    'Creative Production Studio Hire',
    'Custom Color Grading'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(prev => prev.filter(s => s !== service));
    } else {
      setSelectedServices(prev => [...prev, service]);
    }
  };

  // Conversion Loop Logic: Serializes inputs and selected services array into a URL-encoded WhatsApp string
  const triggerWhatsAppRedirect = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please fill in your Name and Email to start the WhatsApp chat.");
      return;
    }

    const phone = "442079460958"; // Focus Photo Films mock number
    const servicesText = selectedServices.length > 0 
      ? selectedServices.map(s => `- ${s}`).join('\n') 
      : '- Not Specified';
      
    const rawMessage = `Hello Focus Photo Films!\n\nI am interested in booking a session. Here are my details:\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n\n*Requested Services:*\n${servicesText}\n\n*Project Brief:*\n${formData.brief || 'No brief provided yet.'}\n\nSent from Focus Photo Films Showcase.`;
    
    const encodedMessage = encodeURIComponent(rawMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;
    
    // Open in new window/tab
    window.open(whatsappUrl, '_blank');
  };

  const handleFormSubmit = (e) => {
    // We prevent default so we can handle it via AJAX or show mock success state
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Simulate Formsubmit serverless processing
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', brief: '' });
      setSelectedServices([]);
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 bg-luxury-obsidian relative">
      {/* Background shadow divider lines */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Copy & Details */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-luxury-gold block mb-3 font-sans">
              Connect
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-luxury-light tracking-tight leading-tight mb-6">
              Let's Co-create Something Timeless
            </h2>
            <p className="font-sans text-sm text-luxury-gray leading-relaxed mb-8">
              Whether you require a bespoke cinematic video editor showreel, premium portfolio photography, or a full-scale creative production studio crew, we are ready to bring your vision to life.
            </p>
          </div>

          <div className="space-y-6 border-t border-luxury-gold/5 pt-8 font-sans">
            <div>
              <h4 className="text-[10px] tracking-[0.2em] uppercase text-luxury-gold mb-1 font-semibold">Location</h4>
              <p className="text-sm text-luxury-light">32 Glasshouse St, Soho, London, W1B 5DG</p>
            </div>
            <div>
              <h4 className="text-[10px] tracking-[0.2em] uppercase text-luxury-gold mb-1 font-semibold">General Inquiries</h4>
              <p className="text-sm text-luxury-light">hello@focusphotofilms.com</p>
            </div>
            <div>
              <h4 className="text-[10px] tracking-[0.2em] uppercase text-luxury-gold mb-1 font-semibold">Phone Contact</h4>
              <p className="text-sm text-luxury-light">+44 20 7946 0958</p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7 bg-luxury-charcoal/40 p-8 md:p-10 border border-luxury-gold/5 rounded-sm backdrop-blur-sm relative">
          
          {submitted ? (
            <div className="h-full min-h-[350px] flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-gold mb-6 bg-luxury-gold/5">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-luxury-light mb-2">Request Transmitted</h3>
              <p className="text-sm text-luxury-gray max-w-sm leading-relaxed">
                Thank you. Our executive production coordinator will reach out to you within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-8">
              
              {/* Formsubmit endpoint setup (hidden inputs for production setups) */}
              <input type="hidden" name="_subject" value="New Focus Photo Films Booking Request" />
              <input type="hidden" name="_template" value="table" />

              {/* Service Selection Array Grid */}
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase text-luxury-gold font-semibold font-sans block mb-4">
                  Select Requested Services
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {serviceOptions.map((service, idx) => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => toggleService(service)}
                        className={`text-left p-3.5 text-xs font-sans tracking-wide border rounded-sm transition-all duration-300 ${
                          isSelected 
                            ? 'bg-luxury-gold/5 border-luxury-gold text-luxury-gold' 
                            : 'bg-luxury-obsidian/40 border-luxury-gold/5 text-luxury-gray hover:border-luxury-gold/30'
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[10px] tracking-[0.2em] uppercase text-luxury-gold font-sans font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full bg-luxury-obsidian/60 border border-luxury-gold/10 p-3 text-sm text-luxury-light focus:outline-none focus:border-luxury-gold rounded-sm transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[10px] tracking-[0.2em] uppercase text-luxury-gold font-sans font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full bg-luxury-obsidian/60 border border-luxury-gold/10 p-3 text-sm text-luxury-light focus:outline-none focus:border-luxury-gold rounded-sm transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="brief" className="text-[10px] tracking-[0.2em] uppercase text-luxury-gold font-sans font-semibold">
                  Project Brief
                </label>
                <textarea
                  id="brief"
                  name="brief"
                  rows="4"
                  value={formData.brief}
                  onChange={handleInputChange}
                  placeholder="Describe your creative requirements..."
                  className="w-full bg-luxury-obsidian/60 border border-luxury-gold/10 p-3 text-sm text-luxury-light focus:outline-none focus:border-luxury-gold rounded-sm transition-all resize-none"
                />
              </div>

              {/* Action Trigger Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-luxury-gold text-luxury-obsidian font-semibold py-3.5 px-6 rounded-sm text-xs font-sans tracking-[0.2em] uppercase hover:bg-luxury-light hover:text-luxury-obsidian transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-luxury-gold/5"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Request
                </button>
                
                {/* WhatsApp Click-to-Chat prefilled serializer */}
                <button
                  type="button"
                  onClick={triggerWhatsAppRedirect}
                  className="flex-1 bg-transparent border border-luxury-gold text-luxury-gold font-semibold py-3.5 px-6 rounded-sm text-xs font-sans tracking-[0.2em] uppercase hover:bg-luxury-gold hover:text-luxury-obsidian transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Chat
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}

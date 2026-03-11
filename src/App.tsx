import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  ChevronRight, 
  Send,
  ExternalLink,
  Play,
  Instagram,
  ShieldCheck,
  Check,
  ChevronLeft
} from 'lucide-react';
import { SERVICES, REVIEWS, INSTAGRAM_REELS, CONTACT_INFO, PAGE_FAQS, MASTER_FAQS } from './constants';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

// --- Components ---

const WelcomePopup = ({ setActivePage }: { setActivePage: (p: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<string>('welcome');
  const [isLoading, setIsLoading] = useState(false);
  const [leadData, setLeadData] = useState({
    name: '',
    problem: '',
    urgency: '',
    budget: '',
    phone: '',
    bookingDate: '',
    bookingTime: '',
    isUrgent: false
  });
  const [inputValue, setInputValue] = useState('');
  const [hasSentToWhatsApp, setHasSentToWhatsApp] = useState(false);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  const BUSINESS_NAME = "Sharath Dental Implant clinic";
  const WHATSAPP_NUMBER = CONTACT_INFO.whatsapp;
  const PHONE_NUMBER = CONTACT_INFO.phone;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      addAssistantMessage(`Hello! Welcome to ${BUSINESS_NAME}. I'm your assistant. How can I help you today?`);
      setCurrentStep('name');
      setTimeout(() => addAssistantMessage("May I know your name?"), 1000);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const addAssistantMessage = (content: string, options?: string[], type: string = 'text') => {
    setMessages(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      role: 'assistant',
      content,
      options,
      type,
      timestamp: new Date()
    }]);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      role: 'user',
      content,
      timestamp: new Date()
    }]);
  };

  const handleUrgencyDetection = (text: string) => {
    const urgentKeywords = ['emergency', 'severe pain', 'urgent', 'broken', 'accident', 'bleeding', 'swelling', 'pain'];
    return urgentKeywords.some(keyword => text.toLowerCase().includes(keyword));
  };

  const handleAIService = async (query: string, userName: string) => {
    setIsLoading(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key missing");
      
      const ai = new GoogleGenAI({ apiKey });
      const model = "gemini-flash-latest";
      
      const context = `
        You are a highly professional and knowledgeable dental receptionist for ${BUSINESS_NAME} in Hyderabad. 
        Your goal is to provide expert guidance and reassure the patient.
        
        Guidelines:
        1. Answer concisely and helpfully.
        2. Use BOLD for key information.
        3. DO NOT use bullet points or '*' characters.
        4. Sharath Dental is one of the best rated dental clinic in hyderbad. Provides all kind of dental treatments painless root canal, laser gum surgery, dental implants, invisalign provider, smile makeover, teeth whitening, teeth braces, zirconium crowns, DMLS, wisdom tooth removal and many more.
        
        Hospital Info:
        - Name: ${BUSINESS_NAME}
        - Location: ${CONTACT_INFO.address}
        - Services: Teeth whitening (₹7,500), Teeth cleaning (₹1,000-2,500), Zirconia cap (₹7,500), DMLS Cap (₹5,500-6,500), Root Canal (₹2,500-4,500), Dental Implant (₹20,000-25,000).
        - Timings: Mon-Fri (9 AM - 8 PM), Sat (10 AM - 6 PM).
      `;

      const result = await ai.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: `${context}\n\nUser (${userName}) Question: ${query}` }] }],
      });

      return result.text;
    } catch (error) {
      console.error("AI Assistant Error:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleStepLogic = async (input: string) => {
    const trimmedInput = input.trim();
    if (!trimmedInput && currentStep !== 'booking_offer') return;

    addUserMessage(trimmedInput);
    setInputValue('');

    switch (currentStep) {
      case 'name':
        setLeadData(prev => ({ ...prev, name: trimmedInput }));
        addAssistantMessage(`Nice to meet you **${trimmedInput}**!`);
        setTimeout(() => {
          addAssistantMessage("How can we help you today?", [
            "Need service", "Consultation", "Booking", "General question"
          ]);
          setCurrentStep('intent');
        }, 800);
        break;

      case 'intent':
        if (trimmedInput === "Need service") {
          addAssistantMessage("Which service are you interested in?", [
            "Dental Implant", "Root Canal", "Teeth Whitening", "Teeth Cleaning", "Zirconia Cap", "DMLS Cap", "Invisalign", "Laser Gum Surgery", "Smile Makeover", "Teeth Braces", "Wisdom Tooth Removal", "Other"
          ]);
          setCurrentStep('service_selection');
        } else if (trimmedInput === "Booking") {
          setLeadData(prev => ({ ...prev, problem: "Appointment Booking" }));
          addAssistantMessage("Our schedule is **Mon-Fri (9 AM - 8 PM)** and **Sat (10 AM - 6 PM)**. What day works best for you?", [
            "Today", "Tomorrow", "Day after Tomorrow", "This Weekend"
          ]);
          setCurrentStep('booking_date');
        } else if (trimmedInput === "General question") {
          addAssistantMessage("I'm here to help! What is your question? I will answer it and then connect you with our team on WhatsApp.");
          setCurrentStep('chat');
        } else {
          // Consultation
          addAssistantMessage("Please tell me a bit about what you're looking for or any dental concerns you have.");
          setCurrentStep('problem');
        }
        break;

      case 'service_selection':
        setLeadData(prev => ({ ...prev, problem: trimmedInput }));
        addAssistantMessage(`Great choice! **${trimmedInput}** is one of our specialties.`);
        setTimeout(() => {
          addAssistantMessage("Is this something you are planning to do soon?", [
            "Immediately", "Within a week", "Within a month", "Just researching"
          ]);
          setCurrentStep('urgency');
        }, 800);
        break;

      case 'problem':
        const isUrgent = handleUrgencyDetection(trimmedInput);
        setLeadData(prev => ({ ...prev, problem: trimmedInput, isUrgent }));
        
        setIsLoading(true);
        const aiResponse = await handleAIService(trimmedInput, leadData.name);
        setIsLoading(false);

        if (aiResponse) {
          addAssistantMessage(aiResponse);
        } else {
          addAssistantMessage(`Thank you for sharing that. At **${BUSINESS_NAME}**, we regularly help customers with **${trimmedInput}**.`);
        }

        if (isUrgent) {
          setTimeout(() => {
            addAssistantMessage("This sounds urgent. I recommend contacting our team immediately for priority care.", ["Call Now", "WhatsApp Now"]);
            setCurrentStep('urgent_escalation');
          }, 1000);
        } else {
          setTimeout(() => {
            addAssistantMessage("Is this something you are planning to do soon?", [
              "Immediately", "Within a week", "Within a month", "Just researching"
            ]);
            setCurrentStep('urgency');
          }, 1000);
        }
        break;

      case 'urgency':
        setLeadData(prev => ({ ...prev, urgency: trimmedInput }));
        setTimeout(() => {
          addAssistantMessage("So our team can assist you faster, may I have your phone number?");
          setCurrentStep('phone');
        }, 800);
        break;

      case 'phone':
        setLeadData(prev => ({ ...prev, phone: trimmedInput }));
        setTimeout(() => {
          addAssistantMessage("Would you like to book an appointment with our team?", [
            "Yes, book appointment", "I need more information", "Not now"
          ]);
          setCurrentStep('booking_offer');
        }, 800);
        break;

      case 'booking_offer':
        if (trimmedInput.toLowerCase().includes('yes')) {
          addAssistantMessage("Our schedule is **Mon-Fri (9 AM - 8 PM)** and **Sat (10 AM - 6 PM)**. What day works best for you?", [
            "Today", "Tomorrow", "Day after Tomorrow", "This Weekend"
          ]);
          setCurrentStep('booking_date');
        } else {
          showSummary();
        }
        break;

      case 'booking_date':
        setLeadData(prev => ({ ...prev, bookingDate: trimmedInput }));
        addAssistantMessage("What time is convenient? (Our slots: Morning 9-12, Afternoon 12-4, Evening 4-8)", [
          "Morning (9 AM - 12 PM)", "Afternoon (12 PM - 4 PM)", "Evening (4 PM - 8 PM)"
        ]);
        setCurrentStep('booking_time');
        break;

      case 'booking_time':
        setLeadData(prev => ({ ...prev, bookingTime: trimmedInput }));
        if (!leadData.phone) {
          setTimeout(() => {
            addAssistantMessage("To finalize your request, may I have your phone number?");
            setCurrentStep('phone_final');
          }, 800);
        } else {
          showSummary();
        }
        break;

      case 'phone_final':
        setLeadData(prev => ({ ...prev, phone: trimmedInput }));
        showSummary();
        break;

      case 'chat':
        setLeadData(prev => ({ ...prev, problem: trimmedInput }));
        setIsLoading(true);
        const response = await handleAIService(trimmedInput, leadData.name);
        setIsLoading(false);
        if (response) {
          addAssistantMessage(response);
          if (!leadData.phone) {
            addAssistantMessage("To send this question to our team on WhatsApp for a detailed answer, may I have your phone number?");
            setCurrentStep('phone_final');
          } else {
            showSummary();
          }
        } else {
          addAssistantMessage(`Hi **${leadData.name}**, I'm having a small technical issue accessing our help desk right now. But our team can still assist you quickly.`, ["Call Our Reception", "Chat on WhatsApp"]);
        }
        break;

      case 'chat_followup':
        if (trimmedInput === "Send to WhatsApp") {
          addAssistantMessage("To send this to our team, may I have your phone number?");
          setCurrentStep('phone_final');
        } else if (trimmedInput === "Ask Another Question") {
          addAssistantMessage("Sure! What else would you like to know?");
          setCurrentStep('chat');
        } else {
          addAssistantMessage("To connect with our team, may I have your phone number?");
          setCurrentStep('phone_final');
        }
        break;
    }
  };

  const showSummary = () => {
    addAssistantMessage("I've collected your details. Please click below to send your request to our team on WhatsApp for confirmation.", undefined, 'summary');
    setCurrentStep('summary');
    
    // 10-second reminder timer
    setTimeout(() => {
      setHasSentToWhatsApp(current => {
        if (!current) {
          addAssistantMessage(`Hi **${leadData.name}**, I noticed you haven't sent your request yet. Would you like to chat with our team on WhatsApp now?`, ["Chat on WhatsApp", "Call Now", "Ask Another Question"]);
        }
        return current;
      });
    }, 10000);
  };

  const handleWhatsAppSend = () => {
    setHasSentToWhatsApp(true);
    const message = `Hello, I visited your website and spoke with the assistant.
My details:
Name: ${leadData.name}
Phone: ${leadData.phone}
Service Needed: ${leadData.problem}
Urgency: ${leadData.urgency}
Budget Range: ${leadData.budget}
Preferred Appointment Date: ${leadData.bookingDate || 'N/A'}
Preferred Time: ${leadData.bookingTime || 'N/A'}
Please guide me further.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            height: isMinimized ? '80px' : '600px',
            width: isMinimized ? '280px' : '400px'
          }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-[100] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col transition-all duration-300"
        >
          {/* Header */}
          <div className="bg-primary p-6 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Sharath Dental Reception</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <p className="text-[10px] opacity-80">Always Online</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                {isMinimized ? <ChevronRight size={20} className="-rotate-90" /> : <ChevronRight size={20} className="rotate-90" />}
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Chat Area */}
              <div 
                ref={chatContainerRef}
                className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50/50"
              >
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-primary text-white rounded-tr-none shadow-lg shadow-primary/10' 
                        : 'bg-white text-slate-700 rounded-tl-none shadow-sm border border-slate-100'
                    }`}>
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                    
                    {msg.options && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {msg.options.map((opt: string) => (
                          <button
                            key={opt}
                            onClick={() => {
                              if (opt === 'Call Now' || opt === 'Call Our Reception') {
                                window.location.href = `tel:${PHONE_NUMBER}`;
                              } else if (opt === 'WhatsApp Now' || opt === 'Chat on WhatsApp') {
                                handleWhatsAppSend();
                              } else if (opt === 'Ask Another Question') {
                                setCurrentStep('chat');
                                addAssistantMessage("Sure! What else would you like to know?");
                              } else {
                                handleStepLogic(opt);
                              }
                            }}
                            className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:border-primary hover:text-primary transition-all shadow-sm"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {currentStep === 'summary' && msg.content.includes("collected your details") && (
                      <div className="w-full mt-4">
                        <button 
                          onClick={handleWhatsAppSend}
                          className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-transform"
                        >
                          <MessageCircle size={20} /> Send My Request to WhatsApp
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-2 items-center text-primary text-xs font-bold">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                    Receptionist is typing...
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-slate-100 shrink-0">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (inputValue.trim()) handleStepLogic(inputValue);
                  }}
                  className="flex gap-2"
                >
                  <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={currentStep === 'chat' ? "Ask a question..." : "Type your answer..."}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="bg-primary text-white p-3 rounded-xl hover:bg-secondary transition-colors disabled:opacity-50 shadow-lg shadow-primary/20"
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FAQSection = ({ faqs, setActivePage }: { faqs: { q: string, a: string }[], setActivePage: (p: string) => void }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600">Find answers to common questions about our services and care.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <button 
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="font-bold text-slate-900">{faq.q}</span>
                <ChevronRight size={18} className={`text-slate-400 transition-transform ${openIndex === idx ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-slate-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button 
            onClick={() => {
              setActivePage('faq');
              window.scrollTo(0, 0);
            }}
            className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
          >
            Know More A-Z FAQs <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

const MasterFAQPage = () => {
  const [openIndices, setOpenIndices] = useState<Record<string, number | null>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const toggle = (category: string, idx: number) => {
    setOpenIndices(prev => ({
      ...prev,
      [category]: prev[category] === idx ? null : idx
    }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setAiResponse(null);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key missing");
      
      const ai = new GoogleGenAI({ apiKey });
      const model = "gemini-flash-latest";
      
      const context = `
        You are the virtual receptionist for Sharath Dental Implant clinic in Hyderabad.
        Answer the user's query politely and professionally. 
        Use BOLD for key information. 
        DO NOT use bullet points or '*' characters in your response. 
        If you list items, use plain numbers or just separate them with new lines.
        
        Hospital Info:
        - Name: Sharath Dental Implant clinic
        - Description: One of the best rated dental clinic in hyderbad. Provides all kind of dental treatments painless root canal, laser gum surgery, dental implants, invisalign provider, smile makeover, teeth whitening, teeth braces, zirconium crowns, DMLS, wisdom tooth removal and many more.
        - Location: 8-2-13/2, Behind Big Bazaar, Opposite My Home Madhuban, Punjagutta, Hyderabad.
        - Services: Teeth whitening (₹7,500), Teeth cleaning (₹1,000-2,500), Zirconia cap (₹7,500), DMLS Cap (₹5,500-6,500), Root Canal (₹2,500-4,500), Dental Implant (₹20,000-25,000).
        - Timings: Mon-Fri: 9 AM - 8 PM | Sat: 10 AM - 6 PM | Sun: Closed (Emergency only).
        - Contact: ${CONTACT_INFO.phone}, WhatsApp: ${CONTACT_INFO.whatsapp}
        - Address: ${CONTACT_INFO.address}
      `;

      const response = await ai.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: `${context}\n\nUser Question: ${searchQuery}` }] }],
      });

      setAiResponse(response.text || "I'm sorry, I couldn't find an answer to that. Please contact our front desk.");
    } catch (error) {
      console.error("AI Search Error:", error);
      setAiResponse("I'm having a bit of trouble connecting to the desk. Please call us directly for immediate assistance.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
          <MessageCircle size={40} />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Master FAQ Desk</h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Hello! I'm your virtual receptionist. I'm here to answer everything from A to Z about our hospital, services, timings, and more.
        </p>
      </div>

      {/* AI Search Bar */}
      <div className="mb-20">
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask me anything about the business... (e.g. 'What are your root canal prices?')"
            className="w-full px-8 py-5 rounded-2xl border-2 border-primary/20 focus:border-primary focus:outline-none text-lg shadow-lg transition-all pr-32"
          />
          <button 
            type="submit"
            disabled={isSearching}
            className="absolute right-2 top-2 bottom-2 bg-primary text-white px-6 rounded-xl font-bold hover:bg-secondary transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isSearching ? 'Thinking...' : 'Ask Me'}
          </button>
        </form>

        <AnimatePresence>
          {aiResponse && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-white rounded-[2rem] p-8 border border-primary/10 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 bg-primary h-full" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 mt-1">
                  <MessageCircle size={20} />
                </div>
                <div className="space-y-6 w-full">
                  <div className="text-slate-700 text-lg leading-relaxed prose prose-slate max-w-none">
                    <ReactMarkdown>{aiResponse}</ReactMarkdown>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-100">
                    <p className="font-bold text-slate-900 mb-4">Still have questions?</p>
                    <div className="flex flex-wrap gap-4">
                      <a 
                        href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} 
                        className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-secondary transition-colors flex items-center gap-2 text-sm shadow-lg shadow-primary/20"
                      >
                        <Phone size={16} /> Call Hospital
                      </a>
                      <a 
                        href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(`Hi, I was asking about: "${searchQuery}". I still have some questions.`)}`} 
                        className="bg-emerald-500 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-600 transition-colors flex items-center gap-2 text-sm shadow-lg shadow-emerald-500/20"
                      >
                        <MessageCircle size={16} /> Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-16">
        {MASTER_FAQS.map((cat, catIdx) => (
          <div key={catIdx}>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <div className="w-2 h-8 bg-primary rounded-full" />
              {cat.category}
            </h3>
            <div className="space-y-4">
              {cat.items.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <button 
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                    onClick={() => toggle(cat.category, idx)}
                  >
                    <span className="font-bold text-lg text-slate-900">{faq.q}</span>
                    <ChevronRight size={20} className={`text-slate-400 transition-transform ${openIndices[cat.category] === idx ? 'rotate-90' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openIndices[cat.category] === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-6 text-slate-600 leading-relaxed text-lg border-t border-slate-50 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 bg-primary rounded-[3rem] p-12 text-center text-white">
        <h3 className="text-3xl font-bold mb-4">Still have questions?</h3>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">Our team is ready to help you with any specific queries you might have. Feel free to reach out directly.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-colors flex items-center gap-2">
            <Phone size={20} /> Call Now
          </a>
          <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} className="bg-emerald-500 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-600 transition-colors flex items-center gap-2">
            <MessageCircle size={20} /> WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
};

const Header = ({ activePage, setActivePage }: { activePage: string, setActivePage: (p: string) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
    { id: 'faq', label: 'FAQ' }
  ];

  return (
    <header className="glass-header">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer shrink-0" 
          onClick={() => setActivePage('home')}
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shrink-0">
            S
          </div>
          <div className="flex flex-col">
            <h1 className="font-display font-bold text-base sm:text-lg leading-tight text-primary whitespace-nowrap">Sharath Dental</h1>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-500 font-semibold whitespace-nowrap">Implant clinic</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activePage === item.id ? 'text-primary' : 'text-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => setActivePage('contact')}
            className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:bg-secondary transition-all transform hover:scale-105"
          >
            Book Your Painless Visit
          </button>
        </nav>

        <button className="md:hidden text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 p-4 shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left text-lg font-medium p-2 rounded-lg ${
                    activePage === item.id ? 'bg-primary/10 text-primary' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => {
                  setActivePage('contact');
                  setIsMenuOpen(false);
                }}
                className="bg-primary text-white w-full py-4 rounded-xl font-bold text-center"
              >
                Book Your Painless Visit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const ReviewCard = ({ review, onReadMore }: { review: typeof REVIEWS[0], onReadMore: (review: typeof REVIEWS[0]) => void }) => {
  const isLong = review.content.length > 120;
  const displayContent = isLong ? `${review.content.substring(0, 120)}...` : review.content;

  return (
    <div 
      onClick={() => window.open(review.link, '_blank')}
      className="w-[380px] bg-white p-8 rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all shrink-0 mx-4 flex flex-col cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={review.avatar} 
              alt={review.name} 
              className="w-14 h-14 rounded-full object-cover border-2 border-slate-100"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-50">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#4285F4"/>
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-slate-900 text-base group-hover:text-primary transition-colors">{review.name}</h4>
              <div className="w-3.5 h-3.5 bg-[#C5A059] rounded-full flex items-center justify-center">
                <Check size={8} className="text-white" strokeWidth={4} />
              </div>
            </div>
            <p className="text-xs text-slate-400 font-medium">{review.date}</p>
          </div>
        </div>
        <div className="text-slate-300 group-hover:text-primary transition-colors">
          <ExternalLink size={18} />
        </div>
      </div>
      
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={18} className="fill-[#FBBC04] text-[#FBBC04]" />
        ))}
      </div>

      <div className="flex-grow">
        <p className="text-slate-700 text-[15px] leading-relaxed">
          {displayContent}
          {isLong && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onReadMore(review);
              }}
              className="text-[#C5A059] font-bold ml-1 hover:underline"
            >
              Read more
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

const ReviewCarousel = () => {
  const [selectedReview, setSelectedReview] = useState<typeof REVIEWS[0] | null>(null);

  return (
    <div className="bg-[#1F2937] py-20">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="bg-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between shadow-xl border border-slate-100">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center">
                <span className="text-[#4285F4] font-bold text-3xl">G</span>
                <span className="text-[#EA4335] font-bold text-3xl">o</span>
                <span className="text-[#FBBC05] font-bold text-3xl">o</span>
                <span className="text-[#4285F4] font-bold text-3xl">g</span>
                <span className="text-[#34A853] font-bold text-3xl">l</span>
                <span className="text-[#EA4335] font-bold text-3xl">e</span>
              </div>
              <span className="text-slate-700 font-bold text-3xl">Reviews</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-slate-900">4.9</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} className="fill-[#FBBC04] text-[#FBBC04]" />
                ))}
              </div>
              <span className="text-slate-400 text-lg font-medium">(302)</span>
            </div>
          </div>
          
          <a 
            href="https://maps.app.goo.gl/BtQ92mZ1zJWHDmESA" 
            target="_blank"
            className="bg-[#D4C38F] text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-[#C5A059] transition-all shadow-lg"
          >
            Review us on Google
          </a>
        </div>
      </div>

      <div className="relative group">
        <div className="w-full overflow-hidden py-10">
          <div className="scrolling-wrapper">
            {[...REVIEWS, ...REVIEWS].map((review, idx) => (
              <ReviewCard 
                key={`${review.id}-${idx}`} 
                review={review} 
                onReadMore={(r) => setSelectedReview(r)}
              />
            ))}
          </div>
        </div>
        
        <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10">
          <ChevronLeft size={24} />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10">
          <ChevronRight size={24} />
        </button>

        <div className="flex justify-center gap-2 mt-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-[#D4C38F]' : 'bg-white/20'}`} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedReview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedReview(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl relative p-10"
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors p-2 hover:bg-slate-50 rounded-full"
                onClick={() => setSelectedReview(null)}
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-5 mb-8">
                <div className="relative">
                  <img 
                    src={selectedReview.avatar} 
                    alt={selectedReview.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-100"
                  />
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-50">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#4285F4"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-xl">{selectedReview.name}</h4>
                    <div className="w-4 h-4 bg-[#C5A059] rounded-full flex items-center justify-center">
                      <Check size={10} className="text-white" strokeWidth={4} />
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 font-medium">{selectedReview.date}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} className="fill-[#FBBC04] text-[#FBBC04]" />
                ))}
              </div>

              <p className="text-slate-700 text-lg leading-relaxed mb-10">
                {selectedReview.content}
              </p>

              {selectedReview.ownerReply && (
                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shrink-0 overflow-hidden">
                      <img src="https://lh3.googleusercontent.com/pw/AP1GczNHok4drTXJYdcozXcdRr3Lo4jVjmAS7Lg4tJD-G0CRKCGWoUjgsev9ukMUgSok-c8x2LhRkIjIaWbJel71g2kDnCr0rgY547_BNxfccjTkj8NhJpMezuDMRl3SiNv-UJ0kTxV--pLDGFIOQvT2_H4L=w598-h398-s-no-gm?authuser=0" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-bold text-slate-900">Sharath Dental</h5>
                        <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Owner Reply</span>
                      </div>
                      <p className="text-xs text-slate-400 font-medium">{selectedReview.date}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed italic">
                    {selectedReview.ownerReply}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InstagramWall = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {INSTAGRAM_REELS.map(reel => {
        const reelId = reel.url.split('/reel/')[1].split('/')[0];
        return (
          <div 
            key={reel.id}
            className="relative aspect-[9/16] bg-slate-100 rounded-2xl overflow-hidden group cursor-pointer border border-slate-200 shadow-sm hover:shadow-xl transition-all"
            onClick={() => setSelectedVideo(reel.url)}
          >
            {/* Using Instagram's official embed as the thumbnail to show ACTUAL content */}
            <div className="absolute inset-0 pointer-events-none scale-[1.02]">
              <iframe
                src={`https://www.instagram.com/reel/${reelId}/embed/`}
                className="w-full h-full border-0"
                scrolling="no"
              ></iframe>
            </div>
            
            {/* Overlay to capture clicks and show play button */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center">
              <div className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                <Play fill="currentColor" size={28} className="ml-1" />
              </div>
            </div>

            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-slate-100">
              <Instagram size={12} className="text-pink-600" />
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-700">Watch Reel</span>
            </div>
          </div>
        );
      })}

      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10 p-2 hover:bg-white/10 rounded-full"
              onClick={() => setSelectedVideo(null)}
            >
              <X size={32} />
            </button>
            <div 
              className="w-full max-w-[400px] my-auto bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <iframe
                src={`${selectedVideo}embed`}
                className="w-full aspect-[9/16]"
                frameBorder="0"
                scrolling="no"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    service: 'General Dentistry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi, I found your website. I'm ${formData.name}. I'm looking for ${formData.service} and would like to book an appointment. Message: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Your Name</label>
          <input 
            required
            type="text" 
            placeholder="Enter your full name"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Service Needed</label>
          <select 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            value={formData.service}
            onChange={e => setFormData({...formData, service: e.target.value})}
          >
            {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Message (Optional)</label>
          <textarea 
            rows={4}
            placeholder="Tell us about your dental concerns..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>
        <button 
          type="submit"
          className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-secondary transition-all shadow-lg shadow-primary/20"
        >
          Send to WhatsApp <Send size={18} />
        </button>
      </div>
    </form>
  );
};

const Footer = ({ setActivePage }: { setActivePage: (p: string) => void }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <div>
              <h1 className="font-display font-bold text-lg leading-tight text-white">Sharath Dental</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Implant clinic</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed">
            Sharath Dental Implant clinic is one of the best rated dental clinic in hyderbad. Provides all kind of dental treatments.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <Instagram size={18} />
            </a>
            <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6">Quick Links</h3>
          <ul className="space-y-4 text-sm">
            {['Home', 'About Us', 'Services', 'Testimonials', 'Contact', 'FAQ'].map(item => (
              <li key={item}>
                <button 
                  onClick={() => setActivePage(item.toLowerCase().replace(' ', ''))}
                  className="hover:text-primary transition-colors"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <Phone size={18} className="text-primary shrink-0" />
              <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">{CONTACT_INFO.phone}</a>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="text-primary shrink-0" />
              <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-primary transition-colors">{CONTACT_INFO.email}</a>
            </li>
            <li className="flex gap-3">
              <MapPin size={18} className="text-primary shrink-0" />
              <span>{CONTACT_INFO.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6">Our Location</h3>
          <div className="rounded-xl overflow-hidden h-40 border border-slate-800">
            <iframe 
              src={CONTACT_INFO.mapEmbed}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <a 
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CONTACT_INFO.address)}`}
            target="_blank"
            className="mt-4 inline-flex items-center gap-2 text-primary text-sm font-bold hover:underline"
          >
            Get Directions <ChevronRight size={16} />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-10 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>
          Developed by 
          <a href="https://pocketfriendlysites.netlify.app" target="_blank" className="text-primary font-bold mx-1 hover:underline">Pocket Friendly Sites</a> 
          by 
          <a href="http://www.kiranthemarketer.com" target="_blank" className="text-primary font-bold mx-1 hover:underline">Kiran the Marketer</a>
        </p>
        <p className="mt-2">&copy; {new Date().getFullYear()} Sharath Dental Implant clinic. All rights reserved.</p>
      </div>
    </footer>
  );
};

// --- Pages ---

const HomePage = ({ setActivePage }: { setActivePage: (p: string) => void }) => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1445527815219-ecbfec67492e?w=1920&h=1080&fit=crop" 
            alt="Modern Dental Clinic"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold mb-6">
              Hyderabad's Most Trusted Dental Care
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-6">
              Your Journey to a <span className="text-primary">Perfect Smile</span> Starts Here.
            </h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Experience world-class dentistry with a gentle touch. We specialize in painless treatments and modern aesthetic solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setActivePage('contact')}
                className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/30 hover:bg-secondary transition-all transform hover:-translate-y-1"
              >
                Book Your Painless Visit
              </button>
              <button 
                onClick={() => setActivePage('services')}
                className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all"
              >
                Explore Services
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Specialized Services</h2>
          <p className="text-slate-600">Comprehensive dental solutions tailored to your unique needs, using the latest technology and expert care.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group overflow-hidden flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={(service as any).image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-primary shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <service.icon size={24} />
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">{service.description}</p>
                <button 
                  onClick={() => setActivePage('services')}
                  className="w-full py-3 rounded-xl border border-slate-200 text-slate-900 font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                >
                  Learn More <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Google Reviews Carousel */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-4">What Our Patients Say</h2>
            <p className="text-slate-600">Real feedback from real patients who trusted us with their smiles.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
            </div>
            <span className="text-sm font-bold">4.9/5 on Google</span>
          </div>
        </div>
        <ReviewCarousel />
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={PAGE_FAQS.home} setActivePage={setActivePage} />

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[100px]"></div>
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to transform your smile without the fear of pain?</h2>
            <p className="text-xl text-white/80 mb-12">Join thousands of happy patients who have experienced our gentle dental care.</p>
            <button 
              onClick={() => setActivePage('contact')}
              className="bg-white text-primary px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:bg-slate-50 transition-all transform hover:scale-105"
            >
              Get Your Free Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutPage = ({ setActivePage }: { setActivePage: (p: string) => void }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-24 space-y-16 md:space-y-24">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="order-2 lg:order-1">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop" 
              alt="Modern Dental Clinic" 
              className="rounded-3xl md:rounded-[3rem] shadow-2xl w-full"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Certified Care</p>
                  <p className="text-sm font-bold text-slate-900">ISO 9001:2015</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 space-y-6">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-xs md:text-sm mb-3 md:mb-4 block">Our Story</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-8 leading-tight">Dedicated to Excellence in Dental Care</h2>
          </div>
          <div className="space-y-4 md:space-y-6 text-slate-600 leading-relaxed text-sm md:text-base">
            <p>
              Sharath Dental Implant clinic was founded with a single mission: to provide <strong className="text-slate-900">high-quality, accessible, and painless dental care</strong> to the community of Hyderabad.
            </p>
            <p>
              Our clinic has grown into a state-of-the-art facility equipped with the <strong className="text-slate-900">latest dental technology</strong>. We believe that a visit to the dentist shouldn't be a source of anxiety, which is why we've designed our entire experience around <strong className="text-slate-900">patient comfort and trust</strong>.
            </p>
            <p>
              Sharath Dental is one of the best rated dental clinic in hyderbad. Provides all kind of dental treatments painless root canal, laser gum surgery, dental implants, invisalign provider, smile makeover, teeth whitening, teeth braces, zirconium crowns, DMLS, wisdom tooth removal and many more.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-5xl font-bold text-primary mb-4">10+</div>
            <div className="text-slate-900 font-bold text-lg">Years Experience</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-primary mb-4">5000+</div>
            <div className="text-slate-900 font-bold text-lg">Happy Patients</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-primary mb-4">15+</div>
            <div className="text-slate-900 font-bold text-lg">Expert Doctors</div>
          </div>
        </div>
      </section>

      <FAQSection faqs={PAGE_FAQS.about} setActivePage={setActivePage} />
    </div>
  );
};

const ServicesPage = ({ setActivePage }: { setActivePage: (p: string) => void }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 space-y-24">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Comprehensive Services</h2>
        <p className="text-slate-600 text-lg">We offer a wide range of dental treatments using advanced technology to ensure the best results for your oral health.</p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {SERVICES.map((service, idx) => (
          <div 
            key={service.id}
            className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
          >
            <div className="w-full lg:w-1/2">
              <img 
                src={(service as any).image} 
                alt={service.title} 
                className="rounded-[2rem] shadow-xl w-full h-[300px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <service.icon size={32} />
              </div>
              <h3 className="text-3xl font-bold">{service.title}</h3>
              <p className="text-slate-600 text-lg leading-relaxed">{service.description}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Expert Consultation', 'Modern Equipment', 'Painless Procedure', 'Follow-up Care'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <div className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                      <ShieldCheck size={12} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <FAQSection faqs={PAGE_FAQS.services} setActivePage={setActivePage} />
    </div>
  );
};

const TestimonialsPage = ({ setActivePage }: { setActivePage: (p: string) => void }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 space-y-24">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Patient Stories</h2>
        <p className="text-slate-600 text-lg">Watch how we've helped our patients achieve their dream smiles. Real results, real people.</p>
      </div>

      <InstagramWall />

      <div className="mt-24 bg-slate-50 rounded-[3rem] p-12 md:p-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">More Happy Smiles</h3>
          <p className="text-slate-600">Browse through our Google reviews for more patient experiences.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS.map(review => (
            <div 
              key={review.id}
              onClick={() => window.open(review.link, '_blank')}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-slate-600 italic mb-6 leading-relaxed">"{review.content}"</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{review.name}</span>
                <ExternalLink size={14} className="text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <FAQSection faqs={PAGE_FAQS.testimonials} setActivePage={setActivePage} />
    </div>
  );
};

const ContactPage = ({ setActivePage }: { setActivePage: (p: string) => void }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 space-y-24">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
        <p className="text-slate-600 text-lg">Have questions or ready to book your appointment? We're here to help you smile better.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Call Us</h4>
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="text-slate-600 hover:text-primary transition-colors">{CONTACT_INFO.phone}</a>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Email Us</h4>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-slate-600 hover:text-primary transition-colors">{CONTACT_INFO.email}</a>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Visit Us</h4>
                <p className="text-slate-600 leading-relaxed">{CONTACT_INFO.address}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] overflow-hidden h-[400px] border border-slate-200 shadow-xl">
            <iframe 
              src={CONTACT_INFO.mapEmbed}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>

      <FAQSection faqs={PAGE_FAQS.contact} setActivePage={setActivePage} />
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage={activePage} setActivePage={setActivePage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activePage === 'home' && <HomePage setActivePage={setActivePage} />}
            {activePage === 'about' && <AboutPage setActivePage={setActivePage} />}
            {activePage === 'services' && <ServicesPage setActivePage={setActivePage} />}
            {activePage === 'testimonials' && <TestimonialsPage setActivePage={setActivePage} />}
            {activePage === 'contact' && <ContactPage setActivePage={setActivePage} />}
            {activePage === 'faq' && <MasterFAQPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setActivePage={setActivePage} />

      <WelcomePopup setActivePage={setActivePage} />

      {/* WhatsApp Floating Button */}
      <a 
        href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent("Hi, I found your website. I'm looking for a dental service and would like to book an appointment.")}`}
        target="_blank"
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-[90] group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
          Chat with us
        </span>
      </a>
    </div>
  );
}

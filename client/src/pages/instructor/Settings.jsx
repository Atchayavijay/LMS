import React from 'react';
import { User, Shield, Bell, CreditCard, ExternalLink } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Settings = () => {
  const sections = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'security', label: 'Security & Password', icon: Shield },
    { id: 'notifications', label: 'Email Notifications', icon: Bell },
    { id: 'payouts', label: 'Payout Settings', icon: CreditCard },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-white italic">Settings</h1>
        <p className="text-white mt-1 uppercase tracking-widest text-[11px] font-bold">Configure your instructor profile & preferences</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {sections.map((section) => (
            <button 
              key={section.id} 
              className={clsx(
                "w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-medium transition-all text-left",
                section.id === 'profile' ? "bg-primary-pink text-white" : "text-muted-white hover:text-white hover:bg-white/5"
              )}
            >
              <section.icon size={18} />
              {section.label}
            </button>
          ))}
        </div>

        {/* Form Area */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white/[0.03] border border-white/5 rounded-[40px] p-8 md:p-10 backdrop-blur-sm">
             <div className="flex items-center gap-8 mb-12">
               <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-primary-pink to-primary-purple flex items-center justify-center text-3xl font-bold text-white italic relative group cursor-pointer overflow-hidden shadow-2xl">
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs">Edit</div>
                 JD
               </div>
               <div>
                 <h3 className="text-white font-bold text-xl">Public Profile</h3>
                 <p className="text-muted-white text-sm italic">This info will be visible to your students</p>
               </div>
             </div>

             <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Full Name" placeholder="John Doe" />
                  <Input label="Job Title" placeholder="Senior Design Lead" />
                </div>
                <div className="space-y-2">
                  <label className="text-white text-[15px] font-normal ml-1">Biography</label>
                  <textarea 
                    rows={6}
                    placeholder="Short bio for your public profile..."
                    className="w-full bg-white/[0.05] border border-white/10 rounded-3xl py-4 px-6 text-white text-[14px] placeholder:text-muted-white focus:outline-none focus:border-white/20 transition-all resize-none"
                  />
                </div>
                <Input label="Personal Website" placeholder="https://example.com" />
                
                <div className="pt-6 border-t border-white/5 flex justify-end gap-4">
                  <button type="button" className="text-muted-white text-xs font-bold uppercase tracking-widest hover:text-white transition-all">Discard</button>
                  <Button className="px-12 shadow-none">Save Changes</Button>
                </div>
             </form>
          </div>

          <div className="p-8 rounded-[40px] bg-gradient-to-r from-primary-pink/10 to-transparent border border-white/5 flex items-center justify-between group cursor-pointer hover:border-primary-pink/30 transition-all">
            <div>
              <p className="text-white font-bold">Public Instructor Page</p>
              <p className="text-muted-white text-[11px] uppercase mt-1 tracking-tighter">View how students see your profile</p>
            </div>
            <ExternalLink className="text-muted-white group-hover:text-primary-pink transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple clsx
function clsx(...args) { return args.filter(Boolean).join(' '); }

export default Settings;

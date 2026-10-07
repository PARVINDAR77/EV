import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition/PageTransition';
import Footer from '../../components/Footer/Footer';
import { Terminal, Code2, Webhook, Database, Lock, Zap } from 'lucide-react';
import apiImg from '../../assets/images/ecosystem_diagram.png';

const EnterpriseAPI = () => {
  return (
    <PageTransition locationKey="enterprise-api">
      <main className="w-full min-h-screen bg-[#020403] relative overflow-hidden font-sans">
        
        {/* Deep Tech Background Grid */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-accent/5 to-transparent" />
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: 'linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)',
              backgroundSize: '40px 40px' 
            }} 
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 pt-24 md:pt-40 pb-16 md:pb-32 relative z-10">
          
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-16 md:mb-32">
            
            {/* Left Content - Developer Focused */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 w-max mb-8"
              >
                <Terminal className="w-4 h-4 text-accent" />
                <span className="text-accent font-mono text-xs uppercase tracking-[0.2em] font-bold">FOR DEVELOPERS</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white uppercase tracking-tighter mb-4 md:mb-6 leading-[0.9]"
              >
                THE HEADLESS <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-500">CHARGING</span> ENGINE
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-400 mb-10 leading-relaxed font-sans max-w-lg"
              >
                Bypass our dashboards and build your own. The Axion Enterprise API gives your engineering team raw, unfettered access to real-time telemetry, session control, and billing algorithms.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 w-full"
              >
                <button className="w-full sm:w-auto px-8 py-4 bg-accent text-black font-bold uppercase tracking-wider text-sm rounded-full hover:bg-white hover:shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.4)] transition-all">
                  Read the Docs
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-bold uppercase tracking-wider text-sm rounded-full border border-white/10 hover:bg-white/10 transition-all">
                  Get API Key
                </button>
              </motion.div>
            </div>

            {/* Right Content - Code Snippet Visualization */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-emerald-600 rounded-3xl blur opacity-20" />
              <div className="relative bg-[#0B100D] border border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl font-mono text-xs md:text-sm overflow-hidden">
                <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-gray-300 space-y-2 overflow-x-auto whitespace-pre pb-2 scrollbar-thin scrollbar-thumb-white/10">
                  <p><span className="text-purple-400">const</span> <span className="text-blue-400">axion</span> = <span className="text-purple-400">new</span> <span className="text-yellow-300">AxionClient</span>(process.env.<span className="text-orange-300">AXION_KEY</span>);</p>
                  <br/>
                  <p><span className="text-gray-500">// Start a charging session remotely</span></p>
                  <p><span className="text-purple-400">await</span> <span className="text-blue-400">axion</span>.sessions.<span className="text-yellow-300">start</span>({`{`}</p>
                  <p className="pl-4">stationId: <span className="text-green-400">'ST-9942'</span>,</p>
                  <p className="pl-4">userId: <span className="text-green-400">'USR-8273'</span>,</p>
                  <p className="pl-4">maxKw: <span className="text-orange-300">120</span></p>
                  <p>{`});`}</p>
                  <br/>
                  <p><span className="text-gray-500">// Listen for real-time telemetry</span></p>
                  <p><span className="text-blue-400">axion</span>.webhooks.<span className="text-yellow-300">on</span>(<span className="text-green-400">'battery.full'</span>, (<span className="text-orange-400">event</span>) <span className="text-purple-400">{"=>"}</span> {`{`}</p>
                  <p className="pl-4"><span className="text-yellow-300">notifyUser</span>(event.userId);</p>
                  <p>{`});`}</p>
                </div>
                {/* Glowing overlay effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />
              </div>
            </motion.div>
          </div>

          {/* Integration Features */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-4">ENGINEERED FOR SCALE</h2>
            <p className="text-gray-400">Everything you need to build the next generation of mobility apps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Webhook />, title: "Webhooks & Events", desc: "Instantly receive push notifications to your servers for session starts, stops, and hardware faults." },
              { icon: <Database />, title: "OCPI Compliant", desc: "Natively speaks the Open Charge Point Interface protocol for flawless international roaming." },
              { icon: <Lock />, title: "Bank-Grade Security", desc: "End-to-end encryption, regular penetration testing, and granular OAuth2 scopes." },
              { icon: <Code2 />, title: "SDKs for Everything", desc: "Pre-built libraries for Node.js, Python, Go, and Ruby to get you pushing to production faster." },
              { icon: <Zap />, title: "Sub-50ms Latency", desc: "Our edge-routed API infrastructure guarantees lightning fast responses for real-time applications." },
              { icon: <Terminal />, title: "Interactive Sandbox", desc: "Test your integrations against simulated chargers in our developer sandbox before deploying." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-[#0B100D] border border-white/5 hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <div className="text-accent">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
        <Footer />
      </main>
    </PageTransition>
  );
};

export default EnterpriseAPI;

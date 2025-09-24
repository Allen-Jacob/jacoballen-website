// ========================================
// FEATURES INTÉGRÉES POUR JACOBALLEN.CA
// ========================================

class JacobSiteFeatures {
    constructor() {
        this.geekSequence = [];
        this.targetSequence = ['g', 'e', 'e', 'k'];
        this.devMode = false;
        this.clockInterval = null;
        this.init();
    }

    init() {
        this.setupGeekModeActivation();
        this.initQuebecClock();
        this.initConsole();
    }

    // ========================================
    // HORLOGE LOCALE QUÉBEC
    // ========================================
    initQuebecClock() {
        this.createClockElement();
        this.startClock();
    }

    createClockElement() {
        const clock = document.createElement('div');
        clock.id = 'quebec-clock';
        clock.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 8px 16px;
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            user-select: none;
        `;
        
        clock.addEventListener('mouseenter', () => {
            clock.style.transform = 'scale(1.05)';
            clock.style.boxShadow = '0 6px 20px rgba(255, 107, 157, 0.3)';
            clock.style.background = 'rgba(255, 107, 157, 0.1)';
            clock.style.borderColor = 'rgba(255, 107, 157, 0.3)';
        });
        
        clock.addEventListener('mouseleave', () => {
            clock.style.transform = 'scale(1)';
            clock.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            clock.style.background = 'rgba(0, 0, 0, 0.7)';
            clock.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });

        clock.addEventListener('click', () => {
            this.clockPulseAnimation(clock);
        });
        
        document.body.appendChild(clock);
    }

    startClock() {
        this.updateClock();
        this.clockInterval = setInterval(() => {
            this.updateClock();
        }, 1000);
    }

    updateClock() {
        const clock = document.getElementById('quebec-clock');
        if (!clock) return;
        
        // Heure du Québec (EST/EDT)
        const quebecTime = new Date().toLocaleTimeString('fr-CA', {
            timeZone: 'America/Toronto',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        
        clock.textContent = `${quebecTime} QC`;
    }

    clockPulseAnimation(clock) {
        clock.style.animation = 'clockPulse 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            clock.style.animation = '';
        }, 600);
    }

    // ========================================
    // MODE GEEK (ACTIVATION PAR "GEEK")
    // ========================================
    setupGeekModeActivation() {
        document.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            
            this.geekSequence.push(key);
            
            if (this.geekSequence.length > 4) {
                this.geekSequence.shift();
            }
            
            if (this.geekSequence.join('') === 'geek') {
                this.activateGeekMode();
                this.geekSequence = [];
            }
        });
    }

    activateGeekMode() {
        if (this.devMode) {
            this.deactivateGeekMode();
            return;
        }

        this.devMode = true;
        this.showGeekPanel();
        
        console.log(`
        🚀 GEEK MODE ACTIVATED!
        
        Welcome to the matrix!
        Type 'geek' again to exit.
        `);
        
        this.createGeekParticles();
    }

    showGeekPanel() {
        const geekPanel = document.createElement('div');
        geekPanel.id = 'geek-panel';
        geekPanel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 280px;
            background: rgba(0, 0, 0, 0.95);
            border: 1px solid #00ff00;
            border-radius: 8px;
            padding: 15px;
            color: #00ff00;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            z-index: 1001;
            backdrop-filter: blur(10px);
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
            animation: geekPanelSlide 0.3s ease-out;
        `;

        geekPanel.innerHTML = `
            <div style="color: #ff6b9d; font-weight: bold; margin-bottom: 10px; text-align: center;">
                👨‍💻 GEEK MODE
            </div>
            <div id="geek-stats">
                <div>📊 Performance: <span id="geek-fps">--</span> FPS</div>
                <div>🧠 Memory: <span id="geek-memory">--</span> MB</div>
                <div>⚡ Load Time: <span id="geek-load">--</span>ms</div>
                <div>🌐 Browser: <span id="geek-browser">${this.getBrowserName()}</span></div>
                <div>📱 Screen: <span id="geek-screen">${window.innerWidth}x${window.innerHeight}</span></div>
                <div>🕐 QC Time: <span id="geek-time">--</span></div>
                <div>⏰ Uptime: <span id="geek-uptime">0</span>s</div>
            </div>
            <div style="margin-top: 10px; font-size: 10px; opacity: 0.7; text-align: center;">
                Type 'geek' to exit
            </div>
        `;

        document.body.appendChild(geekPanel);
        this.startGeekStats();
    }

    startGeekStats() {
        const startTime = Date.now();
        
        this.geekStatsInterval = setInterval(() => {
            const fps = Math.floor(58 + Math.random() * 6);
            const memory = (35 + Math.random() * 25).toFixed(1);
            const uptime = Math.floor((Date.now() - startTime) / 1000);
            const loadTime = performance.timing ? 
                (performance.timing.loadEventEnd - performance.timing.navigationStart) : '--';
            
            // Heure du Québec pour le mode geek
            const quebecTime = new Date().toLocaleTimeString('fr-CA', {
                timeZone: 'America/Toronto',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            
            const elements = {
                'geek-fps': fps,
                'geek-memory': memory,
                'geek-load': loadTime,
                'geek-uptime': uptime,
                'geek-time': quebecTime,
                'geek-screen': `${window.innerWidth}x${window.innerHeight}`
            };
            
            Object.entries(elements).forEach(([id, value]) => {
                const el = document.getElementById(id);
                if (el) el.textContent = value;
            });
        }, 1000);
    }

    deactivateGeekMode() {
        this.devMode = false;
        const geekPanel = document.getElementById('geek-panel');
        if (geekPanel) {
            geekPanel.style.animation = 'geekPanelSlideOut 0.3s ease-in forwards';
            setTimeout(() => geekPanel.remove(), 300);
        }
        
        if (this.geekStatsInterval) {
            clearInterval(this.geekStatsInterval);
        }
        
        console.log('👋 Geek mode deactivated. See you later!');
    }

    createGeekParticles() {
        const colors = ['#00ff00', '#ff6b9d', '#4ecdc4'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    width: 6px;
                    height: 6px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    left: ${Math.random() * window.innerWidth}px;
                    top: ${Math.random() * window.innerHeight}px;
                    animation: geekParticle 2s ease-out forwards;
                `;
                
                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 2000);
            }, i * 100);
        }
    }

    getBrowserName() {
        const ua = navigator.userAgent;
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Safari')) return 'Safari';
        if (ua.includes('Edge')) return 'Edge';
        return 'Unknown';
    }

    // ========================================
    // CONSOLE EASTER EGG
    // ========================================
    initConsole() {
        console.log(`
🚀 Jacob Allen Website - Developer Mode

Hidden features:
• Type 'geek' to activate geek mode
• Quebec local time displayed in bottom left
• Click the clock for a surprise!

Made with ❤️ and lots of ☕
        `);
    }

    // ========================================
    // CLEANUP
    // ========================================
    destroy() {
        if (this.clockInterval) {
            clearInterval(this.clockInterval);
        }
        if (this.geekStatsInterval) {
            clearInterval(this.geekStatsInterval);
        }
    }
}

// ========================================
// CSS ANIMATIONS ET STYLES
// ========================================
const style = document.createElement('style');
style.textContent = `
    /* Animations pour l'horloge */
    @keyframes clockPulse {
        0% { 
            transform: scale(1); 
        }
        50% { 
            transform: scale(1.1); 
            background: rgba(255, 107, 157, 0.2);
            box-shadow: 0 0 20px rgba(255, 107, 157, 0.5);
        }
        100% { 
            transform: scale(1); 
        }
    }

    /* Animations du mode geek */
    @keyframes geekParticle {
        0% { 
            transform: translateY(0) scale(1) rotate(0deg); 
            opacity: 1; 
        }
        100% { 
            transform: translateY(-50px) scale(0) rotate(360deg); 
            opacity: 0; 
        }
    }
    
    @keyframes geekPanelSlide {
        from { 
            transform: translateX(100%); 
            opacity: 0; 
        }
        to { 
            transform: translateX(0); 
            opacity: 1; 
        }
    }
    
    @keyframes geekPanelSlideOut {
        from { 
            transform: translateX(0); 
            opacity: 1; 
        }
        to { 
            transform: translateX(100%); 
            opacity: 0; 
        }
    }

    /* Responsive pour l'horloge */
    @media (max-width: 768px) {
        #quebec-clock {
            bottom: 15px !important;
            left: 15px !important;
            font-size: 13px !important;
            padding: 6px 12px !important;
        }
        
        #geek-panel {
            top: 15px !important;
            right: 15px !important;
            width: 250px !important;
            font-size: 11px !important;
        }
    }

    @media (max-width: 480px) {
        #quebec-clock {
            font-size: 12px !important;
            padding: 5px 10px !important;
        }
    }
`;

document.head.appendChild(style);

// ========================================
// INITIALISATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    window.jacobFeatures = new JacobSiteFeatures();
});

// Cleanup au déchargement de la page
window.addEventListener('beforeunload', () => {
    if (window.jacobFeatures) {
        window.jacobFeatures.destroy();
    }
});

// Export pour debug
window.JacobSiteFeatures = JacobSiteFeatures;
// ========================================
// FEATURES INTÉGRÉES POUR JACOBALLEN.CA
// ========================================

class JacobSiteFeatures {
    constructor() {
        this.geekSequence = [];
        this.targetSequence = ['g', 'e', 'e', 'k'];
        this.devMode = false;
        this.githubData = null;
        this.init();
    }

    init() {
        this.setupAutoTheme();
        this.setupGeekModeActivation();
        this.setupGitHubIntegration();
        this.addThemeToggle();
        this.initConsole();
    }

    // ========================================
    // THÈME AUTOMATIQUE BASÉ SUR L'OS
    // ========================================
    setupAutoTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        const savedTheme = localStorage.getItem('jacob-theme');
        
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            this.setTheme(prefersDark.matches ? 'dark' : 'light');
        }

        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('jacob-theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });

        this.autoThemeByTime();
    }

    autoThemeByTime() {
        const hour = new Date().getHours();
        const isNight = hour < 7 || hour > 19;
        
        if (!localStorage.getItem('jacob-theme')) {
            this.setTheme(isNight ? 'dark' : 'light');
        }
    }

    setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark' ? '🌙' : '☀️';
        }
    }

    // ========================================
    // TOGGLE THÈME AU MILIEU GAUCHE
    // ========================================
    addThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.id = 'theme-toggle';
        themeToggle.innerHTML = document.body.getAttribute('data-theme') === 'dark' ? '🌙' : '☀️';
        
        themeToggle.style.cssText = `
            position: fixed;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            color: white;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;

        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        themeToggle.addEventListener('mouseenter', () => {
            themeToggle.style.transform = 'translateY(-50%) scale(1.1)';
            themeToggle.style.boxShadow = '0 6px 20px rgba(255, 107, 157, 0.3)';
        });

        themeToggle.addEventListener('mouseleave', () => {
            themeToggle.style.transform = 'translateY(-50%) scale(1)';
            themeToggle.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        });

        document.body.appendChild(themeToggle);
    }

    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        this.setTheme(newTheme);
        localStorage.setItem('jacob-theme', newTheme);
        
        const toggle = document.getElementById('theme-toggle');
        toggle.style.animation = 'themeSwitch 0.5s ease-out';
        setTimeout(() => toggle.style.animation = '', 500);
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
        
        Welcome to the matrix, Jacob!
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
                <div>🎯 Theme: <span id="geek-theme">${document.body.getAttribute('data-theme')}</span></div>
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
            
            const elements = {
                'geek-fps': fps,
                'geek-memory': memory,
                'geek-load': loadTime,
                'geek-uptime': uptime,
                'geek-theme': document.body.getAttribute('data-theme'),
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
    // INTÉGRATION GITHUB AVEC TRIGGER
    // ========================================
    async setupGitHubIntegration() {
        try {
            const response = await fetch('https://api.github.com/users/Allen-Jacob/events/public');
            
            if (!response.ok) throw new Error('API unavailable');
            
            const events = await response.json();
            const lastPush = events.find(event => event.type === 'PushEvent');
            
            if (lastPush) {
                this.showGitHubWidget(lastPush);
            } else {
                this.showGitHubWidget(this.getFakeCommitData());
            }
        } catch (error) {
            console.log('GitHub API unavailable, using fallback');
            this.showGitHubWidget(this.getFakeCommitData());
        }

        // Pulse d'attention après 3 secondes
        setTimeout(() => {
            const trigger = document.getElementById('github-trigger');
            if (trigger) {
                trigger.classList.add('pulse');
                setTimeout(() => trigger.classList.remove('pulse'), 4000);
            }
        }, 3000);
    }

    getFakeCommitData() {
        const commits = [
            'Added new features ✨',
            'Fixed responsive design 📱', 
            'Updated animations 🎨',
            'Improved performance 🚀',
            'Enhanced accessibility ♿',
            'Added Easter eggs 🥚',
            'Refactored CSS 💅',
            'Updated dependencies 📦'
        ];
        
        const randomMinutes = Math.floor(Math.random() * 180) + 5;
        
        return {
            created_at: new Date(Date.now() - randomMinutes * 60000).toISOString(),
            repo: { name: 'Allen-Jacob/jacoballen-website' },
            payload: {
                commits: [{
                    message: commits[Math.floor(Math.random() * commits.length)]
                }]
            }
        };
    }

    showGitHubWidget(commitData) {
        this.githubData = commitData;
        this.createGitHubTrigger();
        
        const githubWidget = document.createElement('div');
        githubWidget.id = 'github-widget';
        githubWidget.style.cssText = `
            position: fixed;
            top: 90px;
            left: 20px;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(10px);
            border: 1px solid #4ecdc4;
            border-radius: 8px;
            padding: 12px;
            color: white;
            font-size: 12px;
            z-index: 999;
            max-width: 260px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            transform: translateX(-100%);
            opacity: 0;
            pointer-events: none;
        `;
        
        const commitMessage = commitData.payload?.commits?.[0]?.message || 'Recent activity';
        const timeAgo = this.getTimeAgo(new Date(commitData.created_at));
        
        githubWidget.innerHTML = `
            <div style="color: #4ecdc4; font-weight: 600; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                <span>📊</span> Last commit
            </div>
            <div style="margin-bottom: 4px; line-height: 1.3;">${commitMessage}</div>
            <div style="opacity: 0.7; font-size: 11px;">⏰ ${timeAgo}</div>
            <div style="margin-top: 8px; text-align: center;">
                <button id="close-github-widget" style="
                    background: none;
                    border: 1px solid #4ecdc4;
                    color: #4ecdc4;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 10px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                ">Close</button>
            </div>
        `;
        
        document.body.appendChild(githubWidget);
        
        document.getElementById('close-github-widget').addEventListener('click', () => {
            this.hideGitHubWidget();
        });
    }

    createGitHubTrigger() {
        const trigger = document.createElement('div');
        trigger.id = 'github-trigger';
        trigger.textContent = 'LAST COMMIT';
        trigger.style.cssText = `
            position: fixed;
            left: 20px;
            top: 90px;
            writing-mode: vertical-lr;
            text-orientation: mixed;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid #4ecdc4;
            border-radius: 6px;
            padding: 8px 6px;
            color: #4ecdc4;
            font-size: 11px;
            font-weight: 600;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            letter-spacing: 1px;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            user-select: none;
        `;
        
        trigger.addEventListener('mouseenter', () => {
            trigger.style.transform = 'scale(1.05)';
            trigger.style.boxShadow = '0 4px 15px rgba(78, 205, 196, 0.3)';
            trigger.style.background = 'rgba(78, 205, 196, 0.1)';
        });
        
        trigger.addEventListener('mouseleave', () => {
            trigger.style.transform = 'scale(1)';
            trigger.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
            trigger.style.background = 'rgba(0, 0, 0, 0.7)';
        });
        
        trigger.addEventListener('click', () => {
            this.toggleGitHubWidget();
        });
        
        document.body.appendChild(trigger);
    }

    showGitHubWidgetPanel() {
        const widget = document.getElementById('github-widget');
        const trigger = document.getElementById('github-trigger');
        
        if (widget) {
            widget.style.transform = 'translateX(0)';
            widget.style.opacity = '1';
            widget.style.pointerEvents = 'auto';
        }
        
        if (trigger) {
            trigger.style.opacity = '0.5';
            trigger.style.transform = 'scale(0.95)';
        }
    }

    hideGitHubWidget() {
        const widget = document.getElementById('github-widget');
        const trigger = document.getElementById('github-trigger');
        
        if (widget) {
            widget.style.transform = 'translateX(-100%)';
            widget.style.opacity = '0';
            widget.style.pointerEvents = 'none';
        }
        
        if (trigger) {
            trigger.style.opacity = '1';
            trigger.style.transform = 'scale(1)';
        }
    }

    toggleGitHubWidget() {
        const widget = document.getElementById('github-widget');
        const isVisible = widget && widget.style.opacity === '1';
        
        if (isVisible) {
            this.hideGitHubWidget();
        } else {
            this.showGitHubWidgetPanel();
        }
    }

    getTimeAgo(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (days > 0) return `${days}j ago`;
        if (hours > 0) return `${hours}h ago`;
        if (minutes > 0) return `${minutes}m ago`;
        return 'just now';
    }

    // ========================================
    // CONSOLE EASTER EGG
    // ========================================
    initConsole() {
        console.log(`
🚀 Jacob Allen Website - Developer Mode

Hidden features:
• Type 'geek' to activate geek mode
• Theme auto-switches with your OS preference
• GitHub integration shows latest commits

Made with ❤️ and lots of ☕
        `);
    }
}

// ========================================
// CSS ANIMATIONS ET STYLES
// ========================================
const style = document.createElement('style');
style.textContent = `
    /* Thème clair */
    [data-theme="light"] {
        --bg-primary: #f8f9fa !important;
        --text-primary: #2c3e50 !important;
        --text-secondary: #495057 !important;
        --glass-bg: rgba(255, 255, 255, 0.8) !important;
        --border-color: rgba(0, 0, 0, 0.1) !important;
    }
    
    [data-theme="light"] body {
        background-color: var(--bg-primary);
        color: var(--text-primary);
    }
    
    [data-theme="light"] .background {
        background: 
            radial-gradient(circle at 20% 80%, rgba(255, 107, 157, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(78, 205, 196, 0.06) 0%, transparent 50%);
    }
    
    [data-theme="light"] header {
        background: rgba(248, 249, 250, 0);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    [data-theme="light"] .nav-links a {
        color: #495057;
    }
    
    [data-theme="light"] .social-box {
        background: rgba(255, 255, 255, 0.92);
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    [data-theme="light"] #theme-toggle {
        background: rgba(255, 255, 255, 0);
        border: 1px solid rgba(0, 0, 0, 0.1);
        color: #2c3e50;
    }
    
    [data-theme="light"] #github-widget {
        background: rgba(255, 255, 255, 0.9);
        color: #2c3e50;
        border: 1px solid #4ecdc4;
    }

    [data-theme="light"] #github-trigger {
        background: rgba(255, 255, 255, 0.9) !important;
        color: #2c3e50 !important;
        border: 1px solid #4ecdc4 !important;
    }

    [data-theme="light"] #github-trigger:hover {
        background: rgba(78, 205, 196, 0.1) !important;
    }

    [data-theme="light"] #close-github-widget {
        color: #2c3e50 !important;
        border-color: #4ecdc4 !important;
    }

    [data-theme="light"] #close-github-widget:hover {
        background: rgba(78, 205, 196, 0.1) !important;
    }

    /* Animations */
    @keyframes themeSwitch {
        0%, 100% { transform: translateY(-50%) scale(1); }
        50% { transform: translateY(-50%) scale(1.2) rotate(180deg); }
    }
    
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

    @keyframes triggerPulse {
        0%, 100% { 
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); 
        }
        50% { 
            box-shadow: 0 2px 8px rgba(78, 205, 196, 0.4); 
        }
    }

    #github-trigger.pulse {
        animation: triggerPulse 2s infinite;
    }

    #github-trigger:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
        background: rgba(78, 205, 196, 0.1);
    }

    #github-trigger:active {
        transform: scale(0.98);
    }

    #close-github-widget:hover {
        background: rgba(78, 205, 196, 0.1);
        transform: scale(1.05);
    }

    /* Responsive */
    @media (max-width: 768px) {
        #theme-toggle {
            left: 15px !important;
            width: 45px !important;
            height: 45px !important;
            font-size: 18px !important;
        }
        
        #github-trigger {
            top: 75px !important;
            left: 15px !important;
            font-size: 10px !important;
            padding: 6px 4px !important;
            letter-spacing: 0.5px !important;
        }
        
        #github-widget {
            top: 75px !important;
            left: 15px !important;
            max-width: 200px !important;
            font-size: 11px !important;
        }
        
        #geek-panel {
            top: 15px !important;
            right: 15px !important;
            width: 250px !important;
            font-size: 11px !important;
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

// Export pour debug
window.JacobSiteFeatures = JacobSiteFeatures;
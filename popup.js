class SmiskiPomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.totalTime = 25 * 60;
        this.isRunning = false;
        this.timer = null;
        this.currentMode = 'pomodoro';
        this.completedCount = 0;
        this.todayCount = 0;
        
        this.initializeElements();
        this.bindEvents();
        this.loadStats();
        this.updateDisplay();
        this.updateSmiskiCharacter();
    }
    
    initializeElements() {
        this.timerDisplay = document.getElementById('timerDisplay');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.progressCircle = document.getElementById('progressCircle');
        this.smiskiCharacter = document.getElementById('smiskiCharacter');
        this.completedCountEl = document.getElementById('completedCount');
        this.todayCountEl = document.getElementById('todayCount');
        this.settingsBtn = document.getElementById('settingsBtn');
        
        this.modeButtons = document.querySelectorAll('.mode-btn');
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startTimer());
        this.pauseBtn.addEventListener('click', () => this.pauseTimer());
        this.resetBtn.addEventListener('click', () => this.resetTimer());
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        
        this.modeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchMode(e.target));
        });
    }
    
    startTimer() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            
            this.timer = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft <= 0) {
                    this.completeTimer();
                }
            }, 1000);
            
            this.updateSmiskiCharacter('working');
        }
    }
    
    pauseTimer() {
        if (this.isRunning) {
            this.isRunning = false;
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            
            clearInterval(this.timer);
            this.updateSmiskiCharacter('paused');
        }
    }
    
    resetTimer() {
        this.pauseTimer();
        this.timeLeft = this.totalTime;
        this.updateDisplay();
        this.updateSmiskiCharacter('idle');
    }
    
    switchMode(button) {
        this.modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        this.currentMode = button.dataset.mode;
        this.totalTime = parseInt(button.dataset.time) * 60;
        this.timeLeft = this.totalTime;
        
        this.updateDisplay();
        this.updateSmiskiCharacter('idle');
        
        // Update character based on mode
        const modeEmojis = {
            'pomodoro': '🌸',
            'shortBreak': '🍄',
            'longBreak': '🌺'
        };
        
        this.smiskiCharacter.textContent = modeEmojis[this.currentMode] || '🌸';
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update progress ring
        const progress = 1 - (this.timeLeft / this.totalTime);
        const circumference = 2 * Math.PI * 54;
        const offset = circumference - (progress * circumference);
        this.progressCircle.style.strokeDashoffset = offset;
    }
    
    updateSmiskiCharacter(state = 'idle') {
        const characters = {
            'idle': ['🌸', '🍄', '🌺'],
            'working': ['💪', '🎯', '⭐'],
            'paused': ['😴', '🌙', '💤'],
            'completed': ['🎉', '✨', '🌟']
        };
        
        const currentChars = characters[state] || characters.idle;
        const randomChar = currentChars[Math.floor(Math.random() * currentChars.length)];
        
        this.smiskiCharacter.textContent = randomChar;
        
        // Add animation class
        this.smiskiCharacter.classList.add('celebration');
        setTimeout(() => {
            this.smiskiCharacter.classList.remove('celebration');
        }, 500);
    }
    
    async completeTimer() {
        this.pauseTimer();
        this.updateSmiskiCharacter('completed');
        
        // Increment completed count
        this.completedCount++;
        this.todayCount++;
        this.updateStats();
        
        // Send notification
        this.sendNotification();
        
        // Auto-switch to break if in pomodoro mode
        if (this.currentMode === 'pomodoro') {
            setTimeout(() => {
                const shortBreakBtn = document.querySelector('[data-mode="shortBreak"]');
                this.switchMode(shortBreakBtn);
            }, 2000);
        }
    }
    
    async loadStats() {
        try {
            const result = await chrome.storage.local.get(['completedCount', 'todayCount', 'lastDate']);
            const today = new Date().toDateString();
            
            this.completedCount = result.completedCount || 0;
            
            // Reset today count if it's a new day
            if (result.lastDate !== today) {
                this.todayCount = 0;
            } else {
                this.todayCount = result.todayCount || 0;
            }
            
            this.updateStats();
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }
    
    async updateStats() {
        this.completedCountEl.textContent = this.completedCount;
        this.todayCountEl.textContent = this.todayCount;
        
        try {
            await chrome.storage.local.set({
                completedCount: this.completedCount,
                todayCount: this.todayCount,
                lastDate: new Date().toDateString()
            });
        } catch (error) {
            console.error('Error saving stats:', error);
        }
    }
    
    sendNotification() {
        const messages = {
            'pomodoro': 'Great job! Time for a break! 🎉',
            'shortBreak': 'Break time is over! Back to work! 💪',
            'longBreak': 'Long break completed! Ready to focus! 🌟'
        };
        
        const message = messages[this.currentMode] || 'Timer completed! 🎉';
        
        // Send message to background script for notification
        chrome.runtime.sendMessage({
            action: 'showNotification',
            title: 'Smiski Timer',
            message: message
        });
    }
    
    openSettings() {
        // Create a simple settings modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            max-width: 300px;
            width: 90%;
        `;
        
        content.innerHTML = `
            <h3 style="color: #ff6b9d; margin-bottom: 15px;">Settings</h3>
            <p style="margin-bottom: 15px;">Smiski Timer v1.0.0</p>
            <p style="margin-bottom: 15px;">Made with 💖 for productivity</p>
            <button id="closeSettings" style="
                background: #ff6b9d;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
            ">Close</button>
        `;
        
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        document.getElementById('closeSettings').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
}

// Initialize the timer when the popup loads
document.addEventListener('DOMContentLoaded', () => {
    new SmiskiPomodoroTimer();
});


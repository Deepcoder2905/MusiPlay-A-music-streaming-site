// home.js
export default {
    template: `
    <div class="music-container">
        <div>
            <h1 class="welcome-title">Welcome to MusiPlay</h1>
            <p class="welcome-subtitle">Experience music like never before. Your perfect soundtrack awaits.</p>
            
            <div class="button-group">
                <button class="spotify-button" @click="login">
                    Login
                </button>
                <button class="spotify-button-outline" @click="register">
                    Register
                </button>
            </div>
        </div>

        <div class="hero-image"></div>

        <div class="features-section">
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">🎵</div>
                    <h3 class="feature-title">Unlimited Music</h3>
                    <p class="feature-description">Access millions of songs from around the world. Stream your favorite artists and discover new music.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">📱</div>
                    <h3 class="feature-title">Multi-Device</h3>
                    <p class="feature-description">Listen seamlessly across all your devices. Your music follows you everywhere.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">🎧</div>
                    <h3 class="feature-title">High Quality Audio</h3>
                    <p class="feature-description">Experience crystal clear sound quality with our premium audio streaming.</p>
                </div>
            </div>
        </div>

        <div class="stats-section">
            <div class="stat-item">
                <div class="stat-number">10+</div>
                <div class="stat-label">Songs</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">5+</div>
                <div class="stat-label">Users</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">1+</div>
                <div class="stat-label">Countries</div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            message: 'Welcome to the Home Page'
        }
    },
    methods: {
        login() {
            this.$router.push('/login');
        },
        register() {
            this.$router.push('/user_register');
        }
    },
}
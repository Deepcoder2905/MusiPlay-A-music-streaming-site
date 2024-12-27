export default {
    template: `
    <div class="auth-container">
        <div class="auth-card">
            <h2 class="text-center mb-4">Login to MusiPlay</h2>
            
            <label class="auth-label">Username</label>
            <input type="text" class="auth-input" placeholder="Enter your username" v-model="login_details.username">
            
            <label class="auth-label">Password</label>
            <input type="password" class="auth-input" placeholder="Enter your password" v-model="login_details.password">
            
            <button class="auth-btn" @click="login">LOGIN</button>
            
            <p class="text-center mt-4 text-white-50">
                New to MusicPlay? 
                <span class="auth-link" @click="register">Create an account</span>
            </p>
        </div>
    </div>`,
    
    data() {
        return {
            login_details: {
                username: null,
                password: null
            },
        }
    },
    
    methods: {
        async login() {
            const response = await fetch('/user_login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.login_details)
            })
            
            if (response.status == 200) {
                const response_data = await response.json();
                localStorage.setItem('auth_token', response_data.auth_token);
                localStorage.setItem('role', response_data.role);
                
                if (response_data.role.includes('admin')) {
                    this.$router.push('/admin_dashboard')
                }
                if (response_data.role.includes('user')) {
                    this.$router.push('/user_dashboard');
                }
            } else {
                const error = await response.json();
                alert(error.message);
            }
        },
        
        register() {
            this.$router.push('/user_register')
        }
    },
}
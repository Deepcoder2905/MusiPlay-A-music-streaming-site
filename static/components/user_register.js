export default {
    template: `
    <div class="auth-container">
        <div class="auth-card">
            <h2 class="text-center mb-4">Create Account</h2>
            
            <label class="auth-label">Username</label>
            <input type="text" class="auth-input" placeholder="Choose a username" v-model="register_details.username">
            
            <label class="auth-label">Email</label>
            <input type="email" class="auth-input" placeholder="Enter your email" v-model="register_details.email">
            
            <label class="auth-label">Password</label>
            <input type="password" class="auth-input" placeholder="Create a password" v-model="register_details.password">
            
            <button class="auth-btn" @click="register">CREATE ACCOUNT</button>
            
            <p class="text-center mt-4 text-white-50">
                Already have an account? 
                <span class="auth-link" @click="login">Log in</span>
            </p>
        </div>
    </div>`,
    
    data() {
        return {
            register_details: {
                username: null,
                email: null,
                password: null
            },
        }
    },
    
    methods: {
        async register() {
            const response = await fetch('/user_register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.register_details)
            })
            
            if (response.status == 200) {
                const response_data = await response.json();
                alert(response_data.message);
                this.$router.push('/login')
            } else {
                const error = await response.json();
                alert(error.message);
            }
        },

        login() {
            this.$router.push('/login')
        }
    }
}

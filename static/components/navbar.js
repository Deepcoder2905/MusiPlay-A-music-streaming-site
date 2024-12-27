export default {
    template: `
    <nav class="navbar navbar-expand-lg spotify-navbar">
        <div class="container-fluid px-4">
            <a class="navbar-brand" 
               style="color: #1DB954; font-size: 1.5rem; font-weight: bold; cursor: pointer;" 
               >
                MusiPlay
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
                    style="border-color: #1DB954;">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarScroll" v-if="!is_logged_in">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <button class="nav-auth-btn-outline" @click="goHome">Home</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-auth-btn-outline" @click="login">Login</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-auth-btn-outline" @click="register">Sign Up</button>
                    </li>
                    <li class="nav-item">
                        <button class="nav-auth-btn-outline" @click="admin_login">Admin</button>
                    </li>
                </ul>
            </div>

            <div class="collapse navbar-collapse" id="navbarScroll" v-if="is_logged_in">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <button class="nav-btn" @click="dashboard">Dashboard</button>
                    </li>
                    <li class="nav-item" v-if="this.role.includes('user')">
                        <button class="nav-btn" @click="artist_account">Artist Account</button>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <button class="nav-auth-btn-outline" @click="logout">Logout</button>
                    </li>
                </ul>    
            </div>
        </div>
    </nav>`,
    data() {
        return {
            role: localStorage.getItem('role'),
            token: localStorage.getItem('auth_token'),
        }
    },
    methods: {
        goHome() {
            this.$router.push('/');
        },
        login() {
            this.$router.push('/login');
        },
        register() {
            this.$router.push('/user_register');
        },
        logout() {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('role');
            localStorage.removeItem('songs');
            this.$router.push('/');
        },
        dashboard() {
            if (this.role.includes('admin')) {
                this.$router.push('/admin_dashboard')
            }
            else if (this.role.includes('user')) {
                this.$router.push('/user_dashboard')
            }
        },
        artist_account() {
            if (this.role.includes('user')) {
                this.$router.push('/artist_dashboard')
            }
        },
        admin_login(){
            this.$router.push('/admin_login')
        },
    },
    computed: {
        is_logged_in() {
            return localStorage.getItem('auth_token') !== null;
        }
    }
}
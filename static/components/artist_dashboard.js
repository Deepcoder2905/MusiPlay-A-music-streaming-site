export default {
    template: 
    ` <div class="artist-dashboard">
        <div v-if="this.role.includes('artist')">
            <h1 class="dashboard-title">Welcome to Artist Dashboard</h1>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number">{{ total_uploads }}</div>
                    <div class="stat-label">Total Uploads</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">{{ total_likes }}</div>
                    <div class="stat-label">Total Likes</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">{{ total_albums }}</div>
                    <div class="stat-label">Total Albums</div>
                </div>
            </div>

            <h2 class="dashboard-title">Your Uploads</h2>

            <table class="uploads-table">
                <thead v-if="my_songs.length !== 0">
                    <tr>
                        <th>Song</th>
                        <th>Album</th>
                        <th>Likes</th>
                        <th>Views</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="song in my_songs" :key="song.id">    
                        <td>{{song.name}}</td>
                        <td>{{song.album_name}}</td>
                        <td>{{song.likes}}</td>
                        <td>{{song.play_count}}</td>
                        <td>
                            <button type="button" class="action-btn delete-btn" @click="delete_upload(song.id)">Delete</button>
                            <button type="button" class="action-btn" @click="edit_upload(song.id)">Edit</button>
                            
                            <div v-if="edit_upload_clicked[song.id]" class="edit-form">
                                <form @submit.prevent="save_changes(song.id)">
                                    <div class="form-group">
                                        <label class="form-label">Title</label>
                                        <input v-model="song_name" type="text" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label">Album</label>
                                        <input v-model="album_name" type="text" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label">Genre</label>
                                        <input v-model="genre" type="text" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label">Release year</label>
                                        <input v-model="year" type="number" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label">Song length (in seconds)</label>
                                        <input v-model="duration" type="number" class="form-control" required>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label">Lyrics</label>
                                        <textarea v-model="lyrics" class="form-control" rows="3" required></textarea>
                                    </div>
                                    
                                    <div class="form-group">
                                        <button type="submit" class="btn-success">Save Changes</button>
                                        <button type="button" class="btn-secondary" @click="cancel(song.id)">Cancel</button>
                                    </div>
                                </form>
                            </div> 
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="text-center">
                <button type="button" class="upload-btn" @click="upload">Add to uploads</button>
            </div>
        </div>

        <div v-else class="text-center" style="margin-top: 60px">
            <h2 class="dashboard-title">Would you like to Register as an Artist?</h2>
            <button type="button" class="upload-btn" @click="register">Register</button>
        </div>
    </div>`,
    data(){
        return{
            role: localStorage.getItem('role'),
            my_songs: [],

            total_uploads: 0,
            total_likes: 0,
            total_albums: 0,

            song_name: '',
            album_name: '',
            genre: '',
            year: 0,
            duration: 0,
            lyrics: '',
            song_file: null,
            edit_upload_clicked: {},

            token: localStorage.getItem('auth_token'),
            
        }
    },
    async mounted(){
        try{
            await this.your_uploads();}
        catch(err){
            console.log("not an artist");
        }    
    },
    
    methods: {
        async register(){
            const confirm_register = window.confirm("Are you sure you want to become an artist?")

            if (confirm_register == true){
                const response = await fetch('/artist_register', {
                    method: 'POST',
                    headers: {
                        'Authentication-Token': this.token
                    },
                })
                if (response.status == 200) {
                    const response_data = await response.json();
                    localStorage.setItem('role', response_data.role);
                    alert(response_data.message);
                    window.location.reload();
                }
                else {
                    const error = await response.json();
                    alert(error.message);
                }
            }
            else{
                return
            }
        },
        upload(){
            return this.$router.push('/api/manage_albums')
        },

        async your_uploads(){
            const response = await fetch('/your_uploads',{
                method: 'GET',
                headers: {
                    'Authentication-Token': this.token

                },
            })
            
            if (response.status == 200) {
                const response_data = await response.json();
                this.my_songs = response_data.songs
                // console.log(this.my_songs)
                this.artist_statistics();
                
            }
            else {
                const error = await response.json();
                alert(error.message);
            }
        },

        artist_statistics(){
            this.total_uploads = this.my_songs.length;
            this.total_likes = this.my_songs.reduce((a, b) => a + b.likes, 0);
            const albums_set = new Set();
            for (var i = 0; i < this.my_songs.length; i++){
                albums_set.add(this.my_songs[i].album_id);
            }
            this.total_albums = albums_set.size;
        },


        async delete_upload(song_id){
            const confirm_delete = window.confirm("Are you sure you want to delete this song?")
            
            if (confirm_delete == true){
                const response = await fetch(`/delete_upload/${song_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication-Token': this.token,
                    },
                })
                if (response.status == 200) {
                    const response_data = await response.json();
                    // this.$router.push('/user_dashboard')
                    alert(response_data.message);
                    window.location.reload();
                }
                else {
                    const error = await response.json();
                    alert(error.message);
                }
            }
            else{
                return
            }

        },
        
        edit_upload(song_id){
            this.$set(this.edit_upload_clicked, song_id, true);
            this.song_name = this.my_songs.find(song => song.id == song_id).name;
            this.album_name = this.my_songs.find(song => song.id == song_id).album_name;
            this.genre = this.my_songs.find(song => song.id == song_id).genre;
            this.year = this.my_songs.find(song => song.id == song_id).year;
            this.duration = this.my_songs.find(song => song.id == song_id).duration;
            this.lyrics = this.my_songs.find(song => song.id == song_id).lyrics;
            
        },
        cancel(song_id){
            this.$set(this.edit_upload_clicked, song_id, false);
        },

        async save_changes(song_id){
            const formData = new FormData();
            formData.append('song_name', this.song_name);
            formData.append('album_name', this.album_name);
            formData.append('genre', this.genre);
            formData.append('year', this.year);
            formData.append('duration', this.duration);
            formData.append('lyrics', this.lyrics);
            
            const response = await fetch(`/save_changes/${song_id}`, {
                method: 'POST',
                headers: {
                    'Authentication-Token': this.token
                },
                body: formData
            })
            if (response.status == 200) {
                const response_data = await response.json();
                alert(response_data.message);
                window.location.reload();
            }
            else {
                const error = await response.json();
                alert(error.message);
            }
        }
    } 
}
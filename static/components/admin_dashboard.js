export default {
    template: 
    `<div class="container">
        <div style="display: flex; margin-top: 100px">
        <h1 class="welcome-title">Welcome to Admin Dashboard</h1>
        </div>
            <div class="search-section">
      <div class="search-container">
        <div class="search-box">
          <i class="fas fa-search search-icon"></i>
          <input type="text" v-model="search_query" placeholder="Search for music..." class="search-input">
        </div>
        <select v-model="search_type" class="search-select">
          <option value="songs">Songs</option>
          <option value="albums">Albums</option>
          <option value="artists">Artists</option>
          <option value="genres">Genre</option>
        </select>
        <button @click="search" class="search-button">Search</button>
      </div>
    </div>
        

        <div v-if="search_results !== null" style="margin-top: 10px;">
            <div class="text-center">
                <h4 style="color: white;display: flex;" >Showing results for "{{this.search_query}}"</h4>
            </div>
            <table class="table mx-auto" style="width: 50%; max-width: 600px;">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th v-if="search_type == 'artists'">Artist</th>
                        <th v-if="search_type == 'albums'">Album</th>
                        <th v-if="search_type == 'genres'">Genre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody v-for="result in search_results" :key="result.id">
                    <tr>
                        <td>{{result.name}}</td>
                        <td v-if="search_type == 'artists'">{{result.creator_name}}</td>
                        <td v-if="search_type == 'albums'">{{result.album_name}}</td>
                        <td v-if="search_type == 'genres'">{{result.genre}}</td>
                        <td>
                            <button type="button" class="btn btn-info" @click="play(result.id)">Play</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="container" style="margin-top: 5px;display: flex; flex-direction: column; font-family:'Times New Roman', Times, serif">
            <h2 style="color: white">App Performance</h2>
            <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-number">{{ total_users }}</div>
            <div class="stat-label">Total Users</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">{{ total_views }}</div>
            <div class="stat-label">Total Views</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">{{ total_likes }}</div>
            <div class="stat-label">Total Likes</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">{{ total_artists }}</div>
            <div class="stat-label">Total Artists</div>
            <button type="button" class="nav-auth-btn" @click="showArtists">Show</button>
        </div>
        <div class="stat-card">
            <div class="stat-number">{{ total_songs }}</div>
            <div class="stat-label">Total Tracks</div>
            <button type="button" class="nav-auth-btn" @click="showSongs">Show</button>
        </div>
        <div class="stat-card">
            <div class="stat-number">{{ total_albums }}</div>
            <div class="stat-label">Total Albums</div>
            <button type="button" class="nav-auth-btn" @click="showAlbums">Show</button>
            <button type="button" class="action-btn download-btn" @click="download">Download</button>
        </div>
    </div>

        </div>
        <br>
        <div class="text-center">
            <button type="button" class="nav-auth-btn-outline" @click="showGraphs">Show Graphs</button>
        </div>
        <br>
        <div v-if="show_graphs" class="features-section">
        <div class="features-grid">
            <div>
                <h1 class="feature-title">Popular Songs</h1>
                <img :src="'static/graphs/like_graph.png'" class="hero-image">
            </div>
            <div>
                <h1 class="feature-title">Popular Genre</h1>
                <img :src="'static/graphs/genre_graph.png'" class="hero-image">
            </div>
        </div>
        <div class="text-center" style="margin-top: 40px;">
            <h1 class="feature-title">Most Played Songs</h1>
            <img :src="'static/graphs/play_count_graph.png'" class="hero-image">
        </div>
    </div>


        <div class="table-section" v-if="show_songs" style="color: white">
        <h2 class="section-title">All Songs</h2>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Song</th>
                    <th>Creator</th>
                    <th>Genre</th>
                    <th>Length</th>
                    <th>Likes</th>
                    <th>Views</th>
                    <th>Flagged</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody v-for="song in all_songs" :key="song.id">
                <tr>
                    <td>{{ song.name }}</td>
                    <td>{{ song.creator_name }}</td>
                    <td>{{ song.genre }}</td>
                    <td>{{ song.duration }}</td>
                    <td>{{ song.likes }}</td>
                    <td>{{ song.play_count }}</td>
                    <td>{{ song.flag_count }}</td>
                    <td>
                        <button type="button" class="action-btn" @click="play(song.id)">Play</button>
                        <button type="button" class="action-btn secondary-btn" @click="unflag(song.id)">Unflag</button>
                        <button type="button" class="action-btn delete-btn" @click="delete_song(song.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

        <div class="table-section" v-if="show_albums" style="color:white">
        <h2 class="section-title">All Albums</h2>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Album</th>
                    <th>Creator</th>
                    <th>Year</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody v-for="album in all_albums" :key="album.id">
                <tr>
                    <td>{{ album.name }}</td>
                    <td>{{ album.creator_name }}</td>
                    <td>{{ album.year }}</td>
                    <td>
                        <button type="button" class="action-btn" @click="viewAlbum(album.id)">View</button>
                        <button type="button" class="action-btn delete-btn" @click="delete_album(album.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
        <div class="table-section" v-if="view_album" style="color:white">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Album</th>
                        <th>Song</th>
                        <th>Creator</th>
                        <th>Genre</th>
                        <th>Length(seconds)</th>
                        <th>Likes</th>
                        <th>Views</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody v-for="song in temp_album" :key="song.id">
                    <tr>
                        <td><b>{{song.album_name}}</b></td>
                        <td>{{song.name}}</td>
                        <td>{{song.creator_name}}</td>
                        <td>{{song.genre}}</td>
                        <td>{{song.duration}}</td>
                        <td>{{song.likes}}</td>
                        <td>{{song.play_count}}</td>
                        <td>
                        <button type="button" class="btn btn-info" @click="play(song.id)">Play</button>
                        <button type="button" class="btn btn-danger" @click="delete_song(song.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="table-section" v-if="show_artists" style="color: white">
        <h2 class="section-title">All Artists</h2>
        <table class="data-table">
            <thead>
                <tr>
                    <th>Artist</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody v-for="artist in all_artists" :key="artist.id">
                <tr>
                    <td>{{ artist.username }}</td>
                    <td>
                        <button type="button" class="action-btn secondary-btn" @click="blacklist(artist.id)">Blacklist</button>
                        <button type="button" class="action-btn" @click="whitelist(artist.id)">Whitelist</button>
                        <button type="button" class="action-btn delete-btn" @click="delete_artist(artist.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>`,
    data() {
        return {
            role: localStorage.getItem('role'),
            token: localStorage.getItem('auth_token'),
            all_songs: [],
            all_albums: [],
            all_artists: [],
            all_users: [],
            total_users: 0,
            total_artists: 0,
            total_albums: 0,
            total_songs: 0,
            total_genres: 0,
            total_views: 0,
            total_likes: 0,
            show_songs: false,
            show_albums: false,
            show_artists: false,
            show_graphs: false,
            view_album: false,
            temp_album : [],
            

            search_type: 'songs',
            search_query: null,
            search_results: null,
            
        }
    },
    async mounted(){
        try{
            await this.app_data();}
        catch(err){
            console.log("Some error occured");
        }    
    },

    methods: {
        async app_data() {
            const response = await fetch('/app_data', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.token,
                },
            })
            if (response.status == 200) {
                const response_data = await response.json();
                this.all_songs = response_data.songs
                this.all_albums = response_data.albums
                this.all_users = response_data.users
                this.all_artists = this.all_users.filter(user => user.roles.includes('artist'))
                this.total_songs = this.all_songs.length
                this.total_albums = this.all_albums.length
                this.total_users = this.all_users.length
                this.total_artists = this.all_users.filter(user => user.roles.includes('artist')).length
                this.total_genres = this.all_songs.filter(song => song.genre).length
                this.total_views = this.all_songs.reduce((a, b) => a + b.play_count, 0)
                this.total_likes = this.all_songs.reduce((a, b) => a + b.likes, 0) 
            }
            else {
                const error = await response.json();
                alert(error.message);
            }
        },
        showSongs(){
            if (this.show_songs == false){
                this.show_albums= false,
                this.show_artists= false,
                this.show_graphs= false,
                this.view_album= false,
                this.show_songs = true;
            }
            else {
                this.show_songs = false;
            }

        },
        showAlbums(){
            if (this.show_albums == false){
                this.show_songs = false,
                this.show_artists= false,
                this.show_graphs= false,
                this.view_album= false,
                this.show_albums = true;
            }
            else {
                this.show_albums = false;
            }

        },
        showArtists(){
            if (this.show_artists == false){
                this.show_songs = false,
                this.show_albums= false,
                this.show_graphs= false,
                this.view_album= false,
                this.show_artists = true;
            }
            else {
                this.show_artists = false;
            }

        },
        showGraphs(){
            if (this.show_graphs == false){
                this.show_songs = false,
                this.show_albums= false,
                this.show_artists= false,
                this.view_album= false,
                this.show_graphs = true;
            }
            else {
                this.show_graphs = false;
            }
        },
        viewAlbum(album_id){
            if (this.view_album == false){
                this.show_songs = false;
                this.show_albums = false;
                this.show_artists= false,
                this.show_graphs= false,
                this.temp_album = this.all_songs.filter(song => song.album_id == album_id)
                this.view_album = true;
            }
            else {
                this.view_album = true;
            }

        },

        async download(){
            alert("Download code has been commented out. Uncomment and start redis and celery to download.")
            // const response = await fetch('/download')
            // if (response.status == 200){
            //     const response_data = await response.json();
            //     const taskid = response_data['taskid']
            //     const intv = setInterval(async () => {
            //         const response = await fetch(`getcsv/${taskid}`)
            //         if(response.status == 200){
            //             clearInterval(intv)
            //             window.location.href = `getcsv/${taskid}`
            //         }
            //         else{
            //             alert("Unable to download")
            //         }
            //     }, 1000)
            // }
            // else {
            //     alert("Unable to download")
            // }
        },

        async delete_album(album_id){
            const confirm_delete = window.confirm("Are you sure you want to delete this album?")
            if (confirm_delete == true){
                const response = await fetch(`/delete_album/${album_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication-Token': this.token,
                    },
                })
                if (response.status == 200) {
                    const respone_data = await response.json();
                    alert(respone_data.message)
                    this.app_data();
                }
                else {
                    const error = await response.json();
                    alert(error.message);
                }
            }
            else {
                return;
            }
        },

        async delete_artist(artist_id){
            const confirm_delete = window.confirm("Are you sure you want to delete this artist?")
            if (confirm_delete == true){
                const response = await fetch(`/delete_artist/${artist_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication-Token': this.token,
                    },
                })
                if (response.status == 200) {
                    const respone_data = await response.json();
                    alert(respone_data.message)
                    this.app_data();
                }
                else {
                    const error = await response.json();
                    alert(error.message);
                }

            } 
            else{
                return;
            }
            
        },

        async whitelist(artist_id){
            const confirm_whitelist = window.confirm("Are you sure you want to whitelist this artist?")
            if (confirm_whitelist == true){
                const response = await fetch(`/whitelist/${artist_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication-Token': this.token,
                    },
                })
                if (response.status == 200) {
                    const respone_data = await response.json();
                    alert(respone_data.message)
                    this.app_data();
                }
                else {
                    const error = await response.json();
                    alert(error.message);
                }

            }
            else {
                return;
            }
            
        },

        async blacklist(artist_id){
            const confirm_blacklist = window.confirm("Are you sure you want to blacklist this artist?")
            if (confirm_blacklist == true){
                const response = await fetch(`/blacklist/${artist_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication-Token': this.token,
                    },
                })
                if (response.status == 200) {
                    const respone_data = await response.json();
                    alert(respone_data.message)
                    this.app_data();
                }
                else {
                    const error = await response.json();
                    alert(error.message);
                }

            }
            else {
                return;
            }
            
        },
        async delete_song(song_id){
            const confirm_delete = window.confirm("Are you sure you want to delete this song?")
            if (confirm_delete == true){
                const response = await fetch(`/delete_song/${song_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication-Token': this.token,
                    },
                })
                if (response.status == 200) {
                    const respone_data = await response.json();
                    alert(respone_data.message)
                    this.app_data();
                }
                else {
                    const error = await response.json();
                    alert(error.message);
                }
            }
            else {
                return;
            } 
        },

        play(song_id){
            this.$router.push({path:'/play', query: {song: this.all_songs.filter(song => song.id==song_id) }})
        },

        async search() {
            if (this.search_query == null) {
                alert('Please enter a search query');
            }
            else if (this.search_type == 'songs') {
                this.search_results = this.all_songs.filter(song => song.name.toLowerCase().includes(this.search_query.toLowerCase()));
                // console.log('searching song')
            }
            else if (this.search_type == 'albums') {
                this.search_results = this.all_songs.filter(song => song.album_name.toLowerCase().includes(this.search_query.toLowerCase()));
                // console.log('searching album')
            }
            else if (this.search_type == 'artists') {
                this.search_results = this.all_songs.filter(song => song.creator_name.toLowerCase().includes(this.search_query.toLowerCase()));
                // console.log('searching artist')
            }
            else if (this.search_type == 'genres') {
                this.search_results = this.all_songs.filter(song => song.genre.toLowerCase().includes(this.search_query.toLowerCase()));
                // console.log('searching genre')
            }
            else {
                alert('Please select a search type');
            }
            if (this.search_results.length == 0) {
                alert('No results found');
            }
            
        },

        async unflag(song_id){
            const confirm_unflag = window.confirm("Are you sure you want to unflag this song?")
            if (confirm_unflag == true){
                const response = await fetch(`/unflag_song/${song_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication-Token': this.token,
                    },
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
            else{
                return
            }   
        },
 
    },

}
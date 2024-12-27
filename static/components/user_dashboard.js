export default {
  template: 
  `
<div class="dashboard-container">
  <!-- Main Content -->
  <div class="main-content">
    <!-- Search Section -->
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

    
    

    <!-- Search Results -->
    <div v-if="search_results" class="search-results">
      <h2>Results for "{{search_query}}"</h2>
      <div class="results-grid">
        <div v-for="result in search_results" :key="result.id" class="result-card">
          <div class="result-info">
            <h4>{{result.name}}</h4>
            <p v-if="search_type === 'songs'">
              By {{result.creator_name}} • {{result.album_name}}
            </p>
            <p v-if="search_type === 'artists'">Artist • {{result.creator_name}}</p>
            <p v-if="search_type === 'albums'">Album • {{result.album_name}}</p>
            <p v-if="search_type === 'genres'">Genre • {{result.genre}}</p>
            <div class="song-stats">
              <span><i></i> ❤️ {{result.likes}}</span>
              <span><i></i> 👁️ {{result.play_count}}</span>
            </div>
          </div>
          <button @click="play(result.id)" class="play-button">
            <i class="fas fa-play"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Recommended Section -->
    <div class="recommended-section">
      <div class="section-header">
        <h2>Recommended Songs</h2>
        <div class="filter-controls">
          <select v-model="filter_type" class="filter-select">
            <option value="likes">Likes</option>
            <option value="views">Views</option>
          </select>
          <input type="number" v-model="filter_value" class="filter-input" placeholder="Min value">
          <button @click="filtered" class="filter-button">Apply</button>
          <button @click="show_all_songs" class="all-songs-button">
          {{ all_songs_button === 1 ? 'Hide All Songs' : 'Show All Songs' }}
        </button>
        </div>
      </div>
      <!-- All Songs Table -->
    <div v-if="all_songs_button === 1" class="all-songs-section">
      <h2>All Songs</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Genre</th>
              <th>Length</th>
              <th>Likes </th>
              <th>Views </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="song in all_songs" :key="song.id">
              <td>{{song.name}}</td>
              <td>{{song.creator_name}}</td>
              <td>{{song.album_name}}</td>
              <td>{{song.genre}}</td>
              <td>{{song.duration}}</td>
              <td>{{song.likes}}</td>
              <td>{{song.play_count}}</td>
              <td>
                <button @click="play(song.id)" class="play-button">Play</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
      
      <div class="songs-grid">
        <div v-for="song in filtered_songs" :key="song.id" class="song-card">
          <div class="song-art">
            <i class="fas fa-music"></i>
          </div>
          <div class="song-info">
            <h3>{{ song.name }}</h3>
            <p>{{ song.creator_name }}</p>
            <div class="song-stats">
              <span><i></i> ❤️ {{ song.likes }}</span>
              <span><i></i> 👁️ {{ song.play_count }}</span>
            </div>
          </div>
          <button @click="play(song.id)" class="play-button">
            <i class="fas fa-play"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Playlist Section -->
    <div class="playlist-section">
      <div class="playlist-header">
        <h2>Your Playlists</h2>
        <div class="playlist-controls">
          <button @click="create_playlist" class="create-button">Create Playlist</button>
          <button @click="show_playlists" class="show-button">Show Playlists</button>
        </div>
      </div>
      <!-- Create Playlist Form -->
    <div v-if="create_playlist_button === 1" class="create-playlist-form">
      <h2>Create New Playlist</h2>
      <input 
        type="text" 
        v-model="playlistName" 
        placeholder="Enter playlist name" 
        class="playlist-name-input"
      >
      <div class="song-selection">
        <h3>Select Songs</h3>
        <div class="song-selection-grid">
          <div v-for="song in all_songs" :key="song.id" class="song-selection-item">
            <input 
              type="checkbox" 
              :value="song.id" 
              v-model="selectedSongs"
              :id="'song-' + song.id"
            >
            <label :for="'song-' + song.id">{{song.name}} - {{song.creator_name}}</label>
          </div>
        </div>
      </div>
      <div class="form-buttons">
        <button @click="createPlaylist" class="create-button">Create</button>
        <button @click="back" class="back-button">Back</button>
      </div>
    </div>
    <div v-if="opened_playlist_button === 1" class="opened-playlist">
      <div class="opened-playlist-header">
        <h3>{{opened_playlist.name}}</h3>
        <button @click="closePlaylist" class="close-button">Close</button>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Genre</th>
              <th>Length</th>
              <th>Likes</th>
              <th>Views</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="song in opened_playlist.songs" :key="song.id">
              <td>{{song.name}}</td>
              <td>{{song.creator_name}}</td>
              <td>{{song.album_name}}</td>
              <td>{{song.genre}}</td>
              <td>{{song.duration}}</td>
              <td>{{song.likes}}</td>
              <td>{{song.play_count}}</td>
              <td>
                <button @click="play(song.id)" class="play-button">Play</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

      <div class="playlists-grid" v-if="playlists.length">
        <div v-for="playlist in playlists" :key="playlist.id" class="playlist-card">
          <div class="playlist-info">
            <h3>{{playlist.name}}</h3>
            <p>{{playlist.songs.length}} songs</p>
          </div>
          <div class="playlist-actions">
            <button @click="open_playlist(playlist.id)" class="open-button">
              <i class="fas fa-folder-open"></i>
            </button>
            <button @click="delete_playlist(playlist.id)" class="delete-button">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,

  data() {
      return {
          token: localStorage.getItem('auth_token'),
          role: localStorage.getItem('role'),
          all_songs: [],
          all_songs_button: 0,
          
          playlists: [],
          opened_playlist: [],
          opened_playlist_button: 0,

          search_type: 'songs',
          search_query: null,
          search_results: null,

          filter_type: 'likes',
          filter_value: 0,
          filtered_songs: null,

          playlistName: '',
          selectedSongs: [],
          create_playlist_button: 0,
      }
  },
  async mounted() {
     await this.get_all_songs()
     await this.filtered();
  },

  methods: {
      async get_all_songs(){
          const response = await fetch('/get_all_songs', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authentication-Token': this.token,
              },
          })
          if (response.status == 200) {
              const response_data = await response.json();
              this.all_songs = response_data.songs
          }
          else {
              const error = await response.json();
              alert(error.message);
          }
      },

      show_all_songs(){
          this.all_songs_button = this.all_songs_button === 0 ? 1 : 0;
          this.search_results = null;
      },

      filtered(){
          if (this.filter_value == null){
              alert('Please enter a value')
              return;
          }
          if (this.filter_type == 'likes'){
              this.filtered_songs = this.all_songs.filter(song => song.likes >= this.filter_value);
          }
          else if (this.filter_type == 'views'){
              this.filtered_songs = this.all_songs.filter(song => song.play_count >= this.filter_value);
          }
      },

      async show_playlists(){
          const response = await fetch('/show_playlists', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authentication-Token': this.token,   
              },
          })
          if (response.status == 200) {
              const response_data = await response.json();
              this.playlists = response_data.playlists
          }
          else {
              const error = await response.json();
              alert(error.message);
          }
      },

      create_playlist(){
          this.create_playlist_button = this.create_playlist_button === 0 ? 1 : 0;
          this.playlistName = '';
          this.selectedSongs = [];
      },

      back(){
          this.create_playlist_button = 0;
          this.playlistName = '';
          this.selectedSongs = [];
      },

      async createPlaylist(){ 
          if (!this.playlistName.trim()) {
              alert('Please enter a playlist name');
              return;
          }
          if (this.selectedSongs.length === 0) {
              alert('Please select at least one song');
              return;
          }

          const response = await fetch('/create_playlist', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authentication-Token': this.token,
              },
              body: JSON.stringify({
                  name: this.playlistName,
                  songs: this.selectedSongs
              })
          })
          if (response.status == 200) {
              const response_data = await response.json();
              this.create_playlist_button = 0;
              this.playlistName = '';
              this.selectedSongs = [];
              await this.show_playlists();
              alert(response_data.message);
          }
          else {
              const error = await response.json();
              alert(error.message);
          }
      },

      async delete_playlist(playlist_id){
          const confirm_delete = window.confirm("Are you sure you want to delete this playlist?")
          if (confirm_delete){
              const response = await fetch(`/delete_playlist/${playlist_id}`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authentication-Token': this.token,
                  },
              })
              if (response.status == 200) {
                  const response_data = await response.json();
                  await this.show_playlists();
                  alert(response_data.message);
              }
              else {
                  const error = await response.json();
                  alert(error.message);
              }
          }
      },

      async open_playlist(playlist_id){ 
        const response = await fetch(`/open_playlist/${playlist_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authentication-Token': this.token,
            },
        })
        if (response.status == 200) {
            const response_data = await response.json();
            this.opened_playlist = response_data.playlist;
            this.opened_playlist_button = 1;
            this.create_playlist_button = 0; // Close create playlist form if open
        }
        else {
            const error = await response.json();
            alert(error.message);
        }
    },

    closePlaylist() {
        this.opened_playlist_button = 0;
        this.opened_playlist = [];
    },
      async play(song_id){
          const response = await fetch(`/play/${song_id}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authentication-Token': this.token,
              },
          })
          if (response.status == 200) {
              const response_data = await response.json();
              this.$router.push({path:'/play', query: {song: response_data.song}})
          }
          else {
              const error = await response.json();
              alert(error.message);
          }
      },
      
      search() {
          if (!this.search_query) {
              alert('Please enter a search query');
              return;
          }

          const query = this.search_query.toLowerCase();
          
          switch(this.search_type) {
              case 'songs':
                  this.search_results = this.all_songs.filter(song => 
                      song.name.toLowerCase().includes(query));
                  break;
              case 'albums':
                  this.search_results = this.all_songs.filter(song => 
                      song.album_name.toLowerCase().includes(query));
                  break;
              case 'artists':
                  this.search_results = this.all_songs.filter(song => 
                      song.creator_name.toLowerCase().includes(query));
                  break;
              case 'genres':
                  this.search_results = this.all_songs.filter(song => 
                      song.genre.toLowerCase().includes(query));
                  break;
              default:
                  alert('Please select a search type');
                  return;
          }

          if (this.search_results.length === 0) {
              alert('No results found');
              this.search_results = null;
              this.search_query = null;
              this.search_type = 'songs';
          }
      },
  },
}
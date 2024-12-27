export default {
    template: 
    `<div class="player-container" style="margin-top: 100px;">
    <div class="text-center">
        <a href="javascript:window.history.back();" class="back-button">← Back</a>
    </div>
    <div class="text-center">
        <h1 class="song-title">{{song[0].name}}</h1>
        <div class="audio-player">
            <audio controls>
                <source :src="'/static/audio/' + song[0].name + '.mp3'" type="audio/mpeg">
                Audio not available.
            </audio>
        </div>
        <div v-if="this.role.includes('user')" class="controls-container">
            <button type="button" 
                    :class="['control-btn like-btn', {'active': is_liked}]" 
                    @click="like(song[0].id)">Like</button>
            <button type="button" 
                    :class="['control-btn dislike-btn', {'active': is_disliked}]" 
                    @click="dislike(song[0].id)">Dislike</button>
            <button v-if="this.flagged == false" 
                    type="button" 
                    class="control-btn flag-btn" 
                    @click="flag(song[0].id)">Flag</button>
        </div>
        <div class="lyrics-container">
            <pre>{{song[0].lyrics}}</pre>
        </div>
    </div>
</div>`,
    data() {
      return {
        role: localStorage.getItem('role'),
        token: localStorage.getItem('auth_token'),
        song: this.$route.query.song,
        is_liked: false,
        is_disliked: false,
        flagged: false,
      }
    },
    methods: {
        async like(song_id) {
          if (this.is_liked === false) {
            const response = await fetch(`/like_song/${song_id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authentication-Token': this.token,
              },
              body: JSON.stringify({ song_id: song_id }),
            });
      
            if (response.status === 200) {
              const response_data = await response.json();
              this.is_liked = true;
              this.is_disliked = false;
              alert(response_data.message);
            } else {
              const error = await response.json();
              alert(error.message);
            }
          } 
          else {
            alert('You have already liked this song');
          }

        },
      
        async dislike(song_id) {
          if (this.is_disliked === false) {
            const response = await fetch(`/dislike_song/${song_id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authentication-Token': localStorage.getItem('auth_token'),
              },
              body: JSON.stringify({ song_id: song_id }),
            });
      
            if (response.status === 200) {
              const response_data = await response.json();
              this.is_disliked = true;
              this.is_liked = false;
              alert(response_data.message);
            } else {
              const error = await response.json();
              alert(error.message);
            }

          } 
          else {
            alert('You have already disliked this song');
          }

        },
        async flag(song_id){
          const confirm_flag = window.confirm("Are you sure you want to flag this song?")
          if (confirm_flag == true && this.flagged == false){
              const response = await fetch(`/flag_song/${song_id}`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authentication-Token': this.token,
                  },
              })
              if (response.status == 200) {
                  const response_data = await response.json();
                  alert(response_data.message);
                  this.flagged = true
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

    }      
}
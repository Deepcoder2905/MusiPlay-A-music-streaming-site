export default {
    template: 
    `<div class="container" style="margin-top: 100px; font-family:'Times New Roman', Times, serif">
        <h2 class="text-center" style="color: White; font-weight: bold;">Enter Album Details</h2>
        <div class="form-group p-5 " style="margin-top: 10px">
            <label for="name" class="form-label">Album Name</label>
            <input type="text" class="form-control" id="name" v-model="album_details.name" required>

            <label for="year" class="form-label">Year</label>
            <input type="number" class="form-control" id="year" v-model="album_details.year" required>

            <div class="form-group text-center mt-4">
                <button type="button" class="btn btn-primary" @click="add">Add</button>
            </div>
        </div>
    </div>`,
    data() {
        return {
            album_details: {
                name: null,
                year: null
            },
            token: localStorage.getItem('auth_token'),        
        }
    },
    methods: {
        async add() {
            if (!this.album_details.name || !this.album_details.year) {
                alert("Please enter all the details");
                return;
            }
            try {
                const response = await fetch('/api/manage_albums', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication-Token': this.token,
                    },
                    body: JSON.stringify(this.album_details)
                });

                if (response.ok) {
                    const response_data = await response.json();
                    alert(response_data.message);
                    this.$router.push({ path: '/api/manage_songs', query: { album_id: response_data.album_id } });
                } else {
                    const error = await response.json();
                    alert(error.message);
                }
            } catch (err) {
                console.error("Error adding album:", err);
                alert("An error occurred. Please try again.");
            }
        },
    },
}
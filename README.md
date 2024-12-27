# MusiPlay: A music streaming site

Musiplay is a feature-rich music application that allows users to listen to music, create and manage playlists, become an artist, and upload songs. Built with modern web technologies, Musiplay provides a seamless and intuitive interface for music enthusiasts.

## Features

- **Listen to Music:** Stream your favorite songs from a vast collection.
- **Create and Manage Playlists:** Organize your music the way you like.
- **Become an Artist:** Create an artist profile and showcase your talent.
- **Upload Songs:** Share your music with the world.
- **Efficient Background Processing:** Leveraging Celery and Redis for handling asynchronous tasks like song processing and notifications.

---

## Technologies Used

### Backend
- **Flask**: A lightweight and powerful web framework for Python.
- **SQLite**: A lightweight database for storing user and song data.
- **Celery**: Task queue for handling asynchronous operations.
- **Redis**: In-memory data store used as a message broker for Celery.

### Frontend
- **Vue.js**: A progressive JavaScript framework for building dynamic user interfaces.
- **HTML/CSS**: For creating a responsive and visually appealing interface.

---

## Installation

### Prerequisites
- Python (>= 3.7)
- Node.js (>= 14)
- Redis server

### Steps

```bash
# Clone the repository
git clone https://github.com/Deepcoder2905/musiplay.git
cd musiplay

# Set up the backend
pip install -r requirements.txt



# Start Redis server
redis-server

# Start the Celery worker
celery -A app.celery worker --loglevel=info
celery -A main.celery_app beat --loglevel INFO

# To check mail use mailhog
sudo apt-get -y install golang-go
go install github.com/mailhog/MailHog@latest

~/go/bin/MailHog
(visit localhost:8025 on browser)

# Run the Flask application
py main.py

# Access the application
http://127.0.0.1:5000

// Konfigurasi Google Drive
const driveId = '11h7GNTSDyiBA9rYA3pKc0bodBp2vQhyA';
const apiKey = 'AIzaSyCbJE1a9ECldwNX-ETVjuStH8P-IsHqm58';

// Inisialisasi video list
const videoList = document.getElementById('video-list');

// Fungsi untuk menampilkan video list
function displayVideoList() {
    fetch(`https://www.googleapis.com/drive/v3/files?q='${driveId}'%20in%20parents&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const videos = data.files;
            videos.forEach(video => {
                const videoListItem = document.createElement('li');
                videoListItem.innerHTML = `
                    <a href="#" data-video-id="${video.id}">${video.name}</a>
                `;
                videoList.appendChild(videoListItem);
            });
        });
}

// Fungsi untuk menampilkan video
function displayVideo(videoId) {
    const videoElement = document.getElementById('video');
    videoElement.src = `https://drive.google.com/uc?id=${videoId}&export=download`;
}

// Fungsi untuk mengirim komentar
function submitComment(comment) {
    const commentList = document.getElementById('comment-list');
    const commentListItem = document.createElement('li');
    commentListItem.innerHTML = comment;
    commentList.appendChild(commentListItem);
}

// Event listener untuk video list
videoList.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
        const videoId = event.target.dataset.videoId;
        displayVideo(videoId);
    }
});

// Event listener untuk form komentar
document.getElementById('comment-form').addEventListener('submit', event => {
    event.preventDefault();
    const comment = document.getElementById('comment').value;
    submitComment(comment);
    document.getElementById('comment').value = '';
});

// Panggil fungsi untuk menampilkan video list
displayVideoList();
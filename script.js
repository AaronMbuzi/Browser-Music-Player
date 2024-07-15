let replayActive = false; // Variable to track replay state

document.getElementById('file-input').addEventListener('change', function(event) {
    const files = event.target.files;
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = '';

    Array.from(files).forEach(file => {
        if (file.type.startsWith('audio/')) {
            const listItem = document.createElement('li');
            listItem.textContent = file.name;
            listItem.addEventListener('click', () => {
                const audio = document.getElementById('audio');
                const objectURL = URL.createObjectURL(file);
                audio.src = objectURL;
                audio.load();
            });
            fileList.appendChild(listItem);
        }
    });
});

document.getElementById('play').addEventListener('click', function() {
    const audio = document.getElementById('audio');
    audio.play();
});

document.getElementById('pause').addEventListener('click', function() {
    const audio = document.getElementById('audio');
    audio.pause();
});

document.getElementById('stop').addEventListener('click', function() {
    const audio = document.getElementById('audio');
    audio.pause();
    audio.currentTime = 0;
});

document.getElementById('replay').addEventListener('click', function() {
    replayActive = !replayActive; // Toggle replay state
    alert(`Replay ${replayActive ? 'active' : 'inactive'}`);

    if (replayActive) {
        const audio = document.getElementById('audio');
        audio.addEventListener('ended', replayHandler);
    } else {
        const audio = document.getElementById('audio');
        audio.removeEventListener('ended', replayHandler);
    }
});

function replayHandler() {
    const audio = document.getElementById('audio');
    audio.currentTime = 0;
    audio.play();
}

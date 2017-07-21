import youTubePlayer from 'youtube-player';

$(document).ready(function () {
    setTimeout(() => {
        FB.login(function (response) {
                // handle the response
            },
            {
                scope: `public_profile, email,manage_pages,user_videos,pages_show_list,publish_pages`
            });

        FB.getLoginStatus(function (response) {
            if (response.authResponse) {
                setInterval(() => {
                    loop();
                }, 2000);
            }
        });
    }, 500);

    let lastMessage = '';

    function loop() {
        FB.api('345927435821495/comments', 'GET', {
            order: 'reverse_chronological'
        }, (res) => {
            let newMessage = res.data[0].message;

            if (newMessage == lastMessage) {
                return;
            }
            lastMessage = newMessage;

            var url = "/query"; // the script where you handle the form input.

            $.ajax({
                type: "POST",
                url: url,
                data: {
                    query: newMessage,
                },
            }).then((res) => {
                // list of new videos to play
                console.log(res);
            });
        });
    }

    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
});

class App {
    start() {
        this.i = 0;

        this.initPlayer();
        this.getVideos();
        this.playVideo(this.videos[this.i]);

        this.player.on('onError', event => {
            console.log('youtube error:');
            console.log(event);
            this.playNext();
        });

        /**
         * when video is done play next
         */
        this.player.on('stateChange', event => {
            if (event.data === 0) {
                this.playNext();
            }
        });
    }

    /**
     * Initialize player
     */
    initPlayer() {
        this.player = youTubePlayer('player', {
            playerVars: {
                controls: 0,
                progressBar: false,
                wmode: 'transparent',
                showinfo: 0,
                modestbranding: 1
            }
        });
    }

    playVideo(video) {
        console.log('Playing video:');
        console.log(video);
        this.player.loadVideoById(video);
    }

    /**
     * Play next video
     */
    playNext() {
        this.i++;

        if (this.i >= this.videos.length) {
            this.reset();
        }

        this.playVideo(this.videos[this.i]);
    }

    /**
     * Reset counter
     */
    reset() {
        this.i = 0;
    }

    /**
     * Get list of videos
     */
    getVideos() {
        this.videos = [
            'qdUOH3GeqxY'
        ];
    }

    recieveNewVideos(videos) {
        this.videos = videos.map(item => item.id);
        this.reset();
        this.playNext();
    }
}

/**
 * Start the app
 * @type {Player}
 */
const app = new App();
app.start();
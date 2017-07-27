import youTubePlayer from 'youtube-player';

let VIDEOID = "347910418956530";
const PAGEID = "175095669571340"; // TESTPAGE = 175095669571340 -- UNDEFINED = 358032047655437 //

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

$(document).ready(function () {
    const app = new App();

    setTimeout(() => {
        FB.login(function (response) {
            },
            {
                scope: `public_profile, email,manage_pages,user_videos,pages_show_list,publish_pages`
            });

        FB.getLoginStatus(function (response) {
            console.log('start app');
            if (response.authResponse) {
                app.start();
                getLastVideo();

                setInterval(() => {
                    getLastVideo();
                }, 20000);

                console.log('Login sucess');
                setInterval(() => {
                    loop();
                }, 2000);
            }
        });
    }, 500);

    function getLastVideo() {
        FB.api(PAGEID + '/videos/', 'GET', {
            order: 'reverse_chronological'
        }, (res) => {
            console.log('all videos:');
            console.log(res);
            VIDEOID = res.data[0].id;
        });
    }

    let lastMessage = '';

    function loop() {
        FB.api(VIDEOID + '/comments', 'GET', {
            order: 'reverse_chronological'
        }, (res) => {
            if (res.data[0]) {
                let newMessage = res.data[0];

                if (newMessage.message === lastMessage.message) {
                    return;
                }
                lastMessage = newMessage;

                let url = "/query"; // the script where you handle the form input.

                $.ajax({
                    type: "POST",
                    url: url,
                    data: {
                        message: newMessage.message,
                        from: newMessage.from.name,
                    },
                }).then((res) => {
                    // list of new videos to play
                    console.log(res);
                    app.recieveNewVideos(res.results);
                });
            }
        });
    }
});
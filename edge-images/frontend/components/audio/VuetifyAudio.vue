<template>
    <v-card
            flat
            dark
            tile
            style="text-align: center; border-radius: 0;">
        <v-card-text>
            <v-btn
                    :disabled="loaded === false"
                    outline
                    icon
                    class="teal--text"
                    @click.native="playing ? pause() : play()"
            >
                <v-icon v-if="playing === false || paused === true">mdi-play</v-icon>
                <v-icon v-else>mdi-pause</v-icon>
            </v-btn>
            <v-btn
                    :disabled="loaded === false"
                    outline
                    icon
                    class="teal--text"
                    @click.native="stop()">
                <v-icon>mdi-stop</v-icon>
            </v-btn>
            <v-btn
                    :disabled="loaded === false"
                    outline
                    icon
                    class="teal--text"
                    @click.native="mute()">
                <v-icon v-if="isMuted === false">mdi-volume-plus</v-icon>
                <v-icon v-else>mdi-volume-mute</v-icon>
            </v-btn>
            <v-btn
                    outline
                    icon
                    class="teal--text"
                    @click.native="loaded ? download() : reload()">
                <v-icon v-if="loaded === false">mdi-refresh</v-icon>
                <v-icon v-else>mdi-download</v-icon>
            </v-btn>
            <v-slider
                    v-model="percentage"
                    dark
                    @click.native="setPosition()"></v-slider>
            <p>{{ currentTime }} / {{ duration }}</p>
        </v-card-text>
        <audio
                id="player"
                ref="player"
                :src="file"
                @ended="ended"
                @canplay="canPlay"></audio>
    </v-card>
</template>
<script>
    const formatTime = second => {
        return new Date(second * 1000).toISOString().substr(11, 8);
    };
    export default {
        name: 'VuetifyAudio',
        props: {
            file: {
                type: String,
                default: null
            },
            autoPlay: {
                type: Boolean,
                default: false
            },
            ended: {
                type: Function,
                default: () => {
                }
            },
            canPlay: {
                type: Function,
                default: () => {
                }
            }
        },
        data() {
            return {
                isMuted: false,
                loaded: false,
                playing: false,
                paused: false,
                percentage: 0,
                currentTime: '00:00:00',
                audio: undefined,
                totalDuration: 0
            }
        },
        computed: {
            duration: function () {
                return this.audio ? formatTime(this.totalDuration) : ''
            }
        },
        mounted() {
            this.audio = this.$refs.player;
            this.init()
        },
        beforeDestroy() {
            this.audio.removeEventListener('timeupdate', this._handlePlayingUI);
            this.audio.removeEventListener('loadeddata', this._handleLoaded);
            this.audio.removeEventListener('pause', this._handlePlayPause);
            this.audio.removeEventListener('play', this._handlePlayPause);
            this.audio.removeEventListener('ended', this._handleEnded)
        },

        methods: {
            setPosition() {
                this.audio.currentTime = parseInt(
                    (this.audio.duration / 100) * this.percentage
                )
            },
            stop() {
                this.paused = this.playing = false;
                this.audio.pause();
                this.audio.currentTime = 0
            },
            play() {
                if (this.playing) return;
                this.paused = false;
                this.audio.play();
                this.playing = true
            },
            pause() {
                this.paused = !this.paused;
                this.paused ? this.audio.pause() : this.audio.play()
            },
            download() {
                this.audio.pause();
                window.open(this.file, 'download')
            },
            mute() {
                this.isMuted = !this.isMuted;
                this.audio.muted = this.isMuted;
                this.volumeValue = this.isMuted ? 0 : 75
            },
            reload() {
                this.audio.load()
            },
            _handleLoaded: function () {
                if (this.audio.readyState >= 2) {
                    if (this.autoPlay) this.audio.play();
                    this.loaded = true;
                    this.totalDuration = parseInt(this.audio.duration)
                } else {
                    throw new Error('Failed to load sound file')
                }
            },
            _handlePlayingUI: function () {
                this.percentage = (this.audio.currentTime / this.audio.duration) * 100;
                this.currentTime = formatTime(this.audio.currentTime)
            },
            _handlePlayPause: function (e) {
                if (
                    e.type === 'pause' &&
                    this.paused === false &&
                    this.playing === false
                ) {
                    this.currentTime = '00:00:00'
                }
            },
            _handleEnded() {
                this.paused = this.playing = false
            },
            init: function () {
                this.audio.addEventListener('timeupdate', this._handlePlayingUI);
                this.audio.addEventListener('loadeddata', this._handleLoaded);
                this.audio.addEventListener('pause', this._handlePlayPause);
                this.audio.addEventListener('play', this._handlePlayPause);
                this.audio.addEventListener('ended', this._handleEnded)
            }
        }
    }
</script>

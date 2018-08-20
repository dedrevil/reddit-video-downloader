import React, { Component } from "react";
import axios from 'axios';
import JsonFind from 'json-find';

class VideoDownloader extends Component {
    constructor() {
        super();

        this.state = {
            videoUrl: null,
            downloadLink: null,
            urlInputValue: '',
            downloadButtonText: "▼ Download ▼",
            showExampleUrl : false
        }
    }

    getVideo() {
        let url = this.state.urlInputValue;
        let jsonUrl = url + ".json";

        axios.get(jsonUrl, {
            crossdomain: true,
        }
        )
            .then((res) => {
                //let videoUrl = res.data[0].data.children[0].data.media.reddit_video.fallback_url;
                //let videoUrl = res.data[0].data.children[0].data.crosspost_parent_list[0].media.reddit_video.fallback_url
                const data = JsonFind(res.data[0]);
                let videoUrl = data.checkKey('fallback_url');

                this.setState({
                    videoUrl
                }, () => {
                    this.checkForDisable();
                    this.checkDownloadButtonText();
                });
            });
    }

    checkForDisable() {
        if (this.state.urlInputValue.length > 1) {
            document.querySelector(".btn-download").classList.remove("disabled");

        } else {
            document.querySelector(".btn-download").classList.add("disabled");
        }
    }

    checkDownloadButtonText() {
        if (document.querySelector(".btn-download").getAttribute("href") !== null) {
            this.setState({
                downloadButtonText: "▼ Download ▼"
            });
        } else {
            this.setState({
                downloadButtonText: "Please wait..."
            });
        }
    }

    handleChange(e) {
        this.setState({
            urlInputValue: e.target.value,
            downloadButtonText: "Please wait..."
        }, () => {
            this.checkForDisable();
            this.checkDownloadButtonText();
            this.getVideo();
        });
    }
    toggleExampleUrl() {
        this.setState({
            showExampleUrl : !this.state.showExampleUrl
        })
    }

    render() {
        return (
            <section className="col-md-6 col-sm-12 mx-auto">
                <form>
                    <div className="form-group">
                        <input type="text" onChange={this.handleChange.bind(this)} value={this.state.urlInput} className="form-control form-control-lg" placeholder="Paste reddit video url here" />
                    </div>
                    <div className="form-group text-center">
                        <a href={this.state.videoUrl} target="_blank" role="button" onClick={this.getVideo.bind(this)} className="btn btn-secondary btn-lg btn-download disabled">{this.state.downloadButtonText}</a>
                    </div>
                </form>
                
                <div className="text-center">
                    <button type="button" onClick={this.toggleExampleUrl.bind(this)} className="btn btn-outline-secondary btn-sm mt-5">Show an example url</button>
                    { this.state.showExampleUrl ?               
                    <p className="text-mute pt-2"  style={{maxWidth:'570px', overflow:'auto'}}>https://www.reddit.com/r/AnimalTextGifs/comments/97yg8s/poor_cat_stuck_in_a_pipe/</p>  : null }
                </div>
            </section>
        )
    }
}

export default VideoDownloader;
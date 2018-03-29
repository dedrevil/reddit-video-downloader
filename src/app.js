import React, { Component } from 'react';
import VideoDownloader from './videoDownloader';

export default () => (
    <div className="container">
        <div className="row mb-5">
            <h1 className="mx-auto text-center mt-3">📹 Reddit Video Downloader 📹</h1>
        </div>
        <div className="row">
            <VideoDownloader></VideoDownloader>
        </div>
        <div className="row mt-5">
            <p class="mx-auto">🐎 <a class="text-muted" href="http://mburakerman.com" target="_blank">Mehmet Burak Erman</a> 🐎</p>
        </div>
    </div>
);
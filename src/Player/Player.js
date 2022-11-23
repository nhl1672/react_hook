import React, { useRef, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Player.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

let isSeeking = false; //Không tua => false
let isEnded = false;

export default function Player() {
  const audioRef = useRef();

  const [isPlay, setPlayStatus] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [rateTimer, setRateTimer] = useState(0);
  const [volume, setVolume] = useState(100);
  const [previewTimer, setPreviewTimer] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [previewStatus, setPreviewStatus] = useState(false);

  const getMins = (seconds) => {
    seconds = Math.round(seconds);
    const mins = Math.floor(seconds / 60);
    seconds = seconds - mins * 60;
    return `${mins < 10 ? "0" + mins : mins}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const handlePlay = () => {
    const pauseStatus = audioRef.current.paused;
    if (pauseStatus) {
      audioRef.current.play();
      setPlayStatus(true);
    } else {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const handleLoadedAudio = () => {
    setDuration(audioRef.current.duration);
  };

  const handlePlaying = () => {
    if (!isEnded) {
      //Nếu không tua thì cập nhật currentTime
      if (!isSeeking) {
        const currentTime = audioRef.current.currentTime;
        setCurrentTime(currentTime);
      }

      /*
    phần trăm chạy = số giây đã chạy / tổng số giây (duration) * 100
    */
      const rateTimer = (currentTime / duration) * 100;
      setRateTimer(rateTimer);
    }
  };

  //Khi kéo tua
  const handleSeekAudio = (e) => {
    isSeeking = true; //Đang tua

    const rateTimer = e.target.value;
    setRateTimer(rateTimer);

    const currentTime = (rateTimer / 100) * duration;
    setCurrentTime(currentTime);
  };

  const handleSeekedAudio = () => {
    isSeeking = false;

    audioRef.current.currentTime = currentTime;
  };

  const handleEndAudio = () => {
    audioRef.current.currentTime = 0;
    setPlayStatus(false);
    setRateTimer(0);
    isEnded = true;
  };

  const changeVolume = (volumeRate) => {
    const volume = volumeRate / 100; //0 đến 1
    audioRef.current.volume = volume;
    setVolume(volumeRate);
  };

  const handleChangeVolume = (e) => {
    changeVolume(e.target.value);
  };

  const handleToggleVolume = () => {
    if (volume > 0) {
      changeVolume(0);
    } else {
      changeVolume(100);
    }
  };

  const handlePreviewTimer = (e) => {
    const time = (e.nativeEvent.offsetX / e.target.clientWidth) * duration;
    setPreviewTimer(time);
    setOffsetX(e.nativeEvent.offsetX);
  };

  const handlePreviewOver = () => {
    setPreviewStatus(true);
  };

  const handlePreviewOut = () => {
    setPreviewStatus(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-7">
          <div className="player py-5">
            <div className="player__image text-center">
              <img
                className={`${isPlay ? "playing" : ""}`}
                src="https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/1/5/9/2/159226aaebc0421c28d4921c041dc862.jpg"
              />
            </div>
            <div className="player__inner mt-4">
              <div className="row">
                <div className="col-8">
                  <div className="player__inner--action text-center">
                    <span onClick={handlePlay}>
                      {isPlay ? (
                        <i className="fa-solid fa-circle-pause fa-3x"></i>
                      ) : (
                        <i className="fa-solid fa-circle-play fa-3x"></i>
                      )}
                    </span>
                  </div>
                  <div className="player__inner--timer d-flex align-items-end">
                    <span>{getMins(currentTime)}</span>
                    <div
                      className="w-100 mx-3 d-flex align-items-end flex-column"
                      style={{
                        position: "relative",
                      }}
                    >
                      <input
                        type={"range"}
                        className="form-range"
                        value={rateTimer}
                        step={0.1}
                        onChange={handleSeekAudio}
                        onMouseUp={handleSeekedAudio}
                        onMouseMove={handlePreviewTimer}
                        onMouseEnter={handlePreviewOver}
                        onMouseLeave={handlePreviewOut}
                      />
                      {previewStatus && (
                        <span
                          style={{
                            position: "absolute",
                            left: offsetX,
                            top: "-15px",
                            background: "#333",
                            fontSize: "11px",
                            color: "#fff",
                            zIndex: "100",
                          }}
                        >
                          {getMins(previewTimer)}
                        </span>
                      )}
                    </div>
                    <span>{getMins(duration)}</span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="player__volume d-flex h-100 align-items-end">
                    <span onClick={handleToggleVolume}>
                      {volume > 0 ? (
                        <i className="fa-solid fa-volume-high"></i>
                      ) : (
                        <i className="fa-solid fa-volume-xmark"></i>
                      )}
                    </span>
                    <input
                      type={"range"}
                      className="form-range mx-2"
                      onChange={handleChangeVolume}
                      value={volume}
                    />
                    <span>{volume}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        onLoadedData={handleLoadedAudio}
        onTimeUpdate={handlePlaying}
        onEnded={handleEndAudio}
      >
        <source src="/mp3/yeu-voi-vang-remix.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
}

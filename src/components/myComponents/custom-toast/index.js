import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Devcademy from '../../../assets/img/devc.png';
function CustomToast({title, body, image, textStyle, audioSrc}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      <ReactAudioPlayer
        src={
          audioSrc ||
          'https://firebasestorage.googleapis.com/v0/b/brigadaun.appspot.com/o/audios%2Fslow-spring-board.mp3?alt=media&token=4145eb67-2bca-4c27-9d2e-3b532a140f14'
        }
        autoPlay={true}
        controls={true}
        loop={audioSrc && true}
        style={{display: 'none'}}
      />

      <img height={50} width={50} src={image || Devcademy} alt="" />
      <div style={{textAlign: 'center', marginLeft: '10px'}}>
        <h4 style={{color: 'red', ...textStyle}}>{title}</h4>
        <p style={{color: 'black', ...textStyle}}>{body}</p>
      </div>
    </div>
  );
}
export default CustomToast;

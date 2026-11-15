import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, AlertCircle } from 'lucide-react';
import { soundManager, AudioState } from '../utils/audio';

export const FloatingMusicPlayer: React.FC = () => {
  const [audioState, setAudioState] = useState<AudioState>(soundManager.getState());
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const unsub = soundManager.subscribe((state) => {
      setAudioState(state);
    });
    return unsub;
  }, []);

  const handleTogglePlay = () => {
    if (!audioState.isAvailable) return;
    soundManager.playChime();
    soundManager.toggle();
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.toggleMute();
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <header className="fixed top-3 right-3 sm:top-5 sm:right-5 z-50 flex items-center gap-2 select-none">
      {/* Mini Visualizer pill */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="cursor-pointer group flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#200b33]/85 border border-pink-400/30 backdrop-blur-md shadow-lg shadow-pink-950/40 hover:border-pink-300 transition-all duration-300"
      >
        {/* Play/Pause or Disabled button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleTogglePlay();
          }}
          disabled={!audioState.isAvailable}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            !audioState.isAvailable
              ? 'bg-neutral-800 text-neutral-400 cursor-not-allowed'
              : audioState.isPlaying
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-glow-pink animate-pulse'
              : 'bg-white/10 text-pink-300 hover:bg-white/20'
          }`}
          aria-label={
            !audioState.isAvailable
              ? 'Music Unavailable'
              : audioState.isPlaying
              ? 'Pause Music'
              : 'Play Music'
          }
        >
          {!audioState.isAvailable ? (
            <AlertCircle className="w-3.5 h-3.5 text-amber-300" />
          ) : audioState.isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </button>

        {/* Animated wave bars */}
        {audioState.isAvailable ? (
          <div className="flex items-end gap-[3px] h-4 w-5">
            <span
              className={`w-[2px] bg-pink-400 rounded-full transition-all duration-300 ${
                audioState.isPlaying ? 'h-3.5 animate-bounce' : 'h-1.5 opacity-40'
              }`}
              style={{ animationDelay: '0ms' }}
            />
            <span
              className={`w-[2px] bg-pink-300 rounded-full transition-all duration-300 ${
                audioState.isPlaying ? 'h-4 animate-bounce' : 'h-2 opacity-50'
              }`}
              style={{ animationDelay: '150ms' }}
            />
            <span
              className={`w-[2px] bg-purple-300 rounded-full transition-all duration-300 ${
                audioState.isPlaying ? 'h-2.5 animate-bounce' : 'h-1 opacity-40'
              }`}
              style={{ animationDelay: '300ms' }}
            />
            <span
              className={`w-[2px] bg-pink-400 rounded-full transition-all duration-300 ${
                audioState.isPlaying ? 'h-3 animate-bounce' : 'h-1.5 opacity-40'
              }`}
              style={{ animationDelay: '450ms' }}
            />
          </div>
        ) : (
          <span className="text-[10px] text-amber-300/80 font-mono">No Audio</span>
        )}

        {/* Mute button */}
        {audioState.isAvailable && (
          <button
            onClick={handleToggleMute}
            className="text-pink-300/80 hover:text-pink-200 transition-colors pl-1"
            aria-label={audioState.isMuted ? 'Unmute' : 'Mute'}
          >
            {audioState.isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>

      {/* Expanded controls dropdown on tap */}
      {expanded && (
        <div className="absolute top-12 right-0 bg-[#280d3f]/95 border border-pink-400/40 rounded-2xl p-3 shadow-2xl backdrop-blur-xl w-56 flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between text-xs text-pink-200 font-medium pb-1 border-b border-pink-500/20">
            <span className="flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-pink-400" />
              Birthday Melody
            </span>
            <span className="text-[10px] text-pink-300/70 font-mono">
              {!audioState.isAvailable
                ? 'Unavailable'
                : audioState.isPlaying
                ? 'Playing'
                : 'Paused'}
            </span>
          </div>

          {audioState.isAvailable ? (
            <>
              {/* Audio progress bar */}
              <div className="flex flex-col gap-1">
                <div className="w-full bg-pink-950 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-pink-400 to-amber-300 h-full transition-all duration-200"
                    style={{ width: `${Math.min(100, audioState.progress * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] text-pink-300/60 font-mono">
                  <span>{formatTime(audioState.currentTime)}</span>
                  <span>{formatTime(audioState.duration)}</span>
                </div>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-pink-300/80">Vol</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={audioState.isMuted ? 0 : audioState.volume}
                  onChange={(e) => {
                    if (audioState.isMuted) soundManager.setMuted(false);
                    soundManager.setVolume(parseFloat(e.target.value));
                  }}
                  className="w-full accent-pink-500 h-1.5 bg-pink-950 rounded-lg cursor-pointer"
                />
              </div>

              <p className="text-[10px] text-center text-pink-300/60 italic pt-0.5">
                "A soft melody for Divya ♡"
              </p>
            </>
          ) : (
            <div className="text-[11px] text-amber-200/80 leading-relaxed bg-amber-950/40 p-2 rounded-lg border border-amber-500/20">
              Audio file not found at <code className="text-white text-[10px]">/audio/birthday-music.mp3</code>.
              Add your MP3 file anytime.
            </div>
          )}
        </div>
      )}
    </header>
  );
};

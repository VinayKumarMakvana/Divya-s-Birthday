// Audio Engine for Divya's Birthday Experience

export interface AudioState {
  isAvailable: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  progress: number;
  error: string | null;
}

class AudioController {
  private audioElement: HTMLAudioElement | null = null;
  private isAvailable: boolean = true;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.65;
  private currentTime: number = 0;
  private duration: number = 0;
  private error: string | null = null;
  private listeners: Set<(state: AudioState) => void> = new Set();
  private chimeAudio: HTMLAudioElement | null = null;
  private blowAudio: HTMLAudioElement | null = null;
  private confettiAudio: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    const audioPath = '/audio/birthday-music.mp3';
    this.audioElement = new Audio(audioPath);
    this.audioElement.loop = true;
    this.audioElement.volume = this.volume;

    this.chimeAudio = new Audio('/audio/chime.wav');
    this.chimeAudio.volume = 0.5;

    this.blowAudio = new Audio('/audio/candle-blow.wav');
    this.blowAudio.volume = 0.6;

    this.confettiAudio = new Audio('/audio/confetti.wav');
    this.confettiAudio.volume = 0.6;

    this.audioElement.addEventListener('canplaythrough', () => {
      this.isAvailable = true;
      this.error = null;
      if (this.audioElement) {
        this.duration = this.audioElement.duration || 0;
      }
      this.notify();
    });

    this.audioElement.addEventListener('error', () => {
      this.isAvailable = false;
      this.isPlaying = false;
      this.error = 'Music file unavailable';
      this.notify();
    });

    this.audioElement.addEventListener('timeupdate', () => {
      if (this.audioElement) {
        this.currentTime = this.audioElement.currentTime;
        this.duration = this.audioElement.duration || this.duration;
        this.notify();
      }
    });

    this.audioElement.addEventListener('play', () => {
      this.isPlaying = true;
      this.notify();
    });

    this.audioElement.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });

    this.audioElement.addEventListener('ended', () => {
      this.isPlaying = false;
      this.notify();
    });
  }

  public async play(): Promise<boolean> {
    if (!this.audioElement || !this.isAvailable) return false;
    try {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
      await this.audioElement.play();
      this.isPlaying = true;
      this.notify();
      return true;
    } catch {
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  public pause() {
    if (!this.audioElement) return;
    this.audioElement.pause();
    this.isPlaying = false;
    this.notify();
  }

  public toggle() {
    if (!this.isAvailable) return;
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.audioElement) {
      this.audioElement.muted = muted;
      this.audioElement.volume = muted ? 0 : this.volume;
    }
    this.notify();
  }

  public toggleMute() {
    this.setMuted(!this.isMuted);
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioElement && !this.isMuted) {
      this.audioElement.volume = this.volume;
    }
    this.notify();
  }

  public seek(progress: number) {
    if (this.audioElement && this.duration > 0) {
      this.audioElement.currentTime = progress * this.duration;
    }
  }

  public playChime() {
    try {
      if (this.chimeAudio && !this.isMuted) {
        this.chimeAudio.currentTime = 0;
        this.chimeAudio.play().catch(() => {});
      }
    } catch {}
  }

  public playCandleBlow() {
    try {
      if (this.blowAudio && !this.isMuted) {
        this.blowAudio.currentTime = 0;
        this.blowAudio.play().catch(() => {});
      }
    } catch {}
  }

  public playConfettiPop() {
    try {
      if (this.confettiAudio && !this.isMuted) {
        this.confettiAudio.currentTime = 0;
        this.confettiAudio.play().catch(() => {});
      }
    } catch {}
  }

  public getState(): AudioState {
    return {
      isAvailable: this.isAvailable,
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
      currentTime: this.currentTime,
      duration: this.duration,
      progress: this.duration > 0 ? this.currentTime / this.duration : 0,
      error: this.error,
    };
  }

  public subscribe(listener: (state: AudioState) => void): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((fn) => fn(state));
  }
}

export const soundManager = new AudioController();

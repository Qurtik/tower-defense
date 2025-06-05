import ExplosionSound from '../sounds/explosion.wav'
import BlastSound from '../sounds/blast.wav'
import MassBlast from '../sounds/massBlast.wav'
import GameOver from '../sounds/gameOver.wav'
import Music from '../sounds/music.mp3'
import { LSKeys } from '@/shared/constants/LSKeys'

interface SoundsData {
  sound: HTMLAudioElement
  volume: number
}

type Sound = 'explosion' | 'blast' | 'massBlast' | 'gameOver'

export class SoundManager {
  private static instance: SoundManager
  private readonly sounds: Record<Sound, SoundsData> | null = null
  public soundsEnabled: boolean
  public musicEnabled: boolean
  private readonly music: HTMLAudioElement | null = null

  constructor() {
    this.soundsEnabled = !localStorage.getItem(LSKeys.soundsDisabled)
    this.musicEnabled = !localStorage.getItem(LSKeys.musicDisabled)

    if (typeof window !== 'undefined' && typeof Audio !== 'undefined') {
      this.sounds = {
        blast: {
          sound: new Audio(BlastSound),
          volume: 0.3,
        },
        explosion: {
          sound: new Audio(ExplosionSound),
          volume: 0.3,
        },
        massBlast: {
          sound: new Audio(MassBlast),
          volume: 0.4,
        },
        gameOver: {
          sound: new Audio(GameOver),
          volume: 1,
        },
      }

      this.music = new Audio(Music)
      this.music.addEventListener('ended', () => {
        if (this.music) {
          this.music.currentTime = 0
          this.music.play().catch(e => console.warn('Music replay failed:', e))
        }
      })
      this.music.load()
      this.music.volume = 0.1

      for (const key in this.sounds) {
        this.sounds[key as Sound].sound.load()
        this.sounds[key as Sound].sound.volume =
          this.sounds[key as Sound].volume
      }
    }
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager()
    }
    return SoundManager.instance
  }

  play(sound: Sound) {
    if (!this.soundsEnabled || !this.sounds) return
    this.sounds[sound].sound.currentTime = 0
    this.sounds[sound].sound
      .play()
      .catch(e => console.warn(`Sound ${sound} play failed:`, e))
  }

  playBackgroundMusic() {
    if (!this.musicEnabled || !this.music) return

    this.music.currentTime = 0
    this.music.play().catch(e => console.warn('Music play failed:', e))
  }

  stopBackgroundMusic() {
    if (!this.music) return
    this.music.pause()
    this.music.currentTime = 0
  }

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled

    if (!this.music) return

    if (this.musicEnabled) {
      this.playBackgroundMusic()
    } else {
      this.stopBackgroundMusic()
    }
  }

  toggleSounds() {
    this.soundsEnabled = !this.soundsEnabled
  }
}

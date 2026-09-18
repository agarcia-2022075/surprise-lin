/**
 * SURPRISE POUR LIN 🐝❤️
 * Animation, lecteur musical, abejitas et compteur d'amour
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. PLAYLIST CONFIGURATION
  // =========================================================================
  const playlist = [
    {
      id: "cant_help_falling_in_love",
      title: "Can't Help Falling in Love",
      artist: "André Rieu",
      src: "music/cant_help_falling_in_love.mp3",
      cover: "covers/cant_help_falling_in_love.jpg"
    },
    {
      id: "roi",
      title: "Roi",
      artist: "Videoclub",
      src: "music/roi.mp3",
      cover: "covers/roi.jpg"
    },
    {
      id: "la_vie_en_rose",
      title: "La vie en rose",
      artist: "Michael Bublé",
      src: "music/la_vie_en_rose.mp3",
      cover: "covers/la_vie_en_rose.jpg"
    },
    {
      id: "apocalypse",
      title: "Apocalypse",
      artist: "Cigarettes After Sex",
      src: "music/apocalypse.mp3",
      cover: "covers/apocalypse.jpg"
    },
    {
      id: "be_my_baby",
      title: "Be My Baby",
      artist: "The Ronettes",
      src: "music/be_my_baby.mp3",
      cover: "covers/be_my_baby.jpg"
    },
    {
      id: "strangers_in_the_night",
      title: "Strangers In The Night",
      artist: "Frank Sinatra",
      src: "music/strangers_in_the_night.mp3",
      cover: "covers/strangers_in_the_night.jpg"
    }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;

  // DOM Elements
  const audio = document.getElementById('mainAudio');
  const trackCover = document.getElementById('trackCover');
  const trackTitle = document.getElementById('trackTitle');
  const trackArtist = document.getElementById('trackArtist');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressBar = document.getElementById('progressBar');
  const progressContainer = document.getElementById('progressContainer');
  const playlistToggleBtn = document.getElementById('playlistToggleBtn');
  const playlistDrawer = document.getElementById('playlistDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const playlistItemsContainer = document.getElementById('playlistItems');

  // Intro overlay
  const introOverlay = document.getElementById('introOverlay');
  const openSurpriseBtn = document.getElementById('openSurpriseBtn');

  // Kiss button
  const sendKissBtn = document.getElementById('sendKissBtn');

  // =========================================================================
  // 2. MUSIC PLAYER LOGIC
  // =========================================================================

  function renderPlaylist() {
    playlistItemsContainer.innerHTML = '';
    playlist.forEach((track, index) => {
      const item = document.createElement('div');
      item.className = `playlist-item ${index === currentTrackIndex ? 'active' : ''}`;
      item.innerHTML = `
        <img class="playlist-item-cover" src="${track.cover}" alt="${track.title}" />
        <div class="playlist-item-details">
          <div class="playlist-item-title">${track.title}</div>
          <div class="playlist-item-artist">${track.artist}</div>
        </div>
        ${index === currentTrackIndex && isPlaying ? '<span class="playlist-item-playing-icon">🎵</span>' : ''}
      `;
      item.addEventListener('click', () => {
        loadTrack(index);
        playTrack();
        playlistDrawer.classList.remove('open');
      });
      playlistItemsContainer.appendChild(item);
    });
  }

  function loadTrack(index) {
    currentTrackIndex = index;
    const track = playlist[currentTrackIndex];
    audio.src = track.src;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    trackCover.src = track.cover;
    progressBar.style.width = '0%';
    renderPlaylist();
  }

  function playTrack() {
    audio.play().then(() => {
      isPlaying = true;
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
      trackCover.classList.add('playing');
      renderPlaylist();
    }).catch(err => {
      console.log('Autoplay prevented or audio load issue:', err);
    });
  }

  function pauseTrack() {
    audio.pause();
    isPlaying = false;
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    trackCover.classList.remove('playing');
    renderPlaylist();
  }

  playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  });

  prevBtn.addEventListener('click', () => {
    let newIndex = currentTrackIndex - 1;
    if (newIndex < 0) newIndex = playlist.length - 1;
    loadTrack(newIndex);
    playTrack();
  });

  nextBtn.addEventListener('click', () => {
    let newIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(newIndex);
    playTrack();
  });

  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = `${pct}%`;
    }
  });

  audio.addEventListener('ended', () => {
    let newIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(newIndex);
    playTrack();
  });

  progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    if (audio.duration) {
      audio.currentTime = (clickX / width) * audio.duration;
    }
  });

  // Drawer events
  playlistToggleBtn.addEventListener('click', () => {
    playlistDrawer.classList.toggle('open');
  });

  closeDrawerBtn.addEventListener('click', () => {
    playlistDrawer.classList.remove('open');
  });

  // Close drawer when clicking outside
  document.addEventListener('click', (e) => {
    if (!playlistDrawer.contains(e.target) && !playlistToggleBtn.contains(e.target) && playlistDrawer.classList.contains('open')) {
      playlistDrawer.classList.remove('open');
    }
  });

  // Init track
  loadTrack(0);

  // =========================================================================
  // 3. INTRO OVERLAY UNLOCK (AUDIO AUTOPLAY)
  // =========================================================================
  openSurpriseBtn.addEventListener('click', () => {
    introOverlay.classList.add('hidden');
    playTrack();
    triggerHeartExplosion(window.innerWidth / 2, window.innerHeight / 2, 25);
  });

  // =========================================================================
  // 4. LOVE TIMER (30 JUIN)
  // =========================================================================
  function updateLoveTimer() {
    // Reference date: June 30
    // If we calculate time elapsed from June 30 of this year:
    const now = new Date();
    let startDate = new Date(now.getFullYear(), 5, 30, 0, 0, 0); // Month is 0-indexed (5 = June)
    
    // If current date is before June 30, use previous year
    if (now < startDate) {
      startDate = new Date(now.getFullYear() - 1, 5, 30, 0, 0, 0);
    }

    const diffMs = now - startDate;
    const totalSeconds = Math.floor(diffMs / 1000);

    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const daysEl = document.getElementById('daysCount');
    const hoursEl = document.getElementById('hoursCount');
    const minsEl = document.getElementById('minsCount');
    const secsEl = document.getElementById('secsCount');

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
  }

  updateLoveTimer();
  setInterval(updateLoveTimer, 1000);

  // =========================================================================
  // 5. GOLDEN POLLEN & STAR PARTICLES CANVAS
  // =========================================================================
  const canvas = document.getElementById('beeCanvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.8,
      color: Math.random() > 0.4 ? 'rgba(245, 197, 66, ' : 'rgba(244, 114, 182, ',
      alpha: Math.random() * 0.7 + 0.2,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6 - 0.2,
      pulse: Math.random() * Math.PI
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.03;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      const dynamicAlpha = Math.max(0.1, p.alpha + Math.sin(p.pulse) * 0.25);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + dynamicAlpha + ')';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#f5c542';
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // =========================================================================
  // 6. INTERACTIVE FLYING BEES (ABEJITAS)
  // =========================================================================
  const beesContainer = document.getElementById('beesContainer');
  const beeQuotes = [
    "Bzz! Lin, tu es magnifique 🌸",
    "Je t'aime mon bébé ❤️",
    "9 286 km ne peuvent rien contre nous ✈️",
    "Tu es l'étoile de ma vie ✨",
    "Mon cœur est toujours avec toi à Roanne 🇫🇷",
    "Bzz! Ma chérie adorée 🍯",
    "Pour toujours et à jamais 💫",
    "Le 30 Juin dans mon cœur 📅",
    "Un doux bisou pour Lin 💋"
  ];

  class InteractiveBee {
    constructor() {
      this.element = document.createElement('div');
      this.element.className = 'floating-bee';

      // Cute SVG bee with animated flapping wings
      this.element.innerHTML = `
        <div class="bee-pop-bubble"></div>
        <svg width="42" height="42" viewBox="0 0 100 100">
          <g class="bee-wings">
            <ellipse cx="40" cy="30" rx="14" ry="24" fill="rgba(255,255,255,0.7)" transform="rotate(-30 40 30)" stroke="rgba(245,197,66,0.5)" stroke-width="2"/>
            <ellipse cx="60" cy="30" rx="14" ry="24" fill="rgba(255,255,255,0.7)" transform="rotate(30 60 30)" stroke="rgba(245,197,66,0.5)" stroke-width="2"/>
          </g>
          <!-- Bee Body -->
          <ellipse cx="50" cy="55" rx="22" ry="28" fill="#f5c542" />
          <!-- Bee Stripes -->
          <path d="M30 46 Q50 49 70 46" stroke="#231709" stroke-width="6" fill="none" stroke-linecap="round"/>
          <path d="M28 56 Q50 60 72 56" stroke="#231709" stroke-width="6" fill="none" stroke-linecap="round"/>
          <path d="M32 66 Q50 70 68 66" stroke="#231709" stroke-width="6" fill="none" stroke-linecap="round"/>
          <!-- Stinger -->
          <polygon points="50,83 46,90 54,90" fill="#231709" />
          <!-- Eyes -->
          <circle cx="42" cy="40" r="3.5" fill="#231709" />
          <circle cx="58" cy="40" r="3.5" fill="#231709" />
          <circle cx="43" cy="39" r="1.2" fill="#ffffff" />
          <circle cx="59" cy="39" r="1.2" fill="#ffffff" />
          <!-- Cute Smile -->
          <path d="M46 45 Q50 48 54 45" stroke="#231709" stroke-width="2" fill="none" stroke-linecap="round"/>
        </svg>
      `;

      this.bubble = this.element.querySelector('.bee-pop-bubble');
      this.x = Math.random() * (window.innerWidth - 60);
      this.y = Math.random() * (window.innerHeight - 150) + 50;
      this.vx = (Math.random() - 0.5) * 1.6;
      this.vy = (Math.random() - 0.5) * 1.2;
      this.targetAngle = 0;
      this.isInteracting = false;

      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;

      beesContainer.appendChild(this.element);

      // Click / Touch Event
      this.element.addEventListener('click', (e) => {
        e.stopPropagation();
        this.speak();
        triggerHeartExplosion(this.x + 20, this.y + 20, 8);
      });
    }

    speak() {
      const quote = beeQuotes[Math.floor(Math.random() * beeQuotes.length)];
      this.bubble.textContent = quote;
      this.bubble.classList.add('show');
      this.isInteracting = true;

      setTimeout(() => {
        this.bubble.classList.remove('show');
        this.isInteracting = false;
      }, 2600);
    }

    update() {
      if (!this.isInteracting) {
        this.x += this.vx;
        this.y += this.vy;

        // Gentle bouncing off walls
        if (this.x < 10) { this.x = 10; this.vx *= -1; }
        if (this.x > window.innerWidth - 60) { this.x = window.innerWidth - 60; this.vx *= -1; }
        if (this.y < 20) { this.y = 20; this.vy *= -1; }
        if (this.y > window.innerHeight - 120) { this.y = window.innerHeight - 120; this.vy *= -1; }

        // Slight natural drift
        if (Math.random() < 0.02) {
          this.vx += (Math.random() - 0.5) * 0.8;
          this.vy += (Math.random() - 0.5) * 0.8;
          // Clamp velocity
          this.vx = Math.max(-1.8, Math.min(1.8, this.vx));
          this.vy = Math.max(-1.4, Math.min(1.4, this.vy));
        }

        const scaleX = this.vx >= 0 ? 1 : -1;
        const angle = Math.atan2(this.vy, Math.abs(this.vx)) * (180 / Math.PI) * 0.4;
        this.element.style.transform = `translate(${this.x}px, ${this.y}px) scaleX(${scaleX}) rotate(${angle}deg)`;
      } else {
        this.element.style.transform = `translate(${this.x}px, ${this.y}px) scale(1.2)`;
      }
    }
  }

  // Create 5 friendly bees
  const bees = [];
  const beeCount = Math.min(5, Math.floor(window.innerWidth / 120));
  for (let i = 0; i < Math.max(3, beeCount); i++) {
    bees.push(new InteractiveBee());
  }

  function loopBees() {
    for (let bee of bees) {
      bee.update();
    }
    requestAnimationFrame(loopBees);
  }
  loopBees();

  // =========================================================================
  // 7. HEART EXPLOSION FX
  // =========================================================================
  function triggerHeartExplosion(originX, originY, count = 15) {
    const emojis = ['❤️', '💖', '🐝', '🍯', '✨', '🌸', '💋'];
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      const offsetX = (Math.random() - 0.5) * 160;
      const offsetY = (Math.random() - 0.5) * 80;

      heart.style.left = `${originX + offsetX}px`;
      heart.style.top = `${originY + offsetY}px`;
      heart.style.animationDelay = `${Math.random() * 0.3}s`;

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 2300);
    }
  }

  // Kiss button action
  sendKissBtn.addEventListener('click', (e) => {
    const rect = sendKissBtn.getBoundingClientRect();
    triggerHeartExplosion(rect.left + rect.width / 2, rect.top, 25);
  });

});

class VisitorTracker {
  constructor() {
    this.sessionId = null;
    this.uniqueSections = new Set();
    this.journeyLog = [];
    this.heartbeatInterval = null;
    this.initialized = false;
  }

  initSession() {
    if (this.initialized) return;
    this.initialized = true;

    try {
      this.sessionId = sessionStorage.getItem('apology_session_id');
      if (!this.sessionId) {
        this.sessionId = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
        sessionStorage.setItem('apology_session_id', this.sessionId);
      }

      fetch('/api/track/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.sessionId,
          userAgent: navigator.userAgent,
          screen: `${window.innerWidth}x${window.innerHeight}`,
          referrer: document.referrer || 'direct',
          timestamp: new Date().toISOString()
        })
      }).catch(() => {});

      this.startHeartbeat();
    } catch (e) {}
  }

  trackSection(sectionId, sectionTitle) {
    if (!this.initialized) this.initSession();

    this.journeyLog.push({
      sectionId,
      title: sectionTitle,
      time: new Date().toISOString()
    });

    this.uniqueSections.add(sectionId);

    fetch('/api/track/section', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: this.sessionId,
        sectionId,
        sectionTitle,
        uniqueCount: this.uniqueSections.size,
        totalCanonical: 13,
        timestamp: new Date().toISOString()
      })
    }).catch(() => {});
  }

  startHeartbeat() {
    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
    this.heartbeatInterval = setInterval(() => {
      if (!this.sessionId) return;
      fetch('/api/track/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.sessionId,
          timestamp: new Date().toISOString()
        })
      }).catch(() => {});
    }, 25000);
  }

  trackEvent(eventName, metadata = {}) {
    if (!this.initialized) this.initSession();
    this.journeyLog.push({
      event: eventName,
      title: eventName,
      time: new Date().toISOString(),
      metadata
    });

    fetch('/api/track/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: this.sessionId,
        eventName,
        metadata,
        timestamp: new Date().toISOString()
      })
    }).catch(() => {});
  }

  async submitMessage({ textMessage, voiceBlob, voiceDuration }) {
    if (!this.initialized) this.initSession();
    try {
      let voiceAudioBase64 = null;
      if (voiceBlob) {
        voiceAudioBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(voiceBlob);
        });
      }

      const res = await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.sessionId,
          textMessage: textMessage || null,
          message: textMessage || null,
          voiceAudioBase64,
          voiceDuration: voiceDuration || null,
          timestamp: new Date().toISOString()
        })
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  }

  finalizeSession(reason = 'client_inactivity') {
    if (!this.sessionId || this.finalized) return;
    this.finalized = true;

    try {
      if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);

      const payload = JSON.stringify({
        sessionId: this.sessionId,
        reason,
        timestamp: new Date().toISOString()
      });

      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon('/api/track/end', blob);
      } else {
        fetch('/api/track/end', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true
        }).catch(() => {});
      }
    } catch (e) {}
  }
}

export const tracker = new VisitorTracker();


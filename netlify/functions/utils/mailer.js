import nodemailer from 'nodemailer';

const NOTIFICATION_RECIPIENT = 'ahmedhassanbutt8887@gmail.com';

function createTransporter() {
  const user = process.env.GMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASS || process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });
}

export async function sendFinalSessionEmail({
  sessionId,
  startTimePkt,
  lastActivePkt,
  durationFormatted,
  uniqueCount,
  uniqueSectionTitles,
  journeyTimeline,
  textMessage,
  voiceAudioBase64,
  audioBuffer,
  voiceDuration
}) {
  const transporter = createTransporter();

  const hasText = Boolean(textMessage && textMessage.trim());
  const hasVoice = Boolean(voiceAudioBase64 || audioBuffer);

  let subjectTag = '';
  if (hasText && hasVoice) subjectTag = ' — Message & Voice Received';
  else if (hasText) subjectTag = ' — Message Received';
  else if (hasVoice) subjectTag = ' — Voice Message Received';

  const subject = `Visitor Session Completed — ${uniqueCount}/13 Parts Viewed${subjectTag}`;

  const textContent = `==================================================
VISITOR SESSION FINAL SUMMARY
==================================================

SESSION INFORMATION
----------------------------------------
Session ID: ${sessionId}
Session Start (PKT): ${startTimePkt}
Last Activity (PKT): ${lastActivePkt}
Session Duration: ${durationFormatted}
Status: Completed / Inactive

EXPERIENCE PROGRESS
----------------------------------------
Parts Viewed: ${uniqueCount} / 13

Unique Parts Viewed:
${uniqueSectionTitles && uniqueSectionTitles.length > 0 ? uniqueSectionTitles.map((t, i) => `${i + 1}. ${t}`).join('\n') : '1. Intro'}

CHRONOLOGICAL JOURNEY
----------------------------------------
${journeyTimeline && journeyTimeline.length > 0 ? journeyTimeline.map((j, i) => `${j.timePkt || j.time} — ${j.title}`).join('\n') : 'N/A'}

VISITOR WRITTEN MESSAGE
----------------------------------------
${hasText ? textMessage.trim() : 'Written Message: Not submitted'}

VOICE MESSAGE
----------------------------------------
Recorded: ${hasVoice ? 'YES' : 'NO'}
Duration: ${hasVoice ? (voiceDuration || 'Recorded') : 'N/A'}
${hasVoice ? '(Audio recording attached to this email)' : ''}
==================================================`;

  const attachments = [];
  if (hasVoice) {
    try {
      let finalBuffer = audioBuffer;
      if (!finalBuffer && voiceAudioBase64) {
        const base64Data = voiceAudioBase64.replace(/^data:audio\/[a-zA-Z0-9]+;base64,/, '');
        finalBuffer = Buffer.from(base64Data, 'base64');
      }
      if (finalBuffer && finalBuffer.length > 0) {
        attachments.push({
          filename: `voice-message-${sessionId}.webm`,
          content: finalBuffer,
          contentType: 'audio/webm'
        });
      }
    } catch (e) {
      console.warn('[Mailer] Error creating audio attachment:', e.message);
    }
  }

  if (!transporter) {
    console.log('[Mailer] Gmail credentials not configured in environment.');
    console.log('[Mailer] Simulated Final Session Summary email to:', NOTIFICATION_RECIPIENT);
    console.log('[Mailer] Subject:', subject);
    console.log('[Mailer] Content:\n', textContent);
    return false;
  }

  try {
    const sender = process.env.GMAIL_USER || process.env.SMTP_USER;
    await transporter.sendMail({
      from: `"An Apology Experience" <${sender}>`,
      to: NOTIFICATION_RECIPIENT,
      subject,
      text: textContent,
      attachments
    });
    console.log('[Mailer] Final session summary email sent successfully to:', NOTIFICATION_RECIPIENT);
    return true;
  } catch (err) {
    console.error('[Mailer] Failed to send final session email:', err.message);
    return false;
  }
}
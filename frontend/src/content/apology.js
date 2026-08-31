/**
 * Centralized Apology Content Configuration
 * Authentic, grounded, vulnerable reflections designed for a personal, mature apology experience.
 * Clear placeholders are provided for easy replacement with real names, memories, and personal details.
 */

import { PHOTO_MEMORIES_CONFIG } from '../config/photoConfig';

export const APOLOGY_CONFIG = {
  herName: '[HER_NAME]',
  yourName: '[YOUR_NAME]',

  // 1. Intro — Silence & Opening
  intro: {
    line1: "There are things that are difficult to say out loud without getting defensive.",
    line2: "So I took the time to write them down honestly.",
    subtext: "Whenever you're ready, take a quiet moment.",
    buttonText: "TAKE A MOMENT →"
  },

  // 2. Before You Continue — Boundary & Freedom
  beforeYouContinue: {
    title: "Before you read further...",
    points: [
      "You don't have to forgive me for anything you read here.",
      "You don't owe me a reply, a phone call, or an explanation.",
      "You don't have to feel anything other than what you genuinely feel.",
      "I simply wanted to take full responsibility and say what should have been said."
    ],
    buttonText: "CONTINUE"
  },

  // 3. What I Need to Say — Direct Accountability
  whatINeedToSay: {
    title: "What I Need to Say",
    paragraphs: [
      "I owe you an honest apology — without excuses attached.",
      "Not the kind where I explain why I acted the way I did and expect that explanation to make it okay.",
      "Reasons are not justifications. You shouldn't have had to carry the hurt caused by my mistakes.",
      "I know I was wrong, and I know I hurt you."
    ],
    buttonText: "KEEP READING"
  },

  // 4. The Moment I Realized — Timeline of Realization
  timelineStages: [
    {
      id: 'then',
      label: 'THEN',
      title: 'In the heat of the moment',
      content: "I was focused on my own perspective and reacting impulsively. I allowed pride and defensiveness to get in the way of seeing how my words and actions were landing on you."
    },
    {
      id: 'later',
      label: 'LATER',
      title: 'When the dust settled',
      content: "Sitting alone and looking back honestly, it became painfully clear. I saw the unfairness of how I handled things and the weight it put on you. Saying sorry in my head didn't change what I had caused."
    },
    {
      id: 'now',
      label: 'NOW',
      title: 'Looking back with complete clarity',
      content: "I recognize where I went wrong. There are no excuses, no shifting blame. I own my actions completely, and I am genuinely sorry for the hurt I brought into your life."
    }
  ],

  // 5. What I Got Wrong — Specific Human Reflections
  whatIGotWrong: [
    {
      id: 'listening',
      category: 'LISTENING',
      description: "I was listening to reply or defend myself rather than listening to truly understand what you were going through."
    },
    {
      id: 'understanding',
      category: 'EMPATHY',
      description: "I failed to pause and consider how heavy things felt from your side before reacting."
    },
    {
      id: 'communication',
      category: 'COMMUNICATION',
      description: "I let things get complicated instead of being calm, direct, and transparent when you needed reassurance."
    },
    {
      id: 'patience',
      category: 'PATIENCE',
      description: "I rushed when I should have given you space, and remained silent when I should have spoken with kindness."
    },
    {
      id: 'assumptions',
      category: 'ASSUMPTIONS',
      description: "I made assumptions about your intentions instead of having the humility to ask and listen."
    }
  ],

  // 6. What I Should Have Done — Grounded Contrast
  shouldHaveDone: [
    {
      whatIDid: "Reacted defensively in the moment",
      whatIShouldHaveDone: "Paused, listened, and respected your feelings"
    },
    {
      whatIDid: "Stayed silent when reassurance was needed",
      whatIShouldHaveDone: "Communicated with openness and honesty"
    },
    {
      whatIDid: "Assumed how you felt instead of asking",
      whatIShouldHaveDone: "Asked with patience and genuine care"
    },
    {
      whatIDid: "Focused on being understood first",
      whatIShouldHaveDone: "Focused on understanding you and taking accountability"
    }
  ],

  // 7. Things I Remember — Meaningful, Realistic Memories (Referenced via photoConfig)
  memoriesIntro: {
    title: "Things I Remember",
    subtitle: "Some moments don't need much explanation. They stay with us quietly — in a photograph, a place, a laugh, or something we didn't realize we'd remember. These are a few moments I still carry with me.",
    transitionOut: "Some memories make us smile. Others remind us of what we should have valued while we still had the chance."
  },
  memories: PHOTO_MEMORIES_CONFIG,

  // 8. What I'm Actually Sorry For — Concrete Statements
  actuallySorryFor: {
    intro: "What I'm actually sorry for...",
    transitionLeadIn: "Looking at where things went wrong, I want to be specific about what I regret.",
    points: [
      "The specific hurt and disappointment my behavior caused you.",
      "Making you feel unheard or unvalued in moments you deserved patience.",
      "Letting my own shortcomings become something you had to deal with.",
      "Any moment where my actions made you question your worth to me."
    ]
  },

  // 9. The Main Apology — Emotional Centerpiece
  mainApology: {
    heading: "I'm Sorry.",
    subheading: "Without condition, without defense.",
    transitionLeadIn: "There are no excuses to soften this.",
    paragraphs: [
      "I am not writing this to relieve my own conscience or to demand that things go back to how they were.",
      "I am writing this because you deserved to hear a real apology from someone who knows they were wrong.",
      "You treated me with care, and you deserved that same care and maturity in return."
    ]
  },

  // 10. I Don't Expect Anything — Complete Release
  iDontExpectAnything: {
    transitionLeadIn: "I want to be completely clear about what I expect from you after reading this.",
    points: [
      "I don't expect you to instantly feel okay about this.",
      "I don't expect you to reply or reach out.",
      "I don't expect things to magically reset.",
      "I just needed you to know that I recognize my mistakes, and that I'm truly sorry."
    ],
    buttonText: "ONE LAST THING"
  },

  // 11. Final Letter — Unfolded Digital Letter (Emotional Centerpiece)
  finalLetter: {
    openingNote: "I wrote this because there are some things I haven't been able to say properly. Not because I expect anything from you — I just think you deserve to hear them.",
    heading: "A letter I needed to write properly",
    recipient: "Dear [HER_NAME],",
    body: [
      "I've spent a long time sitting with everything that happened. More than anything, I wanted to write this to you with absolute honesty and without defending myself.",
      "I understand now how my actions landed on you. When [WHAT_I_DID], it caused [WHY_IT_HURT]. You deserved patience, consideration, and respect, and I failed to give you that in the moments it counted most.",
      "Looking back, [WHAT_I_WISH_I_HAD_DONE]. Instead, I let my own defensiveness dictate how I reacted, and you were left to carry the hurt alone.",
      "You have always brought genuine grace and kindness into my life. I often think about [MEMORY_THAT_MEANS_A_LOT], and it reminds me of how much I value and respect who you are.",
      "I know that saying 'I understand' is easy, but [WHAT_I_HAVE_LEARNED]. I know that true change isn't proven in a single letter — it is demonstrated through time and actions.",
      "I am not writing this to make excuses or ask you to pretend nothing happened. You don't owe me forgiveness, and you don't owe me a reply. I just wanted you to have the sincere apology you have always deserved."
    ],
    closing: "With sincerity,",
    signature: "— [YOUR_NAME]",
    postscript: "I'm truly sorry.",
    transitionPrompt: "I've said what I needed to say. Whatever happens next is entirely your choice."
  },

  // 11.5 Your Message — Voice & Text Reflection
  yourMessage: {
    title: "There’s Something I Want to Hear From You",
    subtitle: "If there is anything you want to say, share how you felt, or leave a thought for me — you can write a message or record your voice below. Take your time, with zero pressure.",
    textPlaceholder: "Write anything you want to say...",
    recordButtonText: "Record a Voice Message",
    recordingText: "Recording audio...",
    stopButtonText: "Stop Recording",
    deleteButtonText: "Delete Recording",
    recordAgainText: "Record Again",
    submitButtonText: "SEND MESSAGE",
    successMessage: "Thank you. Your message has been safely saved.",
    micErrorText: "Your microphone isn't available right now. You can still write your message instead.",
    continueWithoutMessageText: "CONTINUE →"
  },

  // 12. Final Choice — Respectful Autonomy
  finalChoice: {
    title: "Whatever you feel right now is okay.",
    intro: [
      "You don't have to decide anything right now.",
      "You don't owe me forgiveness, and you don't owe me an answer.",
      "Whatever you feel after reading this, you are allowed to feel it."
    ],
    options: [
      {
        id: 'need_time',
        label: "I need some time.",
        acknowledgement: "Take all the time you need. There is nothing you need to answer right now."
      },
      {
        id: 'accept_apology',
        label: "I accept your apology.",
        acknowledgement: "Thank you for hearing me. I don't take those words lightly."
      },
      {
        id: 'leave_here',
        label: "I need to leave this here.",
        acknowledgement: "I understand. Thank you for taking the time to read this. I genuinely wish you well."
      }
    ],
    closingNote: "Whatever happens from here, thank you for being here long enough to read this."
  },

  // 13. End Experience — Peaceful & Quiet Closure
  endExperience: {
    title: "That's everything I wanted to say.",
    paragraphs: [
      "I don't know what you'll take from these words, or what you'll feel after reading them. And honestly, I don't expect you to know either.",
      "But I wanted to say these things properly, without asking anything from you in return.",
      "Whatever you decide, whatever you feel, I will respect it."
    ],
    closing: "With sincerity,",
    signature: "— [YOUR_NAME]",
    thankYou: "Thank you for reading.",
    buttonText: "END EXPERIENCE ✦",
    buttonAriaLabel: "Close the apology experience",
    fallbackMessage: "The experience has ended. You can close this tab whenever you're ready."
  }
};

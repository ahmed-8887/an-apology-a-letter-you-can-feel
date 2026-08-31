import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { tracker } from '../services/tracker';

const SECTION_MAP = {
  '/': { id: 'sec_1', title: 'Intro' },
  '/1': { id: 'sec_1', title: 'Intro' },
  '/intro': { id: 'sec_1', title: 'Intro' },
  '/2': { id: 'sec_2', title: 'Before You Continue' },
  '/before-you-continue': { id: 'sec_2', title: 'Before You Continue' },
  '/3': { id: 'sec_3', title: 'What I Need to Say' },
  '/what-i-need-to-say': { id: 'sec_3', title: 'What I Need to Say' },
  '/4': { id: 'sec_4', title: 'The Moment I Realized' },
  '/the-moment-i-realized': { id: 'sec_4', title: 'The Moment I Realized' },
  '/stars': { id: 'sec_4', title: 'The Moment I Realized' },
  '/starssvg': { id: 'sec_4', title: 'The Moment I Realized' },
  '/5': { id: 'sec_5', title: 'What I Got Wrong' },
  '/what-i-got-wrong': { id: 'sec_5', title: 'What I Got Wrong' },
  '/gift': { id: 'sec_5', title: 'What I Got Wrong' },
  '/giftsvg': { id: 'sec_5', title: 'What I Got Wrong' },
  '/6': { id: 'sec_6', title: 'What I Should Have Done' },
  '/what-i-should-have-done': { id: 'sec_6', title: 'What I Should Have Done' },
  '/7': { id: 'sec_7', title: 'Things I Remember' },
  '/things-i-remember': { id: 'sec_7', title: 'Things I Remember' },
  '/memories': { id: 'sec_7', title: 'Things I Remember' },
  '/8': { id: 'sec_8', title: 'What I Am Actually Sorry For' },
  '/what-im-actually-sorry-for': { id: 'sec_8', title: 'What I Am Actually Sorry For' },
  '/messages': { id: 'sec_8', title: 'What I Am Actually Sorry For' },
  '/9': { id: 'sec_9', title: 'The Main Apology' },
  '/the-main-apology': { id: 'sec_9', title: 'The Main Apology' },
  '/universe': { id: 'sec_9', title: 'The Main Apology' },
  '/birthday': { id: 'sec_9', title: 'The Main Apology' },
  '/10': { id: 'sec_10', title: 'I Do Not Expect Anything' },
  '/i-dont-expect-anything': { id: 'sec_10', title: 'I Do Not Expect Anything' },
  '/11': { id: 'sec_11', title: 'Final Letter' },
  '/final-letter': { id: 'sec_11', title: 'Final Letter' },
  '/12': { id: 'sec_12', title: 'Final Choice' },
  '/final-choice': { id: 'sec_12', title: 'Final Choice' },
  '/message': { id: 'sec_12', title: 'Final Choice' },
  '/13': { id: 'sec_13', title: 'End Experience' },
  '/end-experience': { id: 'sec_13', title: 'End Experience' }
};

export function useVisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    tracker.initSession();
    const current = SECTION_MAP[location.pathname.toLowerCase()] || { id: 'sec_custom', title: location.pathname };
    tracker.trackSection(current.id, current.title);
  }, [location.pathname]);
}

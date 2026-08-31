import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useVisitorTracker } from './hooks/useVisitorTracker';

import IntroSection from './sections/01_IntroSection';
import BeforeYouContinueSection from './sections/02_BeforeYouContinueSection';
import WhatINeedToSaySection from './sections/03_WhatINeedToSaySection';
import TheMomentIRealizedSection from './sections/04_TheMomentIRealizedSection';
import WhatIGotWrongSection from './sections/05_WhatIGotWrongSection';
import WhatIShouldHaveDoneSection from './sections/06_WhatIShouldHaveDoneSection';
import ThingsIRememberSection from './sections/07_ThingsIRememberSection';
import WhatImActuallySorryForSection from './sections/08_WhatImActuallySorryForSection';
import TheMainApologySection from './sections/09_TheMainApologySection';
import IDontExpectAnythingSection from './sections/10_IDontExpectAnythingSection';
import FinalLetterSection from './sections/11_FinalLetterSection';
import YourMessageSection from './sections/YourMessageSection';
import FinalChoiceSection from './sections/12_FinalChoiceSection';
import EndExperienceSection from './sections/13_EndExperienceSection';

export default function App() {
  useVisitorTracker();

  return (
    <Routes>
      <Route path="/" element={<IntroSection />} />
      <Route path="/1" element={<IntroSection />} />
      <Route path="/intro" element={<IntroSection />} />

      <Route path="/2" element={<BeforeYouContinueSection />} />
      <Route path="/before-you-continue" element={<BeforeYouContinueSection />} />

      <Route path="/3" element={<WhatINeedToSaySection />} />
      <Route path="/what-i-need-to-say" element={<WhatINeedToSaySection />} />

      <Route path="/4" element={<TheMomentIRealizedSection />} />
      <Route path="/the-moment-i-realized" element={<TheMomentIRealizedSection />} />
      <Route path="/stars" element={<TheMomentIRealizedSection />} />
      <Route path="/starssvg" element={<TheMomentIRealizedSection />} />

      <Route path="/5" element={<WhatIGotWrongSection />} />
      <Route path="/what-i-got-wrong" element={<WhatIGotWrongSection />} />
      <Route path="/gift" element={<WhatIGotWrongSection />} />
      <Route path="/giftsvg" element={<WhatIGotWrongSection />} />

      <Route path="/6" element={<WhatIShouldHaveDoneSection />} />
      <Route path="/what-i-should-have-done" element={<WhatIShouldHaveDoneSection />} />

      <Route path="/7" element={<ThingsIRememberSection />} />
      <Route path="/things-i-remember" element={<ThingsIRememberSection />} />
      <Route path="/memories" element={<ThingsIRememberSection />} />

      <Route path="/8" element={<WhatImActuallySorryForSection />} />
      <Route path="/what-im-actually-sorry-for" element={<WhatImActuallySorryForSection />} />
      <Route path="/messages" element={<WhatImActuallySorryForSection />} />

      <Route path="/9" element={<TheMainApologySection />} />
      <Route path="/the-main-apology" element={<TheMainApologySection />} />
      <Route path="/universe" element={<TheMainApologySection />} />
      <Route path="/birthday" element={<TheMainApologySection />} />

      <Route path="/10" element={<IDontExpectAnythingSection />} />
      <Route path="/i-dont-expect-anything" element={<IDontExpectAnythingSection />} />

      <Route path="/11" element={<FinalLetterSection />} />
      <Route path="/final-letter" element={<FinalLetterSection />} />

      <Route path="/your-message" element={<YourMessageSection />} />
      <Route path="/message" element={<YourMessageSection />} />

      <Route path="/12" element={<FinalChoiceSection />} />
      <Route path="/final-choice" element={<FinalChoiceSection />} />

      <Route path="/13" element={<EndExperienceSection />} />
      <Route path="/end-experience" element={<EndExperienceSection />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

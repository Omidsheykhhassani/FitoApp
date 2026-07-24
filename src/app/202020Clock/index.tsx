import AppContainer from '@/components/AppContainer/AppContainer'

import ClockApp from '@/miniapps/202020ClockApp/202020ClockApp';

import "../global.css";

export default function Clock() {
  return (
    <AppContainer>
      <ClockApp />
    </AppContainer>
  );
}
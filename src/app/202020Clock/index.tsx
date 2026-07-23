import AppContainer from '@/components/AppContainer/AppContainer'

import ClockApp from '@/miniapps/202020ClockApp/202020ClockApp';

import "../global.css";

type Props = {}

export default function Clock({}: Props) {
  return (
    <AppContainer>
      <ClockApp />
    </AppContainer>
  );
}
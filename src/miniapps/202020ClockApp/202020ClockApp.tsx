import { useEffect, useState } from "react";

import Button from "@/components/Button/Button";

import { Text, View } from "react-native";

type Props = {};

type ClockStateType =
  "stopped" | "session" | "sessionFinished" | "break" | "breakFinished";

const SESSION_DURATION = 20; // seconds temporarily
const BREAK_DURATION = 10; // seconds temporarily

export default function ClockApp({}: Props) {
  const [clockState, setClockState] = useState<ClockStateType>("stopped");

  const [endTime, setEndTime] = useState<number | null>(null);

  const [remainingSeconds, setRemainingSeconds] = useState(0);

  function startTimer(
    durationInSeconds: number,
    nextState: "session" | "break",
  ) {
    const newEndTime = Date.now() + durationInSeconds * 1000;

    setEndTime(newEndTime);
    setClockState(nextState);
    setRemainingSeconds(durationInSeconds);
  }

  function startSession() {
    startTimer(SESSION_DURATION, "session");
  }

  function startBreak() {
    startTimer(BREAK_DURATION, "break");
  }

  function stopClock() {

  }

  useEffect(() => {
    if (clockState !== "session" && clockState !== "break") {
      return;
    }

    if (!endTime) {
      return;
    }

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));

      setRemainingSeconds(remaining);

      if (remaining === 0) {
        clearInterval(interval);

        if (clockState === "session") {
          setClockState("sessionFinished");
        }

        if (clockState === "break") {
          setClockState("breakFinished");
        }
      }
    }, 250);

    return () => clearInterval(interval);
  }, [clockState, endTime]);

  function formatTime(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}`;
  }

  const totalDuration =
    clockState === "session" ? SESSION_DURATION : BREAK_DURATION;

  const progress = remainingSeconds / totalDuration;

  let buttonText: string;

  switch (clockState) {
    case "stopped":
      buttonText = "Start The Clock";
      break;
    case "session":
      buttonText = "Stop The Clock";
      break;
    case "break":
      buttonText = "End The Break";
      break;
    default:
      buttonText = "Start";
  }

  return (
    <View className="flex-1 justify-center items-center">
      <View className="w-full mx-4 border-4 border-primary-500 bg-background-500 rounded-full z-10">
        <View className="justify-center items-center w-full border border-text-500 aspect-square rounded-full">
          <Text
            className="text-center text-text-500 text-4xl"
            style={{
              fontFamily: "Rubik-SemiBold",
            }}
          >
            {formatTime(remainingSeconds)}
          </Text>
        </View>
      </View>
      {clockState === "stopped" && (
        <Button onPress={startSession}>Start The Clock</Button>
      )}
      {clockState === "sessionFinished" && (
        <Button onPress={startBreak}>Start Break</Button>
      )}
      {clockState === "sessionFinished" && (
        <View className="absolute inset-0 z-50 items-center justify-center bg-black/50">
          <View className="rounded-3xl bg-background-500 p-6">
            <Text>Session is over</Text>

            <Button onPress={startBreak}>Start Break</Button>
          </View>
        </View>
      )}
      {clockState === "breakFinished" && (
        <View className="absolute inset-0 z-50 items-center justify-center bg-black/50">
          <View className="rounded-3xl bg-background-500 p-6">
            <Text>Break is over</Text>

            <Button onPress={startSession}>Start New Session</Button>

            <Button onPress={stopClock}>Stop The Clock</Button>
          </View>
        </View>
      )}
    </View>
  );
}

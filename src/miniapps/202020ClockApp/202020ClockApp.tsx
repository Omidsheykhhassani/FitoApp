import { useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";

import { Text, Vibration, View } from "react-native";

import { useAudioPlayer } from "expo-audio";

import * as Haptics from "expo-haptics";

import Svg, { Circle } from "react-native-svg";

import * as Notifications from "expo-notifications";

type ClockStateType =
  "stopped" | "session" | "sessionFinished" | "break" | "breakFinished";

const SESSION_DURATION = 20;
const BREAK_DURATION = 10;

const CIRCUMFERENCE = 2 * Math.PI * 48;

export default function ClockApp() {
  const [clockState, setClockState] = useState<ClockStateType>("stopped");

  const [endTime, setEndTime] = useState<number | null>(null);

  const [remainingSeconds, setRemainingSeconds] = useState(SESSION_DURATION);

  const [notificationId, setNotificationId] = useState<string | null>(null);

  const alarmPlayer = useAudioPlayer(
    require("../../../assets/sound/alarm.wav"),
  );

  async function startTimer(
    durationInSeconds: number,
    nextState: "session" | "break",
  ) {
    const newEndTime = Date.now() + durationInSeconds * 1000;

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: nextState === "session" ? "Session Complete" : "Break Complete",
        body:
          nextState === "session"
            ? "Your session is over. Time for a break."
            : "Your break is over. Ready for a new session?",
        sound: "alarm.wav",
        data: {
          type: nextState === "session" ? "sessionFinished" : "breakFinished",
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: new Date(newEndTime),
      },
    });

    setNotificationId(id);

    setEndTime(newEndTime);
    setClockState(nextState);
    setRemainingSeconds(durationInSeconds);
  }

  function startSession() {
    stopAlarm();
    startTimer(SESSION_DURATION, "session");
  }

  function startBreak() {
    stopAlarm();
    startTimer(BREAK_DURATION, "break");
  }

  async function stopClock() {
    stopAlarm();

    if (notificationId) {
      await Notifications.cancelScheduledNotificationAsync(notificationId);

      setNotificationId(null);
    }

    setClockState("stopped");
    setEndTime(null);
    setRemainingSeconds(SESSION_DURATION);
  }

  async function playAlarm() {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

    alarmPlayer.loop = true;
    await alarmPlayer.seekTo(0);
    alarmPlayer.play();
  }

  async function stopAlarm() {
    alarmPlayer.pause();
    await alarmPlayer.seekTo(0);
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

        playAlarm();

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
    clockState === "session" || clockState === "sessionFinished"
      ? SESSION_DURATION
      : BREAK_DURATION;

  const progress =
    clockState === "session" || clockState === "break"
      ? remainingSeconds / totalDuration
      : 1;

  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

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

  function testVibration() {
    Vibration.vibrate(1000);
    console.log("firing");
  }

  return (
    <View className="flex-1 justify-center items-center">
      <View className="relative aspect-square w-full mx-4">
        <View className="absolute inset-0 m-2 justify-center items-center rounded-full border border-text-500 bg-background-500">
          <Text
            className="text-center text-text-500 text-4xl"
            style={{ fontFamily: "Rubik-SemiBold" }}
          >
            {formatTime(remainingSeconds)}
          </Text>
        </View>
        <Svg className="absolute inset-0" viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="#ff9696"
            strokeWidth="2"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
          />
        </Svg>
      </View>
      {clockState === "stopped" && (
        <Button onPress={startSession}>Start The Clock</Button>
      )}
      {(clockState === "session" || clockState === "sessionFinished") && (
        <Button onPress={stopClock}>Stop The Session</Button>
      )}
      {(clockState === "break" || clockState === "breakFinished") && (
        <Button onPress={stopClock}>Stop The Break</Button>
      )}
      {clockState === "sessionFinished" && (
        <Modal title="Session is over!">
          <Button onPress={startBreak}>Start Break</Button>
          <Button onPress={stopClock}>Stop The Clock</Button>
        </Modal>
      )}
      {clockState === "breakFinished" && (
        <Modal title="Break is over!">
          <Button onPress={startSession}>Start New Session</Button>
          <Button onPress={stopClock}>Stop The Clock</Button>
        </Modal>
      )}
      <Button onPress={testVibration}>Test Vibration</Button>
    </View>
  );
}

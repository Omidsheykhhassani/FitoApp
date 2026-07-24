import * as Notifications from "expo-notifications";

export async function setupAlarmNotifications() {
  await Notifications.setNotificationChannelAsync("timer-alarm", {
    name: "Timer Alarm",
    importance: Notifications.AndroidImportance.MAX,
    sound: "alarm.wav",
    vibrationPattern: [0, 500, 500, 500],
    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
  });
}

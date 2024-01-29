import { showNotification } from "@mantine/notifications";

export enum NotificationType {
  ERROR = "red",
  SUCCESS = "green",
  INFO = "blue",
}

type NotifyPropTypes = {
  message: string;
  title: string;
  type: NotificationType;
  autoCloseTime?: number;
};

export function Notify(props: NotifyPropTypes) {
  const { message, title, type, autoCloseTime = 3000 } = props;

  showNotification({
    message: message,
    title: title,
    autoClose: autoCloseTime,
    color: type,
  });
}

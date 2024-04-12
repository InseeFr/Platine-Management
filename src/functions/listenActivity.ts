const defaultListener = () => console.log("User is active !");
export const listenActivity = (listener = defaultListener) => {
  const activityEvents = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];
  activityEvents.forEach(function (eventName) {
    window.addEventListener(eventName, listener, false);
  });
};

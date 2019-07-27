#!/usr/bin/bash

export DISPLAY=:0.0
export DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket

# rotate screen if env variable is set [normal, inverted, left or right]
if [[ ! -z "$ROTATE_DISPLAY" ]]; then
  echo "YES"
  (sleep 3 && DISPLAY=:0 xrandr -o $ROTATE_DISPLAY) &
fi

# start desktop manager
echo "STARTING X"
# startx --

# uncomment to start x without mouse cursor
# startx -- -nocursor

# uncomment to open an application instead of the desktop
startx chromium http://frontend:3000 --incognito --no-sandbox --kiosk --window-size=1920,1080 \
  --start-fullscreen --noerrdialogs --disable-translate --no-first-run \
  --fast --fast-start --disable-infobars --disable-features=TranslateUI \
  --disk-cache-dir=/dev/null

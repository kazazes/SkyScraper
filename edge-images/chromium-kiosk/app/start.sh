#!/bin/bash

export DISPLAY=:0.0
export DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket

killall chromium

# By default docker gives us 64MB of shared memory size but to display heavy
# pages we need more.
umount /dev/shm && mount -t tmpfs shm /dev/shm
rm /tmp/.X0-lock &>/dev/null || true

# set hostname based on balena uuid
echo "skyscraper-kiosk" >/etc/hostname
hostname $HNAME

# changing xwrapper config to run for any user
echo "allowed_users=anybody" >/etc/X11/Xwrapper.config
echo "needs_root_rights=yes" >>/etc/X11/Xwrapper.config

# adding user to run chromium since it will not run as root
useradd chromium -m -s /bin/bash -G root,tty
usermod -a -G root,tty chromium

# adding script to start chromium
echo "#!/bin/bash" >/home/chromium/xstart.sh
echo "chromium ${KIOSK_URL} --kiosk --app --incognito --window-size=1920,1080 --start-fullscreen \
--noerrdialogs --disable-translate --no-first-run --fast --fast-start --disable-infobars --disable-features=TranslateUI \
" >>/home/chromium/xstart.sh
chmod 770 /home/chromium/xstart.sh
chown chromium:chromium /home/chromium/xstart.sh

# starting chromium as chrome user
su -c 'startx /home/chromium/xstart.sh' chromium

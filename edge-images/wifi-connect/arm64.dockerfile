FROM balenalib/odroid-xu4-debian

RUN install_packages dnsmasq wireless-tools

WORKDIR /usr/src/app

COPY ui ui
COPY scripts/start.sh wifi-connect ./

CMD ["bash", "start.sh"]

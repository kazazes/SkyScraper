FROM balenalib/odroid-xu4-debian

RUN install_packages dnsmasq wireless-tools

WORKDIR /usr/src/app

COPY scripts/start.sh ui wifi-connect ./

CMD ["bash", "start.sh"]

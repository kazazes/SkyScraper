FROM balenalib/intel-nuc-debian

RUN install_packages dnsmasq wireless-tools

WORKDIR /usr/src/app

COPY scripts/start.sh wifi-connect ui ./

CMD ["bash", "start.sh"]

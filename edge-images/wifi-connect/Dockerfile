FROM balenalib/intel-nuc-debian

RUN install_packages dnsmasq wireless-tools

WORKDIR /usr/src/app

COPY scripts/start.sh ui wifi-connect ./

CMD ["bash", "start.sh"]

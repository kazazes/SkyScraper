FROM stanback/alpine-samba

RUN SMBUSER=${SMBUSER:-skyscraper} \
  SMBPASS=${SMBPASS:-$craping$kies} \
  echo -ne "$SMBPASS\n$SMBPASS\n" | smbpasswd -a -s $SMBUSER

COPY smb.conf /etc/samba/

EXPOSE 445

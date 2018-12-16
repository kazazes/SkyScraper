import sys
import csv
import StringIO
import json
from threading import Thread
from SimpleWebSocketServer import WebSocket, SimpleWebSocketServer

clients = []

class SockClient(WebSocket):

    def handleMessage(self):
        if self.data is None:
            self.data = ''
            try:
                self.sendMessage(str(self.data))
            except:
                print "Could not send message to client."

    def handleConnected(self):
        print self.address, 'connected'
        clients.append(self)

        self.sendMessage("hello");

    def handleClose(self):
        clients.remove(self)

        print self.address, 'closed'

    def sendEvent(self, evt):
        print "sending message to ",self.address
        self.sendMessage(evt)

def triggerEvent(evt):
    for client in clients[:]:
        client.sendEvent(evt)

def startServer():
    server = SimpleWebSocketServer('', 8080, SockClient)
    server.serveforever()

serverThread = Thread(target = startServer)
serverThread.start()

try:
    while True:
        line = sys.stdin.readline()
        data = csv.reader(StringIO.StringIO(line))

        lst = []
        for r in data:
            lst.append(r)

        triggerEvent(json.dumps(lst))

except KeyboardInterrupt: 
    sys.exit()


#!/bin/bash

# Add GNU Radio binaries to the search path
GNURADIO_PATH=/opt/gnuradio-3.7.13.4
export PATH=$PATH:$GNURADIO_PATH/bin

# Add GNU Radio python libraries to python search path
if [ $PYTHONPATH ]; then
        export PYTHONPATH=$PYTHONPATH:$GNURADIO_PATH/lib/python2.7/dist-packages
else
        export PYTHONPATH=$GNURADIO_PATH/lib/python2.7/dist-packages
fi

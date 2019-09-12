<template>
    <v-card
            class="mb-5 text-xs-justify"
            color="transparent"
            max-height="300px"
            style="overflow-y: auto;"
            id="setup-welcome"
    >
        <v-card-text>
            <p>
                SkyScraper abstracts away the configuration, compilation and endless shots in the dark of dealing
                with SDR software and its assorted woes. More complex systems, like trunked radio systems, are
                auto-configured by location. We're SDR vendor agnostic. Plug it in, and SkyScraper will allocate
                its bandwidth appropriately. If you know your way around already, there is an entire dev
                playground built in to the data processing stack. NLP, realtime transcription, intelligent
                alerting,
                with a sanitized and standardized dataset of plane, train and boat telemetry, cops, firemen,
                robbers, taxi drivers, ISS transmissions, NOAA weather satellite images and all the good data
                we've juiced out of it.
            </p>
            <p>
                SkyScraper is the first device dedicated to capturing all the (legal, per the FCC) bits and bytes
                flying around us, whatever the protocol, whatever the context, and further enriching that data
                until it affects change. For a journalist, that's getting a push notification about an incident
                as soon as a 911 call is placed. For a falconer, it's finding your tagged bird six hours sooner
                than otherwise, for a marine biologist it's visualizing tagged sharks with higher fidelity than
                satellite capture could never rival.
            </p>
            <p class="blockquote">
                “New innovations in SDR hardware won’t be very useful, however, if the
                software and tools don’t follow. That is the whole point of SDR, after all.”
                <br/>
                <span
                        style="display:block"
                        class="text-xs-right"
                >- National Instruments, SDR: Past, Present, and Future</span>
            </p>
        </v-card-text>
    </v-card>
</template>
<script lang="ts">
  export default {
    name: "admin-registration",
  };
</script>
<style scss>
    #setup-welcome::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: inherit;
    }

    #setup-welcome::-webkit-scrollbar
    {
        width: 8px;
        background-color: transparent;
    }

    #setup-welcome::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #D62929;
    }
</style>

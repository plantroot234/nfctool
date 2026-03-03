async function writeNFC() {
    if ('NDEFWriter' in window) {
        try {
            const writer = new NDEFWriter();
            const url = document.getElementById("urlInput").value;

            await writer.write({
                records: [{
                    recordType: "url",
                    data: url
                }]
            });

            alert("Successfully written!");
        } catch (error) {
            alert("Write failed: " + error);
        }
    } else {
        alert("Web NFC not supported on this device (iPhone Safari doesn't support it).");
    }
}

async function scanNFC() {
    if ('NDEFReader' in window) {
        try {
            const reader = new NDEFReader();
            await reader.scan();

            reader.onreading = event => {
                const decoder = new TextDecoder();
                for (const record of event.message.records) {
                    document.getElementById("scanResult").innerText =
                        decoder.decode(record.data);
                }
            };
        } catch (error) {
            alert("Scan failed: " + error);
        }
    } else {
        alert("Web NFC not supported on this device.");
    }
}

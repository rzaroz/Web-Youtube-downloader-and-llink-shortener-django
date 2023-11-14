$(document).ready(function (e) {
    let audivideo = document.getElementById("audiovideo")
    let resolation = document.getElementById("resoulation")
    let sendbtn = document.getElementById("submitbtn")
    let urlinput = document.getElementById("urlin")
    let downloadiv = document.getElementById("download")
    var socket = new WebSocket(
        'ws://' + window.location.host + '/YoutubeWS/'
    )
    socket.binaryType = "arraybuffer"
    let blob = null
    let array = []
    let filesize = null
    let darsad = 0

    audivideo.addEventListener("change", function (e) {
        if (audivideo.value === "audio") {
            resolation.innerHTML = `
                <option value="128p">
                    <h4>
                        128p
                    </h4>
                </option>
                <option value="320p">
                    <h4>
                        320p
                    </h4>
                </option>
            `
        }
        if (audivideo.value === "video") {
            resolation.innerHTML = `
                <option value="480p">
                    <h4>
                        480p
                    </h4>
                </option>
                <option value="720p">
                    <h4>
                        720p
                    </h4>
                </option>
            `
        }
    })


    socket.onmessage = function (e) {
        let msg = e.data
        let data = null
        try {
            data = JSON.parse(e.data)
        }catch (e) {
            data = msg
        }
        function createFile() {
            while (true) {
                socket.send("file")
                if (data instanceof Array) {

                }

                if (typeof data == "object") {

                }
            }
        }

        if (typeof data == "object") {

            if (data.hasOwnProperty("ready")) {
                filesize = data["size"]
                downloadiv.innerHTML = `
                    <h4 class="fileSize"><span>${Math.floor(data["size"]/1000000)}</span>mb حجم فایل</h4>
                    <h4 class="fileSize" ><span id="darsad">${Math.floor(darsad)}%</span>درصد اتمام آماده سازی</h4>
                `
                socket.send("file")
            }

            if (data.hasOwnProperty("filedone")) {
                blob = new Blob(array, {type: "text/plain"})
                let filedownloadUrl = URL.createObjectURL(blob)

                if (audivideo.value == "audio") {
                    downloadiv.innerHTML += `
                        <a href="${filedownloadUrl}" download="${data["title"]}.mp3" class="File"><h4>دانلود موزیک</h4></a>
                    `
                }else if (audivideo.value == "video") {
                    downloadiv.innerHTML += `
                        <a href="${filedownloadUrl}" download="${data["title"]}.mp4" class="File"><h4>دانلود ویدیو</h4></a>
                    `
                }
                darsad = 0
                blob = null
                array = []
            }

        }

        if (data == "err") {
            downloadiv.innerHTML = `
                <h4 class="error"> !خظا در دانلود ویدیو لطفا لینک خود را بررسی و مجددا تلاش فرمایید </h4>
            `
        }

        if (data instanceof ArrayBuffer) {
            array.push(data)
            downloadiv.innerHTML
            darsad = darsad + (data.byteLength * 100 / filesize)
            document.getElementById("darsad").innerText = `${Math.floor(darsad)}%`
            socket.send("file")
        }

    }

    socket.onclose = function (e) {
        console.error("Socket is dead")
    }

    sendbtn.addEventListener("click", function (e) {
        downloadiv.innerHTML = `
            <div class="animation">
                <lottie-player src="https://lottie.host/71eef4ab-3d62-4bbd-bad1-80bbc6737d6a/ImBsmXZ2Pw.json" background="transparent" speed="1" style="width: auto; height: auto;" loop autoplay direction="1" mode="normal"></lottie-player>
            </div>
        `
        let mssg = {
            "url": urlinput.value,
            "res": resolation.value,
            "type": audivideo.value
        }
        let data = JSON.stringify(mssg)
        socket.send(data)
    })

})
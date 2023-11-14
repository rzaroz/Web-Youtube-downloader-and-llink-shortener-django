$(document).ready(function (e) {
    let sendbtn = document.getElementById("submitbtn")
    let urlinput = document.getElementById("urlin")
    let resolation = document.getElementById("resoulation")
    let downloadiv = document.getElementById("download")
    let filearray = null
    let blob = null
    let array = []
    var socket = new WebSocket(
        'ws://' + window.location.host + '/YoutubeWS/'
    )
    socket.binaryType = "arraybuffer"
    socket.onmessage = function (e) {
        var message = e.data
        let data = null

        try {
            data = JSON.parse(message)

        }catch (e) {
            data = message
        }

        if (data instanceof ArrayBuffer) {
            array.push(data)
        }


        socket.binaryType = "arraybuffer"
        if (typeof data == "string") {
            if (data === "err") {
                downloadiv.innerHTML = `<div class="error">
                                            <h4>
                                                مشکلی در لینک یا رزولیشن ویدیو وجود دارد لطفا با رزولیشن دیگری امتحان کنید و مجددا لینک خود را چک کنید
                                            </h4>
                                        </div>`
            }

        }

        if (typeof data == "object") {
            if (data.hasOwnProperty("done")) {
                blob = new Blob(array, { type: 'application/octet-stream' })
                let downloadurl = URL.createObjectURL(blob)
                console.log(downloadurl)
                downloadiv.innerHTML = `
                    <a href="${downloadurl}" class="File" download="${data["title"]}.mp4">
                        دانلود فایل
                    </a>
                `
            }
            if (Object.hasOwn(data, "size")){
                downloadiv.innerHTML = `
                    <div class="fileSize">
                        <h4>${Math.floor(data["size"]/1000000)}<span>mg</span></h4><span>حجم فایل</span>
                    </div>
                    <div class="loader">
                        <h4>لطفا تا اتمام دانلود شکیبا باشید</h4>
                    </div>
                    <div class="animation">
                        <lottie-player src="https://lottie.host/71eef4ab-3d62-4bbd-bad1-80bbc6737d6a/ImBsmXZ2Pw.json" background="transparent" speed="1" style="width: auto; height: auto;" loop autoplay direction="1" mode="normal"></lottie-player>
                    </div>
                `
            }

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
            "res": resolation.value
        }
        let data = JSON.stringify(mssg)
        socket.send(data)
    })

})
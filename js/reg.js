//Register Service Worker
if ("serviceWorker" in navigator){
    window.addEventListener("load", function(){
        navigator.serviceWorker
        .register("/sw.js")
        .then(function(){
            console.log("Pendaftaran Service Worker Berhasil");
            requestPermission();
        })
        .catch(function(){
            console.log("Pendaftaran Service Worker Gagal");
        });
    });
}else{
    console.log("Service Worker Belum Didukung Browser Ini.");
}

//Request Permission Push API

function requestPermission(){
    if ('Notification' in window) {
        Notification.requestPermission().then(function(result){
          if (result === "denied") {
              console.log("Fitur Notifikasi tidak diijinkan.");
              return;
          } else if (result === "default"){
              console.error("User menutup kotak dialog permintaan ijin.");
              return;
          } 


          navigator.serviceWorker.ready.then(() => {
            if ('PushManager' in window) {
              navigator.serviceWorker.getRegistration()
              .then((registration) => {
                  registration.pushManager.subscribe({
                      userVisibleOnly: true,
                      applicationServerKey: urlBase64ToUint8Array("BB8RiKnUIuquyB-S5sxfN5Kua-cOR7cjOWZtcWhe8wxYA26g5hxV-dTIE4rvFDfMTG2grXMa-Uj_7J4UdCpM7W4"),
                  })
                  .then((subscribe) => {
                    console.table({
                        endpoit: subscribe.endpoint,
                        pd256key: btoa(
                        String.fromCharCode.apply(
                            null,
                            new Uint8Array(subscribe.getKey("p256dh"))
                        )
                        ),
                        authKey: btoa(
                        String.fromCharCode.apply(
                            null,
                            new Uint8Array(subscribe.getKey("auth"))
                        )
                        ),
                    });
                    })
                  .catch(function(e){
                      console.error('Tidak dapat melakukan subscribe', e.message);
                  });
              });
            }
          });              
        });
    }
}

//mengubah string jadi Uint8Array
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}



//Request API untuk pertama kali

document.addEventListener("DOMContentLoaded", function(){
    getArticles();
});
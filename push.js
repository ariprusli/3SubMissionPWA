var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BB8RiKnUIuquyB-S5sxfN5Kua-cOR7cjOWZtcWhe8wxYA26g5hxV-dTIE4rvFDfMTG2grXMa-Uj_7J4UdCpM7W4",
   "privateKey": "O6f9MmtFNefeTa3VEh5rUMkqKyVaoUB0tPhtGZ2Jbcw"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/ckb61S5uKGc:APA91bHw_QR7T5AKAGxfQcZ_jTLhI2wzEeewbia5JsaYwxzcvoG0tlOas9x-syHraVAJgN2toP8dIvPDi66SXbO6vaPLuKuAI6AHnxUYZj7TxucYIPgIa2yb0UottUJwOhN2UMOaKMYf",
   "keys": {
       "p256dh": "BOQJfVUkWel6h5zBB7HhxR5BjKjKrhbXaWEwWFkzLr507Kri/OL4k0vGYchiMs6aQ9gs44hHXo5CSwUZATOWf5s=",
       "auth": "bPppAC71cnPCFIRpgWgM4Q=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '739595475445',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);

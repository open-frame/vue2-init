// 监听网络
import $store from "@/store/index"


const connection = navigator.connection;
connection.addEventListener('change', () => {
  console.log("网络状况：", connection.effectiveType);
  $store.commit("setNetNow", connection.effectiveType);
});

function updateOnlineStatus(event) {
  console.log(event);
  $store.commit("setIsOnline", event.type);
}


window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
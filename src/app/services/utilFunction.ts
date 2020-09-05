import Swal from 'sweetalert2';
declare var $: any;

export function showNotificationMini(message: string, iconType) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000
  });
  Toast.fire({
    title: message,
    icon: iconType
  });
  $(".swal2-popup.swal2-toast").css("background-color", "#fff");
}
import {useAuthStore} from "../../stores/authStore.ts";
import {toast} from "react-hot-toast";

let isHandlingSessionExpiration = false;

export function handleSessionExpiration() {
    if (isHandlingSessionExpiration) {
        return;
    }

    isHandlingSessionExpiration = true;
    const authStore = useAuthStore.getState();

    toast.dismiss();

    toast.error('Your session has expired. Please log in again.', {
        duration: 6000,
        id: 'session-expired'
    });

    authStore.logout();

    setTimeout(() => {
        window.location.replace('/login');
        isHandlingSessionExpiration = false;
    }, 6000);
}
<script>
/**
 * Simple toast notification component
 *
 * @summary Simple toast notification component
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-06-29 06:48:55
 * Last modified  : 2020-07-02 06:59:56
 */
 </script>

<template>
    <div 
        v-show="notifications.length > 0"
        class="user-notification" 
    >
        <div class="notifications">
            
            <transition-group name="slide-right" tag="div">
                <div 
                    :class="'t-all-ease notification ' + notification.type"
                    v-for="notification in notifications"
                    :key="notification.id"
                >
                    <div class="symbol"><img :src="require('../assets/img/ikonate/' + notification.symbol)" :alt="notification.type"></div>

                    <div class="message">{{ notification.message }}</div>

                    <div v-if="notification.dismissible" class="close"><button @click="deleteNotification(notification.id)"><img :src="require('../assets/img/ikonate/close.svg')" class="t-all-ease" :alt="notification.type"></button></div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
/**
 * - el div principal tiene un v-if que muestra o no según toque
 * - se usa un settimeout para poner on/off al mostrado de la notificación
 */
export default {
    name: "UserNotification",
    data() {
        return {
            notifications: []
        }
    },
    methods: {
        deleteNotification(id) {
            this.notifications = this.notifications.filter(notification => notification.id != id)
        },

        notificationTimeOut(id, duration) {
            setTimeout(() => {
                this.deleteNotification(id)
            }, duration)
        },

        infoNotification(event, msg, duration = 5000, dismissible = true) {
            if (!msg) return

            const notification = {
                id: this.notifications.length + 1,
                type: "info",
                symbol: "notification-info.svg",
                message: msg,
                duration: duration,
                dismissible: dismissible
            }
            this.notifications.push(notification)
            if (duration > 0) this.notificationTimeOut(notification.id, notification.duration)
        },
        
        warningNotification(event, msg, duration = 10000, dismissible = true) {
            if (!msg) return

            const notification = {
                id: this.notifications.length + 1,
                type: "warning",
                symbol: "notification-warning.svg",
                message: msg,
                duration: duration,
                dismissible: dismissible
            }
            this.notifications.push(notification)
            if (duration > 0) this.notificationTimeOut(notification.id, notification.duration)
        },

        errorNotification(event, msg, duration = 0, dismissible = true) {
            if (!msg) return

            const notification = {
                id: this.notifications.length + 1,
                type: "error",
                symbol: "notification-error.svg",
                message: msg,
                duration: duration,
                dismissible: dismissible
            }
            this.notifications.push(notification)
            if (duration > 0) this.notificationTimeOut(notification.id, notification.duration)
        },

        successNotification(event, msg, duration = 3000, dismissible = true) {
            if (!msg) return

            const notification = {
                id: this.notifications.length + 1,
                type: "success",
                symbol: "notification-success.svg",
                message: msg,
                duration: duration,
                dismissible: dismissible
            }
            this.notifications.push(notification)
            if (duration > 0) this.notificationTimeOut(notification.id, notification.duration)
        }
    }
}
</script>

<style scoped>
.t-all-ease {
  transition: all .5s ease;
}

.slide-right-leave-active{
  transition: all .5s ease;
}
.slide-right-enter, .slide-right-leave-to {
  transform: translateX(500px);
  opacity: 1;
}

.notifications {
    @apply fixed bottom-0 right-0 z-10 p-3 flex flex-col items-stretch w-full
}

.notifications .notification {
    @apply flex items-center justify-between w-full mt-3 border-2 rounded-lg overflow-hidden shadow-lg
}

.notifications .notification.info {
    @apply bg-blue-300 border-blue-800 text-blue-800 font-bold
}

.notifications .notification.warning {
    @apply bg-orange-300 border-orange-800 text-orange-800 font-bold
}

.notifications .notification.error {
    @apply bg-red-300 border-red-800 text-red-800 font-bold
}

.notifications .notification.success {
    @apply bg-green-300 border-green-800 text-green-800 font-bold
}

.notifications .notification.info .symbol {
    @apply bg-blue-100 p-3 border-r-2 border-blue-800
}

.notifications .notification.warning .symbol {
    @apply bg-orange-100 p-3 border-r-2 border-orange-800
}

.notifications .notification.error .symbol {
    @apply bg-red-100 p-3 border-r-2 border-red-800
}

.notifications .notification.success .symbol {
    @apply bg-green-100 p-3 border-r-2 border-green-800
}

.notifications .notification .message {
    @apply text-sm px-2
}

.notifications .notification .close {
    @apply p-3 outline-none
}

.notifications .notification .close button {
    @apply outline-none
}

.notifications .notification .close img {
    @apply w-8
}

.notifications .notification .close img:hover {
    transform: rotate(-90deg);
}

@media(min-width: 640px) {
    .notifications {
        @apply w-1/2 mr-3 mb-3
    }

    .notifications .notification {
        @apply w-full
    }
}
</style>
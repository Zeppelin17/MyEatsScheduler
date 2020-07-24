<script>
/**
 * Reusable modal box component
 *
 * @summary Reusable modal box component
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-07-24 06:45:20 
 * Last modified  : 2020-07-24 06:46:54
 */
</script>

<template>
    <transition name="modal" >
        <div class="modal-backdrop">
            
            <div class="modal t-all-ease">

                <header class="modal-header">
                    <div class="close"><button @click="close"><img :src="require('../../assets/img/ikonate/close.svg')" class="t-all-ease" ></button></div>

                    <slot name="header"></slot>
                </header>

                <section class="modal-body">
                    <slot name="body"></slot>
                </section>

                <footer class="modal-footer">
                    <slot name="footer"></slot>
                </footer>

            </div>
            
        </div>    
    </transition>
</template>

<script>
export default {
    name: "ModalBox",
    methods: {
        close() {
            this.$emit('close')
        }
    }

    /** mirar esto: https://www.digitalocean.com/community/tutorials/vuejs-vue-modal-component
        con esto: https://vuejs.org/v2/guide/components-slots.html
    */
}
</script>

<style scoped>
.t-all-ease {
  transition: all .5s ease;
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal, .modal-leave-active .modal {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.modal-backdrop {
    @apply fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50
}

.modal {
    @apply flex flex-col p-4 bg-blue-100 shadow-lg overflow-x-auto rounded-lg w-10/12 max-h-screen
}

.modal .modal-header .close {
    @apply flex justify-end items-center mb-1
}

.close button {
    @apply outline-none
}

.close button img:hover {
    transform: rotate(-90deg);
}
</style>
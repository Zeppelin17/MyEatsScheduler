<script>
/**
 * Reusable modal box component
 *
 * @summary Reusable modal box component
 * @author Zeppelin17 <elzeppelin17@gmail.com>
 *
 * Created at     : 2020-07-24 06:45:20 
 * Last modified  : 2020-08-04 06:39:28
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
    @apply flex flex-col p-4 my-2 bg-blue-100 shadow-lg overflow-x-auto rounded-lg w-11/12;
    max-height: 95vh;
}

.modal .modal-header {
    @apply text-center
}

.modal .modal-header,
.modal .modal-body,
.modal .modal-footer {
    @apply mb-6
}

.modal .modal-header .close {
    @apply flex justify-end items-center mb-1
}

.modal .modal-header .close img {
    @apply w-8
}

.close button {
    @apply outline-none
}

.close button img:hover {
    transform: rotate(-90deg);
}
</style>
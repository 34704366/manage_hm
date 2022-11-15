<template>
    <div>
        <div>
            01页面，admin
        </div>
        <button @click="test">test</button>
    </div>
    
</template>
<script>
export default {
    name: 'Home',
    data() {
        return {}
    },
    methods: {
        // test 
        test() {
            console.log(this.$router)
        }
    }
}
</script>
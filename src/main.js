const stopBounce = () =>{
    setTimeout(()=>{
        $('#nav').removeClass('animate-bounce')
    },2370)
}

const d = new Date();

const app = Vue.createApp({
    data(){
        return({
            d
        })
    }
});

app.mount('#app')

$(document).ready(function(){
    stopBounce();
    
})
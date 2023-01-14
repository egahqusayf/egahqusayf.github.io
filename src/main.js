const ctleft = ['Awal mula Surabaya Dev','Visi dan Misi','Kegiatan','Kenapa harus gabung','Persyaratan','Posisi yang dibuka']
const app = Vue.createApp({
    data(){
        return({
            ctleft
        })
    },
    methods:{
            
    }
});
app.mount('#app');

const ctright = Vue.createApp({});
const amsb    = ctright.component('amsb',{
    data(){
        return{

        }
    },
    template: `	<div class=" w-full flex flex-col  justify-start items-center gap-8">
    <h1 class=" font-semibold font-teko tracking-wider text-5xl text-green-300">&#10024 Awal Mula Surabaya Dev &#10024</span></h1>
    <div class="timeline flex gap-3 flex-col w-[90%] justify-end">
        <div class=" h-16 w-[500px]  rounded-lg self-center">
            <p class="font-semibold text-slate-800 text-xl text-center font-teko tracking-wider">Lahir sebagai wadah untuk para programmer yang ingin berkembang mengembangkan kemampuan, teknik, dan skill</p>
        </div>
        <div class=" h-16 w-[500px]  rounded-lg">
            <h1 class=" text-green-300 font-semibold text-2xl text-center font-teko tracking-widest">2014</h1>
            <p class="font-semibold text-3xl text-slate-800 text-center font-teko tracking-wider">MUNCUL</p>
        </div>
        <div class=" h-16 w-[500px]  rounded-lg self-end">
            <h1 class=" text-green-300 font-semibold text-2xl text-center font-teko tracking-widest">2017</h1>
            <p class="font-semibold text-3xl text-slate-800 text-center font-teko tracking-wider">SEMAKING BERKEMBANG KEGIATAN</p>
        </div>
        <div class=" h-16 w-[500px]  rounded-lg">
            <h1 class=" text-green-300 font-semibold text-2xl text-center font-teko tracking-widest">2018</h1>
            <p class="font-semibold text-3xl text-slate-800 text-center font-teko tracking-wider">TIM SURABAYA DEV GEN 1.0</p>
        </div>
        <div class=" h-16 w-[500px]  rounded-lg self-end">
            <h1 class=" text-green-300 font-semibold text-2xl text-center font-teko tracking-widest">2020</h1>
            <p class="font-semibold text-3xl text-slate-800 text-center font-teko tracking-wider">TIM SURABAYA DEV GEN 2.0 ONLINE VERSION</p>
        </div>
        <div class=" h-28 w-[500px]  rounded-lg ">
            <h1 class=" text-green-300 font-semibold text-2xl text-center font-teko tracking-widest">2023</h1>
            <p class="font-semibold text-3xl text-slate-800 text-center font-teko tracking-wider">TIM SURABAYA DEV GEN 3.0</p>
        </div>
    </div>
</div>`
})
const visiMisi = ctright.component('visimisi',{
    data(){
        return {

        }
    },
    template: `Halo bro`

})


ctright.mount('#ctr')

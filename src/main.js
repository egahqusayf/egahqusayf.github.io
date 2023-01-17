const ctleft = ['Awal mula Surabaya Dev','Visi dan Misi','Kegiatan','Kenapa harus gabung','Persyaratan','Posisi yang dibuka']
const ctrightComp = ['amsb','visimisi','kegiatan','kenapa','persyaratan','posisi'];
const posisiCont = [
    'Social Media & Content Creative',
    'Graphic Designer',
    'Podcaster/ Host/ Streamer',
    'Dev Team',
    'Management Event Community',
    'Admin & Logistic'
]
content = `<${ctrightComp[0]}/>`
let indexComp = 0;



const app = Vue.createApp({
    data(){
        return{
            ctleft,ctrightComp,posisiCont,indexComp,content
        }
    },
    methods: {
        fillCtr(index){
          this.indexComp = index;
          this.content = `<${this.ctrightComp[this.indexComp]}/>`;
          console.log(this.content)
        }
    }
});
const amsb           = app.component('amsb',{
    template: `<div class=" w-full flex flex-col  justify-start items-center gap-8">
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
const visiMisi      = app.component('visimisi',{
    template: `
    <div class="visimisi w-full flex flex-col  justify-start items-center gap-8 ">
    <h1 class=" font-semibold font-teko tracking-wider text-5xl text-green-300">Visi & Misi</h1>
    <p class=" font-teko text-xl text-slate-100 mx-5 tracking-widest">Surabaya Dev bertujuan menjadi wadah talenta teknologi dengan memanfaatkan potensinya untuk meningkatkan skill tech di bidang programming maupun digital teknologi agar dapat saling bersinergi berkolaborasi</p>
    <div class="misi flex px-6 ">
        <div class="misi1 justify-center">
            <h1 class=" font-teko text-2xl">Wadah belajar</h1>
            <p class=" font-serif">Menjadi wadah belajar pegiat IT untuk bisa terus update mengenai tech industri saat ini</p>
        </div>
        <div class="misi1 justify-center">
            <h1 class=" font-teko text-2xl">Koneksi</h1>
            <p>Memperluas relasi melalui komunitas untuk menjalin kebermanfaatan</p>
        </div>
        <div class="misi1 justify-center">
            <h1 class=" font-teko text-2xl">Berbagi ilmu</h1>
            <p>Komunitas adalah wadah yang tepat untuk bisa saling berbagi ilmu, pengalaman maupun wawasan tentang update teknologi</p>
        </div>
    </div>
</div>
    `

})
const Kegiatan      = app.component('kegiatan',{
    template:`
    <div class="kegiatan w-full flex flex-col  justify-start items-center gap-8 ">
				<h1 class=" font-semibold font-teko tracking-wider text-5xl text-green-300">Kegiatan</h1>
				<div class="misi flex px-6 ">
					<div class="misi1 justify-center">
						<h1 class=" font-teko text-2xl">Meet up</h1>
						<p class=" font-serif">Kegiatan bersama topik teknologi dan programming secara online maupun offline</p>
					</div>
					<div class="misi1 justify-center">
						<h1 class=" font-teko text-2xl">Upgrading Skill</h1>
						<p>Pelatihan internal pengurus berupa workshop untuk pengembangan diri seputar teknikal programming</p>
					</div>
					<div class="misi1 justify-center">
						<h1 class=" font-teko text-2xl">Kolaborasi Komunitas</h1>
						<p>Sinergi antar komunitas guna untuk mendukung kegiatan komunitas lokal di Indonesia</p>
					</div>
				</div>
			</div>
    `
})
const kenapa        = app.component('kenapa',{
    template: `
            <div class="visimisi w-full flex flex-col  justify-start items-center gap-8 ">
				<h1 class=" font-semibold font-teko tracking-wider text-5xl text-green-300">Kenapa harus gabung?</h1>
				<p class=" font-teko text-xl text-slate-100 mx-5 tracking-widest">Komunitas adalah tempat yang tepat untuk kamu yang suka dengan berbagi ilmu dan waktu</p>
				<div class="misi flex px-6 ">
					<div class="misi1 justify-center">
						<h1 class=" font-teko text-2xl">Suka belajar hal baru</h1>
						<p class=" font-serif">Komunitas menjadi wadah untuk bereksplorasi tanpa batas</p>
					</div>
					<div class="misi1 justify-center">
						<h1 class=" font-teko text-2xl">Berinteraksi dengan banyak orang</h1>
						<p>Relasi menjadi bagian utama sehingga menjadi bekal untuk koneksi karirmu di kemudian hari</p>
					</div>
					<div class="misi1 justify-center">
						<h1 class=" font-teko text-2xl">Mengasah kemampuan</h1>
						<p>Surabaya terbuka untuk semua orang yang ingin berkembang di era digital</p>
					</div>
				</div>
			</div>
    `
})  
const persyaratan   = app.component('persyaratan',{
    template:`
            <div class="persyaratan w-full flex flex-col  justify-start items-center gap-8">
				<h1 class=" font-semibold font-teko tracking-wider text-5xl text-green-300">Persyaratan</h1>
				<div class="ct w-[90%] flex justify-around gap-5">
					<div class="Kualifikasi">
						<h2 class=" font-teko text-slate-900 text-2xl">Kualifikasi</h2>
						<li>Mahasiswa/Siswa aktif dengan pendidikan minimal SMA/SMK</li>
						<li>Diutamakan berdomisili di Surabaya</li>
						<li>Suka dengan tren teknologi</li>
						<li>Terbuka untuk yang ingin belajar</li>
						<li>Mampu berkomitmen untuk berkontribusi minimal 1 tahun kepengurusan</li>
						<li>Punya etika bagus</li>
					</div>
					<div class="Kualifikasi self-start">
						<h2 class=" font-teko text-slate-900 text-2xl">Semua Kandidat Wajib Untuk :</h2>
						<li>Membuat twibbon dan memberikan deskripsi</li>
						<li>Membuat dan mengumpulkan tugas (Pada posisi yang dipilih)</li>
					</div>
				</div>	
			</div>
    `
})
const posisi        = app.component('posisi',{
    data(){
        return{
            posisiCont
        }
    },
    template:`
            <div class="posisi flex gap-[2px]">
				<div v-for="pos in posisiCont" class="posisi1 ct rounded-2xl h-[400px] w-full bg-gradient-to-bl from-green-100 to-green-300 flex justify-center ">
					<p  class=" text-center -rotate-90  self-center font-teko tracking-widest text-3xl text-green-900">{{pos}}</p>
				</div>	
			</div>
    `
})


app.mount('#app')

let deadline = new Date("Dec 5, 2019 15:37:25").getTime()
let now = new Date().getTime()
const footer = Vue.createApp({
    data(){
        return{
            deadline,now
        }
    },


    
})
footer.mount('#footer')

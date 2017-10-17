  // import BScroll from 'better-scrol'

  var vm = new Vue({
    el: '#idAuth',
    data () {
      return{
        status: 0,
        info: {
          name: '',
          sex: '',
          race: '',
          birth: '',
          site: '',
          id: ''
        },
        imgUrl1:'http://olxm3tby9.bkt.clouddn.com/authuploadItem1.jpg',
        imgUrl2:'http://olxm3tby9.bkt.clouddn.com/authuploadItem2.jpg',
        imgUrl3:'http://olxm3tby9.bkt.clouddn.com/authuploadItem3.jpg',
        uploadFlag: false,
        whichUpload: Number,
        cssStyle: ['front', 'back', 'all']

      }
    },
    created () {
      Vue.http.options.emulateHTTP = true;
    },
    mounted () {
      this.$http.get('').then((res) => {
        // 获取身份认证信息
      })
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      prevent(event) {
        if (!event._constructed) {
          return
        }
      },
      refresh() {
        this.idAuthScroll.refresh()
      },
      _initScroll () {
        this.idAuthScroll =new window.BScroll('.scrollHook',{
          startX: 0,
          click: true,
        })
      },
      cancleUpload (event) {
        this.prevent(event)
        this.uploadFlag = false
      },
      upload (which) {
        if (this.status === 1) {
          return;
        } else if (this.status === 0) {
          this.uploadFlag = true
          this.whichUpload = which
        }
      },
      change (e) {
        let file = e.target.files[0]
        let size = file.size/1024
        let that = this
        let elImg = ''
        // 看支持不支持FileReader
        if (!file || !window.FileReader) return;
        if (/^image/.test(file.type)) {
          let reader = new FileReader();
          reader.readAsDataURL(file)
          reader.onloadend = function () {
            elImg = reader.result
            if (that.whichUpload === 0){
              that.imgUrl1 = elImg
            } else if (that.whichUpload ===1) {
              that.imgUrl2 = elImg
            } else if (that.whichUpload ===2) {
              that.imgUrl3 = elImg
            }
            console.log(size)
          }
        }
        this.uploadFlag = false
        this.$http.options.emulateHTTP = true
        this.$http.post('https://api-cn.faceplusplus.com/cardpp/v1/ocridcard',
          {
            api_key: '9GIqJeO_Ht2KPuwUOwLJdsA003VIOY_B',
            api_secret: 'kD8NtVWxCKeEGD1Zcq0SIcaV-8SUrVwC',
            image_base64: elImg
        },{
          headers: {
            'Origin': 'http://192.168.1.88'


          },
          'emulateHTTP' : true
          }).then((response) => {
          console.log(response.json())
        },(error) => {
          console.log(111)
        })

      },
    }
  })


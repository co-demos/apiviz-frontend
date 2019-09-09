<template>
  <span v-html="rawHtml">
  </span>
</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  import axios from 'axios'

  export default {

    props:[
      'templateURL'
    ],

    data: () => {
      return   {

        rawHtml : '',
        head : { 
          baseURL : 'https://raw.githubusercontent.com/',
          headers: {
            // 'Access-Control-Allow-Origin': '*',
            'accept' : 'text/html',
          }
        }
      }
    },

    watch : {
      templateURL(next, prev){
        this.getRawHtml(next)
      }
    },

    computed: {

      ...mapState({
        log : state => state.log, 
        breakpoint : state => state.breakpoint,
      }),

    },

    mounted(){

      // this.log && console.log('\nC-DynamicStaticRaw / mounted... ')

      // here we go fetch the raw HTML content of a webpage
      let template_url = (this.templateURL) ? this.templateURL : 'https://co-demos.com/error'

      // this.log && console.log('C-DynamicStaticRaw / mounted / template_url : ', template_url)

      this.getRawHtml(template_url)
      // axios.get(template_url, head)
      // // axios.get(template_url)
      // .then( (response) => { 
      //   // console.log(response); 
      //   this.rawHtml = (response && response.data) ? response.data : '<br><br>there is an Error <br><br>'
      // })
      // .catch( (err) => {
      //   console.log(err); 
      //   this.rawHtml = '<br><br>there is an <strong> Error </strong> getting the distant html<br><br>'
      // })
    },

    methods: {

      getRawHtml(template_url) {
        
        let raw_html = ''

        axios.get(template_url, this.head)
        .then( (response) => { 
          // this.log && console.log('C-DynamicStaticRaw / getRawHtml / response : ', response); 
          this.rawHtml = (response && response.data) ? response.data : '<br><br>there is an Error <br><br>'
        })
        .catch( (err) => {
          console.log(err); 
          this.rawHtml = '<br><br>there is an <strong> Error </strong> getting the distant html<br><br>'
        })

        // this.rawHtml = raw_html

      }
    }

  }
</script>

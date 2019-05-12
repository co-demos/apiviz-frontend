<template>
  <span v-html="rawHtml">
  </span>
</template>

<script>

  import axios from 'axios'

  export default {

    props:[
      'templateURL'
    ],

    data: () => {
      return   {
        rawHtml : ''
      }
    },

    computed: {
    },

    mounted(){
      // here we go fetch the raw HTML content of a webpage
      let template_url = (this.templateURL) ? this.templateURL : 'https://co-demos.com/error'
      let head = { 
        baseURL : 'https://raw.githubusercontent.com/',
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          'accept' : 'text/html',
        }
      }
      axios.get(template_url, head)
      // axios.get(template_url)
      .then( (response) => { 
        // console.log(response); 
        this.rawHtml = (response && response.data) ? response.data : '<br><br>there is an Error <br><br>'
      })
      .catch( (err) => {
        console.log(err); 
        this.rawHtml = '<br><br>there is an <strong> Error </strong> getting the distant html<br><br>'
      })
    },
    methods: {
    }

  }
</script>

<template>

  <div class="timeline">

    <!-- DEBUGGING -->
    <!-- {{ contentField }} -->
    <!-- <hr> -->
    <!-- {{ steps }} -->
    <!-- <hr> -->
    


    <!-- HEADER X -->
    <header class="timeline-header"
      v-if="contentField.steps_start"
      >
      <span class="tag is-medium is-primary">
        {{ contentField.steps_start }}
      </span>
    </header>


    <!-- ITEMS X1 -->
    <div class="timeline-item"
      v-for="(step, index) in steps"
      :key="index"
      >
      <div class="timeline-marker is-primary is-primary-b"></div>
      <div class="timeline-content">
        <p class="heading">
          {{ step.stepTitle }}
        </p>
        <p>
          {{ step.stepText }}
        </p>
      </div>
    </div>




    <!-- END -->
    <header class="timeline-header"
      v-if="contentField.steps_end"
      >
      <span class="tag is-medium is-primary">
        {{ contentField.steps_end }}
      </span>
    </header>


  </div>


</template>



<script>
import { mapState, mapGetters } from 'vuex'

import NotFoundError from './NotFoundError.vue';

export default {

  name: 'DynamicDetailTimeline',

  components: {
    NotFoundError,
  },

  props: [
    'contentField',
    'contentRaw',
  ],

  data: () => {
    return {
      steps : undefined,
    }
  },

  beforeMount: function () {
    this.log && console.log("\nC-DynamicDetailTimeline / beforeMount ... ")
    // console.log("C-DynamicDetailTimeline / mounted / this.displayableItem : ", this.displayableItem )
    // this.steps = []

    let steps = this.contentRaw.split( this.contentField.steps_separator )
    steps = steps.map( s => {
      let trimmed = s.trim()
      let trimmedArray = trimmed.split( this.contentField.title_separator ) 
      let stepObject = {
        stepTitle: trimmedArray[0],
        stepText: trimmedArray[1]
      }
      return stepObject
    })

    // console.log("C-DynamicDetailTimeline / mounted / steps : ", steps )
    this.steps = steps

  },

  mounted(){
  },

  computed: {

    ...mapState({
      log: state => state.log,
      locale : state => state.locale,
      breakpoint : state => state.breakpoint,
      user: state => state.user.user,
    }),

    ...mapGetters({
      displayableItem : 'search/getDisplayedProject',
    }),

  },

  methods : {
  
  }

}
</script>


<style lang="scss" scoped>

</style>

<template>
  <li v-bind:class="{ item: hasChildren }">
    <div
      v-bind:style="{ color: '#' + getColor }"
      :class="{bold: hasChildren}"
      @click="toggle">
      {{ getText }}
      <span v-if="hasChildren">[{{ isOpen ? '-' : '+' }}]</span>
    </div>
    <ul v-show="isOpen" v-if="hasChildren">
      <TreeItem
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
      ></TreeItem>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'TreeItem',
  template: '#item-template',
  props: {
    item: Object
  },
  data: function () {
    return {
      isOpen: false
    }
  },
  computed: {
    hasChildren: function () {
      return this.item.children
    },
    getColor: function () {
      if (this.item.data.status == "official" || this.item.data.status == "checked")
      {
        return 494
      }
      else if (this.item.data.status == "error")
      {
        return 944
      }
      else if (this.item.data.status == "computed")
      {
        return 449
      }
      return 444

    },
    getText: function() {
        var formatter = new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 0
        });
        var text = ""
        if (this.item.data.description == "non fourni")
        {
          text += this.item.name
        }
        else {
          text += this.item.data.description
        }

        text += "(code:" + this.item.data.code + ') : '
        text += isNaN(this.item.data.value) ? "non fourni" : formatter.format(this.item.data.value)

        if (this.item.data.status == "computed"){
          text += "(valeur calculée)"
        }
        if (this.item.data.computedValue)
        {
            text += " erreur calculée :" + formatter.format(this.item.data.value ? (this.item.data.value - this.item.data.computedValue) : this.item.data.computedValue)
        }
        return text // + ' ' + JSON.stringify(this.item.data)
    }
  },
  methods: {
    toggle: function () {
      if (this.hasChildren) {
        this.isOpen = !this.isOpen
      }
    }
  }
}
</script>

<style>
  body {
    color: #444;
  }
  li {
    cursor: auto;
  }
  .item {
    cursor: pointer;
  }
  .bold {
    font-weight: bold;
  }
  ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;
  }
</style>

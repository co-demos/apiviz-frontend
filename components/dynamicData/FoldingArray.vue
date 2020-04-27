<template>
  <div class="tile is-parent is-vertical" v-bind:class="{ gotchildren : hasChildren }">
    <div class="tile is-parent"
      @click="toggle">
      <div class="tile is-child is-6"
        :class="{bold: hasChildren}">
        {{ getDescription }}
        <span v-if="hasChildren">[{{ isOpen ? '-' : '+' }}]</span>
      </div>
      <div class="tile is-child"
        v-for="oneYearItem in rowItem"
        v-bind:style="{ color: '#' + getColor(oneYearItem) }">
         {{ getDisplayedValue(oneYearItem) }}
      </div>
    </div>
    <div v-bind:class="{ subtotal: hasChildren && isOpen }">
      <FoldingRow v-show="isOpen" v-if="hasChildren"
      v-for="(child, index) in getChildren"
      :key="index"
      :rowItem="child"
      ></FoldingRow>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FoldingRow',
  template: '#item-template',
  props: {
    rowItem: Array
  },
  data: function () {
    return {
      isOpen: false
    }
  },
  computed: {
    hasChildren: function () {
      return this.rowItem[0].children
    },
    getDescription : function() {
      var text = ""
      if (this.rowItem[0].data.description == "non fourni")
      {
        text += this.rowItem[0].name
      }
      else {
        text += this.rowItem[0].data.description
      }
      text += "(code:" + this.rowItem[0].data.code + ') : '
      return text
    },

    getChildren: function() {
        var children = {}
        for (var property in this.rowItem[0].children)
        {
          children[property] = []
          for (var yearItem of this.rowItem)
          {
            children[property].push(yearItem.children[property])
          }
        }
        return children
    }
  },
  methods: {
    toggle: function () {
      if (this.hasChildren) {
        this.isOpen = !this.isOpen
      }
    },

    getDisplayedValue: function(oneYearItem) {
        var formatter = new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 0
        });
        var text = ""
        if (isNaN(oneYearItem.data.value))
        {
          if (oneYearItem.data.computedValue)
          {
            text += formatter.format(oneYearItem.data.computedValue) + " (valeur calculée)"
          }
          else {
            text += "non fourni"
          }
        }
        else
        {
          text += formatter.format(oneYearItem.data.value)
        }

        if (oneYearItem.data.status == "computed"){
          text += " (valeur calculée)"
        }
        if (oneYearItem.data.computedValue && oneYearItem.data.value)
        {
            text += " erreur calculée :" + formatter.format(oneYearItem.data.value - oneYearItem.data.computedValue)
        }
        return text //+ ' ' + JSON.stringify(oneYearItem.data, {}, 2)
    },
    getColor: function (oneYearItem) {
      if (oneYearItem.data.status == "official" || oneYearItem.data.status == "checked")
      {
        return 194
      }
      else if (oneYearItem.data.status == "error")
      {
        return 941
      }
      else if (oneYearItem.data.status == "computed")
      {
        return 419
      }
      return 441
    }

  }
}
</script>

<style>
  body {
    font-family: Menlo, Consolas, monospace;
    color: #444;
  }
  .gotchildren {
    cursor: pointer;
  }
  .subtotal {
    border: 1px solid #666;
    margin-left : 10px;
    cursor: auto;
  }
  .bold {
    font-weight: bold;
  }
  .tile .is-child {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    border: 1px solid #aaa;
    margin: 0px;
    padding: 0px;
  }
  .tile .is-parent {
    padding: 0px;
    margin-right: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
  }
</style>

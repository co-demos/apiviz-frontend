<template>
  <div class="tile is-parent is-vertical" v-bind:class="{ gotchildren : hasChildren }">
    <div class="tile is-parent"
      @click="toggle">
      <div class="tile is-child is-6"
        :class="{bold: hasChildren}">
        {{ getDescription }}
        <span v-if="hasChildren">[{{ isOpen ? '-' : '+' }}]</span>
      </div>
      <div class="tile is-child tooltip"
        v-for="oneYearItem in rowItem"
        v-bind:style="{ color: '#' + getColor(oneYearItem) }">
        <span class="tooltiptext">{{ getTooltip(oneYearItem) }}</span>
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
            text += formatter.format(oneYearItem.data.computedValue) + " (calculé)"
          }
          else {
            text += "non fourni"
          }
        }
        else
        {
          text += formatter.format(oneYearItem.data.value)
        }
        return text //+ ' ' + JSON.stringify(oneYearItem.data, {}, 2)
    },
    getTooltip: function(oneYearItem) {
        var euroFormatter = new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 0
        });
        var percentFormatter = new Intl.NumberFormat(undefined, {
          style: 'percent',
          maximumFractionDigits: 2
        });
        var text = ""
        if (isNaN(oneYearItem.data.value))
        {
          if (oneYearItem.data.computedValue)
          {
            text += "montant officiellement non fourni, et impossible de le déduire des autres montants présents"
          }
          else {
            text += "non fourni"
          }
        }
        else if (oneYearItem.data.status == "checked")
        {
          text += "montant fourni et cohérent avec les autres montants présents"
          if (oneYearItem.data.computedValue && oneYearItem.data.value)
          {
            text += " (seulement " + euroFormatter.format(oneYearItem.data.value - oneYearItem.data.computedValue) + " de différence)"
          }
        }
        else if (oneYearItem.data.status == "computed")
        {
          text += "montant non fourni mais déduit d'après les autres montants présents"
        }
        else if (oneYearItem.data.status == "official")
        {
          text += "montant fourni et pas de vérification possible"
        }
        else if (oneYearItem.data.status == "signFlipped")
        {
          text += "montant fourni avec, semble-t-il, une erreur de signe"
        }
        else
        {
          text += "montant fourni mais incohérent avec les autres montants présents"
          if (oneYearItem.data.computedValue && oneYearItem.data.value)
          {
            var diff = oneYearItem.data.value - oneYearItem.data.computedValue
            var percentDiff = Math.abs(diff / oneYearItem.data.value)

            text += " (" + percentFormatter.format(percentDiff) + " d'erreur, soit " + euroFormatter.format(diff) + ")"
          }
        }
        return text //+ JSON.stringify(oneYearItem.data, {}, 2)
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
      else if (oneYearItem.data.status == "signFlipped")
      {
        return 499
      }
      return 941
    }

  }
}
</script>

<style>
  body {
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
    /* Tooltip container */
  .tooltip {
   position: relative;
   display: inline-block;
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
   visibility: hidden;
   width: 120px;
   background-color: #555;
   color: #fff;
   text-align: center;
   padding: 5px 0;
   border-radius: 6px;

   /* Position the tooltip text */
   position: absolute;
   z-index: 1;
   bottom: 125%;
   left: 50%;
   margin-left: -60px;

   /* Fade in tooltip */
   opacity: 0;
   transition: opacity 0.3s;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .tooltip:hover .tooltiptext {
   visibility: visible;
   opacity: 1;
  }
</style>

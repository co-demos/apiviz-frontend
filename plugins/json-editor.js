console.log('+ + + plugins/json-editor... ')

import Vue from 'vue'

// cf : https://github.com/jinkin1995/vue-json-edit/blob/master/README.md
// note : OK but character in chinese by default
import JsonEditor from 'vue-json-edit'
Vue.use(JsonEditor)

// cf : https://github.com/michaelfitzhavey/vue-json-tree-view/blob/master/README.md
// note : OK but no btn to add item to list
// import {TreeView} from "vue-json-tree-view"
// // Vue.component('tree-view', tree-view);
// Vue.use(TreeView)

// cf : https://github.com/yourtion/vue-json-ui-editor
// note : unpracticle
// import JsonEditor from 'vue-json-ui-editor'
// Vue.component('json-editor', JsonEditor)
// Vue.use(JsonEditor)

// cf : https://github.com/LeoZlZhang/vue-json-editor
// import JsonEditor from 'vue-json-editor-block-view'
// Vue.use(JsonEditor);
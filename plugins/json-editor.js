console.log('+ + + plugins/json-editor... ')

import Vue from 'vue'

// cf : https://github.com/jinkin1995/vue-json-edit/blob/master/README.md
// note : OK but ok/cancel btns' character in chinese by default
// import JsonEditor from 'vue-json-edit'
// Vue.use(JsonEditor)

// 
// cf : https://github.com/michaelfitzhavey/vue-json-tree-view/blob/master/README.md
// note : OK but no btn to add item to list
// import {TreeView} from "vue-json-tree-view"
// // Vue.component('tree-view', tree-view);
// Vue.use(TreeView)

// cf : https://github.com/yourtion/vue-json-ui-editor
// note : unpractical
// import JsonEditor from 'vue-json-ui-editor'
// Vue.component('json-editor', JsonEditor)
// Vue.use(JsonEditor)

// cf : https://github.com/LeoZlZhang/vue-json-editor
// note : bugs - not working
// import JsonEditor from 'vue-json-editor-block-view'
// Vue.use(JsonEditor);

// + + 
// cf : https://github.com/dirkliu/vue-json-editor
// note : OK - smooth
import vueJsonEditor from 'vue-json-editor'
Vue.component('vue-json-editor', vueJsonEditor);
Vue.use(vueJsonEditor);

// + + but error at innstall
// cf : https://github.com/LeoZlZhang/vue-json-editor
// note : OK - super smooth - like 'vue-json-edit' but in english
// import JsonEditor from 'vue-edit-json'
// Vue.component('JsonEditor', JsonEditor);
// Vue.use(JsonEditor)

// + 
// cf : https://github.com/tylerkrupicka/vue-json-component
// note : clean but no editing
// import JSONView from "vue-json-component";
// Vue.use(JSONView)





// SEE ALSO
/*
FORM FROM JSON SCHEMA : https://gitlab.com/formschema/native

*/
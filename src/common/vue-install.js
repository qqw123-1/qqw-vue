import qwButton from "@/components/qw-button/index.vue";
import qwErrorPage from "@/components/qw-error-page/index.vue";
import qwForm from "@/components/qw-form/index.vue";
import qwTable from "@/components/qw-table/index.vue";
import qwDesc from "@/components/qw-desc/index.vue";


export default {
  install: function (Vue) {
    // 全局引入公共组件
    Vue.component("qwButton", qwButton);
    Vue.component("qwErrorPage", qwErrorPage);
    Vue.component("qwForm", qwForm);
    Vue.component("qwTable", qwTable);
    Vue.component("qwDesc", qwDesc);
  }
}
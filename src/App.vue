<template>
<div>
  <div>
    Hi {{name}}
  </div>
  <notebook 
    v-for="(notebook,index) in notebooks"
    v-bind:key="index"
    v-bind:uuid="notebook"
    ></notebook>
</div>
</template>

<script lang="ts">
  import axios from "axios";
  import notebook from "./components/Notebook.vue";
  export default {
    data: function() {
      return {
        name: 'Hello World!',
        notebooks: []
      }
    },
    created() {
      let vm = this;
      axios.get(`/lib/notebooks`).then(function(response){
        for (let i = 0; i < response.data.children.length; i++) {
          vm.notebooks.push(response.data.children[i].uuid);
        }
      });
    },
    components: {
      notebook
    }
  };
</script>

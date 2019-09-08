<template>
  <div>
    <div>Notebook: {{title}}</div>
    <div v-for="(note, index) in notes" v-bind:key="index">
      <div>Note uuid: {{note.note_uuid}} Note file: {{note.note_dir}}</div>
    </div>
    <br>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
export default {
  props: ['uuid'],
  data() {
    return {
      notes: [],
      title: ''
    };
  },
  created() {
    let vm = this;
    axios.get(`/lib/notebook/${vm.uuid}`)
    .then(function(response){
      vm.notes = response.data.notebook_file_list;
      vm.title = response.data.notebook_title;
    });
  }
};
</script>

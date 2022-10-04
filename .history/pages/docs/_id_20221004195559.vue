<template>
  
  <div>
    <button @click="setButton">click me</button>
  </div>
</template>

<script>
import {API} from '@/flo.inc'
export default {
    name: 'Docs',
    data(){
        return {
            clauses: {},
            selectBoxList: [],
            selected: ''
        };
    },
    methods:{
      
    }
}
</script>
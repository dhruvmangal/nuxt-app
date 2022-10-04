<template>
  
  <div>
    <button>click me</button>
  </div>
</template>

<script>
//import {API} from '@/flo.inc'
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
      setButton(){
        console.log("button is clicked")
      }
    }
}
</script>
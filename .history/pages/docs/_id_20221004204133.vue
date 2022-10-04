<template>
  
  <div>
    <button @click="getClauseData(17)">click me</button>
  </div>
</template>

<script>
import {API} from '../../flo.inc'
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
      async getClauseData(id) {
        const {data} = await API.GET(`${API.URI.MEMBER.CLAUSE}/${id}`);

        this.clause = data.data;
        console.log(data.data)
      },
    },
    mounted(){

    }
}
</script>
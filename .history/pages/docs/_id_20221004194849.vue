<template>
  <!-- <section
    id="section"
    role="main"
    class="main"
  >
    <h2>{{ clause.clauseTitle }}</h2>
    <div
      v-if="isShowSelectBox"
      class="cms--select"
    >
      <select
        v-model="selected"
        @change="routeToLink(clause.clauseId, selected)"
      >
        <option
          v-for="option in selectBoxList"
          :key="option.enforceDate"
          :value="option.enforceDate"
        >
          현행 시행일자: {{ setEnforceDate(option.enforceDate) }}
        </option>
      </select>
    </div>
    <div
      class="cms--cont clause--cms__cont"
      v-html="clause.clauseCont"
    />
  </section> -->
  <div>
  
  </div>
</template>

<script>
import {API} from '@/flo.inc'
export default {
    name: 'DOCS',
    data(){
        return {
            clauses: {},
            selectBoxList: [],
            selected: ''
        };
    },
}
</script>
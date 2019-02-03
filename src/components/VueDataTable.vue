<template>
    <div class="container">
        <loading :active.sync="isLoading"
        :is-full-page="true"
        :background-color="'#000000'"
        :color="'#28C76F'"></loading>
        <v-server-table
            :columns="columns" 
            :options="optionsTable">
        </v-server-table>
    </div>
</template>

<script>
import numeral from 'numeral';
import { Event } from 'vue-tables-2';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    data() {
        return {
            isLoading: true,
            columns: ['numberData','name', 'terrain', 'diameter', 'climate', 'gravity', 'population'],
            optionsTable: {
                filterByColumn: true,
                headings: {
                    numberData: 'No.',
                    name: 'Name',
                    terrain: 'Terrain',
                    diameter: 'Diameter',
                    climate: 'Climate',
                    gravity: 'Gravity',
                    population: 'Population'
                },
                sortIcon:{ 
                    base:'fas', 
                    up:'sort-up',
                    down:'sort-down', 
                    is:'fa-sort'
                },
                pagination: {
                    chunk: 5,
                    edge: true,
                    dropdown:true
                },
                perPageValues:[],
                filterable: ['name'],
                sortable: [],
                templates: {
                    numberData:function(h, row, index){
                        return index;
                    },
                    diameter:function(h, row){
                        return numeral(row.diameter).format('0,0');
                    },
                    population:function(h, row){
                        if(row.population !== 'unknown'){
                            return numeral(row.population).format('0,0');
                        }else{
                            return row.population;
                        }
                    }
                },
                requestFunction: function (data) {
                    return this.axios.get('https://swapi.co/api/planets/', {
                        params: data
                    }).catch(function(e){
                        this.dispatch('error', e)
                    }.bind(this));
                },
                requestAdapter(data) {
                    return {
                        page: data.page,
                        search: data.query.name
                    }
                },
                responseAdapter:function(resp){
                    return{
                        data: resp.data.results,
                        count: resp.data.count
                    }
                }
            }
        }
    },
    components: {
        Loading
    },
    mounted(){
        Event.$on('vue-tables.loaded', function () {
            this.isLoading = false;
        }.bind(this));

        Event.$on('vue-tables.loading', function () {
            this.isLoading = true;
        }.bind(this));
    }
}
</script>

<style>
#app {
  width: 95%;
  margin-top: 50px; 
}

.VuePagination {
  text-align: center;
}

.vue-title {
  text-align: center;
  margin-bottom: 10px;
}

.vue-pagination-ad {
  text-align: center;
}

.glyphicon.glyphicon-eye-open {
  width: 16px;
  display: block;
  margin: 0 auto;
}

th:nth-child(3) {
  text-align: center;
}

.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
  content: "+";
}

.VueTables__child-row-toggler--open::before {
  content: "-";
}

</style>
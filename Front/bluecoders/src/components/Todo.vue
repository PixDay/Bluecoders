<template>
    <div class="vue-tempalte">
        <h2>Tasks</h2>
        <div class="input-group">
            <input type="text" class="form-control form-control-lg" placeholder="New task" v-model="title"/>
            <span class="input-group-btn">
                <button type="submit" class="btn btn-primary btn-lg" v-on:click="todoCreate()"><i class="fa fa-plus"></i> Add</button>
            </span>
        </div>
        <br>
        <button type="submit" class="btn btn-warning btn-lg widthbutton"><i class="fa fa-check"></i> Clear completed</button>
        <br>
        <br>
        <button type="submit" class="btn btn-danger btn-lg widthbutton"><i class="fa fa-trash"></i> Clear all</button>
        <br>
        <br>
        <router-link :to="{name: 'login'}" class="white-link"><button type="submit" class="btn btn-dark btn-lg widthbutton"><i class="fa fa-sign-out"></i> Log out</button></router-link>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                postBody: '',
                errors: [],
                title: '',
            }
        },
        methods: {
            todoCreate() {
                const token = localStorage.getItem('user-token');

                axios.post("http://localhost:4000/todo/create", {title: this.title, description: "descr"}, {headers: {'Authorization': token}}).then((response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                });
            },
            todoGet() {
                const token = localStorage.getItem('user-token');
                
                axios.get("http://localhost:4000/todo", {headers: {'Authorization': token}}).then((response) => {
                    console.log(response);
                }, (error => {
                    console.log(error);
                }))
            }
        },
        beforeMount(){
            this.todoGet();
        }
  }
</script>
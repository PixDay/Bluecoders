<template>
    <div class="vue-tempalte">
        <h2>Tasks</h2>
        <div class="input-group">
            <input type="text" class="form-control form-control-lg" placeholder="New task"/>
            <span class="input-group-btn">
                <button type="submit" class="btn btn-primary btn-lg"><i class="fa fa-plus"></i> Add</button>
            </span>
        </div>
        <br>
        <button type="submit" class="btn btn-warning btn-lg widthbutton"><i class="fa fa-check"></i> Clear completed</button>
        <br>
        <br>
        <button type="submit" class="btn btn-danger btn-lg widthbutton"><i class="fa fa-trash"></i> Clear all</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>
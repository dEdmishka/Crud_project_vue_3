<template>
  <div class="add_container">
    <div>
      Choose what you want to add!
    </div>
    <div class="">
      <label for="">
        <router-link to="/">Home</router-link>
      </label> <br/>
      <label for="">
        <router-link to="/faculty">Faculties</router-link>
      </label> <br/>
      <label for="">
        <router-link to="/professors">AllProfessors(deprecated)</router-link>
      </label> <br/>
      <label for="">
        <router-link to="/teacher">AllTeachers</router-link>
      </label> <br/>
      <label for="">
        <router-link to="/discipline">AllDisciplines</router-link>
      </label> <br/>
      <label for="">
        <router-link to="/group">AllGroups</router-link>
      </label> <br/>
      <label for="">
        <router-link to="/department">AllDepartments</router-link>
      </label> <br/>
      <label for="">
        <router-link to="/student">AllStudents</router-link>
      </label> <br/>
      <label for="">
        <router-link to="/schedule">AllSchedules</router-link>
      </label> <br/>
      <label for="">
        <router-link to="/faq">FAQ</router-link>
      </label> <br/>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.add_container{
  font-size: 26px;
}
</style>
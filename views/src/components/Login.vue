<template>
  <el-row style="margin-left: 32%;">
    <el-col>
      <el-card class="box-card" center>
        <el-card style="margin-bottom: 5%;">
          <img src="../assets/logo.png" />
        </el-card>

        <el-row>
          <el-input placeholder="Username" v-model="username"></el-input>
        </el-row>
        <el-row style="margin-top: 2%;">
          <el-input placeholder="Password" v-model="password"></el-input>
        </el-row>
        <el-row style="margin-top: 5%;">
          <el-col :span="12">
            <el-button class="btn1">Registrar-se</el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="btn2" @click="login(username, password)">Entrar</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import logo from "./Logo";
import axios from "axios";

export default {
  name: "Login",
  components: [logo],
  data: () => ({
    visible: false,
    username: "",
    password: ""
  }),
  methods: {
    login: (username, password) => {
      axios
        .post("http://localhost:3000/login", {
          username: username,
          password: password
        })
        .then(result => console.log(result))
        .catch(e => console.log(e));
    }
  }
};
</script>

 <style>
.box-card {
  width: 500px;
  height: 475px;
}

.btn1{
  width: 230px;
}

.btn2{
  width: 210px;
}

</style>
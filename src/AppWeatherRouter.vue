<template>
  <div class="app-container">
    <h1>⛅ 과제 4: 라우터적용</h1>
    <hr />
    <div class="dashboard-wrapper">
      <el-menu router mode="horizontal" :default-active="$route.path" class="navigation-bar">
        <el-menu-item index="/">🌦️ 날씨 대시보드</el-menu-item>
        <el-menu-item index="/about">ℹ️ 서비스 소개</el-menu-item>
      </el-menu>
      <main><RouterView /></main>
    </div>
  </div>
</template>

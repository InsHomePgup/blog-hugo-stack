<script setup lang="ts">
// 无需额外逻辑
</script>

<template>
  <div class="base-layout">
    <header class="header">
      <h1>基础布局</h1>
      <nav class="nav">
        <RouterLink to="/">
          首页
        </RouterLink> |
        <RouterLink to="/about">
          关于
        </RouterLink> |
        <RouterLink to="/user/1">
          用户
        </RouterLink> |
        <RouterLink to="/demo">
          TDesign 演示
        </RouterLink>
      </nav>
    </header>

    <main class="content">
      <!-- 这里是嵌套路由的出口 -->
      <RouterView />
    </main>

    <footer class="footer">
      <p>© 2025 Vue Router 示例</p>
    </footer>
  </div>
</template>

<style scoped>
.base-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #f5f5f5;
  padding: 1rem;
  text-align: center;
}

.nav {
  margin-top: 1rem;
}

.nav a {
  margin: 0 0.5rem;
  color: #2c3e50;
  text-decoration: none;
}

.nav a.router-link-active {
  color: #42b983;
  font-weight: bold;
}

.content {
  flex: 1;
  padding: 1rem;
}

.footer {
  background-color: #f5f5f5;
  padding: 1rem;
  text-align: center;
}
</style>

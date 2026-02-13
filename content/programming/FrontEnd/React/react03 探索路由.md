
---
title: "探索路由"
date: 2024-12-01
categories:
  - frontend
  - react
---

## 什么是React路由

React Router是React应用中最流行的路由库，它允许我们创建单页面应用（SPA），在不刷新页面的情况下实现不同页面之间的导航。

### 安装React Router

使用npm或yarn安装React Router：

```bash
npm install react-router-dom
# 或
yarn add react-router-dom
```

[官方安装文档](https://reactrouter.com/start/library/installation)

### 基础配置

在应用的根组件中配置路由：

```jsx
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;
```

## 核心路由概念

### 路由器类型

React Router提供了几种不同的路由器：

- **BrowserRouter**: 使用HTML5 History API，URL看起来更自然（如 `/about`）
- **HashRouter**: 使用URL的hash部分（如 `/#/about`），兼容性更好
- **MemoryRouter**: 在内存中保存历史记录，常用于测试

### 核心组件

- **Routes**: 路由容器，用于包裹所有Route组件
- **Route**: 定义单个路由规则
- **Link**: 声明式导航组件
- **NavLink**: 带有激活状态的导航组件
- **Navigate**: 编程式重定向组件
- **Outlet**: 用于渲染子路由组件

## 基本路由使用

### 创建简单路由

```jsx
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">首页</Link>
        <Link to="/about">关于我们</Link>
        <Link to="/contact">联系我们</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

function Home() {
  return <h1>首页</h1>;
}

function About() {
  return <h1>关于我们</h1>;
}

function Contact() {
  return <h1>联系我们</h1>;
}
```

### 使用NavLink实现激活状态

```jsx
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? "active" : ""}
      >
        首页
      </NavLink>
      <NavLink 
        to="/about"
        style={({ isActive }) => ({
          color: isActive ? "#ff6b6b" : "#333"
        })}
      >
        关于我们
      </NavLink>
    </nav>
  );
}

## 动态路由和路由参数

### URL参数

```jsx
import { useParams } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/user/:id" element={<UserProfile />} />
      <Route path="/product/:category/:id" element={<Product />} />
    </Routes>
  );
}

function UserProfile() {
  const { id } = useParams();
  return <h1>用户ID: {id}</h1>;
}

function Product() {
  const { category, id } = useParams();
  return (
    <div>
      <h1>分类: {category}</h1>
      <h2>产品ID: {id}</h2>
    </div>
  );
}
```

### 查询参数

```jsx
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';

  const updateSearch = (newQuery) => {
    setSearchParams({ q: newQuery, page: '1' });
  };

  return (
    <div>
      <h1>搜索结果: {query}</h1>
      <p>当前页: {page}</p>
      <button onClick={() => updateSearch('新搜索')}>
        更新搜索
      </button>
    </div>
  );
}
```

### 可选参数和通配符

```jsx
function App() {
  return (
    <Routes>
      {/* 可选参数 */}
      <Route path="/blog/:year?/:month?" element={<Blog />} />
      
      {/* 通配符路由 */}
      <Route path="/docs/*" element={<Documentation />} />
      
      {/* 404页面 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

## 嵌套路由

### 基本嵌套路由

```jsx
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
        <Link to="/dashboard">控制台</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h1>控制台</h1>
      <nav>
        <Link to="/dashboard">概览</Link>
        <Link to="/dashboard/profile">个人资料</Link>
        <Link to="/dashboard/settings">设置</Link>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
```

### 相对路径导航

```jsx
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>控制台</h1>
      <nav>
        {/* 相对路径 */}
        <Link to=".">概览</Link>
        <Link to="profile">个人资料</Link>
        <Link to="settings">设置</Link>
        
        {/* 绝对路径 */}
        <Link to="/dashboard/analytics">数据分析</Link>
      </nav>
      
      <button onClick={() => navigate('profile')}>
        前往个人资料
      </button>
      
      <Outlet />
    </div>
  );
}

## 路由守卫和编程式导航

### 编程式导航

```jsx
import { useNavigate, useLocation } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      // 登录成功后跳转
      navigate(from, { replace: true });
    } catch (error) {
      console.error('登录失败');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* 表单内容 */}
      <button type="submit">登录</button>
      <button onClick={() => navigate(-1)}>
        返回上一页
      </button>
    </form>
  );
}
```

### 路由守卫

```jsx
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
  const isAuthenticated = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  return children;
}

// 使用路由守卫
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      } />
    </Routes>
  );
}
```

### 条件重定向

```jsx
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/old-path" element={<Navigate to="/new-path" replace />} />
      <Route path="/admin" element={
        <RequireRole role="admin">
          <AdminPanel />
        </RequireRole>
      } />
    </Routes>
  );
}

function RequireRole({ role, children }) {
  const user = useUser();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (!user.roles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
}

## 最佳实践和总结

### 性能优化

#### 路由懒加载

```jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={
        <Suspense fallback={<div>加载中...</div>}>
          <Dashboard />
        </Suspense>
      } />
      <Route path="/profile" element={
        <Suspense fallback={<div>加载中...</div>}>
          <Profile />
        </Suspense>
      } />
    </Routes>
  );
}
```

#### 预加载关键路由

```jsx
import { Link } from 'react-router-dom';

function Navigation() {
  const preloadDashboard = () => {
    import('./Dashboard');
  };

  return (
    <nav>
      <Link 
        to="/dashboard" 
        onMouseEnter={preloadDashboard}
      >
        控制台
      </Link>
    </nav>
  );
}
```

### 常见模式

#### 面包屑导航

```jsx
import { useLocation, Link } from 'react-router-dom';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav>
      <Link to="/">首页</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        return isLast ? (
          <span key={name}> / {name}</span>
        ) : (
          <span key={name}>
            {' / '}
            <Link to={routeTo}>{name}</Link>
          </span>
        );
      })}
    </nav>
  );
}
```

#### 路由状态管理

```jsx
import { useLocation } from 'react-router-dom';

function usePageTracking() {
  const location = useLocation();
  
  useEffect(() => {
    // 页面访问统计
    analytics.track('page_view', {
      path: location.pathname,
      search: location.search
    });
  }, [location]);
}

function App() {
  usePageTracking();
  
  return (
    <Routes>
      {/* 路由配置 */}
    </Routes>
  );
}
```

### 最佳实践总结

1. **路由组织**
   - 使用扁平化的路由结构
   - 合理使用嵌套路由
   - 保持URL结构清晰易懂

2. **性能优化**
   - 使用代码分割和懒加载
   - 预加载关键路由
   - 避免不必要的重新渲染

3. **用户体验**
   - 提供加载状态
   - 实现友好的404页面
   - 使用路由守卫保护私有页面

4. **SEO优化**
   - 使用BrowserRouter而不是HashRouter
   - 设置适当的页面标题
   - 考虑服务端渲染(SSR)

5. **错误处理**
   - 实现全局错误边界
   - 处理路由异常情况
   - 提供用户友好的错误信息

React Router为React应用提供了强大而灵活的路由解决方案。通过掌握这些概念和最佳实践，你可以构建出用户体验良好、性能优秀的单页面应用。


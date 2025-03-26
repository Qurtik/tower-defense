import { Link, Outlet } from 'react-router'
import './MainLayout.css'
export const MainLayout = () => {
  return (
    <>
      <div className="layout">
        <nav className="top-nav">
          <Link to="/login">Войти</Link>
          <Link to="/register">Регистрация</Link>
          <Link to="/game">Игра</Link>
          <Link to="/profile">Профиль</Link>
          <Link to="/leaderboard">Таблица рекордов</Link>
          <Link to="/forum">Форум</Link>
          <Link to="/forum/1">Допустим топик форума</Link>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  )
}

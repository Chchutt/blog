import { Route, Routes } from 'react-router-dom'

import { HomePage } from '../../pages/HomePage'
import { SingUpPage } from '../../pages/SingUpPage'
import { Layout } from '../Layout'
import { ArticleCreateEditPage } from '../../pages/ArticleCreateEditPage'
import { PageNotFound } from '../../pages/PageNotFound'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="articles/" element={<HomePage />} />
        <Route path="articles/:id" element={<HomePage />} />
        <Route path="articles/:id/edit-page" element={<ArticleCreateEditPage flag={false} />} />
        <Route path="articles/new-article" element={<ArticleCreateEditPage flag />} />
        <Route
          path="sing-up"
          element={<SingUpPage authed={{
            sing: true,
            editing: false
          }}
          />}
        />
        <Route
          path="sing-in"
          element={<SingUpPage authed={{
            sing: false,
            editing: false
          }}
          />}
        />
        <Route
          path="edit-profile"
          element={<SingUpPage authed={{
            sing: false,
            editing: true
          }}
          />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}

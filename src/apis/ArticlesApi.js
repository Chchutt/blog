import axios from 'axios'

export async function articlesApi(value = 5) {
  const res = await axios.get(`https://blog.kata.academy/api/articles?limit=5&offset=${value}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`,
      contentType: 'application/json',
    }
  })
  return res.data
}

export async function getArticleBySlug(slug) {
  const res = await axios.get(`https://blog.kata.academy/api/articles/${slug}`)
  return res.data
}
export async function favorArticleBySlug(slug) {
  const res = await axios.post(
    `https://blog.kata.academy/api/articles/${slug}/favorite`,
    {},
    {
      headers: {
        accept: 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
        contentType: 'application/json',
      }
    },
  )
  return res.data
}
export async function delArticleBySlug(slug) {
  const res = await axios.delete(
    `https://blog.kata.academy/api/articles/${slug}/favorite`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
        contentType: 'application/json',
      }
    },
  )
  return res.data
}
export async function deleteArticleBySlug(slug) {
  const res = await axios.delete(`https://blog.kata.academy/api/articles/${slug}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`,
      contentType: 'application/json',
    }
  })
  return res.data
}

export async function putArticleBySlug(slug, title, description, body, tagList) {
  const res = await axios.put(
    `https://blog.kata.academy/api/articles/${slug}`,
    {
      article: {
        title: `${title}`,
        description: `${description}`,
        body: `${body}`,
        tagList
      }
    },
    {
      headers: {
        accept: 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
        contentType: 'application/json',
      },
    }
  )
  return res.data
}

export async function registerApi(username, email, password) {
  const res = await axios.post('https://blog.kata.academy/api/users', {
    user: {
      username: `${username}`,
      email: `${email}`,
      password: `${password}`,
    },
    headers: {
      contentType: 'application/json',
    },
  })
  await localStorage.setItem('token', `${res.data.user.token}`)
  return res
}

export async function loginApi(email, password) {
  const res = await axios.post('https://blog.kata.academy/api/users/login', {
    user: {
      email: `${email}`,
      password: `${password}`,
    },
    headers: {
      contentType: 'application/json',
    },
  })
  return res
}

export async function postArticle(title, description, body, tagList) {
  const res = await axios.post(
    'https://blog.kata.academy/api/articles',
    {
      article: {
        title: `${title}`,
        description: `${description}`,
        body: `${body}`,
        tagList,
      }
    },
    {
      headers: {
        accept: 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
        contentType: 'application/json',
      },
    }
  )
  return res
}

export async function editProfileInfo(username, image, email, password, bio = 'something') {
  const res = await axios.put(
    'https://blog.kata.academy/api/user',
    {
      user: {
        email: `${email}`,
        password: `${password}`,
        username: `${username}`,
        bio: `${bio}`,
        image: `${image}`
      }
    },
    {
      headers: {
        accept: 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
        contentType: 'application/json',
      }
    }
  )
  return res
}

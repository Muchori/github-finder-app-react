const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

/**
 * get search users
 */
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })

  const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    headers: {
      Authorization: `reac-github ${GITHUB_TOKEN}`,
    },
  })

  const { items } = await response.json()

  return items
}

/**
 * get users repos
 */
export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  })

  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
    headers: {
      Authorization: `reac-github ${GITHUB_TOKEN}`,
    },
  })

  const data = await response.json()

  return data
}
/**
 * get as single user
 */
export const getUser = async (login) => {
  const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
      Authorization: `reac-github ${GITHUB_TOKEN}`,
    },
  })

  if (response.status === 404) {
    window.location = '/not-found'
  } else {
    const data = await response.json()

    return data
  }
}

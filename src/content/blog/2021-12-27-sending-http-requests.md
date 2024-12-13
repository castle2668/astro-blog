---
title: 'Sending Http Requests feat. Star Wars API'
excerpt: '本文使用 Star Wars API 為例示範 React 如何串接第三方 API。'
tags: ['react']
date: 2021-12-27
author: '海豹人 Sealman'
image: 'react.jpg'
slug: 2021-12-27-sending-http-requests
---

## 範例：串接 Star Wars API

> - API: Application Programming Interface
> - SWAPI [Film List](https://swapi.dev/api/films)
> - Package [axios](https://github.com/axios/axios)
> - Built-in [Fetch API](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch)
> - [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

使用 **Fetch** 透過網路取得 JSON，回傳的 response 需要先透過 `json()` 轉換，然後我們就能開始使用資料！

這邊有個小細節就是使用 `map()` 篩選出我們需要的欄位，不要把整包 API 資料都帶走，減少資料的複雜度。

```jsx
function fetchMovieHandler() {
  fetch('https://swapi.dev/api/films')
    .then(res => {
      return res.json()
    })
    .then(data => {
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        }
      })
      setMovies(transformedMovies)
    })
    .catch(err => {
      console.log(err)
    })
}
```

我們也可以搭配 **Async/Await** 來使用，我本身也比較喜歡 `async/await` 大於 `.then()`，因為讀起來更簡單、直覺。

注意，使用時除了在 Fetch 加上 `await` 之外，使用 `json()` 把回傳結果的 body text 解析成 JSON 型別的時候也要加上 `await`。

```jsx
async function fetchMovieHandler() {
  const response = await fetch('https://swapi.dev/api/films')
  const data = await response.json()

  const transformedMovies = data.results.map(movieData => {
    return {
      id: movieData.episode_id,
      title: movieData.title,
      openingText: movieData.opening_crawl,
      releaseDate: movieData.release_date,
    }
  })
  setMovies(transformedMovies)
}
```

## Loading & Error Handling

最後是加上 Loading 與錯誤處理的部分，我們會用 Fetch API 作為範例，如果用的是其他 API 像是 axios，可能在寫法上會有些許差異。

```jsx
function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false) // 是否正在讀取
  const [error, setError] = useState(null) // 錯誤訊息

  async function fetchMovieHandler() {
    setIsLoading(true)
    setError(null)

    // 使用 try...catch 處理錯誤
    try {
      const response = await fetch('https://swapi.dev/api/films')
      // 檢查 Fetch 回傳的狀態
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }
      const data = await response.json()
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        }
      })
      setMovies(transformedMovies)
    } catch (error) {
      setError(error.message)
    }

    // 不論成功失敗最後都會關閉讀取
    setIsLoading(false)
  }

  // 處理不同狀態下的呈現內容
  let content = <p>Found no movies.</p>
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }
  if (error) {
    content = <p>{error}</p>
  }
  if (isLoading) {
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>} */}
        {content}
      </section>
    </React.Fragment>
  )
}

export default App
```

## Working with useEffect and useCallback Hooks

最後我們用 useEffect 讓畫面渲染後先 Call API 獲取一次資料。

除此之外，我們會加上 useCallback 確保 `fetchMovieHandler` 函式不會在 useEffect 中形成無限迴圈，因此要在 dependency array 放入函式內有使用到的狀態。

（在這個範例中我們沒有使用任何依賴，但其他情況下就有可能會用到）

```jsx
const fetchMovieHandler = useCallback(async () => {
  // Do the same thing...
}, [])

useEffect(() => {
  fetchMovieHandler()
}, [fetchMovieHandler])
```

## Sending a POST request to Firebase Realtime Database

Fetch API 除了 GET 之外也能用 POST，寫法是在 `fetch()` 的第二個參數放一個物件，然後基本上會設定 `method`、`body`，與 `headers` 這幾個基本的欄位。

```jsx
async function addMovieHandler(movie) {
  setError(null)

  try {
    console.log(movie)
    const response = await fetch(
      'https://react-http-14f5a-default-rtdb.firebaseio.com/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie), // body want JSON data
        // Firebase 不用設定 Content-Type，但一般保險起見還是都會設定
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
    console.log(data)

    fetchMoviesHandler() // Fetch movies after adding new movie
  } catch (error) {
    setError(error.message)
  }
}
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- Fetching API data with useEffect and useCallback Hooks

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)

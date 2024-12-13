import React from 'react'

interface Props {
  currentPage: number
  disablePrevious: boolean
  disableNext: boolean
}

const Pagination: React.FC<Props> = props => {
  const { currentPage, disablePrevious, disableNext } = props

  return (
    <div className="mt-10 flex justify-between">
      <a
        href={'/articles?page=' + (currentPage - 1)}
        className={
          disablePrevious
            ? 'pointer-events-none inline-block rounded-lg bg-maple-100 px-3 py-2'
            : 'inline-block rounded-lg bg-maple-500 px-3 py-2 hover:bg-maple-600'
        }
      >
        Previous
      </a>
      <a
        href={'/articles?page=' + (currentPage + 1)}
        className={
          disableNext
            ? 'pointer-events-none inline-block rounded-lg bg-maple-100 px-3 py-2'
            : 'inline-block rounded-lg bg-maple-500 px-3 py-2 hover:bg-maple-600'
        }
      >
        Next
      </a>
    </div>
  )
}

export default Pagination

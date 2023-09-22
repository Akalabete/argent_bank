import React from 'react'

export default function account( {
  params,
  searchParams,
}: {
  params: {accountId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return <div>account
    <p>{params.accountId}</p>
    {JSON.stringify(searchParams)}
  </div>
}
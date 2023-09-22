import React, { PropsWithChildren } from 'react'

export default function layout({
    params,
    children,
    }: PropsWithChildren<{
    params: { accountId: string }
    
    }>) {
    return <div>
        <h1>account ici {params.accountId}</h1>
        {children}
        </div>
    }

    /* pour recuperer une list 
    const boards = objet avec la liste ...
    { boards.map((board) =>{
        <Component key={boards.id} board= {board} />

    })}

    */
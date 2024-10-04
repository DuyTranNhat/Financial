import React from 'react'
import { CommentGet } from '../../Models/Comment'
import StockCommentListItem from '../StockCommentListItem/StockCommentListItem'

type Props = {
    comments: CommentGet[],
}

const StockCommentList = ({ comments }: Props) => {
    return (
        <div>
            {comments 
            ? comments.map((comment, index) => { 
                return <StockCommentListItem comment={comment} key={index} />
            }) 
            : ""}
        </div>
    )
}

export default StockCommentList

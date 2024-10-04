import React, { useEffect, useState } from 'react'

import { commentPostAPI } from '../../Services/CommentService'
import { CommentFormInputs } from './StockCommentForm/StockCommentForm'
import StockCommentForm from './StockCommentForm/StockCommentForm'
import StockCommentList from '../StockCommentList/StockCommentList'
import Spinner from '../Spinner/Spinner'
import { toast } from 'react-toastify'
import { CommentGet } from '../../Models/Comment'
import { commentGetAPI } from '../../Services/CommentService'

// type CommentForm
type Props = {
    stockSymbol: string
}

const StockComment = ({ stockSymbol }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [comments, setComments] = useState<CommentGet[]>();

    useEffect(() => {
        getComments(stockSymbol);
    }, [])

    const getComments = async (stockSymbol: string) => {
        await commentGetAPI(stockSymbol)
        .then(res => {
            setIsLoading(false);
            setComments(res?.data);
        });
    }

    const handleComment = async (form: CommentFormInputs) => {
        await commentPostAPI(form.title, form.content, stockSymbol)
            .then(res => {
                if (res) {
                    toast.success("Comment created successfully!");
                    getComments(stockSymbol);
                }
                
            }).catch(error => toast.warning(error))
    }
    return (
        <div className='flex flex-col' >
            <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
            {isLoading ? <Spinner /> : <StockCommentList comments={comments!} />}
        </div>
    )
}

export default StockComment

import { createContext, useEffect, useState } from 'react';

const CommentsContext = createContext();

function CommentsProvider({children}) {
    const [comments, setComments] = useState([]);

    const onCommentAdd = (comment) => {
        setComments(prev => [...prev, comment]);
    }

    const onCommentsFetch = (comments) => {
        setComments(comments);
    }

    const onCommentDelete = (id) => {
        setComments(prev => prev.filter(c => c.id !== id));
    }

    useEffect(() => {
        console.log('Comments:', comments);
    }, [comments]);

    return <CommentsContext.Provider value={{
        comments, onCommentAdd, onCommentsFetch, onCommentDelete}}>
            {children}
		</CommentsContext.Provider>;
} 

export { CommentsProvider };
export default CommentsContext;
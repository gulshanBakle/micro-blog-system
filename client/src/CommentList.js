import React from 'react';
import axios from 'axios';

export default ({ comments }) => {

  /*
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );

    setComments(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
*/




  const renderedComments = comments.map(comment => {

    let validContent
    if (comment.status==='approved'){
      validContent= comment.content
    }
    if (comment.status==='pending'){
      validContent = 'Your comment is awaiting moderation. Please hang in there!'
    }
    if (comment.status==='rejected'){
      validContent = 'Your comment can not be displayed cz it violated moderation norms. '
    }

    return <li key={comment.id}>{validContent}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

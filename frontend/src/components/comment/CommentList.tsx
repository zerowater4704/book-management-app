import React, { useEffect, useState } from "react";
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from "../../services/commentService";

const CommentList: React.FC<{ bookId: string }> = ({ bookId }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editedComment, setEditedComment] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const decodedToken: any = JSON.parse(atob(token.split(".")[1]));
      setUserId(decodedToken.id);
    }

    const fetchComments = async () => {
      try {
        const data = await getComments(bookId);
        setComments(data);
      } catch (error) {
        console.error("コメントの取得に失敗しました。", error);
      }
    };

    fetchComments();
  }, [bookId]);

  const handelAddComment = async () => {
    try {
      const addedComment = await addComment(bookId, newComment);
      setComments([...comments, addedComment]);
      setNewComment("");
    } catch (error) {
      console.error("コメント追加に失敗しました。", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("コメント削除に失敗しました。", error);
    }
  };

  const handleEditComment = (commentId: string, currentComment: string) => {
    setEditCommentId(commentId); // 編集するコメントのIDをセット
    setEditedComment(currentComment); // 現在のコメント内容をセット
  };

  const handleUpdateComment = async (commentId: string) => {
    try {
      const updated = await updateComment(commentId, editedComment);
      setComments(
        comments.map((comment) =>
          comment._id === commentId
            ? { ...comment, comment: updated.comment }
            : comment
        )
      );
      setEditCommentId(null); // 編集モードを解除
      setEditedComment("");
    } catch (error) {
      console.error("コメントの更新に失敗しました。", error);
    }
  };

  return (
    <div>
      <h3>コメント</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            {editCommentId === comment._id ? (
              <div>
                {/* 編集モード */}
                <textarea
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                />
                <button onClick={() => handleUpdateComment(comment._id)}>
                  更新
                </button>
                <button onClick={() => setEditCommentId(null)}>
                  キャンセル
                </button>
              </div>
            ) : (
              <div>
                {/* 通常表示モード */}
                <p>{comment.comment}</p>
                <p>投稿者: {comment.user.name}</p>
                {comment.user._id === userId && (
                  <div>
                    <button
                      onClick={() =>
                        handleEditComment(comment._id, comment.comment)
                      }
                    >
                      編集
                    </button>
                    <button onClick={() => handleDeleteComment(comment._id)}>
                      削除
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="コメント追加"
        ></textarea>
        <button onClick={handelAddComment}>コメント追加</button>
      </div>
    </div>
  );
};

export default CommentList;
